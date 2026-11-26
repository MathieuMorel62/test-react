import { StyleSheet, css } from 'aphrodite';
import CourseListRow from './CourseListRow/CourseListRow';
import WithLogging from '../../components/HOC/WithLogging';
import { useSelector, useDispatch } from 'react-redux';
import { unSelectCourse, selectCourse } from '../../features/courses/coursesSlice';

const styles = StyleSheet.create({
  courses: {
    margin: '130px auto',
    width: '90%',
    height: '33vh'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '2px solid rgb(161, 161, 161)',
    ':nth-child(1n) th': {
      border: '2px solid rgb(161, 161, 161)'
    },
    ':nth-child(1n) tr': {
      border: '2px solid rgb(161, 161, 161)'
    },
    ':nth-child(1n) td': {
      border: '2px solid rgb(161, 161, 161)'
    }
  }
});

function CourseList() {
  const {courses} = useSelector((state)=> state.courses)
  const dispacth = useDispatch()

  function onChangeRow (id, checked){
    console.log("im invoked !")
    if(checked === true){
      dispacth(selectCourse(id))
    }
    else{
      if (checked === false){
        dispacth(unSelectCourse(id))
      }
    }
  }

  return (
    <div className={css(styles.courses)}>
      {
        courses.length > 0 ?
        (
          <table id='CourseList' className={css(styles.table)}>
            <thead>
              <CourseListRow
                textFirstCell="Available courses"
                isHeader={true}
              />
              <CourseListRow
                textFirstCell="Course name"
                textSecondCell="Credit"
                isHeader={true}
              />
            </thead>
            <tbody>
              {
                courses.map(course => (
                  <CourseListRow
                    key={course.id}
                    id={course.id}
                    textFirstCell={course.name}
                    textSecondCell={course.credit}
                    onChangeRow={onChangeRow}
                    isSelected={course.isSelected || false}
                  />
                ))
              }
            </tbody>
          </table>
        ) : (
          <table id='CourseList' className={css(styles.table)}>
            <thead>
              <CourseListRow
                isHeader={true}
                textFirstCell="No course available yet"
              />
            </thead>
          </table>
        )
      }
    </div>
  );
}

const CourseListWithLogging = WithLogging(CourseList);
export default CourseListWithLogging
