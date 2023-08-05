import { act, render, screen } from '@testing-library/react'
import App from '../App'

describe('Add Todo', () => {
  it('click add modal cancel remove modal', async () => {
    render(<App />)
    const btnAdd = screen.getByText('Add')
    await act(() => {
      btnAdd.click()
    })
    const btnCancel = screen.getByText('Cancel')
    await act(() => {
      btnCancel.click()
    })

    expect(screen.queryByText('title:')).toBeNull()
  })

  it('click add modal confirm show error message', async () => {
    render(<App />)
    const btnAdd = screen.getByText('Add')
    await act(() => {
      btnAdd.click()
    })
    const btnConfirm = screen.getByText('Confirm')
    await act(() => {
      btnConfirm.click()
    })
    expect(screen.getByText('error: title is required!')).toBeInTheDocument()

    const titleInput = screen.getByPlaceholderText('Please enter title')
    titleInput.setAttribute('value', 'title1')
    await act(() => {
      titleInput.dispatchEvent(new Event('input', { bubbles: true }))
      btnConfirm.click()
    })
    expect(screen.getByText('error: content is required!')).toBeInTheDocument()

    const contentInput = screen.getByPlaceholderText('Please enter content')
    contentInput.setAttribute('value', 'content2')
    await act(() => {
      contentInput.dispatchEvent(new Event('input', { bubbles: true }))
      btnConfirm.click()
    })

    expect(screen.queryByText('error: title is required!')).toBeNull()
    expect(screen.queryByText('error: content is required!')).toBeNull()
  })

  it('click add modal confirm add Todo', async () => {
    render(<App />)
    const btnAdd = screen.getByText('Add')
    await act(() => {
      btnAdd.click()
    })

    const titleInput = screen.getByPlaceholderText('Please enter title')
    titleInput.setAttribute('value', 'title1')
    await act(() => {
      titleInput.dispatchEvent(new Event('input', { bubbles: true }))
    })
    const contentInput = screen.getByPlaceholderText('Please enter content')
    contentInput.setAttribute('value', 'content2')
    await act(() => {
      contentInput.dispatchEvent(new Event('input', { bubbles: true }))
    })
    const btnConfirm = screen.getByText('Confirm')
    await act(() => {
      btnConfirm.click()
    })

    expect(screen.getByText('title1')).toBeInTheDocument()
  })
})
