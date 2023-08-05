import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { addTodo } from './utils'

describe('Add Todo', () => {
  it('click add modal cancel remove modal', async () => {
    render(<App />)
    await userEvent.click(screen.getByText('Add'))
    await userEvent.click(screen.getByText('Cancel'))
    expect(screen.queryByText('title:')).toBeNull()
  })

  it('click add modal confirm show error message', async () => {
    render(<App />)
    await userEvent.click(screen.getByText('Add'))
    const btnConfirm = screen.getByText('Confirm')
    await userEvent.click(btnConfirm)
    expect(screen.getByText('error: title is required!')).toBeInTheDocument()

    await userEvent.type(
      screen.getByPlaceholderText('Please enter title'),
      'title'
    )
    await userEvent.click(btnConfirm)
    expect(screen.getByText('error: content is required!')).toBeInTheDocument()

    await userEvent.type(
      screen.getByPlaceholderText('Please enter content'),
      'content'
    )
    await userEvent.click(btnConfirm)

    expect(screen.queryByText('error: title is required!')).toBeNull()
    expect(screen.queryByText('error: content is required!')).toBeNull()
  })

  it('click add modal confirm add Todo', async () => {
    render(<App />)

    const title = 'title'
    await addTodo(title, 'content')

    expect(screen.getByText(title)).toBeInTheDocument()
  })
})
