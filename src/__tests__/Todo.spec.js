import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

async function addTodo(title, content) {
  await userEvent.click(screen.getByText('Add'))
  const titleInput = screen.getByPlaceholderText('Please enter title')
  await userEvent.type(titleInput, title)
  const contentInput = screen.getByPlaceholderText('Please enter content')
  await userEvent.type(contentInput, content)
  await userEvent.click(screen.getByText('Confirm'))
}

describe('Todo', () => {
  it('add', async () => {
    render(<App />)
    const title = 'title'
    await addTodo(title, 'content')

    expect(screen.getByText(title)).toBeInTheDocument()

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.checked).toBe(false)

    const deleteBtn = screen.getByText('Delete')
    expect(deleteBtn).toBeInTheDocument()
    expect(deleteBtn.className).toBe('btn btn-warning delete')
  })

  it('switch show content', async () => {
    render(<App />)
    const title = 'title'
    await addTodo(title, 'content')

    expect(screen.getByText(title)).toBeInTheDocument()

    const todo = screen.getByTestId('todo')
    await userEvent.click(todo)
    expect(screen.getByText('content')).toBeInTheDocument()

    await userEvent.click(todo)
    expect(screen.queryByText('content')).toBeNull()
  })

  it('btn delete', async () => {
    render(<App />)
    const title = 'title'
    await addTodo(title, 'content')

    expect(screen.getByText(title)).toBeInTheDocument()

    const btnDelete = screen.getByText('Delete')
    await userEvent.click(btnDelete)

    expect(
      screen.getByText('Are you sure you want to delete?')
    ).toBeInTheDocument()

    await userEvent.click(screen.getByText('Cancel'))
    expect(screen.queryByText('Are you sure you want to delete?')).toBeNull()

    await userEvent.click(btnDelete)
    await userEvent.click(screen.getByText('Confirm'))
    expect(screen.queryByText(title)).toBeNull()
  })
})
