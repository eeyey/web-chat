const chalk = require("chalk");
const EventEmitter = require("events");
const ws = require("ws");

class ChatSocket extends EventEmitter {
  constructor(server, router) {
    super();

    this.clients = new Map();
    this.wsServer = new ws.Server({ server });

    Object.entries(router).forEach(([method, callback]) => {
      this.on(method, callback);
    });

    this.wsServer.on("connection", (ws, req) => {
      ws.on("message", (message) => {
        try {
          const data = JSON.parse(message.toString());

          if (!data || !data?.method) return false;

          this.emit(data.method, data, ws, this);
        } catch (e) {
          console.log(e);
        }
      });
    });
  }

  send(clientId, data) {
    [...this.clients.entries()].forEach(([id, soc]) => {
      if (+id === clientId) {
        console.log(`Send to ${clientId} data: `, data);
        soc.send(data);
      }
    });
  }

  broadcast(message) {
    [...this.clients.values()].forEach((client) => {
      client.send(message);
    });
  }

  addClient(id, client) {
    this.clients.set(id, client);
  }

  deleteClient(id) {
    if (this.clients.has(id)) {
      this.clients.delete(id);
    }
  }
}

module.exports = ChatSocket;
