import { z } from 'zod'

// Марка (bold, italic, code и т.д.)
export const MarkSchema = z.object({ type: z.enum(['bold', 'italic', 'strike', 'underline']) })

// Базовая форма узла без content — доопределяем content ниже через lazy
type DocNode = {
  type: string
  attrs?: Record<string, unknown>
  text?: string
  marks?: z.infer<typeof MarkSchema>[]
  content?: DocNode[]
}

export const DocNodeSchema: z.ZodType<DocNode> = z.lazy(() =>
  z.object({
    type: z.string(),
    attrs: z.record(z.string(), z.any()).optional(),
    text: z.string().optional(),
    marks: z.array(MarkSchema).optional(),
    content: z.array(DocNodeSchema).optional(),
  })
)

// Корневой документ
export const PostSchema = z.object({ type: z.literal('doc'), content: z.array(DocNodeSchema) })
