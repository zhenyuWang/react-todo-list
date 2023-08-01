import { useState, useMemo, useRef } from 'react'
import Todo from '../Todo'
import AddTodo from '../Todo/Add'
import Modal from '../Modal'

function TodoList() {
  const [todoList, setTodoList] = useState([])
  let currentTodoList = useMemo(() => [...todoList], [todoList])
  const [isShowAddTodo, setShowAddTodo] = useState(false)
  const [showDeleteCheckedModal, setDeleteCheckedModal] = useState(false)
  const [showDeleteAllModal, setDeleteAllModal] = useState(false)
  const [isAllFinished, setIsAllFinished] = useState(false)
  let currentIsAllFinished = useMemo(() => isAllFinished, [isAllFinished])
  const finishedNum = useRef(0)

  function switchAllFinished() {
    currentIsAllFinished = !currentIsAllFinished
    setIsAllFinished(currentIsAllFinished)
    finishedNum.current = currentIsAllFinished ? currentTodoList.length : 0
    for (let i = 0; i < currentTodoList.length; i++) {
      currentTodoList[i].finished = currentIsAllFinished
    }
    setTodoList([...currentTodoList])
  }

  function onChangeFinished(id, value) {
    for (let i = 0; i < currentTodoList.length; i++) {
      if (currentTodoList[i].id === id) {
        currentTodoList[i].finished = value
        finishedNum.current += value ? 1 : -1
        currentIsAllFinished = finishedNum.current === currentTodoList.length
        setIsAllFinished(currentIsAllFinished)
        break
      }
    }
    setTodoList([...currentTodoList])
  }
  function onDeleteTodo(id) {
    for (let i = 0; i < currentTodoList.length; i++) {
      if (currentTodoList[i].id === id) {
        finishedNum.current -= currentTodoList[i].finished ? 1 : 0
        currentTodoList.splice(i, 1)
        currentIsAllFinished = finishedNum.current === currentTodoList.length
        setIsAllFinished(currentIsAllFinished)
        break
      }
    }
    setTodoList([...currentTodoList])
  }

  function onAddTodo(params) {
    setShowAddTodo(false)
    currentTodoList.push({
      ...params,
      finished: false,
      active: false,
    })
    currentIsAllFinished = false
    setIsAllFinished(currentIsAllFinished)
    setTodoList([...currentTodoList])
  }

  function onChangeActive(id) {
    for (let i = 0; i < currentTodoList.length; i++) {
      if (currentTodoList[i].id === id) {
        currentTodoList[i].active = !currentTodoList[i].active
      } else {
        currentTodoList[i].active = false
      }
    }
    setTodoList([...currentTodoList])
  }

  function onDeleteChecked() {
    currentTodoList = currentTodoList.filter((todo) => !todo.finished)
    setTodoList([...currentTodoList])
    setDeleteCheckedModal(false)
    finishedNum.current = 0
    currentIsAllFinished = false
    setIsAllFinished(currentIsAllFinished)
  }

  function onDeleteAll() {
    currentTodoList = []
    setTodoList([...currentTodoList])
    setDeleteAllModal(false)
    finishedNum.current = 0
    currentIsAllFinished = false
    setIsAllFinished(currentIsAllFinished)
  }

  return (
    <div className="app">
      <div className="flex flex-justify-between flex-align-center">
        <div className="flex flex-align-center">
          <img src="/logo.png" alt="logo" width="40" height="40" />
          <h1 className="m-l-10">My Todos</h1>
        </div>
        <div className="flex flex-align-center">
          <button
            onClick={() => setShowAddTodo(true)}
            className="btn btn-success"
          >
            Add
          </button>
          <button
            onClick={() => setDeleteCheckedModal(true)}
            className="btn btn-warning m-l-10"
          >
            Delete Finished
          </button>
          <button
            onClick={() => setDeleteAllModal(true)}
            className="btn btn-danger m-l-10"
          >
            Delete All
          </button>
          <button
            onClick={switchAllFinished}
            className="btn btn-primary m-l-10"
          >
            {currentIsAllFinished ? 'All Unfinished' : 'Finished All'}
          </button>
        </div>
      </div>
      {todoList.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          onChangeActive={onChangeActive}
          onChangeFinished={onChangeFinished}
          onDeleteTodo={onDeleteTodo}
          onAddTodo={onAddTodo}
        />
      ))}

      {isShowAddTodo && (
        <AddTodo onAddTodo={onAddTodo} onClose={() => setShowAddTodo(false)} />
      )}

      {showDeleteCheckedModal && (
        <Modal
          onCancel={() => setDeleteCheckedModal(false)}
          onConfirm={onDeleteChecked}
          msg="Are you sure you want to delete checked?"
        />
      )}

      {showDeleteAllModal && (
        <Modal
          onCancel={() => setDeleteAllModal(false)}
          onConfirm={onDeleteAll}
          msg="Are you sure you want to delete all?"
        ></Modal>
      )}
    </div>
  )
}

export default TodoList
