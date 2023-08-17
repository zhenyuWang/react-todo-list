import { stopPropagation } from '../../utils'

function Todo({
  id,
  finished,
  title,
  content,
  active,
  onChangeActive,
  onChangeFinished,
  showEditModal,
  showDeleteModal,
}: {
  id: number
  finished: boolean
  title: string
  content: string
  active: boolean
  onChangeActive: (id: number) => void
  showEditModal: (id: number) => void
  showDeleteModal: (id: number) => void
  onChangeFinished: (id: number, value: boolean) => void
}) {
  function _showEditModal(e: React.MouseEvent<Element, MouseEvent>) {
    stopPropagation(e)
    showEditModal(id)
  }

  function _showDeleteModal(e: React.MouseEvent<Element, MouseEvent>) {
    stopPropagation(e)
    showDeleteModal(id)
  }

  return (
    <div
      className="mb-4 flex justify-between rounded p-4 shadow shadow-blue-500/50"
      onClick={() => onChangeActive(id)}
      data-testid="todo"
    >
      <div className="flex">
        <input
          className="checkbox mr-4 h-4 w-4 focus:border-none focus:border-sky-600 focus:outline-none focus-visible:ring"
          type="checkbox"
          onClick={stopPropagation}
          onChange={(e) => onChangeFinished(id, e.target.checked)}
          checked={finished}
        />
        <div className="-mt-2">
          <h2 className={`text-2xl ${finished ? 'line-through' : ''}`}>
            {title}
          </h2>
          {active && (
            <p className={`mx-0 mt-4 ${finished ? 'line-through' : ''}`}>
              {content}
            </p>
          )}
        </div>
      </div>
      <div>
        <button
          className="rounded bg-green-500 px-6 py-1 text-white focus:outline-none focus-visible:ring"
          onClick={_showEditModal}
        >
          Edit
        </button>
        <button
          className="ml-3 rounded bg-red-500 px-3 py-1 text-white focus:outline-none focus-visible:ring"
          onClick={_showDeleteModal}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Todo
