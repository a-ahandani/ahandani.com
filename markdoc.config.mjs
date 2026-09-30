import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

export default defineMarkdocConfig({
  extends: [shiki({ theme: 'github-light' })],
  tags: {
    video: {
      render: component('./src/components/Video.astro'),
      selfClosing: true,
      attributes: {
        src: { type: String, required: true },
      },
    },
    embed: {
      render: component('./src/components/Embed.astro'),
      selfClosing: true,
      attributes: {
        src: { type: String, required: true },
        title: { type: String },
      },
    },
  },
});
