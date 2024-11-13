<script lang="ts">
  export let trim: string | undefined = undefined;
  export let noescape: string | undefined = undefined;
  export let lineNumbers: boolean | undefined = undefined;
  export let lineStartFrom: string | undefined = undefined;
</script>

<code
  data-trim={trim}
  data-noescape={noescape}
  data-line-numbers={lineNumbers}
  data-ln-start-from={lineStartFrom}
>
  <slot />
</code>
