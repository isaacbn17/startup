const vote = JSON.parse(localStorage.getItem('vote'));
console.log(vote);

const SurveyEvent = {
  System: 'system',
  Vote: vote
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class SurveyEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.receiveEvent(new EventMessage('Survey', SurveyEvent.System, { msg: 'Websocket connected' }));
      console.log("The websocket is connected")
    };
    this.socket.onclose = (event) => {
      this.receiveEvent(new EventMessage('Survey', SurveyEvent.System, { msg: 'Websocket disconnected' }));
      console.log("The websocket is disconnected")

    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };
  }

  broadcastEvent(from, type, value) {
    console.log("Broadcast event is called")
    const event = new EventMessage(from, type, value);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    console.log('A handler is added')
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    console.log('A handler is removed')
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    console.log("Event received")
    this.events.push(event);
    console.log(this.events);

    this.events.forEach((e) => {
      this.handlers.forEach((handler) => {
        handler(e);
      });
    });
  }
}

const SurveyNotifier = new SurveyEventNotifier();
export { SurveyEvent, SurveyNotifier };
