import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import * as path from "node:path";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        "process.env": process.env,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
