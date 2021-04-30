class PubSub {
  subscribers = {};
  subscribe = ({ eventName, callback }) => {
    if (!Array.isArray(this.subscribers[eventName])) {
      this.subscribers[eventName] = [];
    }
    const id = Math.ceil(Math.random() * 10000);
    this.subscribers[eventName].push({
      callback,
      id
    });

    return {
      unsubscribe: () => {
        this.subscribers[eventName] = this.subscribers[eventName].filter(
          (eventHandler) => {
            return eventHandler.id === id;
          }
        );
      }
    };
  };

  publish = ({ eventName, data }) => {
    if (this.subscribers[eventName]) {
      this.subscribers[eventName].forEach((item) => item.callback(data));
    }
  };
}

class AkaiController {
  constructor() {
    if (navigator.requestMIDIAccess) {
      navigator
        .requestMIDIAccess({
          sysex: false
        })
        .then(this.onMIDISuccess, onMIDIFailure);
    } else {
      alert("No MIDI support in your browser.");
    }
  }
  pubSub = new PubSub();

  on = ({ controlId, callback }) => {
    return this.pubSub.subscribe({ eventName: controlId, callback });
  };

  onNote = ({ note, velocity }) => {
    this.pubSub.publish({ eventName: note, data: { note, velocity } });
  };

  onMIDISuccess = (data) => {
    const { inputs } = data;
    data.onstatechange = printMidiInfo;
    inputs.forEach((input) => {
      input.onmidimessage = (message) =>
        onMIDIMessage({ message, onNote: this.onNote });
    });
  };
}

const printMidiInfo = (e) => {
  // Print information about the (dis)connected MIDI controller
  console.log(e.port.name, e.port.manufacturer, e.port.state);
};

const onMIDIFailure = (e) => {
  console.log(
    "No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " +
      e
  );
};

const onMIDIMessage = ({ message: { data }, onNote }) => {
  const [, note, velocity] = data;
  const type = data[0] & 0xf0;

  switch (type) {
    case 144: // noteOn message
      onNote({ note, velocity });
      break;
    case 128: // noteOff message
      break;
    case 176:
      onNote({ note, velocity });
      break;
    default:
      break;
  }
};

export default AkaiController;
