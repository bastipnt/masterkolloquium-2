<script lang="ts">
  import { Sounds } from "../TonejsWrapper/types.d";
</script>

<section>
  <section>
    <h1>Web Audio API</h1>

    <aside class="notes">
      <ul>
        <li>my project -> people navigate to website</li>
        <li>how to play sound?</li>
        <li>how to include BF?</li>
        <li>different options</li>
        <li>on a server</li>
        <li>downside -> have server send BF there</li>
        <li>on the client computer</li>
        <li>no server needed</li>
        <li>new API</li>
        <li>Web Audio API (support: April 2021)</li>
        <li>allows creation of music in browser</li>
        <li>like digital audio workstation</li>
        <li>but with code</li>
        <li>demo on next slides</li>
      </ul>
    </aside>
  </section>

  <section id={Sounds.Example1}>
    <h1 class="r-fit-text">Example 1: Simple Oscillator</h1>
    <pre>
      <code data-trim data-line-numbers="1|3-5|7-9|11" class="language-ts">
        {`
          const audioContext = new AudioContext();

          const mainGainNode = audioContext.createGain();
          mainGainNode.connect(audioContext.destination);
          mainGainNode.gain.value = -6;

          const osc = audioContext.createOscillator();
          osc.connect(mainGainNode);
          osc.frequency.value = 260;

          osc.start();
        `}
      </code>
    </pre>

    <aside class="notes">
      <ul>
        <li>simple oscillator</li>
        <li>-> it can be more easy by using the library tone.js</li>
        <li>-> provides predefined instruments and effects</li>
        <li>-> also makes scheduling more easy</li>
      </ul>
    </aside>
  </section>

  <section id={Sounds.Example2}>
    <h1 class="r-fit-text">Example 2: Use of tone.js</h1>
    <pre>
      <code data-trim data-line-numbers="1|3-5|7|9-10" class="language-ts">
        {`
          const synth = new FMSynth();

          const pattern = new Pattern((time, note) => {
            synth.triggerAttackRelease(note, 0.1, time);
          }, ["C4", "D5", "G3", "A4"]);

          const reverb = new Reverb().toDestination();

          synth.connect(reverb);
          pattern.start();
        `}
      </code>
    </pre>
  </section>

  <!-- <section id={Sounds.Example3}>
    <h4>Example #3:</h4>
    <pre class="fragment">
      <code data-trim data-line-numbers="1-5|7-10|12-15|17-20" class="language-ts">
        {`
          const grain = new GrainPlayer("/coffee-sound.mp3", ...)
            .toDestination();
          const loop = new Loop(() => {
            grain.set({ playbackRate: Math.random() + 0.5 });
          }, "4n");

          const bell = new MetalSynth(...).toDestination();
          const bellSequence = new Sequence((time, note) => {
            bell.traiggerAttack(note, time);
          }, [...], "4n");

          const drum = new MembraneSynth(...).toDestination();
          const drumSequence = new Sequence((time, note) => {
            drum.triggerAttack(note, time);
          }, ["G3", "C4", "C4", "C4"], "4n");

          loop.start();
          grain.start();
          bellSequence.start();
          drumSequence.start();
        `}
      </code>
    </pre>
  </section> -->
</section>

<!-- <section data-background-iframe="https://tonejs.github.io/examples/"></section> -->
