import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import AddTodo from './components/Todo/Add'
import Modal from './components/Modal'
import EditTodo from './components/Todo/Edit'

export type TypeTodo = {
  id: number
  title: string
  content: string
  finished: boolean
  active: boolean
}

function App() {
  const [todoList, setTodoList] = useState(() => {
    const localValue = localStorage.getItem('todoList')
    if (localValue == null) return [] as TypeTodo[]

    return JSON.parse(localValue) as TypeTodo[]
  })

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])
  const [showAddTodo, setShowAddTodo] = useState(false)
  const [showDeleteCheckedModal, setDeleteCheckedModal] = useState(false)
  const [showDeleteAllModal, setDeleteAllModal] = useState(false)
  const finishedNum = useRef(0)
  const isAllFinished = useRef(false)
  const [currentEditTodo, setCurrentEditTodo] = useState<TypeTodo | null>(null)
  const currentDeleteTodoId = useRef(-1)
  const [showEditModalState, setShowEditModalState] = useState(false)
  const [showDeleteModalState, setShowDeleteModalState] = useState(false)

  function switchAllFinished() {
    if (todoList.length === 0) {
      return
    }
    isAllFinished.current = !isAllFinished.current
    finishedNum.current = !isAllFinished.current ? todoList.length : 0
    setTodoList((currentTodoList) => {
      return currentTodoList.map((todo) => {
        todo.finished = isAllFinished.current
        return todo
      })
    })
  }

  function changeFinished(id: number, value: boolean) {
    setTodoList((currentTodoList) => {
      finishedNum.current += value ? 1 : -1
      isAllFinished.current = finishedNum.current === currentTodoList.length
      return currentTodoList.map((todo) => {
        if (todo.id === id) {
          todo.finished = value
        }
        return todo
      })
    })
  }

  function addTodo({
    id,
    title,
    content,
  }: {
    id: number
    title: string
    content: string
  }) {
    setShowAddTodo(false)
    setTodoList((currentTodoList) => {
      return [
        ...currentTodoList,
        {
          id,
          title,
          content,
          finished: false,
          active: false,
        },
      ]
    })
    isAllFinished.current = false
  }

  function showEditModal(id: number) {
    setShowEditModalState(true)
    setCurrentEditTodo(() => todoList.find((todo) => todo.id === id)!)
  }

  function editTodo(id: number, title: string, content: string) {
    setTodoList((currentTodoList) => {
      return currentTodoList.map((todo) => {
        if (todo.id === id) {
          todo.title = title
          todo.content = content
        }
        return todo
      })
    })
  }

  function showDeleteModal(id: number) {
    currentDeleteTodoId.current = id
    setShowDeleteModalState(true)
  }

  function deleteTodo(id: number) {
    setTodoList((currentTodoList) => {
      const targetIndex = currentTodoList.findIndex((todo) => todo.id === id)
      finishedNum.current -= currentTodoList[targetIndex].finished ? 1 : 0
      currentTodoList.splice(targetIndex, 1)
      isAllFinished.current = finishedNum.current === currentTodoList.length
      return [...currentTodoList]
    })
    setShowDeleteModalState(false)
  }

  function changeActive(id: number) {
    setTodoList((currentTodoList) => {
      return currentTodoList.map((todo) => {
        if (todo.id === id) {
          todo.active = !todo.active
        } else {
          todo.active = false
        }
        return todo
      })
    })
  }

  function deleteChecked() {
    setTodoList((currentTodoList) => {
      return currentTodoList.filter((todo) => !todo.finished)
    })
    setDeleteCheckedModal(false)
    finishedNum.current = 0
    isAllFinished.current = false
  }

  function deleteAll() {
    setTodoList([])
    setDeleteAllModal(false)
    finishedNum.current = 0
    isAllFinished.current = false
  }

  return (
    <div className="app">
      <Header
        setShowAddTodo={setShowAddTodo}
        setDeleteCheckedModal={setDeleteCheckedModal}
        setDeleteAllModal={setDeleteAllModal}
        switchAllFinished={switchAllFinished}
        isAllFinished={isAllFinished.current}
      />
      <TodoList
        todoList={todoList}
        changeActive={changeActive}
        changeFinished={changeFinished}
        showEditModal={showEditModal}
        showDeleteModal={showDeleteModal}
      />

      {showAddTodo && (
        <AddTodo addTodo={addTodo} onClose={() => setShowAddTodo(false)} />
      )}

      {showEditModalState && (
        <EditTodo
          currentEditTodo={currentEditTodo!}
          editTodo={editTodo}
          setShowEditModalState={setShowEditModalState}
        />
      )}

      {showDeleteModalState && (
        <Modal
          onCancel={() => setShowDeleteModalState(false)}
          msg="Are you sure you want to delete?"
          onConfirm={() => deleteTodo(currentDeleteTodoId.current)}
        />
      )}

      {showDeleteCheckedModal && (
        <Modal
          onCancel={() => setDeleteCheckedModal(false)}
          onConfirm={deleteChecked}
          msg="Are you sure you want to delete checked?"
        />
      )}

      {showDeleteAllModal && (
        <Modal
          onCancel={() => setDeleteAllModal(false)}
          onConfirm={deleteAll}
          msg="Are you sure you want to delete all?"
        />
      )}
    </div>
  )
}

export default App
