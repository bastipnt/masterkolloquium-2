import { Scale } from "tonal";
import { AmplitudeEnvelope, type Gain } from "tone";
import type { Frequency, Time } from "tone/build/esm/core/type/Units";
import { mapFloor } from "../utils/number";

export type PatternValues = Array<Array<0 | 1>>;

abstract class BaseSound {
  scale = "C4 major";
  patternValues: PatternValues = [[1, 0, 1, 0]];

  readonly mainGain: Gain;
  protected readonly envelope: AmplitudeEnvelope;

  constructor(mainGain: Gain, attack = 1, release = 1) {
    this.mainGain = mainGain;
    this.envelope = new AmplitudeEnvelope(attack, undefined, 1, release);
    this.envelope.connect(this.mainGain);
  }

  start(time?: Time) {
    this.envelope.triggerAttack(time);
  }

  stop(time: Time) {
    this.envelope.triggerRelease(time);
  }

  get scaleDegrees() {
    return Scale.degrees(this.scale);
  }

  protected getRndChordRythmPattern() {
    return this.patternValues[mapFloor(Math.random(), 0, 1, 0, this.patternValues.length)];
  }

  protected getRndChordNotes(range: [number, number]): Frequency[] {
    const chordRoot = mapFloor(Math.random(), 0, 1, range[0], range[1]);

    return this.getRndChordRythmPattern()
      .map((val, index) => {
        if (val === 0) return;
        let degree = chordRoot + index;
        // avoid 0
        if (chordRoot <= 0 && degree >= 0) degree += 1;
        return this.scaleDegrees(degree);
      })
      .filter((note) => !!note) as Frequency[];
  }
}

export default BaseSound;
