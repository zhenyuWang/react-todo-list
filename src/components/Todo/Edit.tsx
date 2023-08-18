import { useState, useRef, useEffect } from 'react'
import Modal from '../Modal'
import { stopPropagation } from '../../utils'
import { TypeTodo } from '../../App'

function EditTodo({
  currentEditTodo,
  editTodo,
  setShowEditModalState,
}: {
  currentEditTodo: TypeTodo
  editTodo: (id: number, title: string, content: string) => void
  setShowEditModalState: (value: boolean) => void
}) {
  const { id, title, content } = currentEditTodo
  const [editTitle, setEditTitle] = useState(title)
  const [editContent, setEditContent] = useState(content)
  const [errorText, setErrorText] = useState('')
  const titleInputRef = useRef(null)
  useEffect(() => {
    ;(titleInputRef.current as unknown as HTMLElement).focus()
  }, [])

  function onTitleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEditTitle(e.target.value)
    if (e.target.value !== '' && editContent !== '') {
      setErrorText('')
    }
  }

  function onContentInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEditContent(e.target.value)
    if (editTitle !== '' && e.target.value !== '') {
      setErrorText('')
    }
  }

  function onEditTodo(e: React.MouseEvent<Element, MouseEvent>) {
    stopPropagation(e)
    if (editTitle === '') {
      return setErrorText('title is required!')
    }
    if (editContent === '') {
      return setErrorText('content is required!')
    }
    setShowEditModalState(false)
    ;(title !== editTitle || content !== editContent) &&
      editTodo(id, editTitle, editContent)
  }

  return (
    <Modal
      onCancel={(e) => (stopPropagation(e), setShowEditModalState(false))}
      onConfirm={onEditTodo}
      content={
        <div>
          <div className="flex-align-center flex">
            <div className="w-20 text-lg leading-8 text-slate-500">title:</div>
            <input
              className="h-8 w-72 rounded border border-slate-300 pl-2 text-base focus:border-none focus:border-sky-600 focus:outline-none focus-visible:ring"
              type="text"
              ref={titleInputRef}
              value={editTitle}
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
              value={editContent}
              onInput={onContentInput}
              placeholder="Please enter content"
            />
          </div>
          {errorText !== '' && <div className="mt-4">error: {errorText}</div>}
        </div>
      }
    />
  )
}

export default EditTodo
