import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { addTodo } from './utils'

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
    expect(deleteBtn.className).toBe('btn btn-warning m-l-10')
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

  it('btn edit', async () => {
    render(<App />)
    const title = 'title'
    const content = 'content'
    await addTodo(title, content)

    expect(screen.getByText(title)).toBeInTheDocument()

    const btnEdit = screen.getByText('Edit')
    await userEvent.click(btnEdit)

    expect(screen.getByText('title:')).toBeInTheDocument()

    await userEvent.click(screen.getByText('Cancel'))
    expect(screen.queryByText('title:')).toBeNull()

    const newTitle = 'new title'
    const newContent = 'new content'

    await userEvent.click(btnEdit)
    const titleInput = screen.getByPlaceholderText('Please enter title')
    await userEvent.clear(titleInput)
    await userEvent.click(screen.getByText('Confirm'))
    expect(screen.getByText('error: title is required!')).toBeInTheDocument()

    await userEvent.type(titleInput, newTitle)

    const contentInput = screen.getByPlaceholderText('Please enter content')
    await userEvent.clear(contentInput)
    await userEvent.click(screen.getByText('Confirm'))
    expect(screen.getByText('error: content is required!')).toBeInTheDocument()

    await userEvent.type(contentInput, newContent)

    await userEvent.click(screen.getByText('Confirm'))
    expect(screen.queryByText(title)).toBeNull()
    expect(screen.getByText(newTitle)).toBeInTheDocument()

    const todo = screen.getByTestId('todo')
    await userEvent.click(todo)
    expect(screen.getByText(newContent)).toBeInTheDocument()
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
