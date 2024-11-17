import { Channel, Oscillator } from "tone";
import BaseSound from "./BaseSound";
import type { Time } from "tone/build/esm/core/type/Units";

class OSCExample1 extends BaseSound {
  osc = new Oscillator(262);

  constructor(channel: Channel) {
    super(channel);
    this.osc.connect(this.channel);
  }

  start(time?: Time) {
    this.osc.start(time);
  }

  stop(time: Time) {
    this.osc.stop(time);
  }
}

export default OSCExample1;
