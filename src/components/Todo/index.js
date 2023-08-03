import './index.scss'
import { useState } from 'react'
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
  onDeleteTodo,
}) {
  const [showModal, setShowModal] = useState(false)
  function setModalState(e, value) {
    stopPropagation(e)
    setShowModal(value)
  }
  function deleteTodo(e) {
    setModalState(e, false)
    onDeleteTodo(id)
  }

  return (
    <div
      className={
        finished
          ? 'todo finished flex flex-justify-between'
          : 'todo flex flex-justify-between'
      }
      onClick={() => onChangeActive(id)}
    >
      <div>
        <div className="flex">
          <input
            className="checkbox"
            type="checkbox"
            onClick={stopPropagation}
            onChange={(e) => onChangeFinished(id, e.target.checked)}
            checked={finished}
          />
          <h2 className="title">{title}</h2>
        </div>
        <div>{active && <p className="content">{content}</p>}</div>
      </div>
      <button
        className="btn btn-warning delete"
        onClick={(e) => setModalState(e, true)}
      >
        delete
      </button>
      {showModal && (
        <Modal
          onCancel={(e) => setModalState(e, false)}
          onConfirm={deleteTodo}
          msg="Are you sure you want to delete?"
        />
      )}
    </div>
  )
}

export default Todo
