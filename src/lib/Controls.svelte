<script lang="ts">
  import { getPlaybackContext } from "../context/PlaybackContext";
  import { getSlideContext } from "../context/SlideContext";
  import { Sounds } from "../TonejsWrapper/types.d";

  const playbackContext = getPlaybackContext();
  const slideState = getSlideContext();

  const handleInitAudioContext = async () => {
    const TonejsWrapper = (await import("../TonejsWrapper")).default;
    await TonejsWrapper.init();
    playbackContext.tonejsWrapper = new TonejsWrapper();
    playbackContext.initialized = true;
  };

  const handleStartStop = () => {
    if (!playbackContext.initialized) return;
    const currentId = slideState.currentSlide?.id as Sounds;
    if (!currentId) return;

    if (Object.values(Sounds).includes(currentId)) {
      playbackContext.tonejsWrapper?.toggleStartStop(currentId);
      playbackContext.playing = !playbackContext.playing;
    } else {
      playbackContext.tonejsWrapper?.toggleStartStop();
      playbackContext.playing = !playbackContext.playing;
    }
  };
</script>

<div class="audio-controls">
  {#if !playbackContext.initialized}
    <button onclick={handleInitAudioContext}>Init Audio Context</button>
  {:else}
    <button onclick={handleStartStop}>
      {#if playbackContext.playing}Stop{:else}Start{/if}
    </button>
  {/if}
</div>

<style>
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
