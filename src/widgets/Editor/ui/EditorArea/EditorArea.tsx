'use client'
import { useRef, useState } from 'react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FormatToolbar } from './FormatToolbar'
import { Eval } from '@/shared/ui/Eval/Eval'
import { useForm } from 'react-hook-form'
import { AiPanel } from './AiPanel'

export const EditorArea = ({ defaultValue }: { defaultValue?: string; isGeminiReady: boolean }) => {
  const [text] = useState(defaultValue ?? '')
  const editorRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    element: editorRef.current,
    extensions: [StarterKit],
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
  })

  const { register, handleSubmit } = useForm()

  const submit = data => {}

  return (
    <>
      <div className="flex flex-col grow">
        <form className="flex flex-col h-[calc(100vh-100px)]">
          <FormatToolbar
            editor={editor}
            submit={async () => {
              editor?.getJSON()

              const response = await fetch(`${process.env.NEXT_PUBLIC_API}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: editor?.getJSON() }),
              })

              const json = await response.json()

              console.log(json)
            }}
          />

          <Eval className="grow">
            <div className="grow overflow-auto" ref={editorRef}></div>
          </Eval>
        </form>
        <div className="px-3 border-t-outline-variant border-t shrink-0 flex gap-3">
          <div className="pr-3 py-3 border-r-outline-variant border-r">Символы {text.length}</div>
          <div className="pr-3 py-3 border-r-outline-variant border-r">
            Слова: {text.length < 1 ? text.split(' ').length - 1 : text.split(' ').length}
          </div>
          <div className="pr-3 py-3 border-r-outline-variant border-r">
            Время чтения: {text.length <= 500 ? 'меньше минуты' : Math.floor(text.length / 500) + ' мин.'}
          </div>
        </div>
      </div>

      <AiPanel editor={editor} />
    </>
  )
}
