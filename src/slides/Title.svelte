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

      // if (currentSlideId === "title-slide-1") drawSine(frame);

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

<section id="intro">
  <section id="title-slide-1">
    <h3 class="text-left">Web Tracking:</h3>
    <ul class="w-full">
      <li>Recap: Why?</li>
      <li>Use and Misuse of Web Tracking</li>
      <li>Research on Mitigation Strategies</li>
      <li>Survey of acceptance and knowledge on Web Tracking</li>
      <li>Project</li>
      <li>Outlook</li>
    </ul>
    <!-- <ul>
      <li>Data Protection: How does your digital fingerprint sound</li>
      <li>The Art of Surveillance: Mitigation of web tracking with the help of audiovisual art</li>
    </ul> -->
  </section>

  <!-- <section id="structure">
    <h3 class="text-left">Structure:</h3>
    <ul>
      <li>Recap: Web Tracking</li>
      <li>Use and Misuse of Web Tracking</li>
      <li>Research on Mitigation Strategies</li>
      <li>Survey of acceptance and knowledge on Web Tracking</li>
      <li>Project: Learning with the help of music and visuals</li>
      <li>Outlook</li>
    </ul>
  </section> -->
</section>
