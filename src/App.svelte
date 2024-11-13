<script lang="ts">
  import Reveal from "reveal.js";
  import { onMount, tick } from "svelte";
  import Presentation from "./Presentation.svelte";

  export let app;
  export let reveal;

  onMount(async () => {
    await tick();
    console.log("finish");
    const deck = new Reveal(reveal);
    deck.initialize();
  });
</script>

<svelte:head>
  <title>{app.name}</title>
</svelte:head>

<div class="slides">
  <Presentation />
</div>
