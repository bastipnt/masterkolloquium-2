<script lang="ts">
  import { Sounds } from "../TonejsWrapper/types.d";
</script>

<section>
  <section>
    <h1>Web Audio API</h1>

    <aside class="notes">
      <ul>
        <li>now to the more fun part the music</li>
        <li>
          people who want to see my project will navigate to a website where I create their browser
          fingerprint
        </li>
        <li>to convert that into music I have a lot of different options</li>
        <li>I could send the fingerprint information to a server and create the music there</li>
        <li>
          or thanks to a API introduced to all major browsers in April 2021 I can create the music
          on the fly in the users browser without the need of an extra server -> makes things much
          more easy
        </li>
        <li>the api is called Web Audio API</li>
        <li>
          it is basically a toolkit that provides the ability to create any music you want directly
          in the browser
        </li>
        <li>I prepared two examples to show what it can do on the next two slides</li>
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
      <code data-trim data-line-numbers="1|3-5|7-8|10-11" class="language-ts">
        {`
          const synth = new PolySynth();

          const seq = new Sequence((time, note) => {
            synth.triggerAttackRelease(note, 0.1, time);
          }, ["C4", ["E3", "D5", "E4"], "G3", ["A4", "G5"]]);

          pingPong = new PingPongDelay("16n", 0.2).toDestination();
          tremolo = new Tremolo(9, 0.75).start();

          synth.chain(tremolo, pingPong);
          seq.start();
        `}
      </code>
    </pre>
  </section>

  <section id={Sounds.Example3}>
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
  </section>
</section>

<!-- <section data-background-iframe="https://tonejs.github.io/examples/"></section> -->
