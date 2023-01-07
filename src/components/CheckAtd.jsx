import { useEffect, useState } from "react";
import { allStudents } from "../DummyData";

function CheckAtd({roll, checkin, checkout}) {
    var checkIn = "----";
    var checkOut = "----";
    var currentStudents = 0;

    return (
        <div className="studentsSection">
            <div className="studentsTop">
                <h3>Attendance Logs</h3> 
            </div>
            {
                checkout.map((e) => {
                    if(e === "Not Yet Check out") {currentStudents = currentStudents + 1;}
                })
            }
            {currentStudents == 0 && <h5 style={{margin: "15px 0px", color: "red"}}>Currently No One present in School.</h5>}
            {currentStudents == 1 && <h5 style={{margin: "15px 0px", color: "green"}}>Currently {currentStudents} Student is present in School.</h5>}
            {currentStudents >= 2 && <h5 style={{margin: "15px 0px", color: "green"}}>Currently {currentStudents} Students are present in School.</h5>}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Roll no.</th>
                        <th scope="col">Student's Name</th>
                        <th scope="col">Check in Time</th>
                        <th scope="col">Check out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allStudents.map((e, k) => {
                            checkIn = "----";
                            checkOut = "----";
                            for(var i=0; i<roll.length; i++){
                                if(e.rollNo == roll[i]){
                                    checkIn = checkin[i];
                                    checkOut = checkout[i];
                                }
                            }
                            return (
                                <tr>
                                    <th scope="row">{k+1}</th>
                                    <td>{e.rollNo}</td>
                                    <td>{e.name}</td>
                                    <td>{checkIn}</td>
                                    <td>{checkOut}</td>
                                </tr>
                        )})
                    }
                </tbody>
            </table>
        </div>
    );
}

export default CheckAtd;