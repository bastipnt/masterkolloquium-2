import { getContext, setContext } from "svelte";

export type SlideState = {
  currentSlide: null | HTMLElement;
  fragmentShown: null | HTMLElement;
  fragmentHidden: null | HTMLElement;
};

const slideKey = Symbol("slide");

export const setSlideContext = (slide: SlideState) => {
  setContext(slideKey, slide);
};

export const getSlideContext = (): SlideState => {
  return getContext(slideKey) as SlideState;
};
