import {
  FMSynth,
  type FMSynthOptions,
  Gain,
  Pattern,
  PingPongDelay,
  Reverb,
  Tremolo,
  LFO,
  Filter,
  AutoFilter,
} from "tone";
import BaseSound from "./BaseSound";
import { RhythmPattern, Scale } from "tonal";
import { map, mapFloor } from "../utils/number";
import type { Time } from "tone/build/esm/core/type/Units";
import type { RecursivePartial } from "tone/build/esm/core/util/Interface";

class Test1 extends BaseSound {
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

  // Synth1
  synthFilter = new Filter(1500);
  synthEffectChain = new Gain(1).chain(
    this.tremolo,
    this.pingPong,
    this.reverb,
    this.synthFilter,
    this.envelope
  );
  synthOptions: RecursivePartial<FMSynthOptions> = {
    envelope: { attack: 0.3, decay: 0.4, sustain: 0.8, release: 0.6 },
    modulation: { type: "sawtooth" },
    modulationIndex: 10,
    volume: -4,
  };
  synthPattern = new Pattern({
    callback: (time, rhythmPatternValue) => {
      if (rhythmPatternValue === 0) return;
      const notes = this.getRndChordNotes([-7, 7]);
      console.log("synth1 playing:", notes);

      notes.forEach((note) => {
        const synth = new FMSynth(this.synthOptions);
        synth.connect(this.synthEffectChain);
        synth.onsilence = () => synth.dispose();
        synth.triggerAttackRelease(note, 0.8, time, map(Math.random(), 0, 1, 0.3, 1));
      });
    },
    interval: "4n",
    pattern: "upDown",
    values: RhythmPattern.onsets(1, 2, 1, 3, 2, 1, 2),
  }).start(0);

  // Background
  bgSynthFilter = new Filter(1000);
  bgSynthEffectChain = new Gain(1).chain(
    this.tremolo,
    this.pingPong,
    this.reverb,
    this.bgSynthFilter,
    this.envelope
  );
  bgSynthOptions: RecursivePartial<FMSynthOptions> = {
    envelope: { attack: 2, decay: 0.4, sustain: 0.7, release: 10 },
    volume: -6,
  };
  bgSynthLFO = new LFO("8n", 20, 200).start(0);
  bgSynthAutoFilter = new AutoFilter({
    baseFrequency: "C3",
    octaves: 2,
    frequency: "8m",
    wet: 0.5,
  }).start(0);
  bgSynthPattern = new Pattern({
    callback: (time, rhythmPatternValue) => {
      if (rhythmPatternValue === 0) return;
      const notes = this.getRndChordNotes([-14, -7]);
      console.log("bgSynth2 playing:", notes);

      notes.forEach((note) => {
        const bgSynth = new FMSynth(this.bgSynthOptions);
        this.bgSynthLFO.connect(bgSynth.modulationIndex);
        bgSynth.connect(this.bgSynthEffectChain);
        bgSynth.onsilence = () => {
          this.bgSynthLFO.disconnect(bgSynth.modulationIndex);
          bgSynth.dispose();
        };
        bgSynth.triggerAttackRelease(note, "2m", time);
      });
    },
    interval: "1m",
    pattern: "up",
    values: [1],
  }).start(0);

  constructor(gain: Gain) {
    super(gain);

    // document.addEventListener("mousemove", ({ clientX, clientY }) => {
    //   this.synth.set({
    //     modulationIndex: map(clientX, 3, window.innerWidth, 0.1, 100),
    //   });
    //   console.log({ clientX, clientY });
    // });
  }
}

export default Test1;
