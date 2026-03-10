import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  guideSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'guide/what-is-rmdp',
        'guide/getting-started',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'guide/architecture',
        'guide/selection-modes',
        'guide/controlled-uncontrolled',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'guide/styling-system',
        'guide/localization',
        'guide/custom-hooks',
        'guide/performance',
        'guide/accessibility',
      ],
    },
  ],
  componentsSidebar: [
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/overview',
        'components/provider',
        'components/calendar',
        'components/header',
        'components/button',
        'components/label',
      ],
    },
  ],
  examplesSidebar: [
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/basic',
      ],
    },
  ],
};

export default sidebars;
