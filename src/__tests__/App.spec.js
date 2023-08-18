import { render, screen } from '@testing-library/react'
import App from '../App'

it('render App', () => {
  render(<App />)

  expect(screen.getByText('TodoList')).toBeInTheDocument()
  expect(screen.getByAltText('logo')).toBeInTheDocument()

  expect(screen.getByText('Add').className).toBe(
    'rounded bg-green-500 px-6 py-1 text-white focus:outline-none focus-visible:ring',
  )
  expect(screen.getByText('Delete Finished').className).toBe(
    'ml-3 rounded bg-orange-500 px-3 py-1 text-white focus:outline-none focus-visible:ring',
  )
  expect(screen.getByText('Delete All').className).toBe(
    'ml-3 rounded bg-red-500 px-3 py-1 text-white focus:outline-none focus-visible:ring',
  )
  expect(screen.getByText('Finished All').className).toBe(
    'ml-3 w-32  rounded bg-sky-500 px-3 py-1 text-white focus:outline-none focus-visible:ring',
  )
})
