import type { TypeTodo } from '../../App'
import Todo from '../Todo'

function TodoList({
  todoList,
  changeActive,
  changeFinished,
  showEditModal,
  showDeleteModal,
}: {
  todoList: TypeTodo[]
  changeActive: (id: number) => void
  changeFinished: (id: number, value: boolean) => void
  showEditModal: (id: number) => void
  showDeleteModal: (id: number) => void
}) {
  return (
    <>
      <div className="px-4">
        {todoList.length === 0 && <p className="text-xl">No Todo</p>}
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            changeActive={changeActive}
            changeFinished={changeFinished}
            showEditModal={showEditModal}
            showDeleteModal={showDeleteModal}
          />
        ))}
      </div>
    </>
  )
}

export default TodoList
