import {render, screen} from '@testing-library/react'
import Footer from './Footer'

test('renders Footer', () => {
  render(<Footer />)
  const p = screen.getByText(/copyright/i)
  expect(p).toBeInTheDocument()
})