import {render, cleanup} from '@testing-library/react'
import CourseList from './CourseList'
  const courses = [
    {
        id: 1,
        name: "ES6",
        credit: 60
    },
    {
        id: 2,
        name: "Webpack",
        credit: "40"
    },
    {
        id: 3,
        name: "React",
        credit: "20"
    }
]
describe('CourseList',() =>{
    afterEach(() => {
        cleanup()
    })  
    test('renders CourseList when 5 rows in courses list ', () => {
       const {container} =  render(<CourseList courses={courses}/>)
        const rows = container.querySelectorAll('tr')
        expect(rows.length).toEqual(5)
    })
    
    test('renders CourseList when 0 rows in courses list ', () => {
        const {container} = render(<CourseList />)
        const rows = container.querySelectorAll('tr')
        expect(rows.length).toEqual(1)
    })
})