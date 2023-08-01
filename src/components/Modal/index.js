import './index.css'

function Modal(props) {
  return (
    <div className='modal'>
      <div className='modal-content text-center'>{props.msg}</div>
      <div className='modal-actions flex flex-justify-between'>
        <button className='btn btn-default' onClick={props.onCancel}>
          Cancel
        </button>
        <button className='btn btn-primary' onClick={props.onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default Modal
