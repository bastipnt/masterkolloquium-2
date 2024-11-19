import { Pattern, type InputNode, NoiseSynth, AmplitudeEnvelope } from "tone";
import BaseFPInstrument from "./BaseFPInstrument";
import type { Monophonic, MonophonicOptions } from "tone/build/esm/instrument/Monophonic";
import type { PatternName } from "tone/build/esm/event/PatternGenerator";
import type { Time } from "tone/build/esm/core/type/Units";
import { map } from "../utils/number";

export type FPInstrumentOptions<SynthType extends Monophonic<MonophonicOptions>> = {
  synth: SynthType | NoiseSynth;
  patternValues: Array<0 | 1>;
  patternName: PatternName;
  interval: Time;
  duration: Time;
  noteRange: [number, number];
  effectChain: InputNode[];
  scale: string;
  on?: boolean;
};

class FPInstrument<SynthType extends Monophonic<MonophonicOptions>> extends BaseFPInstrument {
  private synth: SynthType | NoiseSynth;
  private pattern: Pattern<number>;
  private patternIndexes: number[];
  private patternValues: Array<0 | 1>;
  private duration: Time;
  private noteRange: [number, number];

  constructor(envelope: AmplitudeEnvelope, options: FPInstrumentOptions<SynthType>) {
    super(envelope, options.scale, options.effectChain, options.on);

    this.synth = options.synth;
    this.patternValues = options.patternValues;
    this.patternIndexes = Array.from(this.patternValues.keys());
    this.duration = options.duration;
    this.noteRange = options.noteRange;

    this.pattern = new Pattern({
      callback: this.patternCallback,
      interval: options.interval,
      pattern: options.patternName,
      values: this.patternIndexes,
    });

    this.pattern.start(0);
    this.connect();
  }

  connect = () => {
    if (!this.on) return;
    this.synth.connect(this.effectChain);
  };

  disconnect = () => {
    this.synth.disconnect(this.effectChain);
  };

  patternCallback = (time: Time, patternIndex?: number) => {
    if (patternIndex === undefined) return;
    const patternValue = this.patternValues[patternIndex];
    if (patternValue !== 1) return;

    const note = this.getRndNoteFromScale(...this.noteRange);
    if (this.synth instanceof NoiseSynth) {
      this.synth.triggerAttackRelease(this.duration, time, map(Math.random(), 0, 1, 0.3, 1));
    } else {
      this.synth.triggerAttackRelease(note, this.duration, time, map(Math.random(), 0, 1, 0.3, 1));
    }
  };
}

export default FPInstrument;
