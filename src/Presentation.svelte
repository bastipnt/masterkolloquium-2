<script lang="ts">
  import Title from "./slides/Title.svelte";
  import BrowserFingerprint from "./slides/BrowserFingerprint.svelte";
  import BrowserMusic from "./slides/BrowserMusic.svelte";
  import Conclusion from "./slides/Outlook.svelte";

  type Props = {
    canvasEl?: HTMLCanvasElement;
  };

  let { canvasEl }: Props = $props();
</script>

<Title {canvasEl} />
<BrowserFingerprint />
<BrowserMusic />
<Conclusion />
