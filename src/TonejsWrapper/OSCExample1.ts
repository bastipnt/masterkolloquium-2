import { Channel, Oscillator, now } from "tone";
import type BaseSound from "./BaseSound";

class OSCExample1 implements BaseSound {
  osc = new Oscillator(260);

  constructor(channel: Channel) {
    this.osc.connect(channel);
  }

  start() {
    this.osc.start(now());
  }

  stop() {
    this.osc.stop();
  }
}

export default OSCExample1;
