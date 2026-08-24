import {render, screen} from '@testing-library/react'
import Footer from './Footer'
import { getCurrentYear, getFooterCopy } from '../utils/utils'

test('renders Footer', () => {
  render(<Footer />)
  const p = screen.getByText(`copyright ${getCurrentYear()} - ${getFooterCopy(true)}`)
  expect(p).toBeInTheDocument()
})