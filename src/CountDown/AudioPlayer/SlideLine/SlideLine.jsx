import { Slider, Typography } from '@mui/material'
import style from './SlideLine.module.scss'
import { useState, useEffect } from 'react'

export function SlideLine({ audio, handleNext }) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    // Обработчик события для обновления продолжительности трека
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    // Обработчик события для обновления текущего времени воспроизведения
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    // Добавляем обработчики событий
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)

    // Удаляем обработчики событий при размонтировании компонента
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audio])

  useEffect(() => {
    if (audio.ended) {
      handleNext()
    }
  }, [currentTime])

  const handleSliderChange = (event, newValue) => {
    setCurrentTime(newValue)
    audio.currentTime = newValue
  }
  let d
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  return (
    <div className={style.line}>
      <div className={style.time}>
        <Typography sx={{ fontSize: '1.3rem' }} variant='body1'>
          {formatTime(currentTime)}
        </Typography>
        <Typography sx={{ fontSize: '1.3rem' }} variant='body1'>
          {formatTime(duration)}
        </Typography>
      </div>
      <Slider
        sx={{ color: '#36a300' }}
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSliderChange}
      />
    </div>
  )
}
