import './index.css'
import { useState } from 'react'
import Modal from '../Modal'

function Todo(props) {
  const [showModal, setShowModal] = useState(false)

  function onChangeCompleted(e) {
    props.onChangeCompleted &&
      props.onChangeCompleted(props.id, e.target.checked)
  }
  function onDeleteTodo() {
    setShowModal(false)
    props.onDeleteTodo && props.onDeleteTodo(props.id)
  }
  function showModalHandler(e) {
    console.log(111)
    e.stopPropagation()
    setShowModal(true)
  }

  return (
    <div
      className={
        props.completed
          ? 'todo completed flex flex-justify-between'
          : 'todo flex flex-justify-between'
      }
      onClick={() => props.onChangeActive && props.onChangeActive(props.id)}
    >
      <div>
        <div className="flex">
          <input
            className="checkbox"
            type="checkbox"
            onClick={(e) => e.stopPropagation()}
            onChange={onChangeCompleted}
            checked={props.completed}
          />
          <h2 className="title">{props.title}</h2>
        </div>
        <div>{props.active && <p className="content">{props.content}</p>}</div>
      </div>
      <button className="btn btn-warning delete" onClick={showModalHandler}>
        delete
      </button>
      {showModal && (
        <Modal
          onCancel={(e) => {
            e.stopPropagation()
            setShowModal(false)
          }}
          onConfirm={(e) => {
            e.stopPropagation()
            onDeleteTodo()
          }}
          msg="Are you sure you want to delete?"
        />
      )}
    </div>
  )
}

export default Todo
