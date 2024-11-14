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
    <h4>Examples:</h4>
    <div>
      <p>Simple Oscillator:</p>
      <pre>
        <code data-trim data-line-numbers="1|3-5|7-9|11" class="language-ts">
          const audioContext = new AudioContext();

          const mainGainNode = audioContext.createGain();
          mainGainNode.connect(audioContext.destination);
          mainGainNode.gain.value = -6;

          const osc = audioContext.createOscillator();
          osc.connect(mainGainNode);
          osc.frequency.value = 260;

          osc.start();
        </code>
      </pre>
    </div>
  </section>
</section>
