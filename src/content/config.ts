import { defineCollection, z } from 'astro:content';

const projetsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.string(),
    startYear: z.number(),
    endYear: z.number().optional(),
    url: z.string(),
    source: z.string().optional(),
    image: z.string().optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    language: z.enum(['en', 'fr']),
  }),
});

const soundCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    fileUrl: z.string(),
    coverImage: z.string().optional(),
  })
});

export const collections = {
  'projects': projetsCollection,
  'blog': blogCollection,
  'sounds': soundCollection,
};
