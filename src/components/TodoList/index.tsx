import { useState, useMemo, useRef } from 'react'
import Todo from '../Todo'
import AddTodo from '../Todo/Add'
import Modal from '../Modal'

type TypeTodo = {
  id: number
  title: string
  content: string
  finished: boolean
  active: boolean
}

function TodoList() {
  const [todoList, setTodoList] = useState([] as TypeTodo[])
  const currentTodoList: TypeTodo[] = useMemo(() => [...todoList], [todoList])
  const [isShowAddTodo, setShowAddTodo] = useState(false)
  const [showDeleteCheckedModal, setDeleteCheckedModal] = useState(false)
  const [showDeleteAllModal, setDeleteAllModal] = useState(false)
  const [isAllFinished, setIsAllFinished] = useState(false)
  const currentIsAllFinished = useMemo(() => isAllFinished, [isAllFinished])
  const finishedNum = useRef(0)

  function switchAllFinished() {
    if (currentTodoList.length === 0) {
      return
    }
    setIsAllFinished(!currentIsAllFinished)
    finishedNum.current = !currentIsAllFinished ? currentTodoList.length : 0
    setTodoList(
      currentTodoList.map((todo) => {
        todo.finished = !currentIsAllFinished
        return todo
      })
    )
  }

  function onChangeFinished(id: number, value: boolean) {
    const targetTodo = currentTodoList.find((todo) => todo.id === id)
    targetTodo!.finished = value
    setTodoList(currentTodoList)
    finishedNum.current += value ? 1 : -1
    setIsAllFinished(finishedNum.current === currentTodoList.length)
  }

  function onDeleteTodo(id: number) {
    const targetIndex = currentTodoList.findIndex((todo) => todo.id === id)
    finishedNum.current -= currentTodoList[targetIndex].finished ? 1 : 0
    currentTodoList.splice(targetIndex, 1)
    setTodoList(currentTodoList)
    setIsAllFinished(finishedNum.current === currentTodoList.length)
  }

  function onAddTodo({
    id,
    title,
    content,
  }: {
    id: number
    title: string
    content: string
  }) {
    setShowAddTodo(false)
    setTodoList([
      ...currentTodoList,
      {
        id,
        title,
        content,
        finished: false,
        active: false,
      },
    ])
    setIsAllFinished(false)
  }

  function onChangeActive(id: number) {
    setTodoList(
      currentTodoList.map((todo) => {
        if (todo.id === id) {
          todo.active = !todo.active
        } else {
          todo.active = false
        }
        return todo
      })
    )
  }

  function onDeleteChecked() {
    setTodoList(currentTodoList.filter((todo) => !todo.finished))
    setDeleteCheckedModal(false)
    finishedNum.current = 0
    setIsAllFinished(false)
  }

  function onDeleteAll() {
    setTodoList([])
    setDeleteAllModal(false)
    finishedNum.current = 0
    setIsAllFinished(false)
  }

  return (
    <>
      <div className="flex flex-justify-between flex-align-center">
        <div className="flex flex-align-center">
          <img src="/logo.png" alt="logo" width="40" height="40" />
          <h1 className="m-l-10">My TodoList</h1>
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
    </>
  )
}

export default TodoList
