<script lang="ts">
  import { Sounds } from "../TonejsWrapper/types.d";
</script>

<section>
  <section>
    <h4>Browser Music:</h4>
    <ul>
      <li class="fragment fade-in-then-semi-out"><b>Use:</b> Web Audio API</li>
      <li class="fragment fade-in-then-semi-out">
        Allows to create generative music in the browser
      </li>
    </ul>

    <aside class="notes">
      - available since April 2021 across mayor browsers (MDN)
    </aside>
  </section>

  <section id={Sounds.Example1}>
    <h4>Example #1:</h4>
    <div>
      <p>Simple Oscillator:</p>
      <pre class="fragment">
        <code
          data-trim
          data-line-numbers="1|3-5|7-9|11|1-11"
          class="language-ts">
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
    </div>
  </section>

  <section id={Sounds.Example2}>
    <h4>Example #2:</h4>
    <div>
      <p>Synth with a pattern (tone.js):</p>
      <pre class="fragment">
        <code
          data-trim
          data-line-numbers="1|3-5|7-8|10-11|1-11"
          class="language-ts">
          {`
            const synth = new PolySynth();

            const seq = new Sequence((time, note) => {
              synth.triggerAttackRelease(note, 0.1, time);
            }, ["C4", ["E3", "D5", "E4"], "G3", ["A4", "G5"]]);

            pingPong = new PingPongDelay("16n", 0.2).toDestination();
            tremolo = new Tremolo(9, 0.75).start();

            synth.chain(tremolo, pingPong);
            seq.start(0);
          `}
        </code>
      </pre>
    </div>
  </section>
</section>
