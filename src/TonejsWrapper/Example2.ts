import { Gain, PingPongDelay, Reverb, Tremolo } from "tone";
import BaseSound from "./BaseSound";
import { RhythmPattern, Scale } from "tonal";
import type { Time } from "tone/build/esm/core/type/Units";

class Example2 extends BaseSound {
  chordRhythmPatterns = [
    RhythmPattern.onsets(1, 2, 1),
    RhythmPattern.onsets(1, 1, 2),
    RhythmPattern.onsets(2, 2, 1),
    RhythmPattern.onsets(3, 1),
    [1],
    [1, 0, 1],
  ];

  // Effects
  pingPong = new PingPongDelay("8n", 0.2);
  tremolo = new Tremolo(5, 0.5).start(0);
  reverb = new Reverb(15);

  constructor(gain: Gain) {
    super(gain);
  }

  start(time: Time) {}

  stop(time: Time) {}
}

export default Example2;
