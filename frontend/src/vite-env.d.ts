/// <reference types="vite/client" />
declare module "react-audio-visualize"

declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}