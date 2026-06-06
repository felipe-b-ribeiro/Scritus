import os from "node:os";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

const localIP = getLocalIP();

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: `http://${localIP}:5000`,
        changeOrigin: true,
      },
      "/uploads": {
        target: `http://${localIP}:5000`,
        changeOrigin: true,
      },
    },
  },
});
