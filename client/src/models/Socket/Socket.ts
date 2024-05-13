import { EmitData, EmitType, EventType, Subscriber } from './types';

export class Socket {
  ws: WebSocket;

  Subscribers = new Map<EventType, Set<Subscriber<EventType>>>();

  constructor(url: string) {
    this.ws = new WebSocket(url);

    window.addEventListener('beforeunload', () => {
      this.ws.close();
    });

    this.ws.onmessage = (e) => {
      const data = JSON.parse(e?.data);

      if (data?.method) {
        const set = this.Subscribers.get(data.method);

        set?.forEach((Subscriber) => Subscriber(data));
      }
    };
  }

  on<E extends EventType>(method: E, Subscriber: Subscriber<E>) {
    if (this.Subscribers.has(method)) {
      const set = this.Subscribers.get(method);

      set?.add(Subscriber as Subscriber<EventType>);
    } else {
      this.Subscribers.set(
        method,
        new Set([Subscriber as Subscriber<EventType>]),
      );
    }
  }

  emit<E extends EmitType>(method: E, data?: EmitData<E>) {
    const request: Record<string, any> = { method };

    if (data) Object.assign(request, data);

    request.token = localStorage.getItem('token');

    this.ws.send(JSON.stringify(request));
  }

  remove<E extends EventType>(method: E, Subscriber: Subscriber<E>) {
    if (this.Subscribers.has(method)) {
      const set = this.Subscribers.get(method);

      set?.delete(Subscriber as Subscriber<EventType>);
    }
  }
}
