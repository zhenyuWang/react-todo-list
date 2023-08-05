import { act, render, screen } from '@testing-library/react'
import App from '../App'

describe('TodoList', () => {
  it('click add btn show add modal', async () => {
    render(<App />)

    const btnAdd = screen.getByText('Add')
    expect(btnAdd.className).toBe('btn btn-success')

    await act(() => {
      btnAdd.click()
    })

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
    expect(btnCancel.className).toBe('btn btn-default')

    const btnConfirm = screen.getByText('Confirm')
    expect(btnConfirm.className).toBe('btn btn-primary')
  })
})
