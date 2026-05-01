import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    question: z.string(),
    shortAnswer: z.string(),
    tag: z.string(),
    publishDate: z.date(),
    readingMinutes: z.number().int().positive(),
    status: z.enum(['draft', 'pending-validation', 'published']).default('draft'),
    lang: z.enum(['es', 'en']).default('es'),
    translationSlug: z.string().optional(),
    author: z.string().default('Dra. Graciela Ghetti'),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = { articulos };
