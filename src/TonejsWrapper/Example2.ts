import {
  AmplitudeEnvelope,
  AutoFilter,
  FMSynth,
  Filter,
  Gain,
  Noise,
  PingPongDelay,
  Reverb,
  Tremolo,
} from "tone";
import BaseSound from "./BaseSound";
import Instrument from "./FPInstrument";
import type { Time } from "tone/build/esm/core/type/Units";

class Example2 extends BaseSound {
  // Instruments
  private inst1 = new Instrument(this.envelope, {
    synth: new FMSynth({
      envelope: { attack: 0.001 },
      modulation: { type: "sawtooth" },
      modulationIndex: 100,
      volume: -6,
    }),
    patternValues: this.patternValues[0],
    patternName: "upDown",
    interval: "8n",
    effectChain: [new Filter(2000), new PingPongDelay("8n.", 0.3), new Reverb(30)],
    scale: this.scale,
    duration: "8n",
    noteRange: [0, 7],
    on: true,
  });

  private inst2Bass = new Instrument(this.envelope, {
    synth: new FMSynth({
      envelope: { attack: 0.1, decay: 0.4, sustain: 0.8, release: 0.6 },
      modulation: { type: "triangle" },
      modulationIndex: 100,
      volume: -6,
    }),
    patternValues: [1],
    patternName: "up",
    interval: "1n",
    effectChain: [new Filter(1000), new Reverb(15)],
    scale: this.scale,
    duration: "1n",
    noteRange: [-14, -5],
    on: true,
  });

  private inst3 = new Instrument(this.envelope, {
    synth: new FMSynth({
      envelope: { attack: 0.001 },
      modulation: { type: "sawtooth" },
      modulationIndex: 30,
      volume: -3,
    }),
    patternValues: [1, 0, 0, 1, 1, 0, 1, 0],
    patternName: "up",
    interval: "16n",
    effectChain: [new Filter(2000)],
    scale: this.scale,
    duration: "16n",
    noteRange: [0, 10],
    on: true,
  });

  private inst4 = new Instrument(this.envelope, {
    synth: new FMSynth({
      envelope: { attack: 0.001 },
      modulation: { type: "sawtooth" },
      modulationIndex: 30,
      volume: -3,
    }),
    patternValues: [1, 0, 0, 1, 1, 0, 1, 0],
    patternName: "up",
    interval: "16n.",
    effectChain: [new Filter(2000)],
    scale: this.scale,
    duration: "16n",
    noteRange: [0, 10],
    on: true,
  });

  private noiseFilter = new AutoFilter("8m").start(0);
  private noiseEnvelope = new AmplitudeEnvelope("1m", undefined, 1);
  private noise = new Noise({ volume: -6, type: "pink" })
    .chain(this.noiseFilter, this.noiseEnvelope, this.envelope)
    .start(0);

  constructor(mainGain: Gain) {
    super(mainGain, 6);
  }

  start(time?: Time | undefined): void {
    this.noiseEnvelope.triggerAttack(time);
    super.start(time);
  }

  stop(time: Time): void {
    this.noiseEnvelope.triggerRelease(time);
    super.stop(time);
  }
}

export default Example2;
