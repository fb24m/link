import { Toolbar } from '@/shared/ui/Toolbar/Toolbar'
import { ToolbarItem } from '@/shared/ui/ToolbarItem/ToolbarItem'
import { Button } from '@/shared/ui/Button/Button.component'
import { Editor } from '@tiptap/core'
import { useEffect, useState } from 'react'

export interface FormatToolbarProps {
  editor: Editor | null
  submit: () => void
}

export const useEditorActive = (editor: Editor, name: string) => {
  const [isActive, setIsActive] = useState(() => editor?.isActive(name))

  useEffect(() => {
    if (!editor) return

    const handler = () => setIsActive(editor.isActive(name))

    editor.on('transaction', handler)

    return () => {
      editor.off('transaction', handler)
    }
  }, [editor, name])

  return isActive
}

export const FormatToolbar = ({ editor, submit }: FormatToolbarProps) => {
  if (!editor) return <></>

  const isBoldActive = useEditorActive(editor, 'bold')
  const isItalicActive = useEditorActive(editor, 'italic')
  const isUnderlineActive = useEditorActive(editor, 'underline')
  const isStrikeActive = useEditorActive(editor, 'strike')
  const isULActive = useEditorActive(editor, 'bulletList')
  const isOLActive = useEditorActive(editor, 'orderedList')

  return (
    <Toolbar
      color="vibrant"
      variant="floating"
      className="mb-12 z-20"
      fab={
        <Button type="button" className="p-3 rounded-xl gap-2" icon="post" onClick={submit}>
          Опубликовать
        </Button>
      }
    >
      <ToolbarItem icon="format_bold" active={isBoldActive} onClick={() => editor.chain().focus().toggleBold().run()} />

      <ToolbarItem
        icon="format_italic"
        active={isItalicActive}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />

      <ToolbarItem
        icon="format_underlined"
        active={isUnderlineActive}
        onClick={editor.chain().focus().toggleUnderline().run}
      />

      <ToolbarItem icon="strikethrough_s" active={isStrikeActive} onClick={editor.chain().focus().toggleStrike().run} />

      <ToolbarItem
        icon="format_list_bulleted"
        active={isULActive}
        onClick={editor.chain().focus().toggleBulletList().run}
      />

      <ToolbarItem
        icon="format_list_numbered"
        active={isOLActive}
        onClick={editor.chain().focus().toggleOrderedList().run}
      />
    </Toolbar>
  )
}
