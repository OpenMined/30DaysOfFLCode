import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client";
import type { Props } from "@theme/DocRoot/Layout/Main";

import styles from "./styles.module.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}: Props): JSX.Element {
  const sidebar = useDocsSidebar();
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  // useEffect(() => {
  //   console.log("INIT PARTICLE ENGINE");
  //   initParticlesEngine(async (engine) => {
  //     await loadSlim(engine);
  //   }).then(() => {
  //     setInit(true);
  //   });
  // }, []);

  return (
    <main
      className={clsx(
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced
      )}
    >
      <div className="absolute w-full h-full -z-10">
        {init && (
          <Particles
            className="h-full"
            options={{
              fullScreen: false,
              fpsLimit: 30,
              particles: {
                number: {
                  value: 30,
                  density: { enable: true },
                },
                color: { value: "#ccc" },
                links: {
                  enable: true,
                  distance: 200,
                  opacity: 1,
                  color: "#ccc",
                },
                shape: { type: "circle" },
                opacity: { value: 1 },
                size: { value: { min: 1.5, max: 2.3 } },
                move: {
                  enable: false,
                  speed: 0.1,
                  straight: false,
                },
                poisson: { enable: true },
              },
              interactivity: {
                events: {
                  onHover: {
                    enable: true,
                    mode: "connect",
                  },
                },
                modes: {
                  connect: {
                    distance: 500,
                    radius: 200,
                    links: {
                      opacity: 0.2,
                    },
                  },
                },
              },
              detectRetina: true,
            }}
          />
        )}
      </div>
      <div
        className={clsx(
          "container padding-top--md padding-bottom--lg",
          styles.docItemWrapper,
          hiddenSidebarContainer && styles.docItemWrapperEnhanced
        )}
      >
        {children}
      </div>
    </main>
  );
}
function loadAll(engine: Engine) {
  throw new Error("Function not implemented.");
}
