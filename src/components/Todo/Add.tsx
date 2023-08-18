import { useState, useRef, useEffect, MouseEventHandler } from 'react'
import Modal from '../Modal'

function AddTodo({
  onClose,
  addTodo,
}: {
  onClose: MouseEventHandler
  addTodo: ({
    id,
    title,
    content,
  }: {
    id: number
    title: string
    content: string
  }) => void
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errorText, setErrorText] = useState('')
  const titleInputRef = useRef(null)
  useEffect(() => {
    ;(titleInputRef.current as unknown as HTMLElement).focus()
  }, [])

  function onTitleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
    if (e.target.value !== '' && content !== '') {
      setErrorText('')
    }
  }

  function onContentInput(e: React.ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value)
    if (title !== '' && e.target.value !== '') {
      setErrorText('')
    }
  }

  function onAddTodo() {
    if (title === '') {
      return setErrorText('title is required!')
    }
    if (content === '') {
      return setErrorText('content is required!')
    }
    addTodo({
      id: Date.now(),
      title,
      content,
    })
  }

  return (
    <Modal
      onCancel={onClose}
      onConfirm={onAddTodo}
      content={
        <div>
          <div className="flex-align-center flex">
            <div className="w-20 text-lg leading-8 text-slate-500">title:</div>
            <input
              className="h-8 w-72 rounded border border-slate-300 pl-2 text-base focus:border-none focus:border-sky-600 focus:outline-none focus-visible:ring"
              type="text"
              ref={titleInputRef}
              value={title}
              onInput={onTitleInput}
              placeholder="Please enter title"
            />
          </div>
          <div className="flex-align-center mt-4 flex">
            <div className="w-20 text-lg leading-8 text-slate-500">
              content:
            </div>
            <input
              className="h-8 w-72 rounded border border-slate-300 pl-2 text-base focus:border-none focus:border-sky-600 focus:outline-none focus-visible:ring"
              type="text"
              value={content}
              onInput={onContentInput}
              placeholder="Please enter content"
            />
          </div>
          {errorText !== '' && (
            <div className="mt-4 text-red-600">error: {errorText}</div>
          )}
        </div>
      }
    />
  )
}

export default AddTodo
