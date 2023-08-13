import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { addTodo, clearStorage } from './utils'

describe('TodoList', () => {
  beforeEach(() => {
    clearStorage()
  })

  it('click add btn show add modal', async () => {
    render(<App />)

    const btnAdd = screen.getByText('Add')
    expect(btnAdd.className).toBe(
      'rounded bg-green-500 px-6 py-1 text-white focus:outline-none focus-visible:ring',
    )
    await userEvent.click(btnAdd)

    const titleLabel = screen.getByText('title:')
    expect(titleLabel).toBeInTheDocument()

    const titleInput = screen.getByPlaceholderText('Please enter title')
    expect(titleInput).toHaveFocus()
    expect(titleInput).toBeInTheDocument()

    const contentLabel = screen.getByText('content:')
    expect(contentLabel).toBeInTheDocument()

    const contentInput = screen.getByPlaceholderText('Please enter content')
    expect(contentInput).toBeInTheDocument()

    const btnCancel = screen.getByText('Cancel')
    expect(btnCancel.className).toBe(
      'rounded  bg-slate-500 px-3 py-1 text-white focus:focus:outline-none focus-visible:ring',
    )

    const btnConfirm = screen.getByText('Confirm')
    expect(btnConfirm.className).toBe(
      'rounded  bg-sky-500 px-3 py-1 text-white focus:outline-none focus-visible:ring',
    )
  })

  it('delete finished', async () => {
    render(<App />)

    await addTodo('1', '1')
    await addTodo('2', '2')
    await addTodo('3', '3')
    await addTodo('4', '4')

    const todoList = screen.getAllByTestId('todo')
    expect(todoList.length).toBe(4)

    // eslint-disable-next-line testing-library/no-node-access
    await userEvent.click(todoList[0].getElementsByClassName('checkbox')[0])
    // eslint-disable-next-line testing-library/no-node-access
    await userEvent.click(todoList[2].getElementsByClassName('checkbox')[0])

    await userEvent.click(screen.getByText('Delete Finished'))
    await userEvent.click(screen.getByText('Confirm'))

    expect(screen.queryByText('1')).toBeNull()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.queryByText('3')).toBeNull()
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('delete all', async () => {
    render(<App />)

    await addTodo('1', '1')
    await addTodo('2', '2')
    await addTodo('3', '3')

    expect(screen.getAllByTestId('todo').length).toBe(3)

    await userEvent.click(screen.getByText('Delete All'))
    await userEvent.click(screen.getByText('Confirm'))

    expect(screen.queryByTestId('todo')).toBeNull()
  })

  it('finished all', async () => {
    render(<App />)

    await addTodo('1', '1')
    expect(screen.getByText('Finished All')).toBeInTheDocument()

    await userEvent.click(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByTestId('todo').getElementsByClassName('checkbox')[0]
    )
    expect(screen.getByText('All Unfinished')).toBeInTheDocument()

    await addTodo('2', '2')
    expect(screen.getByText('Finished All')).toBeInTheDocument()

    await userEvent.click(screen.getByText('Finished All'))
    expect(screen.getByText('All Unfinished')).toBeInTheDocument()

    const todoList = screen.getAllByTestId('todo')
    expect(todoList.length).toBe(2)
    todoList.forEach((todo) => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(todo.getElementsByClassName('checkbox')[0].checked).toBe(true)
    })

    await userEvent.click(screen.getByText('All Unfinished'))
    expect(screen.getByText('Finished All')).toBeInTheDocument()

    expect(todoList.length).toBe(2)
    todoList.forEach((todo) => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(todo.getElementsByClassName('checkbox')[0].checked).toBe(false)
    })

    await userEvent.click(screen.getByText('Finished All'))
    await userEvent.click(screen.getByText('Delete Finished'))
    await userEvent.click(screen.getByText('Confirm'))
    expect(screen.getByText('Finished All')).toBeInTheDocument()
    await userEvent.click(screen.getByText('Finished All'))
    expect(screen.getByText('Finished All')).toBeInTheDocument()
  })
})
