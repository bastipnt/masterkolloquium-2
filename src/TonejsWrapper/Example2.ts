import { Gain, PingPongDelay, PolySynth, Sequence, Tremolo } from "tone";
import BaseSound from "./BaseSound";
import type { Time } from "tone/build/esm/core/type/Units";

class Example2 extends BaseSound {
  synth = new PolySynth({ options: { detune: 20, portamento: 2 } });
  seq = new Sequence(
    (time, note) => {
      this.synth.triggerAttackRelease(note, 0.1, time);
    },
    ["C4", ["E3", "D5", "E4"], "G3", ["A4", "G5"]]
  ).start(0);

  pingPong = new PingPongDelay("16n", 0.2).connect(this.gain);
  tremolo = new Tremolo(9, 0.75).start(0);

  constructor(gain: Gain) {
    super(gain);
    this.synth.chain(this.tremolo, this.pingPong);
  }

  start() {}

  stop() {}
}

export default Example2;
