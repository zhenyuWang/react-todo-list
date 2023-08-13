import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export async function addTodo(title, content) {
  await userEvent.click(screen.getByText('Add'))
  const titleInput = screen.getByPlaceholderText('Please enter title')
  await userEvent.type(titleInput, title)
  const contentInput = screen.getByPlaceholderText('Please enter content')
  await userEvent.type(contentInput, content)
  await userEvent.click(screen.getByText('Confirm'))
}

export function clearStorage() {
  // eslint-disable-next-line no-undef
  localStorage.clear()
}

// eslint-disable-next-line no-undef
it('fix no test error', async () => null)
