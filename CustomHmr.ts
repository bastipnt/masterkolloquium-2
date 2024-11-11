import { Plugin } from "vite";

export default function CustomHmr(): Plugin {
  return {
    name: "custom-hmr",
    enforce: "post",
    // HMR
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".svelte")) {
        console.log("reloading svelte file...");

        server.ws.send({
          type: "full-reload",
          path: "*",
        });
      }
    },
  };
}
