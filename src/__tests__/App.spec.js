import { render, screen } from '@testing-library/react'
import App from '../App'

it('render App', () => {
  render(<App />)

  expect(screen.getByText('My TodoList')).toBeInTheDocument()
  expect(screen.getByAltText('logo')).toBeInTheDocument()

  expect(screen.getByText('Add').className).toBe('btn btn-success')
  expect(screen.getByText('Delete Finished').className).toBe(
    'btn btn-warning m-l-10'
  )
  expect(screen.getByText('Delete All').className).toBe('btn btn-danger m-l-10')
  expect(screen.getByText('Finished All').className).toBe(
    'btn btn-primary m-l-10'
  )
})
