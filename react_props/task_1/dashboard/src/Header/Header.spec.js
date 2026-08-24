import {render, screen} from '@testing-library/react'
import Header from './Header'

test('renders School Dashboard h1', () => {
  render(<Header />)
  const h1 = screen.getByRole('heading', { name: /School dashboard/i })
  const image = screen.getByAltText(/Holberton logo/i)
  expect(image).toBeInTheDocument()
  expect(h1).toBeInTheDocument()
})