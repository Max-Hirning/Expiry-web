import { z } from 'zod';

export const createDocumentSchema = z.object({
  name: z.string().min(1),
  tags: z.array(z.string()),
  files: z
    .array(
      z.custom<File>(val => typeof File !== 'undefined' && val instanceof File),
    )
    .min(1),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;

export const updateDocumentSchema = createDocumentSchema
  .extend({
    tagsToDelete: z.array(z.string()),
  })
  .partial();

export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
