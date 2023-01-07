import { allStudents } from "../DummyData";

function Students() {
    return (
        <div className="studentsSection">
            <div className="studentsTop" style={{display: "flex", justifyContent: "space-between", marginBottom: "30px"}}>
                <h3>Students</h3>
            </div>


            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Roll no.</th>
                        <th scope="col">Student's Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allStudents.map((std, i) => (
                            <tr key={std.rollNo}>
                                <th scope="row">{i + 1}</th>
                                <td>{std.rollNo}</td>
                                <td>{std.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Students;