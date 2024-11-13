import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import tailwindPlugin from "./plugins/tailwind-config.cjs";

const config: Config = {
  title: "OpenMined's 30 Days of Federated Learning.",
  tagline: "Tagline",
  favicon: "img/favicon.ico",

  url: "https://50-days-of-fl.openmined.org",
  baseUrl: "/",
  plugins: [tailwindPlugin],

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // routeBasePath: "/",
          editUrl:
            "https://github.com/OpenMined/50-Days-of-FL-Docusaurus/tree/main",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Social card
    // image: "img/docusaurus-social-card.jpg",
    navbar: {
      logo: {
        alt: "OpenMined logo",
        src: "img/logo-light.svg",
      },
      items: [
        // {
        //   type: "docSidebar",
        //   sidebarId: "tutorialSidebar",
        //   position: "left",
        //   label: "Tutorials",
        // },
        {
          href: "https://github.com/OpenMined/50DaysOfFlCode",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      style: "dark",
      // links: [
      //   {
      //     title: "Community",
      //     items: [
      //       {
      //         label: "GitHub",
      //         href: "#",
      //       },
      //       {
      //         label: "Slack",
      //         href: "#",
      //       },
      //       {
      //         label: "Twitter",
      //         href: "#",
      //       },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenMined Foundation.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      additionalLanguages: ["bash"],
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
  scripts: [
    {
      src: "scripts/clarity.js",
      async: true,
    },
  ],
};

export default config;
