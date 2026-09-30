import { config, collection, fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

const images = {
  directory: 'public/images/posts',
  publicPath: '/images/posts/',
};

const components = {
  video: block({
    label: 'Video',
    schema: {
      src: fields.text({ label: 'Video path or URL' }),
    },
  }),
  embed: block({
    label: 'Embed',
    schema: {
      src: fields.url({ label: 'Embed URL' }),
      title: fields.text({ label: 'Title' }),
    },
  }),
};

export default config({
  storage: import.meta.env.PROD
    ? { kind: 'github', repo: 'a-ahandani/ahandani.com' }
    : { kind: 'local' },
  ui: {
    brand: { name: 'AHANDANI.' },
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        categories: fields.multiselect({
          label: 'Categories',
          options: [
            { label: 'General', value: 'General' },
            { label: 'Projects', value: 'Projects' },
            { label: 'Tutorials', value: 'Tutorials' },
          ],
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        cover: fields.image({ label: 'Cover image', ...images }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({
          label: 'Content',
          options: { image: images },
          components,
        }),
      },
    }),
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({
          label: 'Content',
          options: { image: images },
          components,
        }),
      },
    }),
  },
});
