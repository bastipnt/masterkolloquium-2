<script lang="ts">
  import { getPlaybackContext } from "../context/PlaybackContext";
  import { getSlideContext } from "../context/SlideContext";
  import { Sounds } from "../TonejsWrapper/types.d";

  type Props = {
    canvasEl?: HTMLCanvasElement;
  };

  let { canvasEl }: Props = $props();

  const playbackContext = getPlaybackContext();
  const slideState = getSlideContext();

  const inIframe = window.self !== window.top;

  let currentSoundId = $derived.by(() => {
    const id = slideState.currentSlide?.id as Sounds;

    if (Object.values(Sounds).includes(id)) return id;
    return undefined;
  });

  const handleInitAudioContext = async () => {
    const TonejsWrapper = (await import("../TonejsWrapper")).default;
    await TonejsWrapper.init();
    playbackContext.tonejsWrapper = new TonejsWrapper(canvasEl);
    playbackContext.initialized = true;
  };

  const handleStartStop = () => {
    if (!playbackContext.initialized) return;
    if (!currentSoundId) return;

    playbackContext.tonejsWrapper?.toggleStartStop(currentSoundId);
    playbackContext.playing = !playbackContext.playing;
  };
</script>

<div class="audio-controls">
  {#if !inIframe && currentSoundId !== undefined}
    {#if !playbackContext.initialized}
      <button onclick={handleInitAudioContext}>Init Audio Context</button>
    {:else}
      <button onclick={handleStartStop}>
        {#if playbackContext.playing}Stop{:else}Start{/if}
      </button>
    {/if}
  {/if}
</div>

<style lang="postcss">
  .audio-controls {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    z-index: 999;
  }
</style>
