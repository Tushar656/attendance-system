import React, { useEffect, useState } from 'react'
import CheckAtd from '../components/CheckAtd'
import GiveAttendance from '../components/GiveAttendance'
import Students from '../components/Students'
import './Home.css'

export default function Home() {
    const [std, SetStd] = useState(true);
    const [check, SetCheck] = useState(false);
    const [give, SetGive] = useState(false);

    // const [stdData, setStdData] = useState({
    //     roll: [],
    //     name: [],
    //     checkin: [],
    //     checkout: []
    // })
    const [roll, setRoll] = useState([]);
    const [name, setName] = useState([]);
    const [checkin, setCheckin] = useState([]);
    const [checkout, setCheckout] = useState([]);
    // roll, setRoll, name, setName, checkin, setCheckin, checkout, setCheckout
    // roll={roll} setRoll={setRoll} name={name} setName={setName} checkin={checkin} setCheckin={setCheckin} checkout={checkout} setCheckout={setCheckout}

  return (
    <div className='Home'>
        <div className="leftHome">
            <div className="topLeftHome">
                <h4>Attendance System</h4>
            </div>
            <div className="bottomLeftHome">
                <div className="listItem" onClick={() => {SetStd(true); SetCheck(false); SetGive(false);}}>Students</div>
                <div className="listItem" onClick={() => {SetStd(false); SetCheck(false); SetGive(true);}}>Give Attendance</div>
                <div className="listItem" onClick={() => {SetStd(false); SetCheck(true); SetGive(false);}}>Check Attendance</div>
            </div>
        </div>
        <div className="rightHome">
            <div className="topBar">Attendance System</div>
            <div className="maincontainor">
                {std && <Students/>}
                {give && <GiveAttendance roll={roll} setRoll={setRoll} name={name} setName={setName} checkin={checkin} setCheckin={setCheckin} checkout={checkout} setCheckout={setCheckout}/>}
                {check && <CheckAtd roll={roll} checkin={checkin} checkout={checkout}/>}
            </div>
        </div>
    </div>
  )
}
