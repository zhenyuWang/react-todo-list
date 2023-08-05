import { MouseEventHandler, ReactNode } from 'react'
import './index.scss'

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
      <div className="backdrop" onClick={onCancel} />
      <div className="modal">
        {content || (
          <div className="modal-content text-center">{msg || defaultMsg}</div>
        )}
        <div className="modal-actions flex flex-justify-between">
          <button className="btn btn-default" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </>
  )
}

export default Modal
