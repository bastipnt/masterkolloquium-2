// import Markdown from "reveal.js/plugin/markdown/markdown";
// import MathReveal from "reveal.js/plugin/math/math";
import Highlight from "reveal.js/plugin/highlight/highlight";
import RevealNotes from "reveal.js/plugin/notes/notes";

// Import theme
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";

// Import CSS for plugins
// import "reveal.js/plugin/highlight/monokai.css";
import "./assets/dracula.css";

export default {
  // App Config
  app: {
    name: "Masterkolloquium 2",
  },
  // Reveal Config
  reveal: {
    plugins: [Highlight, RevealNotes],
    hash: true,
    controlsTutorial: false,
    center: true,
    navigationMode: "linear",
    controls: false,
    progress: false,
    disableLayout: false,
  } as Reveal.Options,
};
