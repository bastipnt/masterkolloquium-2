import { Gain, Oscillator } from "tone";
import BaseSound from "./BaseSound";
import type { Time } from "tone/build/esm/core/type/Units";

class OSCExample1 extends BaseSound {
  osc = new Oscillator(262);

  constructor(gain: Gain) {
    super(gain);
    this.osc.connect(this.envelope);
  }

  start(time?: Time) {
    this.osc.start(time);
    super.start(time);
  }

  stop(time: Time) {
    this.osc.stop(time);
    super.stop(time);
  }
}

export default OSCExample1;
