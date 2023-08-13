import { MouseEventHandler, ReactNode } from 'react'

function Modal({
  onCancel,
  content,
  msg,
  onConfirm,
}: {
  onCancel: MouseEventHandler
  content?: ReactNode
  msg?: string
  onConfirm: MouseEventHandler
}) {
  const defaultMsg = 'Are you sure?'

  return (
    <>
      <div
        className="z-900 fixed left-0 top-0 h-full w-full bg-black/50"
        onClick={onCancel}
      />
      <div
        className="z-1000 fixed left-0 right-0 top-1/2 mx-auto -mt-40 w-96 rounded-lg bg-white px-6 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        {content !== undefined ? (
          content
        ) : (
          <div className="text-center text-lg">
            {msg !== undefined ? msg : defaultMsg}
          </div>
        )}
        <div className="flex justify-between pl-10 pr-10 pt-6">
          <button
            className="rounded  bg-slate-500 px-3 py-1 text-white focus:focus:outline-none focus-visible:ring"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded  bg-sky-500 px-3 py-1 text-white focus:outline-none focus-visible:ring"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  )
}

export default Modal
