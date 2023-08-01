import { useState, useRef, useEffect } from 'react'
import './add.css'
import Backdrop from '../Backdrop'

function AddTodo(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errorText, setErrorText] = useState('')
  const inputTitleRef = useRef(null)
  useEffect(() => {
    inputTitleRef.current.focus()
  }, [])

  function onTitleInput(e) {
    setTitle(e.target.value)
    if (e.target.value && content) {
      setErrorText('')
    }
  }
  function onContentInput(e) {
    setContent(e.target.value)
    if (title && e.target.value) {
      setErrorText('')
    }
  }
  function addTodo() {
    if (!title) {
      return setErrorText('title is required')
    }
    if (!content) {
      return setErrorText('content is required')
    }
    props.onAddTodo &&
      props.onAddTodo({
        id: Date.now(),
        title,
        content,
      })
  }

  return (
    <div>
      <Backdrop onClose={props.onClose} />
      <div className='modal add-todo-modal'>
        <div className='flex flex-align-center'>
          <div className='label font-size-20'>title:</div>
          <input
            className='font-size-20'
            type='text'
            ref={inputTitleRef}
            value={title}
            onInput={onTitleInput}
          />
        </div>
        <div className='flex flex-align-center m-t-10'>
          <div className='label font-size-20'>content:</div>
          <input
            className='font-size-20'
            type='text'
            value={content}
            onInput={onContentInput}
          />
        </div>
        {errorText && (
          <div className='m-t-10 error-text'>error: {errorText}</div>
        )}
        <div className='modal-actions flex flex-justify-center'>
          <button className='btn btn-primary' onClick={addTodo}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTodo
