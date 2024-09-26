declare module 'react-glitch-effect' {
    import React from 'react';

    interface GlitchEffectProps {
        children: React.ReactNode;
        duration?: number; // duration of the glitch effect
        iterationCount?: number; // how many times to repeat the effect
        className?: string; // optional class name
        // Add other props as needed
    }

    export const Glitch: React.FC<GlitchEffectProps>;
}
