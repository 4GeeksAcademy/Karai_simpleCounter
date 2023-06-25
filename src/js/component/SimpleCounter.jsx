import React, { useState, useEffect } from 'react'
import styles from "./Styles.module.css"

const SimpleCounter = () => {

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [secondsTimer, setSecondsTimer] = useState(0)
  const [minutesTimer, setMinutesTimer] = useState(0)
  const [hoursTimer, setHoursTimer] = useState(0)
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [intervalId, setIntervalId] = useState(null)
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(true)
  const [cronometro, setCronometro] = useState(false)
  const [temporizador, setTemporizador] = useState(false)

  //TIME FROM PAGE LOAD
  window.onload = function () {
    startInterval();
  };

  const startInterval = () => {
    const id = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    setIntervalId(id)
  }

  //CRONOMETER TASKS HANDLING
  const usamosCronometro = () => {
    setTiempoTranscurrido(false)
    setCronometro(true)
    setTemporizador(false)
    setSeconds(0)
    setMinutes(0)
    setHours(0)
    clearInterval(intervalId);
    setIntervalId(null);
  }

  const restartInterval = () => {
    const id = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    setIntervalId(id)
  }

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes(minutes => minutes + 1);
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes === 60) {
      setMinutes(0);
      setHours(hours => hours + 1);
    }
  }, [minutes]);

  const restartCronometer = () => {
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  }

  //TIMER TASK HANDLING
  const usamosTemporizador = () => {
    setTiempoTranscurrido(false)
    setCronometro(false)
    setTemporizador(true)
    setSeconds(0)
    setMinutes(0)
    setHours(0)
    clearInterval(intervalId);
    setIntervalId(null);
  }
  const handlerSetHours = (value) => {
    if (value >= 0) {
      setHoursTimer(value)
    }
  }
  const handlerSetMinutes = (value) => {
    if (value > 60 || value < 0) {
      alert("Minutes must be between 0 and 60")
    } else {
      setMinutesTimer(value)
    }
  }
  const handlerSetSeconds = (value) => {
    if (value > 60 || value < 0) {
      alert("Seconds must be between 0 and 60")
    } else {
      setSecondsTimer(value)
    }
  }
  const startIntervalTimer = () => {
    const id = setInterval(() => {
      setSecondsTimer(secondsTimer => secondsTimer - 1);
    }, 1000);
    setIntervalId(id)
  }
  useEffect(() => {
    if (secondsTimer === 0 && minutesTimer > 0) {
      setSecondsTimer(60);
      setMinutesTimer(minutesTimer => minutesTimer - 1);
    }
  }, [secondsTimer]);

  useEffect(() => {
    if (minutesTimer === 0 && hoursTimer > 0) {
      setMinutesTimer(60);
      setHoursTimer(hours => hours - 1);
    }
  }, [minutesTimer]);

  useEffect(() => {
    if (!isFirstRender && hoursTimer === 0 && minutesTimer === 0 && secondsTimer === 0) {
      clearInterval(intervalId);
      setIntervalId(null)
      alert("Your timer is done")
    } else {
      setIsFirstRender(false);
    }
  }, [hoursTimer, minutesTimer, secondsTimer]);

  const pausarIntervalo = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  return (
    <div>
      <div className={styles.centeringdivs}>
        {tiempoTranscurrido &&
          <div>
            <h1>Time from page load:</h1>
            <h1> {hours} : {minutes} : {seconds}</h1>
          </div>
        }
      </div>
      {cronometro &&
        <div className={styles.centeringdivs}>
          <h1>Cronometer</h1>
          <h1> {hours} : {minutes} : {seconds}</h1>
          <div className="d-flex text-align-center flex-column">
            <button className={`btn btn-dark ${styles.timeControlBtn}`} onClick={restartInterval} type="button">Start</button>
            <button className={`btn btn-dark ${styles.timeControlBtn}`} onClick={pausarIntervalo} type="button">Pause</button>
            <button className={`btn btn-dark ${styles.timeControlBtn}`} onClick={restartCronometer} type="button">Restart</button>
          </div>
        </div>
      }
      {temporizador &&
        <div className={styles.centeringdivs}>
          <h1>Timer</h1>
          <h1> {hoursTimer} : {minutesTimer} : {secondsTimer}</h1>
          <div className={styles.centeringinputs}>
            <p><strong>Set your timer:</strong></p>
            <input className={styles.inputsTimer} type="text" onChange={(e) => handlerSetHours(e.target.value)} placeholder='Hours'></input>
            <input className={styles.inputsTimer} type="text" onChange={(e) => handlerSetMinutes(e.target.value)} placeholder='Minutes'></input>
            <input className={styles.inputsTimer} type="text" onChange={(e) => handlerSetSeconds(e.target.value)} placeholder='Seconds'></input>
          </div>
          <div className="d-flex text-align-center flex-column">
            <button className={`btn btn-dark ${styles.timeControlBtn}`} onClick={startIntervalTimer} type="button">Start</button>
            <button className={`btn btn-dark ${styles.timeControlBtn}`} onClick={pausarIntervalo} type="button">Pause</button>
          </div>
        </div>
      }
      <div className={styles.divbottombtn}>
        <button className={`btn btn-dark ${styles.bottombtn}`} onClick={usamosCronometro} type="button">Cronometer</button>
        <button className={`btn btn-dark ${styles.bottombtn}`} onClick={usamosTemporizador} type="button">Timer</button>
      </div>
    </div>
  )
}

export default SimpleCounter