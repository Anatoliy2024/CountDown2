import style from './CountDown.module.scss'
import { useState, useEffect } from 'react'
import AudioPlayer from './AudioPlayer/AudioPlayer'
// import { Opacity } from '@mui/icons-material'

export function CountDown() {
  const [audio] = useState(new Audio('/CountDown2/timer.mp3'))
  const optionChange =
    JSON.parse(localStorage.getItem('optionSettings')) || false

  const [options, setOptions] = useState(optionChange)

  const titleGet = JSON.parse(localStorage.getItem('title')) || ''

  const [title, setTitle] = useState(titleGet)
  const [newGoal, setNewGoal] = useState({
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  })

  const finishMsecGet = JSON.parse(localStorage.getItem('finishMsec')) || 0

  const [finishMsec, setFinishMsec] = useState(finishMsecGet)

  const finishDataGet = JSON.parse(localStorage.getItem('finishData')) || {
    time: '',
    data: '',
  }

  const [finishData, setFinishData] = useState(finishDataGet)

  const [isAudioPlayer, setIsAudioPlayer] = useState(false)

  const [isStart, setIsStart] = useState(false)
  const calculatedFinish = (days = 0, hours = 0, minutes = 0, seconds = 0) => {
    if (seconds > 59) {
      seconds = 60
    }
    if (minutes > 59) {
      minutes = 60
    }
    if (hours > 23) {
      hours = 24
    }
    const sumNumber =
      seconds * 1000 +
      minutes * 60 * 1000 +
      hours * 60 * 1000 * 60 +
      days * 60 * 1000 * 60 * 24

    const finishData = Date.now() + sumNumber
    const newDate = new Date(finishData)
    setFinishMsec(finishData)

    setFinishData({
      time: newDate.toLocaleTimeString('it-IT'),
      data: newDate.toLocaleDateString(),
    })
  }

  useEffect(() => {
    let interval
    if (!options) {
      localStorage.setItem('optionSettings', JSON.stringify(options))
      localStorage.setItem('title', JSON.stringify(title))

      interval = setInterval(() => {
        const different = finishMsec - Date.now()
        if (different > 0) {
          const days = Math.floor(different / 24 / 60 / 60 / 1000)
          const hours = Math.floor(
            (different - days * 24 * 60 * 60 * 1000) / 60 / 60 / 1000
          )
          const minutes = Math.floor(
            (different - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) /
              60 /
              1000
          )
          const seconds = Math.floor(
            (different -
              days * 24 * 60 * 60 * 1000 -
              hours * 60 * 60 * 1000 -
              minutes * 60 * 1000) /
              1000
          )
          setNewGoal({ days, hours, minutes, seconds })
        } else {
          clearInterval(interval)
          setNewGoal({ days: 0, hours: 0, minutes: 0, seconds: 0 })
          if (isStart) {
            //под вопросом
            audio.play()
            setIsStart(false)
            setTimeout(() => {
              audio.pause()
              audio.currentTime = 0
            }, 7000)
          }
        }
      }, 1000)
    } else if (options) {
      localStorage.setItem('optionSettings', JSON.stringify(options))
      setNewGoal({ days: '', hours: '', minutes: '', seconds: '' })
      clearInterval(interval)
      setIsStart(false)
    }
    return () => clearInterval(interval)
  }, [options, isStart])

  useEffect(() => {
    if (!options) {
      localStorage.setItem('finishMsec', JSON.stringify(finishMsec))
      localStorage.setItem('finishData', JSON.stringify(finishData))
    } else {
      localStorage.setItem('finishMsec', JSON.stringify(''))
      localStorage.setItem('finishData', JSON.stringify(''))
    }
  }, [options])

  const startTimer = () => {
    let { days, hours, minutes, seconds } = newGoal

    if (title.length > 0) {
      if (!days || !hours || !minutes || !seconds) {
        setNewGoal(() => {
          return {
            days: days || 0,
            hours: hours || 0,
            minutes: minutes || 0,
            seconds: seconds || 0,
          }
        })
      }
      calculatedFinish(
        newGoal.days,
        newGoal.hours,
        newGoal.minutes,
        newGoal.seconds
      )
      setIsStart(true)
      setOptions(false)
    } else {
      alert('Пожалуйста введите событие')
    }
  }
  const closeTimer = () => {
    setTitle('')
    setNewGoal({
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
    })
    setOptions(true)
  }

  return (
    <div className={style.containerCountDown}>
      {options && (
        <div className={style.countDown}>
          <div className={style.titleOption}>
            <label htmlFor='someText'>Какое событие вы ждёте</label>
            <input
              id='someText'
              type='text'
              value={title}
              placeholder='Введите событие'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={style.optionTime}>
            <div>
              <label htmlFor='days'>day</label>
              <input
                type='number'
                id='days'
                value={newGoal.days}
                placeholder='X'
                onChange={(e) =>
                  setNewGoal({ ...newGoal, days: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor='hours'>hours</label>
              <input
                type='number'
                id='hours'
                value={newGoal.hours}
                placeholder='X'
                onChange={(e) =>
                  setNewGoal({ ...newGoal, hours: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor='minutes'>min</label>
              <input
                type='number'
                id='minutes'
                value={newGoal.minutes}
                placeholder='X'
                onChange={(e) =>
                  setNewGoal({ ...newGoal, minutes: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor='seconds'>sec</label>
              <input
                type='number'
                id='seconds'
                value={newGoal.seconds}
                placeholder='X'
                onChange={(e) =>
                  setNewGoal({ ...newGoal, seconds: e.target.value })
                }
              />
            </div>
          </div>
          <button onClick={startTimer}>Старт</button>
        </div>
      )}
      {!options && (
        <div className={style.countDown}>
          <h1>{title ? title : 'SomeText'}</h1>
          <div onClick={closeTimer} className={style.close}>
            &#x2715;
          </div>
          <img
            onClick={() => setIsAudioPlayer(true)}
            src='/CountDown2/iconPlay.png'
            alt=''
          />
          <div className={style.timerFull}>
            <div>
              <span>{newGoal.days}</span>
              <span>DAYS</span>
            </div>
            <div>
              <span>{newGoal.hours}</span>
              <span>HOURS</span>
            </div>
            <div>
              <span>{newGoal.minutes}</span>
              <span>MINUTES</span>
            </div>
            <div>
              <span>{newGoal.seconds}</span>
              <span>SECONDS</span>
            </div>
          </div>
          <div
            style={{ textAlign: 'center', fontSize: '30px', marginTop: '20px' }}
          >
            {finishData ? (
              <>
                <span>Finish Timer:</span> {finishData.time} : {finishData.data}
              </>
            ) : null}
          </div>
        </div>
      )}
      <div
        className={style.containerPlayer}
        style={{
          display: isAudioPlayer ? 'block' : 'none',
        }}
      >
        <AudioPlayer setIsAudioPlayer={setIsAudioPlayer} />
      </div>
    </div>
  )
}
