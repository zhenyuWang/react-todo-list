import { useState, useMemo } from 'react'
import Todo from './components/Todo'
import AddTodo from './components/Todo/Add'

function App() {
  const [todoList, setTodoList] = useState([])
  const currentTodoList = useMemo(() => [...todoList], [todoList])
  const [isShowAddTodo, setShowAddTodo] = useState(false)

  function onChangeCompleted(id, value) {
    for (let i = 0; i < currentTodoList.length; i++) {
      if (currentTodoList[i].id === id) {
        currentTodoList[i].completed = value
        break
      }
    }
    setTodoList([...currentTodoList])
  }
  function onDeleteTodo(id) {
    for (let i = 0; i < currentTodoList.length; i++) {
      if (currentTodoList[i].id === id) {
        currentTodoList.splice(i, 1)
        break
      }
    }
    setTodoList([...currentTodoList])
  }

  function onAddTodo(params) {
    setShowAddTodo(false)
    currentTodoList.push({
      ...params,
      completed: false,
      active: false,
    })
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

  return (
    <div className="app">
      <div className="flex flex-justify-between flex-align-center">
        <h1>My Todos</h1>
        <button
          onClick={() => setShowAddTodo(true)}
          className="btn btn-primary"
        >
          Add Todo
        </button>
      </div>
      {todoList.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          onChangeActive={onChangeActive}
          onChangeCompleted={onChangeCompleted}
          onDeleteTodo={onDeleteTodo}
          onAddTodo={onAddTodo}
        />
      ))}
      {isShowAddTodo && (
        <AddTodo onAddTodo={onAddTodo} onClose={() => setShowAddTodo(false)} />
      )}
    </div>
  )
}

export default App
