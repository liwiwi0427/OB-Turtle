import { TeacherInjection } from '../types/megacode';

export interface CrisisSyncPayload {
  activeCrisis: TeacherInjection | null;
  caseId: string | null;
  updatedAt: number;
  sourceDevice?: string;
}

type SyncCallback = (payload: CrisisSyncPayload) => void;
type ConnectionCallback = (status: 'connected' | 'reconnecting' | 'polling') => void;

class RealtimeSyncManager {
  private ws: WebSocket | null = null;
  private channel: BroadcastChannel | null = null;
  private subscribers: Set<SyncCallback> = new Set();
  private connSubscribers: Set<ConnectionCallback> = new Set();
  private reconnectTimer: any = null;
  private pollTimer: any = null;
  private lastUpdatedAt = 0;
  private deviceId: string;
  private currentStatus: 'connected' | 'reconnecting' | 'polling' = 'reconnecting';
  private latestState: CrisisSyncPayload = {
    activeCrisis: null,
    caseId: null,
    updatedAt: 0
  };

  constructor() {
    this.deviceId = 'dev_' + Math.random().toString(36).substring(2, 9);
    
    // 1. BroadcastChannel for instant local multi-tab/window sync
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('ob_megacode_crisis_sync');
        this.channel.onmessage = (event) => {
          if (event.data?.type === 'CRISIS_SYNC') {
            this.handleIncomingState(event.data.payload);
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel not supported', e);
      }
    }

    if (typeof window !== 'undefined') {
      this.initWebSocket();
      this.fetchCurrentState();
      this.startPolling();
    }
  }

  private setStatus(status: 'connected' | 'reconnecting' | 'polling') {
    if (this.currentStatus !== status) {
      this.currentStatus = status;
      this.connSubscribers.forEach(cb => cb(status));
    }
  }

  private initWebSocket() {
    if (typeof window === 'undefined') return;

    try {
      const isHttps = window.location.protocol === 'https:';
      const wsProtocol = isHttps ? 'wss:' : 'ws:';
      const host = window.location.host;
      const wsUrl = `${wsProtocol}//${host}/ws/crisis`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.setStatus('connected');
        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = null;
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'CRISIS_SYNC' && data.payload) {
            this.handleIncomingState(data.payload);
          }
        } catch (e) {
          console.error('Error parsing WS message:', e);
        }
      };

      this.ws.onclose = () => {
        this.setStatus('reconnecting');
        this.scheduleReconnect();
      };

      this.ws.onerror = () => {
        this.setStatus('polling');
      };
    } catch (e) {
      this.setStatus('polling');
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.initWebSocket();
    }, 3000);
  }

  private startPolling() {
    // Background polling fallback every 2.5 seconds
    this.pollTimer = setInterval(() => {
      this.fetchCurrentState();
    }, 2500);
  }

  public async fetchCurrentState(): Promise<CrisisSyncPayload | null> {
    try {
      const res = await fetch('/api/crisis');
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.updatedAt === 'number') {
          const payload: CrisisSyncPayload = {
            activeCrisis: data.activeCrisis || null,
            caseId: data.caseId || null,
            updatedAt: data.updatedAt,
            sourceDevice: data.sourceDevice
          };
          this.handleIncomingState(payload);
          return payload;
        }
      }
    } catch (e) {
      // Offline or network error
    }
    return null;
  }

  private handleIncomingState(payload: CrisisSyncPayload) {
    if (!payload) return;
    // Only apply if it's newer than what we have or equal
    if (payload.updatedAt >= this.lastUpdatedAt) {
      this.lastUpdatedAt = payload.updatedAt;
      this.latestState = payload;
      this.subscribers.forEach(cb => cb(payload));
    }
  }

  public async injectCrisis(crisis: TeacherInjection, caseId: string): Promise<void> {
    const payload: CrisisSyncPayload = {
      activeCrisis: crisis,
      caseId,
      updatedAt: Date.now(),
      sourceDevice: this.deviceId
    };

    this.handleIncomingState(payload);

    // 1. Broadcast locally to other tabs
    if (this.channel) {
      try {
        this.channel.postMessage({ type: 'CRISIS_SYNC', payload });
      } catch (e) {}
    }

    // 2. Send via WebSocket if open
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify({ type: 'INJECT_CRISIS', payload }));
      } catch (e) {}
    }

    // 3. Guarantee via HTTP API
    try {
      await fetch('/api/crisis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn('Failed to POST crisis to server:', e);
    }
  }

  public async clearCrisis(): Promise<void> {
    const payload: CrisisSyncPayload = {
      activeCrisis: null,
      caseId: null,
      updatedAt: Date.now(),
      sourceDevice: this.deviceId
    };

    this.handleIncomingState(payload);

    // 1. Broadcast locally
    if (this.channel) {
      try {
        this.channel.postMessage({ type: 'CRISIS_SYNC', payload });
      } catch (e) {}
    }

    // 2. Send via WebSocket
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify({ type: 'CLEAR_CRISIS', payload }));
      } catch (e) {}
    }

    // 3. HTTP API
    try {
      await fetch(`/api/crisis?sourceDevice=${this.deviceId}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.warn('Failed to DELETE crisis on server:', e);
    }
  }

  public subscribe(cb: SyncCallback): () => void {
    this.subscribers.add(cb);
    // Send latest known state immediately upon subscribe
    cb(this.latestState);
    return () => this.subscribers.delete(cb);
  }

  public subscribeConnection(cb: ConnectionCallback): () => void {
    this.connSubscribers.add(cb);
    cb(this.currentStatus);
    return () => this.connSubscribers.delete(cb);
  }

  public getStatus(): 'connected' | 'reconnecting' | 'polling' {
    return this.currentStatus;
  }

  public getDeviceId(): string {
    return this.deviceId;
  }
}

export const realtimeSync = new RealtimeSyncManager();
