import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'React Modular DatePicker',
  tagline: 'A modern, composable datepicker library for React applications',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://legeannd.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/react-modular-datepicker/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'legeannd', // Usually your GitHub org/user name.
  projectName: 'react-modular-datepicker', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/legeannd/react-modular-datepicker/tree/main/rmdp-docs/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    './plugins/dayjs-resolver.js',
    './plugins/webpack-alias.js',
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '📅 React Modular DatePicker',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'guideSidebar',
          position: 'left',
          label: 'Guide',
        },
        {
          type: 'docSidebar',
          sidebarId: 'componentsSidebar',
          position: 'left',
          label: 'Components',
        },
        {
          type: 'docSidebar',
          sidebarId: 'examplesSidebar',
          position: 'left',
          label: 'Examples',
        },
        {
          href: 'https://6906e222e254283f6ff8fd07-clbcgotlkj.chromatic.com/',
          label: 'Storybook',
          position: 'right',
        },
        {
          href: 'https://github.com/legeannd/react-modular-datepicker',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/guide/getting-started',
            },
            {
              label: 'Components',
              to: '/docs/components/overview',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/@legeannd/react-modular-datepicker',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/legeannd/react-modular-datepicker',
            },
            {
              label: 'Storybook',
              href: 'https://6906e222e254283f6ff8fd07-clbcgotlkj.chromatic.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} legeannd. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
