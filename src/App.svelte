<script lang="ts">
  import Reveal from "reveal.js";
  import { onMount, tick } from "svelte";
  import Presentation from "./Presentation.svelte";
  import { setSlideContext, type SlideState } from "./context/SlideContext";
  import {
    defaultPlaybackContext,
    setPlaybackContext,
    type PlaybackContext,
  } from "./context/PlaybackContext";
  import Controls from "./lib/Controls.svelte";
  import CanvasBg from "./lib/CanvasBG.svelte";

  type Props = {
    app: any;
    reveal: any;
  };

  let { app, reveal }: Props = $props();
  let canvasEL = $state<HTMLCanvasElement>();

  let deck = $state<Reveal.Api>();

  const slideState = $state<SlideState>({
    currentSlide: null,
    fragmentShown: null,
    fragmentHidden: null,
  });
  setSlideContext(slideState);

  const playbackContext = $state<PlaybackContext>(defaultPlaybackContext);
  setPlaybackContext(playbackContext);

  onMount(async () => {
    await tick();
    console.log("finish");
    deck = new Reveal(reveal);
    await deck.initialize();

    slideState.currentSlide = deck.getCurrentSlide();

    deck.on("slidechanged", (e) => {
      // @ts-ignore
      slideState.currentSlide = e.currentSlide;
    });

    deck.on("fragmentshown", (e) => {
      // @ts-ignore
      slideState.fragmentShown = e.fragment;
    });

    deck.on("fragmenthidden", (e) => {
      // @ts-ignore
      slideState.fragmentHidden = e.fragment;
    });
  });
</script>

<svelte:head>
  <title>{app.name}</title>
</svelte:head>

<div class="slides">
  <Presentation canvasEl={canvasEL} />
</div>
<Controls canvasEl={canvasEL} />
<CanvasBg bind:canvasEl={canvasEL} />
