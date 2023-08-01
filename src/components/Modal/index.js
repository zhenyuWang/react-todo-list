import './index.css'

function Modal(props) {
  const defaultMsg = 'Are you sure?'

  return (
    <>
      <div className="backdrop" onClick={props.onCancel} />
      <div className="modal">
        {props.content || (
          <div className="modal-content text-center">
            {props.msg || defaultMsg}
          </div>
        )}
        <div className="modal-actions flex flex-justify-between">
          <button className="btn btn-default" onClick={props.onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={props.onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </>
  )
}

export default Modal
