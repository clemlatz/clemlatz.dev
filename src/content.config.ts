import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projetsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    language: z.enum(['en', 'fr']),
    category: z.enum(['web', 'sons']),
    audioUrl: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  projects: projetsCollection,
  blog: blogCollection,
};
