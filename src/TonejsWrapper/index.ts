import { Channel, getDestination, getTransport, start } from "tone";
import type BaseSound from "./BaseSound";
import OSCExample1 from "./OSCExample1";
import { Sounds } from "./types.d";
import Example2 from "./Example2";
import Example3 from "./Example3";

class TonejsWrapper {
  static initialized = false;

  private channel = new Channel(-6);
  private sounds = new Map<Sounds, BaseSound>();
  playing = false;

  constructor() {
    this.channel.connect(getDestination());
    this.sounds.set(Sounds.Example1, new OSCExample1(this.channel));
    this.sounds.set(Sounds.Example2, new Example2(this.channel));
    this.sounds.set(Sounds.Example3, new Example3());
  }

  toggleStartStop(sound?: Sounds) {
    if (this.playing) {
      this.stop();
    } else {
      if (sound) this.start(sound);
      else this.startAll();
    }
  }

  start(sound?: Sounds) {
    getTransport().start();

    if (sound) {
      this.sounds.get(sound)?.start();
    } else {
      this.sounds.forEach((sound) => sound.start());
    }

    this.playing = true;
  }

  startAll() {
    this.playing = true;
  }

  stop() {
    getTransport().stop();
    this.sounds.forEach((sound) => sound.stop());
    this.playing = false;
  }

  static async init() {
    await start();
    TonejsWrapper.initialized = true;
    console.log("Audio context initialized");
  }
}

export default TonejsWrapper;
