import {render, screen} from '@testing-library/react'
import Header from './Header'

test('renders School Dashboard h1', () => {
  render(<Header />)
  const h1 = screen.getByRole('heading', { name: /School dashboard/i })
  expect(h1).toBeInTheDocument()
})