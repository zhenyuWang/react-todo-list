import { useState, useMemo, useRef, useEffect } from 'react'
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
  const [_todoList, setTodoList] = useState([] as TypeTodo[])
  const todoList: TypeTodo[] = useMemo(() => [..._todoList], [_todoList])
  const [isShowAddTodo, setShowAddTodo] = useState(false)
  const [showDeleteCheckedModal, setDeleteCheckedModal] = useState(false)
  const [showDeleteAllModal, setDeleteAllModal] = useState(false)
  const [_isAllFinished, setIsAllFinished] = useState(false)
  const isAllFinished = useMemo(() => _isAllFinished, [_isAllFinished])
  const finishedNum = useRef(0)
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

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
      }),
    )
  }

  function onChangeFinished(id: number, value: boolean) {
    const targetTodo = todoList.find((todo) => todo.id === id)
    if (targetTodo !== undefined) {
      targetTodo.finished = value
    }
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
      }),
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
      <div className="mb-10 flex items-center justify-between px-5 py-4 shadow shadow-indigo-500/50">
        <div className="flex items-center ">
          <img src="/logo.png" alt="logo" width="40" height="40" />
          <h1 className="pl-4 text-2xl font-bold">My TodoList</h1>
        </div>
        <div className="item-center flex">
          <button
            onClick={() => setShowAddTodo(true)}
            className="rounded bg-green-500 px-6 py-1 text-white focus:outline-none focus-visible:ring"
          >
            Add
          </button>
          <button
            onClick={() => setDeleteCheckedModal(true)}
            className="ml-3 rounded bg-orange-500 px-3 py-1 text-white focus:outline-none focus-visible:ring"
          >
            Delete Finished
          </button>
          <button
            onClick={() => setDeleteAllModal(true)}
            className="ml-3 rounded bg-red-500 px-3 py-1 text-white focus:outline-none focus-visible:ring"
          >
            Delete All
          </button>
          <button
            onClick={switchAllFinished}
            className="ml-3 w-32  rounded bg-sky-500 px-3 py-1 text-white focus:outline-none focus-visible:ring"
          >
            {isAllFinished ? 'All Unfinished' : 'Finished All'}
          </button>
        </div>
      </div>
      <div className="px-4">
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
      </div>

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
