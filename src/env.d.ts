/// <reference path="../.astro/types.d.ts" /

export {};

declare global {
    interface Window {
        umami: {
            track: (eventName: string, eventData?: Record<string, any>) => void;
        }; // Replace `any` with a more specific type if known
    }
}
