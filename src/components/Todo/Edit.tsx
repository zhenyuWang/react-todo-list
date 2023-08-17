import { useMemo, useState, useRef, useEffect } from 'react'
import Modal from '../Modal'
import { stopPropagation } from '../../utils'

function EditTodo({
  id,
  title,
  content,
  onEditTodo,
  setShowEditModalState,
}: {
  id: number
  title: string
  content: string
  onEditTodo: (id: number, title: string, content: string) => void
  setShowEditModalState: (value: boolean) => void
}) {
  const [_editTitle, setEditTitle] = useState(title)
  let editTitle = useMemo(() => _editTitle, [_editTitle])
  const [_editContent, setEditContent] = useState(content)
  let editContent = useMemo(() => _editContent, [_editContent])
  const [errorText, setErrorText] = useState('')
  const titleInputRef = useRef(null)
  useEffect(() => {
    ;(titleInputRef.current as unknown as HTMLElement).focus()
  }, [])

  function onTitleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEditTitle(e.target.value)
    editTitle = e.target.value
    if (e.target.value !== '' && editContent !== '') {
      setErrorText('')
    }
  }

  function onContentInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEditContent(e.target.value)
    editContent = e.target.value
    if (editTitle !== '' && e.target.value !== '') {
      setErrorText('')
    }
  }

  function editTodo(e: React.MouseEvent<Element, MouseEvent>) {
    stopPropagation(e)
    if (editTitle === '') {
      return setErrorText('title is required!')
    }
    if (editContent === '') {
      return setErrorText('content is required!')
    }
    setShowEditModalState(false)
    ;(title !== editTitle || content !== editContent) &&
      onEditTodo(id, editTitle, editContent)
  }

  return (
    <Modal
      onCancel={(e) => (stopPropagation(e), setShowEditModalState(false))}
      onConfirm={editTodo}
      content={
        <div>
          <div className="flex-align-center flex">
            <div className="w-20 text-lg leading-8 text-slate-500">title:</div>
            <input
              className="h-8 w-72 rounded border border-slate-300 pl-2 text-base focus:border-none focus:border-sky-600 focus:outline-none focus-visible:ring"
              type="text"
              ref={titleInputRef}
              value={_editTitle}
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
              value={_editContent}
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
