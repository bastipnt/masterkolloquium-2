import { Channel, getDestination, start } from "tone";
import type BaseSound from "./BaseSound";
import OSCExample1 from "./OSCExample1";
import { Sounds } from "./types.d";

class TonejsWrapper {
  static initialized = false;

  private channel = new Channel(-6);
  private sounds = new Map<Sounds, BaseSound>();
  playing = false;

  constructor() {
    this.channel.connect(getDestination());
    this.sounds.set(Sounds.Example1, new OSCExample1(this.channel));
  }

  toggleStartStop(sound?: Sounds) {
    if (this.playing) {
      this.stop();
    } else {
      if (sound) this.start(sound);
      else this.startAll();
    }
  }

  start(sound: Sounds) {
    const toBePlayed = this.sounds.get(sound);
    if (!toBePlayed) return;

    toBePlayed.start();
    this.playing = true;
  }

  startAll() {
    this.sounds.forEach((sound) => sound.start());
    this.playing = true;
  }

  stop() {
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
