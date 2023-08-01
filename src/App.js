import { useState, useMemo } from 'react'
import Todo from './components/Todo'
import AddTodo from './components/Todo/Add'

function App() {
  const [todoList, setTodoList] = useState([])
  let currentTodoList = useMemo(() => [...todoList], [todoList])
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

  function onDeleteChecked() {
    currentTodoList = currentTodoList.filter((todo) => !todo.completed)
    setTodoList([...currentTodoList])
  }

  function onDeleteAll() {
    currentTodoList = []
    setTodoList([...currentTodoList])
  }

  return (
    <div className="app">
      <div className="flex flex-justify-between flex-align-center">
        <div className="flex flex-align-center">
          <img src="/logo192.png" alt="logo" width="40" height="40" />
          <h1 className="m-l-10">My Todos</h1>
        </div>
        <div className="flex flex-align-center">
          <button
            onClick={() => setShowAddTodo(true)}
            className="btn btn-success"
          >
            Add
          </button>
          <button onClick={onDeleteChecked} className="btn btn-warning m-l-10">
            Delete Checked
          </button>
          <button onClick={onDeleteAll} className="btn btn-danger m-l-10">
            Delete All
          </button>
        </div>
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
