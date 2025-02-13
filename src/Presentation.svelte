<script lang="ts">
  import Title from "./slides/Title.svelte";
  import Conclusion from "./slides/Outlook.svelte";
  import Mitigation from "./slides/Mitigation.svelte";
  import Survey from "./slides/Survey.svelte";
  import Project from "./slides/Project.svelte";

  type Props = {
    canvasEl?: HTMLCanvasElement;
  };

  let { canvasEl }: Props = $props();
</script>

<Title {canvasEl} />
<Mitigation />
<Survey />
<Project />
<Conclusion />
