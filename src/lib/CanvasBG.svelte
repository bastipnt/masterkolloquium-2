<script lang="ts">
  type Props = {
    canvasEl?: HTMLCanvasElement;
  };

  let { canvasEl = $bindable() }: Props = $props();
</script>

<canvas bind:this={canvasEl}></canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
</style>
