// components/AiPanel.tsx
'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Editor } from '@tiptap/react'
import Icon from '@/ui/components/Icon/Icon.component'
import { Button } from '@/shared/ui/Button/Button.component'

type Msg = { role: 'user' | 'assistant'; content: string }

interface AiPanelProps {
  editor: Editor | null
  onClose?: () => void
}

export function AiPanel({ editor, onClose }: AiPanelProps) {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function getSelectedText(): string {
    if (!editor) return ''
    const { from, to } = editor.state.selection
    return editor.state.doc.textBetween(from, to, ' ')
  }

  function getDocumentText(): string {
    return editor?.getText() ?? ''
  }

  async function streamRequest(
    userMessages: Msg[],
    mode: 'chat' | 'rewrite' | 'continue',
    onDelta: (chunk: string) => void
  ) {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: userMessages,
        mode,
        context: { documentText: getDocumentText(), selectedText: getSelectedText() },
      }),
    })

    if (!res.body) throw new Error('Нет тела ответа')

    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      onDelta(decoder.decode(value, { stream: true }))
    }
  }

  async function handleSend(input: string) {
    if (!input.trim() || loading) return
    const userMsg: Msg = { role: 'user', content: input }
    const nextMessages = [...messages, userMsg]
    setMessages([...nextMessages, { role: 'assistant', content: '' }])
    setInput('')
    setLoading(true)

    try {
      let acc = ''
      await streamRequest(nextMessages, 'chat', chunk => {
        acc += chunk
        setMessages(prev => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: acc }
          return copy
        })
      })
    } catch {
      setMessages(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = { role: 'assistant', content: 'Произошла ошибка при обращении к ИИ.' }
        return copy
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleRewriteSelection() {
    if (!editor) return
    const { from, to } = editor.state.selection
    const selected = editor.state.doc.textBetween(from, to, ' ')
    if (!selected.trim()) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Сначала выделите текст в редакторе, который нужно переписать.' },
      ])
      return
    }

    setLoading(true)
    let acc = ''
    try {
      await streamRequest(
        [{ role: 'user', content: `Перепиши этот текст лучше:\n\n${selected}` }],
        'rewrite',
        chunk => {
          acc += chunk
        }
      )
      editor.chain().focus().deleteRange({ from, to }).insertContentAt(from, acc).run()
      setMessages(prev => [...prev, { role: 'assistant', content: `Готово, я заменил выделенный текст:\n\n${acc}` }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ошибка при переписывании.' }])
    } finally {
      setLoading(false)
    }
  }

  async function handleContinue() {
    if (!editor) return
    setLoading(true)
    let acc = ''
    const pos = editor.state.selection.to
    try {
      await streamRequest([{ role: 'user', content: `Продолжи текст:\n\n${getDocumentText()}` }], 'continue', chunk => {
        acc += chunk
      })
      editor
        .chain()
        .focus()
        .insertContentAt(pos, ' ' + acc)
        .run()
      setMessages(prev => [...prev, { role: 'assistant', content: `Добавил продолжение в документ.` }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ошибка при генерации продолжения.' }])
    } finally {
      setLoading(false)
    }
  }

  function insertLastAnswerIntoEditor() {
    const last = [...messages].reverse().find(m => m.role === 'assistant')
    if (!last || !editor) return
    editor.chain().focus().insertContent(last.content).run()
  }

  return (
    <div className="flex flex-col h-full w-full max-w-sm bg-surface shadow-sm border-l border-outline-variant">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Icon icon="auto_awesome" size={18} className="text-indigo-400" />
          <h2 className="font-semibold text-neutral-100 text-sm">AI-помощник</h2>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-300">
            <Icon icon="close" size={18} />
          </button>
        )}
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 px-4 py-3 border-b border-neutral-800">
        <button
          onClick={handleRewriteSelection}
          disabled={loading}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 disabled:opacity-50 transition"
        >
          <Icon icon="auto_fix_high" size={14} /> Переписать выделение
        </button>
        <button
          onClick={handleContinue}
          disabled={loading}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 disabled:opacity-50 transition"
        >
          <Icon icon="arrow_forward" size={14} /> Продолжить текст
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-xs text-neutral-500 leading-relaxed">
            Спросите что-нибудь про документ, попросите написать абзац, изменить тон, найти ошибки — или используйте
            быстрые кнопки выше для работы с выделенным текстом.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm rounded-lg px-3 py-2 whitespace-pre-wrap leading-relaxed ${
              m.role === 'user' ? 'bg-indigo-600 text-white ml-8' : 'bg-neutral-800 text-neutral-100 mr-4'
            }`}
          >
            {m.content || (loading && i === messages.length - 1 ? '…' : '')}
          </div>
        ))}
      </div>

      {/* Insert last answer button */}
      {messages.some(m => m.role === 'assistant' && m.content) && (
        <div className="px-4 pb-2">
          <Button appearance="text" onClick={insertLastAnswerIntoEditor} icon="subdirectory_arrow_right">
            Вставить последний ответ в редактор
          </Button>
        </div>
      )}

      {/* Input */}
      <div className="p-3.5 bg-surface-container m-3 rounded-full flex gap-2">
        <textarea
          // value={input}
          // onChange={e => setInput(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend((e.target as HTMLTextAreaElement).value)
            }
          }}
          placeholder="Спросите что-нибудь..."
          rows={1}
          className="flex-1 resize-none rounded-full text-neutral-100 placeholder:text-neutral-500 px-3 py-2.5 text-sm outline-0"
        ></textarea>
        <Button
          onClick={() => handleSend()}
          // disabled={loading || !input.trim()}
          size="sm"
          className="py-1 px-2"
          icon="send"
          loader="spinner"
          isLoading={loading}
        ></Button>
      </div>
    </div>
  )
}
