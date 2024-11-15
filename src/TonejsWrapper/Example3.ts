import {
  AmplitudeEnvelope,
  Gain,
  GrainPlayer,
  Loop,
  MembraneSynth,
  MetalSynth,
  Offline,
  Oscillator,
  PingPongDelay,
  Sequence,
  ToneAudioBuffer,
  Tremolo,
} from "tone";

import type BaseSound from "./BaseSound";
import coffeSample from "../assets/samples/coffee_1.mp3";

class Example3 implements BaseSound {
  private initialized = false;
  private grain?: GrainPlayer;

  private adsr = new AmplitudeEnvelope({
    attack: 0.2,
    release: 0.8,
  }).toDestination();

  private loop?: Loop;

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
  );

  private congo = new MembraneSynth({
    pitchDecay: 0.008,
    octaves: 2,
    envelope: { attack: 0.0006, decay: 0.5, sustain: 0 },
  });
  private congoSequence = new Sequence(
    (time, note) => {
      if (note === null) return;
      // if (Math.random() < 0.3) return;
      this.congo.triggerAttack(note, time, Math.random() * 0.5 + 0.5);
    },
    ["G3", "C4", "C4", "C4"],
    "4n"
  );

  private pingPong = new PingPongDelay("16n", 0.2).connect(this.adsr);
  private tremolo = new Tremolo(9, 0.75).start();

  constructor() {
    this.bell.chain(this.tremolo, this.pingPong);
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
    }).chain(grainGain, this.tremolo, this.adsr);

    this.loop = new Loop(() => {
      if (!this.grain) return;
      this.grain.set({ playbackRate: Math.random() + 0.5 });
    }, "4n");

    this.initialized = true;
    console.log("grain initialized");
  }

  start(time = 0) {
    if (!this.initialized) return;
    this.loop?.start(time);
    this.grain?.start(time);

    this.bellSequence.start(time);
    this.congoSequence.start(time);

    this.adsr.triggerAttack(time);
  }

  stop(time = "+1") {
    this.adsr.triggerRelease();

    this.grain?.stop(time);
    this.loop?.stop(time);
    this.bellSequence.stop(time);
    this.congoSequence.stop(time);
  }

  private loadAudioBuffer = (): Promise<ToneAudioBuffer> =>
    new Promise((resolve) => {
      new ToneAudioBuffer(coffeSample, (buffer) => resolve(buffer));
    });

  private async getAudioBuffer(): Promise<ToneAudioBuffer> {
    return await Offline(
      () => {
        new Oscillator({ frequency: 260 }).toDestination().start(0);
      },
      0.5,
      1,
      44100
    );
  }
}

export default Example3;
