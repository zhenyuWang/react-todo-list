import { useMemo, useRef, useState } from 'react'
import Modal from '../Modal'
import { stopPropagation } from '../../utils'
import indexClasses from './index.module.scss'
import addClasses from './add.module.scss'

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
    if (e.target.value && editContent) {
      setErrorText('')
    }
  }

  function onContentInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEditContent(e.target.value)
    editContent = e.target.value
    if (editTitle && e.target.value) {
      setErrorText('')
    }
  }

  function setEditModalState(
    e: React.MouseEvent<Element, MouseEvent>,
    value: boolean
  ) {
    stopPropagation(e)
    setShowEditModal(value)
  }
  function editTodo(e: React.MouseEvent<Element, MouseEvent>) {
    if (!editTitle) {
      return setErrorText('title is required!')
    }
    if (!editContent) {
      return setErrorText('content is required!')
    }
    setEditModalState(e, false)
    ;(title !== editTitle || content !== editContent) &&
      onEditTodo(id, editTitle, editContent)
  }

  function setDeleteModalState(
    e: React.MouseEvent<Element, MouseEvent>,
    value: boolean
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
      className={
        finished
          ? `${indexClasses.todo} ${indexClasses.finished} flex flex-justify-between flex-align-start`
          : `${indexClasses.todo} flex flex-justify-between flex-align-start`
      }
      onClick={() => onChangeActive(id)}
      data-testid="todo"
    >
      <div className="flex flex-align-start">
        <input
          className={`${indexClasses.checkbox} m-t-10`}
          type="checkbox"
          onClick={stopPropagation}
          onChange={(e) => onChangeFinished(id, e.target.checked)}
          checked={finished}
        />
        <div>
          <h2 className={indexClasses.title}>{title}</h2>
          <div>
            {active && <p className={indexClasses.content}>{content}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-align-center btn-box">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            setEditModalState(e, true)
            setTimeout(() => {
              ;(inputTitleRef.current! as HTMLElement).focus()
            }, 0)
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-warning m-l-10"
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
            <div className={addClasses['add-todo-content']}>
              <div className="flex flex-align-center">
                <div className={`${addClasses.label} font-size-20`}>title:</div>
                <input
                  className="font-size-18"
                  type="text"
                  ref={inputTitleRef}
                  value={_editTitle}
                  onInput={onTitleInput}
                  placeholder="Please enter title"
                />
              </div>
              <div className="flex flex-align-center m-t-10">
                <div className={`${addClasses.label} font-size-20`}>
                  content:
                </div>
                <input
                  className="font-size-18"
                  type="text"
                  value={_editContent}
                  onInput={onContentInput}
                  placeholder="Please enter content"
                />
              </div>
              {errorText && (
                <div className={`m-t-10 ${addClasses['error-text']}`}>
                  error: {errorText}
                </div>
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
