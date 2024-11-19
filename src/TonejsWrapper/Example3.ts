import {
  Gain,
  GrainPlayer,
  Loop,
  MembraneSynth,
  MetalSynth,
  PingPongDelay,
  Sequence,
  ToneAudioBuffer,
  Tremolo,
  Time as ToneTime,
} from "tone";

import BaseSound from "./BaseSound";
import coffeSample from "../assets/samples/coffee_1.mp3";
import type { Time } from "tone/build/esm/core/type/Units";
import { RhythmPattern, Scale } from "tonal";
import { map } from "../utils/number";

class Example3 extends BaseSound {
  private initialized = false;

  private notes = Scale.get("c3 pentatonic").notes;

  grain?: GrainPlayer;

  private loop?: Loop;
  private bar = 0;

  private bell = new MetalSynth({
    harmonicity: 12,
    resonance: 800,
    modulationIndex: 20,
    envelope: { decay: 0.4 },
    volume: -12,
  });
  private bellSequence = new Sequence(
    (time, note) => {
      if (note === null) return;
      // if (Math.random() < 0.3) return;
      this.bell.triggerAttack(note, time, Math.random() * 0.5 + 0.5);
    },
    [
      [300, null, 200],
      [null, 200, 200],
      [null, 200, null],
      [200, null, 200],
    ],
    "4n"
  ).start(0);

  private congo = new MembraneSynth({
    pitchDecay: 0.08,
    octaves: 3,
    envelope: { attack: 0.006, decay: 0.5, sustain: 0 },
  });
  private congoSequence = new Sequence(
    (time, beat) => {
      if (!beat) return;

      const note = this.getRandomNote();
      this.congo.triggerAttack(note, time, Math.random() * 0.5 + 0.5);
    },
    RhythmPattern.random(8, 0.2),
    "4n"
  ).start(0);

  private pingPong = new PingPongDelay("16n", 0.2).connect(this.mainGain);
  private tremolo = new Tremolo(9, 0.75).connect(this.mainGain).start(0);

  constructor(gain: Gain) {
    super(gain);
    this.bell.chain(this.tremolo);
    this.congo.chain(this.pingPong);

    this.init();
  }

  async init() {
    const audioBuffer = await this.loadAudioBuffer();
    const abDuration = audioBuffer.duration;

    const grainGain = new Gain(4);

    this.grain = new GrainPlayer({
      url: audioBuffer,
      loop: true,
      grainSize: 0.01,
      overlap: 0.05,
      playbackRate: 0.1,
      loopStart: 0,
      loopEnd: abDuration,
    }).chain(grainGain, this.tremolo);

    this.loop = new Loop(() => {
      if (!this.grain) return;
      this.grain.set({ playbackRate: Math.random() + 0.5 });
    }, "4n").start(0);

    this.initialized = true;
    console.log("grain initialized");
  }

  start(time?: Time) {
    if (!this.initialized) return;
    // this.grain?.start(time);
  }

  stop(time: Time) {
    if (!this.initialized) return;
    this.grain?.stop(time);
  }

  private loadAudioBuffer = (): Promise<ToneAudioBuffer> =>
    new Promise((resolve) => {
      new ToneAudioBuffer(coffeSample, (buffer) => resolve(buffer));
    });

  private getRandomNote() {
    const noteIndex = Math.floor(map(Math.random(), 0, 1, 0, this.notes.length));
    return this.notes[noteIndex];
  }
}

export default Example3;
