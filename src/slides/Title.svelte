<script lang="ts">
  import { getSlideContext } from "../context/SlideContext";
  import { map } from "../utils/number";

  type Props = {
    canvasEl?: HTMLCanvasElement;
  };

  let { canvasEl }: Props = $props();

  const slideState = getSlideContext();
  const inIframe = window.self !== window.top;

  let currentSlideId = $derived.by(() => {
    return slideState.currentSlide?.id;
  });

  const animate = () => {
    if (inIframe) return;
    if (!canvasEl) return;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;
    let frame = 0;

    const animating = true;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const drawHeight = height * 0.3;
    const offsetTop = (height - drawHeight) / 2;
    const starOffset = 10;

    canvasEl.width = width;
    canvasEl.height = height;

    let stars: { x: number; y: number; startFrame: number }[] = [];

    const drawStar = (
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;

      ctx.save();

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fill();

      ctx.restore();
    };

    const drawSine = (i: number) => {
      ctx.save();
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 16;

      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const mod = Math.sin(x * 0.05 + i * 0.3) * 0.2;
        const y = map(Math.sin(x * 0.01 + i * 0.03 + mod), -1, 1, 0, drawHeight) + offsetTop;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      if (!animating) return;
      if (currentSlideId !== "title-slide-1") return;

      ctx.clearRect(0, 0, width, height);

      if (currentSlideId === "title-slide-1") drawSine(frame);

      stars = stars.filter(
        ({ startFrame }) => frame - startFrame < map(Math.random(), 0, 1, 400, 1000),
      );

      stars.forEach(({ x, y }) => {
        drawStar(x, y, 4, starOffset, 2);
      });

      const lastStar = stars[stars.length - 1];
      if (!lastStar || frame - lastStar.startFrame > map(Math.random(), 0, 1, 100, 500)) {
        const starX = map(Math.random(), 0, 1, starOffset, width - starOffset);
        const starY = map(Math.random(), 0, 1, starOffset, height - starOffset);
        stars.push({ x: starX, y: starY, startFrame: frame });
      }

      frame++;
      window.requestAnimationFrame(draw);
    };

    draw();
  };

  $effect(() => {
    animate();
  });
</script>

<section>
  <section id="title-slide-1"></section>

  <section>
    <div>
      <p>How do advertisers know what I like?</p>
      <p>How much of my online activity is tracked?</p>
      <p>How does it work?</p>
    </div>

    <aside class="notes">
      <ul>
        <li>topic: about <b>data protection</b></li>
        <li>start: with my motivation</li>
        <li>I ask myself: (questions on slide)</li>
        <li>digged into & found out: -> next slide</li>
      </ul>
    </aside>
  </section>

  <section>
    <p>More than half of all websites use trackers</p>
    <p>There is not much one can do against it</p>
    <p>Modern tracking mechanisms are really good and act almost invisible</p>

    <aside class="notes">
      <h4>1:</h4>
      <ul>
        <li>study investigated 100k of websites</li>
        <li><b>group 1</b> privacy critical: health care, banking, porn, ...</li>
        <li><b>group 2</b> less privacy critical</li>
        <li>group 1: 60% contain trackers</li>
        <li>group 2: 90% contain trackers</li>
        <li>trackers only from few companies</li>
        <li>like Google or Facebook ...</li>
      </ul>

      <h4>2:</h4>
      <ul>
        <li>avoid tracking is really difficult</li>
      </ul>

      <h4>3:</h4>
      <ul>
        <li>multiple ways to track you</li>
        <li>short intro -> next slide</li>
      </ul>
    </aside>
  </section>

  <section>
    <ul>
      <li>IP Tracking</li>
      <li>Cookies</li>
      <li>Fingerprinting</li>
      <li>Tracking pixels (web beacon)</li>
      <li>Cross-website tracking</li>
    </ul>

    <aside class="notes">
      <ul>
        <li><b>IP tracking:</b> simplest -> gives unique number and location</li>
        <li><b>Cookies:</b></li>
        <li>File: stored on a users computer</li>
        <li>Information: usually about prefercences, activities</li>
        <li>Example: online shopping</li>
        <li>shopping cart -> don't loose it</li>
        <li><b>Fingerprinting:</b></li>
        <li>Unique identifier based on browser attributes</li>
        <li>
          e.g.: operating system, screen size, language settings, IP address, installed browser
          plugins, and many more.
        </li>
        <li><b>Tracking pixels:</b> (or web beacon)</li>
        <li>small image file</li>
        <li>on pageload -> webpage or email</li>
        <li>Focus not image itself -> mostly hidden</li>
        <li>process of loading image</li>
        <li>loaded from remote server -> serverknows who loaded it</li>
        <li>Spammers use spam mails -> mail address is valid?</li>
        <li><b>Cross-website tracking:</b></li>
        <li>Answer ofquestion: "how can advertisers know what I like?"</li>
        <li>Example: visit website A (shoes)</li>
        <li>A sends back tracking cookie</li>
        <li>user to website B</li>
        <li>B knows about website A and can show shoe ads</li>
      </ul>

      <h4>My thoughts:</h4>

      <ul>
        <li>scary and concerning</li>
        <li>reason for this project</li>
        <li>already good websites that educate about this</li>
        <li>want to take another approach</li>
        <li>combine information sharing with art</li>
        <li>way: wit generative music</li>
        <li>focus: browser fingerprint</li>
        <li>because: sneaky and not easy to protect from, good infos about you</li>
        <li>use BF attributes for music</li>
        <li>will have uniqe sound for visitor</li>
        <li>make something hidden experienceable</li>
        <li>next: Title</li>
      </ul>
    </aside>
  </section>

  <section>
    <h1 class="r-fit-text">Data Protection:</h1>
    <h2 class="r-fit-text">How does your digital fingerprint sound</h2>
  </section>
</section>
