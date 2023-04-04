import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionManagerService } from '../SessionManager/session-manager.service';

interface ListeningObjects {
  projectId?: string;
  itemId?: string;
}

@Injectable({ providedIn: 'root' })
export class WebSocketService<T> extends Subject<T> {
  private ws?: WebSocket;
  private autoReconnect: boolean = true;
  private listeningObject: ListeningObjects = {};

  constructor(
    private sessionManagerService: SessionManagerService,
  ) {
    super();
    this.connect();
  }

  setAutoReconnect(reconnect: boolean) {
    this.autoReconnect = reconnect;
  }

  private send(data: any) {
    try {
      this.ws?.send(JSON.stringify(data));
    } catch (e) { }
  }

  waitUntilOpen(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.isReadyStateOpen()) {
        resolve();
        return;
      }
      const interval = setInterval(() => {
        if (!this.isReadyStateOpen()) return;
        clearInterval(interval);
        resolve();
      }, 10);
    });
  }

  private isReadyStateOpen(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  connect() {
    if (this.ws && this.ws.readyState === WebSocket.CONNECTING) return;
    if (this.ws && ![WebSocket.CLOSING, WebSocket.CLOSED].includes(this.ws.readyState)) this.ws.close();
    this.ws = new WebSocket(environment.wsUrl);
    this.ws.onerror = (ev) => {
      //if (this.autoReconnect) this.connect();
      this.ws = undefined;
    };
    this.ws.onclose = (ev) => {
      if (ev.code === 4200) { }
      else if (this.autoReconnect) setTimeout(() => this.connect(), 1000);
      else this.ws = undefined;
    }
    this.ws.onopen = () => {
      this.auth();
      this.reJoinUpdates();
    };
    this.ws.onmessage = (event) => this.next(JSON.parse(event.data));
  }

  private auth() {
    this.send({
      type: 'auth',
      token: this.sessionManagerService.getToken(),
    });
  }

  private reJoinUpdates() {
    if (this.listeningObject.projectId) {
      this.joinProjectUpdates(this.listeningObject.projectId);
      if (this.listeningObject.itemId) this.joinItemUpdates(this.listeningObject.projectId, this.listeningObject.itemId);
    }
  }

  joinProjectUpdates(projectId: string) {
    this.send({
      type: 'joinProject',
      projectId,
    });
    this.listeningObject.projectId = projectId;
  }

  leaveProjectUpdates(projectId: string) {
    this.send({
      type: 'leaveProject',
      projectId,
    });
    this.listeningObject.projectId = undefined;
  }

  joinItemUpdates(projectId: string, itemId: string) {
    this.listeningObject = {
      projectId,
      itemId,
    }
    this.send({
      type: 'joinItem',
      projectId,
      itemId,
    });
  }

  leaveItemUpdates(projectId: string, itemId: string) {
    this.listeningObject = {
      projectId,
    }
    this.send({
      type: 'leaveItem',
      projectId,
      itemId,
    });
  }

  sendItemDescriptionUpdate(projectId: string, itemId: string, description: string) {
    this.send({
      type: 'updateItemDescription',
      projectId: projectId,
      itemId,
      data: description,
    });
  }
}