function Header({
  setShowAddTodo,
  setDeleteCheckedModal,
  setDeleteAllModal,
  switchAllFinished,
  isAllFinished,
}: {
  setShowAddTodo: (value: boolean) => void
  setDeleteCheckedModal: (value: boolean) => void
  setDeleteAllModal: (value: boolean) => void
  switchAllFinished: () => void
  isAllFinished: boolean
}) {
  return (
    <header className="mb-10 flex items-center justify-between px-5 py-4 shadow shadow-indigo-500/50">
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
    </header>
  )
}

export default Header
