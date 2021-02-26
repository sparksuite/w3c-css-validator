module.exports = {
  title: 'W3C CSS Validator',
  tagline: 'Modern CSS validation in JS environments using W3C’s public API',
  url: 'https://sparksuite.github.io/w3c-css-validator/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'sparksuite',
  projectName: 'w3c-css-validator',
  themeConfig: {
    navbar: {
      title: 'W3C CSS Validator',
      logo: {
        alt: 'Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'demo/',
          activeBasePath: 'demo',
          label: 'Demo',
          position: 'left',
        },
        {
          href: 'https://github.com/sparksuite/w3c-css-validator',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'GitHub',
          items: [
            {
              label: 'Repository',
              to: 'https://github.com/sparksuite/w3c-css-validator',
            },
            {
              label: 'Submit an issue',
              to: 'https://github.com/sparksuite/w3c-css-validator/issues/new',
            },
            {
              label: 'How to contribute',
              to: 'https://github.com/sparksuite/w3c-css-validator/blob/master/CONTRIBUTING.md',
            },
          ],
        },
        {
          title: 'Sparksuite',
          items: [
            {
              label: 'About us',
              href: 'https://www.sparksuite.com',
            },
            {
              label: 'Open source',
              href: 'https://github.com/sparksuite',
            },
            {
              label: 'Careers',
              href: 'https://sparksuite.careers',
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/sparksuite/w3c-css-validator/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
