import { Channel, PingPongDelay, PolySynth, Sequence, Tremolo } from "tone";
import type BaseSound from "./BaseSound";

class Example2 implements BaseSound {
  synth = new PolySynth({ options: { detune: 20, portamento: 2 } });
  seq = new Sequence(
    (time, note) => {
      this.synth.triggerAttackRelease(note, 0.1, time);
    },
    ["C4", ["E3", "D5", "E4"], "G3", ["A4", "G5"]]
  );
  pingPong = new PingPongDelay("16n", 0.2).toDestination();
  tremolo = new Tremolo(9, 0.75).start();

  constructor(channel: Channel) {
    this.synth.chain(this.tremolo, this.pingPong);
  }

  start() {
    this.seq.start(0);
  }

  stop() {
    this.seq.stop();
  }
}

export default Example2;
