import React, { useEffect, useState } from 'react'
import { allStudents } from '../DummyData';
import './GiveAtd.css'

export default function GiveAttendance({roll, setRoll, name, setName, checkin, setCheckin, checkout, setCheckout}) {
    const [curRoll, setCurRoll] = useState();
    const [curName, setCurName] = useState();
    const [present, setPresent] = useState(false);
    const [corrRol, setCorrRoll] = useState(false);         // Is input roll number correct
    const [corrTime, setCorrTime] = useState(false);        // Is input time correct
    const [corrName, setCorrName] = useState(false);        // Is input Name correct
    
    // Get system Local time
    var d = new Date();
    var m = d.getMinutes();
    var h = d.getHours();
    if(h == '0') {h = 24}
    var currentTime = h+"."+m;
    var currentTimeValidFormat = m<10 ? h+":0"+m : h+":"+m;
    const [time, setTime] = useState(currentTimeValidFormat);
    
    // Get input time
    var Time = time ? time.split(":") : 0;
    var hour = Time[0];
    if(hour == '00') {hour = 24}
    var min = Time[1];
    var inputTime = hour+"."+min;

    // Check time 
    useEffect(()=>{
        setCorrTime(false);
        if(inputTime <= currentTime) setCorrTime(true);
        // console.log(inputTime + " k " + currentTime);
    }, [time]);

    //Check name
    useEffect(()=>{
        setCorrName(false);
        if(curRoll && curName && allStudents[curRoll - 1].name == curName) setCorrName(true);
        // console.log(allStudents[curRoll - 1].name + " k " + curName);
    }, [curName])

    useEffect(()=>{
        setPresent(false);
        setCorrRoll(true);
        curRoll ? curRoll <= 20 && curRoll > 0 ? setCurName(allStudents[curRoll - 1].name) : setCorrRoll(false) : setCorrRoll(false);
        roll.map((e, i) => {
            if(e === curRoll && checkout[i] === "Not Yet Check out"){
                setPresent(true);
                console.log("Already present")
            }
        })
    }, [curRoll])

    const checkInHandler = () => {
        if(!present){
            setRoll(e => [...e, curRoll]);
            setName(e => [...e, curName]);
            setCheckin(e => [...e, time]);
            setCheckout(e => [...e, "Not Yet Check out"]);

            setPresent(true);
            alert("Student Checked In")
        }
    }
    const checkOutHandler = () => {
        roll.map((e, i) => {
            if(e === curRoll && checkout[i] === "Not Yet Check out"){
                var checkintime = checkin[i].split(":");
                var hr = checkintime[0];
                if(hr == '00') {hour = 24}
                var mint = checkintime[1];
                var checkintimeDecode = hour+"."+mint;

                if(checkintimeDecode <= inputTime){
                    setCheckout(e => [...e.slice(0, i),time, ...e.slice(i+1)]);
                    setPresent(false);
                    alert("Student Checked Out")
                }else{
                    alert("Enter Correct Time\nCheck In time was " + checkin[i])
                }
            }
        })
    }

  return (
    <div className='GiveAtd'>
        <h4>Attendance</h4>
        <div className="inpSection">
            <h6 className="inphesd">Roll Number</h6>
            <input type="text" onChange={(e) => setCurRoll(e.target.value)}/>
            { !corrRol && <div style={{fontSize: "12px", color: "red"}}>Enter valid Roll Number (1 - 20)</div> }
        </div>
        <div className="inpSection">
            <h6 className="inphesd">Name</h6>
            <input type="text" value={curName} onChange={(e) => setCurName(e.target.value)}/>
            { !corrName && <div style={{fontSize: "12px", color: "red"}}>Enter Correct name</div> }
        </div>
        <div className="inpSection">
            <h6 className="inphesd">Time</h6>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)}/>
            { !corrTime && <div style={{fontSize: "12px", color: "red"}}>Entry time should be less than or same as Current Time</div> }
        </div>
        <div className="btnSection">
            <button type="button" disabled={!corrTime || !corrRol || !curName || present} className="btn btn-success" onClick={checkInHandler}>Check In</button>
            <button type="button" disabled={!corrTime || !corrRol || !curName || !present} class="btn btn-warning" onClick={checkOutHandler}>Check Out</button>
            {/* <button onClick={() => {console.log(roll);console.log(name);console.log(checkin);console.log(checkout);}}>click</button> */}
        </div>
            { present && <div style={{fontSize: "14px", color: "green"}}>This student is Currently present</div> }
    </div>
  )
}
