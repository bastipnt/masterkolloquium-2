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

  <section>
    <h4>Examples:</h4>
    <div>
      <p>Simple Oscillator:</p>
      <pre>
        <code data-trim data-noescape data-line-numbers class="language-ts">
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
