import { AmplitudeEnvelope, getTransport, now as timeNow, start, Channel } from "tone";
import BaseSound from "./BaseSound";
import OSCExample1 from "./OSCExample1";
import { Sounds } from "./types.d";
import Example2 from "./Example2";
import Example3 from "./Example3";
import SignalVisualisation from "./SignalVisualisation";

class TonejsWrapper {
  static initialized = false;

  private sounds = new Map<Sounds, BaseSound>();
  private mainADSR = new AmplitudeEnvelope({
    attack: 0.2,
    release: 0.8,
  }).toDestination();

  private channel1 = new Channel();
  private channel2 = new Channel();
  private channel3 = new Channel();

  private canvasEl?: HTMLCanvasElement;
  private visualisation?: SignalVisualisation;

  playing = false;

  constructor(canvasEl?: HTMLCanvasElement) {
    this.sounds.set(Sounds.Example1, new OSCExample1(this.channel1));
    this.sounds.set(Sounds.Example2, new Example2(this.channel2));
    this.sounds.set(Sounds.Example3, new Example3(this.channel3));

    this.canvasEl = canvasEl;
    if (this.canvasEl) {
      this.visualisation = new SignalVisualisation(this.canvasEl);
      this.mainADSR.connect(this.visualisation.analyser, 0, 0);
    }
  }

  toggleStartStop(sound?: Sounds) {
    if (this.playing) {
      this.stop();
    } else {
      if (sound) this.start(sound);
      else this.startAll();
    }
  }

  start(soundKey: Sounds) {
    const sound = this.sounds.get(soundKey);
    if (!sound) return;

    this.sounds.forEach((s) => {
      if (s !== sound) s.channel.disconnect();
    });

    const now = timeNow();

    getTransport().start(now);
    sound.start(now);
    sound.channel.connect(this.mainADSR);

    this.mainADSR.triggerAttack();
    this.playing = true;

    this.visualisation?.loop();
  }

  startAll() {
    this.playing = true;
  }

  stop() {
    this.mainADSR.triggerRelease();

    this.sounds.forEach((sound) => {
      sound.stop("+1");
    });
    getTransport().stop("+2");

    this.playing = false;
  }

  static async init() {
    await start();
    TonejsWrapper.initialized = true;
    console.log("Audio context initialized");
  }
}

export default TonejsWrapper;
