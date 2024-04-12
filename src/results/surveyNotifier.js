// const vote = JSON.parse(localStorage.getItem('vote'));
// console.log(vote);

// const userVote = {
//   name: username,
//   answer: selectedAnswer,
// };

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
      this.receiveEvent(new EventMessage('Survey', SurveyEvent.System, { msg: 'connected' }));
    };
    this.socket.onclose = (event) => {
      this.receiveEvent(new EventMessage('Survey', SurveyEvent.System, { msg: 'disconnected' }));
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.events.forEach((e) => {
      this.handlers.forEach((handler) => {
        handler(e);
      });
    });
  }
}

const SurveyNotifier = new SurveyEventNotifier();
export { SurveyEvent, SurveyNotifier };
