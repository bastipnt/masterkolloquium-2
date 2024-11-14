import { getContext, setContext } from "svelte";
import type TonejsWrapper from "../TonejsWrapper";

export type PlaybackContext = {
  tonejsWrapper?: TonejsWrapper;
  initialized: boolean;
  playing: boolean;
};

const playbackKey = Symbol("audioContext");

export const defaultPlaybackContext: PlaybackContext = {
  initialized: false,
  playing: false,
};

export const setPlaybackContext = (playbackContext: PlaybackContext) => {
  setContext(playbackKey, playbackContext);
};

export const getPlaybackContext = (): PlaybackContext => {
  return getContext(playbackKey) as PlaybackContext;
};
