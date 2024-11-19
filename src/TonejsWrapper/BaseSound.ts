import { Scale } from "tonal";
import type { Gain } from "tone";
import type { Time } from "tone/build/esm/core/type/Units";
import { mapFloor } from "../utils/number";

abstract class BaseSound {
  scale = "C4 major";
  chordRhythmPatterns = [[1, 0, 1, 0]];

  readonly mainGain: Gain;

  constructor(mainGain: Gain) {
    this.mainGain = mainGain;
  }

  abstract start(time?: Time): void;
  abstract stop(time: Time): void;

  get scaleDegrees() {
    return Scale.degrees(this.scale);
  }

  protected getRndChordRythmPattern() {
    return this.chordRhythmPatterns[
      mapFloor(Math.random(), 0, 1, 0, this.chordRhythmPatterns.length)
    ];
  }

  protected getRndChordNotes(range: [number, number]) {
    const chordRoot = mapFloor(Math.random(), 0, 1, range[0], range[1]);

    return this.getRndChordRythmPattern()
      .map((val, index) => {
        if (val === 0) return;
        let degree = chordRoot + index;
        // avoid 0
        if (chordRoot <= 0 && degree >= 0) degree += 1;
        return this.scaleDegrees(degree);
      })
      .filter((note) => !!note);
  }
}

export default BaseSound;
