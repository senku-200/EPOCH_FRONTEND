import React from "react";
import { Particles } from "react-tsparticles";
import { IOptions } from "tsparticles-engine"; // Correct interface for particle options

const ParticleBackground = () => {
  const particlesInit = async (main: any): Promise<void> => {
    console.log("Particles Initialized");
  };

  const particlesLoaded = (container: any): void => {
    console.log("Particles Loaded", container);
  };

  const options: IOptions = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
          area: 0,
          factor: 0,
          height: 0,
          width: 0
        },
        limit: 0,
        max: 0
      },
      size: {
        value: 3,
        anim: undefined,
        animation: undefined,
        random: false
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        angle: 0,
        attract: undefined,
        center: undefined,
        collisions: false,
        decay: 0,
        distance: 0,
        drift: 0,
        gravity: undefined,
        noise: undefined,
        outMode: "none",
        outModes: "none",
        path: undefined,
        size: false,
        spin: undefined,
        trail: undefined,
        vibrate: false,
        warp: false
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
          parallax: undefined
        },
      },
    },
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
    />
  );
};

export default ParticleBackground;
