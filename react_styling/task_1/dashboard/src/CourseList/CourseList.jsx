import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

function CourseList({ courses = [] }) {
  return (
    <div className="course-list-container">
      <table id="CourseList" className="w-full">
        {courses.length === 0 ? (
          <thead>
            <CourseListRow
              textFirstCell="No course available yet"
              isHeader={true}
            />
          </thead>
        ) : (
          <>
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
              {courses.map((course) => (
                <CourseListRow
                  key={course.id}
                  textFirstCell={course.name}
                  textSecondCell={course.credit}
                />
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
}

export default WithLogging(CourseList);