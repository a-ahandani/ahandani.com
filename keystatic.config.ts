import { config, collection, singleton, fields } from '@keystatic/core';
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

const storageMode = import.meta.env.PUBLIC_KEYSTATIC_STORAGE ?? (import.meta.env.PROD ? 'github' : 'local');

export default config({
  storage:
    storageMode === 'github'
      ? { kind: 'github', repo: 'a-ahandani/ahandani.com' }
      : { kind: 'local' },
  ui: {
    brand: { name: 'Ahmad Ahandani' },
    navigation: {
      Site: ['home', 'work', 'profile'],
      Content: ['posts', 'pages'],
    },
  },
  singletons: {
    home: singleton({
      label: 'Home letter',
      path: 'src/content/site/home',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        greeting: fields.text({ label: 'Heading' }),
        content: fields.markdoc({ label: 'Letter' }),
      },
    }),
    work: singleton({
      label: 'Work page',
      path: 'src/content/site/work',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description (search previews)', multiline: true }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    profile: singleton({
      label: 'Profile',
      path: 'src/content/site/profile',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Name' }),
        role: fields.text({ label: 'Role line' }),
        intro: fields.text({ label: 'Short bio (search and social previews)', multiline: true }),
        email: fields.text({ label: 'Email' }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.url({ label: 'URL' }),
          }),
          { label: 'Links', itemLabel: (props) => props.fields.label.value },
        ),
        workplaces: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            url: fields.text({ label: 'URL (optional)' }),
            years: fields.text({ label: 'Years' }),
            description: fields.text({ label: 'What the company does' }),
          }),
          { label: 'Workplaces (Work page)', itemLabel: (props) => props.fields.name.value },
        ),
        projects: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            url: fields.text({ label: 'URL (optional)' }),
            years: fields.text({ label: 'Year' }),
            description: fields.text({ label: 'What it is' }),
          }),
          { label: 'Projects (Work page)', itemLabel: (props) => props.fields.name.value },
        ),
      },
    }),
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
