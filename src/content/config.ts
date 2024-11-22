import { defineCollection, z } from 'astro:content';

const projetsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.string(),
    startYear: z.number(),
    endYear: z.number().optional(),
    url: z.string(),
  }),
});

export const collections = {
  'projects': projetsCollection,
};
