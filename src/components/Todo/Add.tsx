import { useState, useRef, useEffect, MouseEventHandler } from 'react'
import Modal from '../Modal'
import './add.scss'

function AddTodo({
  onClose,
  onAddTodo,
}: {
  onClose: MouseEventHandler
  onAddTodo: ({
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
  const inputTitleRef = useRef(null)
  useEffect(() => {
    ;(inputTitleRef.current! as HTMLElement).focus()
  }, [])

  function onTitleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
    if (e.target.value && content) {
      setErrorText('')
    }
  }

  function onContentInput(e: React.ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value)
    if (title && e.target.value) {
      setErrorText('')
    }
  }

  function addTodo() {
    if (!title) {
      return setErrorText('title is required!')
    }
    if (!content) {
      return setErrorText('content is required!')
    }
    onAddTodo({
      id: Date.now(),
      title,
      content,
    })
  }

  return (
    <Modal
      onCancel={onClose}
      onConfirm={addTodo}
      content={
        <div className="add-todo-content">
          <div className="flex flex-align-center">
            <div className="label font-size-20">title:</div>
            <input
              className="font-size-18"
              type="text"
              ref={inputTitleRef}
              value={title}
              onInput={onTitleInput}
              placeholder="Please enter title"
            />
          </div>
          <div className="flex flex-align-center m-t-10">
            <div className="label font-size-20">content:</div>
            <input
              className="font-size-18"
              type="text"
              value={content}
              onInput={onContentInput}
              placeholder="Please enter content"
            />
          </div>
          {errorText && (
            <div className="m-t-10 error-text">error: {errorText}</div>
          )}
        </div>
      }
    />
  )
}

export default AddTodo
