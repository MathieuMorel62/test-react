import {render} from '@testing-library/react'
import CourseListRow from './CourseListRow'
  
test('renders CourseListRow when ', () => {
  render(<table><tbody><CourseListRow isHeader={true} textSecondCell={null} textFirstCell='hello' /></tbody></table>)
  const column = document.querySelector('th')
  expect(column).toHaveAttribute('colspan', '2')
  
})

test('renders CourseListRow when isheader true and textsecondcell exists ', () => {
  render(<table><tbody><CourseListRow isHeader={true} textSecondCell='world' textFirstCell='hello' /></tbody></table>)
  const column = document.querySelectorAll('th')
  expect(column.length).toEqual(2)
  
})

test('renders CourseListRow when isheader false ', () => {
  render(<table><tbody><CourseListRow isHeader={false} /></tbody></table>)
  const column = document.querySelector('tr')
  const tds = column.querySelectorAll('td')
  expect(tds.length).toEqual(2)
})