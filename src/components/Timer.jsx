import React, { useState } from 'react'
import useInterval from 'use-interval';
import './Timer.scss';

function Timer() {
    const[second,setSecond] = useState(0);
    const[minute,setMinute]=useState(0);
    const[stop,setStop] = useState(true);
    const[status,setStatus] = useState(false);

    const handleReset=()=>{
        setMinute(0);
        setSecond(0);
        setStop(true);
        setStatus(false);

    }

    useInterval(()=>{
        if(!stop){
            setSecond(second+1);
            //first check if the minute is 30
            if(minute===30){
                handleReset();
            }
            //if the first condition is false let the time go on
            else if(second>=59){
                
                setMinute(minute+1);
                setSecond(0);
            }
            //if all the two conditions are false and minute is over 25 change the status boolean
            else if(minute>=25){
                setStatus(true);
            }
        }
        else{
            return ;
        }
    },1000)

    const handleStop=()=>{
        setStop(value=>!value);
    }

    //change the time into string and add 0 when the time is in single digit
    const handleZeros=(numbers)=>{
        const numberString = numbers.toString();
        if(numberString.length>=2){
            return numberString;
        }
        else{
            return "0".repeat(2-numberString.length)+numberString;
        }
    }

    const getSeconds = handleZeros(second);
    const getMinutes = handleZeros(minute);

    return (
        <div className='TimerContainer'>
            <div className='TimerSubject'>
                <h2 className={status?'StudyNRead unactive':'StudyNRead active'}>Read & Study</h2>
                <h2 className={status?'RestNReview active':'RestNReview unactive'}>Rest & Review</h2>
            </div>
            <div className="TimerTime">
                <p className='Minute'>{getMinutes}</p>
                <p className='Colon'> : </p>
                <p className='Second'>{getSeconds}</p>
            </div>
            <div className="TimerControl">
                <button onClick={handleStop} status="Stop" className={stop?"StartBtn":"StopBtn"}>
                    Start
                </button>
                <button onClick={handleReset} className='ResetBtn'>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Timer