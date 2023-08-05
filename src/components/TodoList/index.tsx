import { useState, useMemo, useRef } from 'react'
import Todo from '../Todo'
import AddTodo from '../Todo/Add'
import Modal from '../Modal'
import './index.scss'

type TypeTodo = {
  id: number
  title: string
  content: string
  finished: boolean
  active: boolean
}

function TodoList() {
  const [_todoList, setTodoList] = useState([] as TypeTodo[])
  const todoList: TypeTodo[] = useMemo(() => [..._todoList], [_todoList])
  const [isShowAddTodo, setShowAddTodo] = useState(false)
  const [showDeleteCheckedModal, setDeleteCheckedModal] = useState(false)
  const [showDeleteAllModal, setDeleteAllModal] = useState(false)
  const [_isAllFinished, setIsAllFinished] = useState(false)
  const isAllFinished = useMemo(() => _isAllFinished, [_isAllFinished])
  const finishedNum = useRef(0)

  function switchAllFinished() {
    if (todoList.length === 0) {
      return
    }
    setIsAllFinished(!isAllFinished)
    finishedNum.current = !isAllFinished ? todoList.length : 0
    setTodoList(
      todoList.map((todo) => {
        todo.finished = !isAllFinished
        return todo
      })
    )
  }

  function onChangeFinished(id: number, value: boolean) {
    const targetTodo = todoList.find((todo) => todo.id === id)
    targetTodo!.finished = value
    setTodoList(todoList)
    finishedNum.current += value ? 1 : -1
    setIsAllFinished(finishedNum.current === todoList.length)
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
      ...todoList,
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

  function onEditTodo(id: number, title: string, content: string) {
    const todo = todoList.find((todo) => todo.id === id)
    if (!todo) {
      return
    }
    todo.title = title
    todo.content = content
    setTodoList([...todoList])
  }

  function onDeleteTodo(id: number) {
    const targetIndex = todoList.findIndex((todo) => todo.id === id)
    finishedNum.current -= todoList[targetIndex].finished ? 1 : 0
    todoList.splice(targetIndex, 1)
    setTodoList(todoList)
    setIsAllFinished(finishedNum.current === todoList.length)
  }

  function onChangeActive(id: number) {
    setTodoList(
      todoList.map((todo) => {
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
    setTodoList(todoList.filter((todo) => !todo.finished))
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
      <div className="flex flex-justify-between flex-align-center todo-list">
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
            {isAllFinished ? 'All Unfinished' : 'Finished All'}
          </button>
        </div>
      </div>
      {_todoList.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          onChangeActive={onChangeActive}
          onChangeFinished={onChangeFinished}
          onEditTodo={onEditTodo}
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
