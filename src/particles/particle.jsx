import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState, useMemo } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: false, zIndex: -1 }, // Keeps particles inside section
    background: { color: { value: "#F8FAFC" } }, // Light background
    fpsLimit: 120, // Performance optimization
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" }, // Grab effect on hover
        onClick: { enable: true, mode: "push" }, // Adds more particles on click
      },
      modes: {
        grab: { distance: 120, links: { opacity: 0.5 } },
        push: { quantity: 1 }, // Adds 5 particles per click
        repulse: { distance: 200 },
      },
    },
    particles: {
      color: { value: "#1277ee" }, // Blue particles
      links: {
        color: "#4A90E2",
        distance: 120,
        enable: true,
        opacity: 0.3,
        width: 1.1,
      },
      move: {
        enable: true,
        speed: 1.5,
        outModes: { default: "out" },
      },
      number: { value: 150, density: { enable: true, area: 1000 } }, 
      opacity: { value: 0.7 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), []);

  return <Particles id="tsparticles" className="h-full" key="particles-background" options={options} />;
};

export default ParticlesBackground;
