import rss from '@astrojs/rss';
import { type CollectionEntry, getCollection } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

// noinspection JSUnusedGlobalSymbols
export async function GET(context: { site: any }) {
  const posts = (await getCollection('blog'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .filter((post) => !post.data.draft);
  return rss({
    title: 'Le blog de Clément Latzarus',
    description: '',
    site: context.site,
    items: posts.map((post: BlogPost) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
    })),
    customData: `<language>fr-fr</language>`,
  });
}
