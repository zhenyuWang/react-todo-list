import { useMemo, useRef, useState } from 'react'
import Modal from '../Modal'
import { stopPropagation } from '../../utils'

function Todo({
  id,
  finished,
  title,
  content,
  active,
  onChangeActive,
  onChangeFinished,
  onEditTodo,
  onDeleteTodo,
}: {
  id: number
  finished: boolean
  title: string
  content: string
  active: boolean
  onChangeActive: (id: number) => void
  onChangeFinished: (id: number, value: boolean) => void
  onEditTodo: (id: number, title: string, content: string) => void
  onDeleteTodo: (id: number) => void
}) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [_editTitle, setEditTitle] = useState(title)
  let editTitle = useMemo(() => _editTitle, [_editTitle])
  const [_editContent, setEditContent] = useState(content)
  let editContent = useMemo(() => _editContent, [_editContent])
  const [errorText, setErrorText] = useState('')
  const inputTitleRef = useRef(null)

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

  function setEditModalState(
    e: React.MouseEvent<Element, MouseEvent>,
    value: boolean,
  ) {
    stopPropagation(e)
    setShowEditModal(value)
  }
  function editTodo(e: React.MouseEvent<Element, MouseEvent>) {
    if (editTitle === '') {
      return setErrorText('title is required!')
    }
    if (editContent === '') {
      return setErrorText('content is required!')
    }
    setEditModalState(e, false)
    ;(title !== editTitle || content !== editContent) &&
      onEditTodo(id, editTitle, editContent)
  }

  function setDeleteModalState(
    e: React.MouseEvent<Element, MouseEvent>,
    value: boolean,
  ) {
    stopPropagation(e)
    setShowDeleteModal(value)
  }
  function deleteTodo(e: React.MouseEvent<Element, MouseEvent>) {
    setDeleteModalState(e, false)
    onDeleteTodo(id)
  }

  return (
    <div
      className="mb-4 flex justify-between rounded p-4 shadow shadow-blue-500/50"
      onClick={() => onChangeActive(id)}
      data-testid="todo"
    >
      <div className="flex">
        <input
          className="checkbox mr-4 h-4 w-4 focus:border-none focus:border-sky-600 focus:outline-none focus-visible:ring"
          type="checkbox"
          onClick={stopPropagation}
          onChange={(e) => onChangeFinished(id, e.target.checked)}
          checked={finished}
        />
        <div className="-mt-2">
          <h2 className={`text-2xl ${finished ? 'line-through' : ''}`}>
            {title}
          </h2>
          {active && (
            <p className={`mx-0 mt-4 ${finished ? 'line-through' : ''}`}>
              {content}
            </p>
          )}
        </div>
      </div>
      <div>
        <button
          className="rounded bg-green-500 px-6 py-1 text-white focus:outline-none focus-visible:ring"
          onClick={(e) => {
            setEditModalState(e, true)
            setTimeout(() => {
              ;(inputTitleRef.current as unknown as HTMLElement).focus()
            }, 0)
          }}
        >
          Edit
        </button>
        <button
          className="ml-3 rounded bg-red-500 px-3 py-1 text-white focus:outline-none focus-visible:ring"
          onClick={(e) => setDeleteModalState(e, true)}
        >
          Delete
        </button>
      </div>
      {showEditModal && (
        <Modal
          onCancel={(e) => setEditModalState(e, false)}
          onConfirm={editTodo}
          content={
            <div>
              <div className="flex-align-center flex">
                <div className="w-20 text-lg leading-8 text-slate-500">
                  title:
                </div>
                <input
                  className="h-8 w-72 rounded border border-slate-300 pl-2 text-base focus:border-none focus:border-sky-600 focus:outline-none focus-visible:ring"
                  type="text"
                  ref={inputTitleRef}
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
              {errorText !== '' && (
                <div className="mt-4">error: {errorText}</div>
              )}
            </div>
          }
        />
      )}
      {showDeleteModal && (
        <Modal
          onCancel={(e) => setDeleteModalState(e, false)}
          onConfirm={deleteTodo}
          msg="Are you sure you want to delete?"
        />
      )}
    </div>
  )
}

export default Todo
