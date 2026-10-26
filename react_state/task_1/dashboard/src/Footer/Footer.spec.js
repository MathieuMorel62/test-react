import {render, screen} from '@testing-library/react'
import Footer from './Footer'
import { getCurrentYear, getFooterCopy } from '../utils/utils'

test('renders Footer', () => {
  render(<Footer />)
  const p = screen.getByText(
    new RegExp(`copyright\\s+${getCurrentYear()}\\s+-\\s+${getFooterCopy(true)}`, 'i')
  )
  expect(p).toBeInTheDocument()
})