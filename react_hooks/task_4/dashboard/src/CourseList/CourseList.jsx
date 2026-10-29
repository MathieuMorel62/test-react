import CourseListRow from "./CourseListRow"

function CourseList({courses = []}){
    return(
        <div className="mx-auto w-full overflow-x-auto sm:w-[80%]">
            <table id="CourseList" className="w-full min-w-[320px]">
                {courses.length > 0 ?
                <>
                    <thead>
                        <CourseListRow textFirstCell="Available courses" isHeader={true}/>
                        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true}/>
                    </thead>
                    <tbody>
                        {
                            courses.map((course)=>(
                                <CourseListRow key={course.id} textFirstCell={course.name} textSecondCell={course.credit}/>)
                            )
                            
                        }
                    </tbody>
                </>
                    :
                    <thead>
                        <CourseListRow textFirstCell="No course available yet"isHeader={true}/>
                    </thead>
                    }
            </table>
        </div>

    )
}
export default CourseList