import type { Gain } from "tone";
import type { Time } from "tone/build/esm/core/type/Units";

abstract class BaseSound {
  gain: Gain;

  constructor(gain: Gain) {
    this.gain = gain;
  }

  abstract start(time?: Time): void;
  abstract stop(time: Time): void;
}

export default BaseSound;
