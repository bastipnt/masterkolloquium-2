import { FMSynth, Gain, Pattern, Reverb } from "tone";
import BaseSound from "./BaseSound";

class ToneExample2 extends BaseSound {
  synth = new FMSynth();

  pattern = new Pattern(
    (time, note) => {
      this.synth.triggerAttackRelease(note, 0.1, time);
    },
    ["C4", "D5", "G3", "A4"]
  ).start(0);

  reverb = new Reverb().connect(this.envelope);

  constructor(gain: Gain) {
    super(gain);
    this.synth.connect(this.reverb);
  }
}

export default ToneExample2;
