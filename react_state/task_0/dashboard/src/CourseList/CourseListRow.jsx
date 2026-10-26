function CourseListRow({isHeader = false, textFirstCell= "", textSecondCell = null}){
    return (
        <tr className={isHeader ? "bg-[var(--color-table-header)] opacity-[66%]" : "bg-[var(--color-table-rows)] opacity-[45%]"}>
            {isHeader == true ? (
                textSecondCell ? 
                <>
                    <th className="border border-gray-400">
                        {textFirstCell}
                    </th>
                    <th className="border border-gray-400">
                        {textSecondCell}
                    </th>
                </>
                :
                <th className="border border-gray-400" colSpan={2}>
                    {textFirstCell}
                </th>
            ):
            (<>
                <td className="border border-gray-400 pl-2">{textFirstCell}</td>
                <td className="border border-gray-400 pl-2">{textSecondCell}</td>
            </>)
            }
        </tr>
    )
}

export default CourseListRow