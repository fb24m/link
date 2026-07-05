import { describe, it, expect } from 'vitest'
import { PostSchema, MarkSchema, DocNodeSchema } from './Post'

describe('PostSchema', () => {
  it('validates an empty document with a paragraph that has no content', () => {
    const doc = { type: 'doc', content: [{ type: 'paragraph' }] }
    expect(() => PostSchema.parse(doc)).not.toThrow()
  })

  it('validates a paragraph with text and bold/italic marks', () => {
    const doc = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'plain text' },
            { type: 'text', text: 'bold italic', marks: [{ type: 'bold' }, { type: 'italic' }] },
          ],
        },
      ],
    }
    expect(() => PostSchema.parse(doc)).not.toThrow()
  })

  it('throws for an unknown mark type', () => {
    const doc = {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'code', marks: [{ type: 'code' }] }] }],
    }
    expect(() => PostSchema.parse(doc)).toThrow()
  })

  it("throws if root type is not 'doc'", () => {
    const doc = {
      type: 'document', // should be "doc"
      content: [],
    }
    expect(() => PostSchema.parse(doc)).toThrow()
  })

  // 5. Missing required content field at root
  it('throws if root is missing the content field', () => {
    const doc = { type: 'doc' }
    expect(() => PostSchema.parse(doc)).toThrow()
  })

  // 6. Deep nesting (recursion via z.lazy works)
  it('validates deeply nested lists (bulletList > listItem > bulletList ...)', () => {
    const doc = {
      type: 'doc',
      content: [
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'bulletList',
                  content: [
                    {
                      type: 'listItem',
                      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'deep text' }] }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }
    expect(() => PostSchema.parse(doc)).not.toThrow()
  })

  // 7. Full example document (vacuum cleaner story)
  it('validates the full example document', () => {
    const doc = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Plain text. ' },
            { type: 'text', marks: [{ type: 'italic' }], text: 'crunch' },
            { type: 'text', text: '. The end.' },
          ],
        },
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    { type: 'text', marks: [{ type: 'bold' }], text: 'Sock.' },
                    { type: 'text', text: ' One.' },
                  ],
                },
              ],
            },
          ],
        },
        { type: 'paragraph' },
      ],
    }
    expect(() => PostSchema.parse(doc)).not.toThrow()
  })

  // 8. text is not a string — error
  it('throws if text is not a string', () => {
    const node = { type: 'text', text: 12345 }
    expect(() => DocNodeSchema.parse(node)).toThrow()
  })

  // 9. marks is an object instead of an array
  it('throws if marks is passed as an object instead of an array', () => {
    const node = {
      type: 'text',
      text: 'text',
      marks: { type: 'bold' }, // should be [{ type: "bold" }]
    }
    expect(() => DocNodeSchema.parse(node)).toThrow()
  })

  // 10. MarkSchema validation for all 4 allowed types, and rejection of others
  it('MarkSchema accepts all 4 allowed mark types and rejects everything else', () => {
    const validTypes = ['bold', 'italic', 'strike', 'underline']
    for (const type of validTypes) {
      expect(() => MarkSchema.parse({ type })).not.toThrow()
    }

    const invalidTypes = ['code', 'link', 'highlight', 'subscript']
    for (const type of invalidTypes) {
      expect(() => MarkSchema.parse({ type })).toThrow()
    }
  })
})
