import rss from '@astrojs/rss';
import {type CollectionEntry, getCollection} from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

// noinspection JSUnusedGlobalSymbols
export async function GET(context: { site: any; }) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort(
    (a: BlogPost, b: BlogPost) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  return rss({
    title: "Le blog de Clément Latzarus",
    description: "",
    site: context.site,
    items: sortedPosts.map((post: BlogPost) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}`,
    })),
    customData: `<language>fr-fr</language>`,
  });
}
