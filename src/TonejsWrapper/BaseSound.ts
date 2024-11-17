import type { Channel } from "tone";
import type { Time } from "tone/build/esm/core/type/Units";

abstract class BaseSound {
  channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  abstract start(time?: Time): void;
  abstract stop(time: Time): void;
}

export default BaseSound;
