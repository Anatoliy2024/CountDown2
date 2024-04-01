import { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import { PlayArrow, Pause, SkipPrevious, SkipNext } from '@mui/icons-material'
import { ValueSlider } from './ValueSlider/ValueSlider'
import { SlideLine } from './SlideLine/SlideLine'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'

import sounds from './base/sound.js'

import style from './AudioPlayer.module.scss'

const AudioPlayer = ({ setIsAudioPlayer }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isbuttonOther, setIsButtonOther] = useState(false)
  const [isRandomMusic, setIsRandomMusic] = useState(false)
  const [isPlayList, setIsPlayList] = useState(false)
  const [soundList, setSoundList] = useState('DRADGE')
  const [indexMusic, setIndexMusic] = useState(0)
  const [arrayRandomNumber, setArrayRandomNumber] = useState(null)

  const soundsList = sounds[soundList]

  const { src, artist, melody } = soundsList[indexMusic]
  const [audio] = useState(new Audio(src))
  const randomMusic = () => {
    setIsRandomMusic(!isRandomMusic)
  }

  useEffect(() => {
    if (isRandomMusic === true) {
      if (arrayRandomNumber === null || arrayRandomNumber.length === 0) {
        setArrayRandomNumber(
          // Array.from({ length: soundsList.length }, (_, i) => i)
          [...Array(soundsList.length).keys()]
        )
      }
    } else {
      setArrayRandomNumber([])
    }
  }, [isRandomMusic])

  useEffect(() => {
    if (isRandomMusic) {
      setArrayRandomNumber([...Array(soundsList.length).keys()])
    }

    if (isPlaying) {
      playMusicAuto(0)
    } else {
      setIndexMusic(indexMusic)
      audio.src = soundsList[indexMusic].src
    }
  }, [soundList])

  const playMusicAuto = (index) => {
    setIndexMusic(index)
    audio.src = soundsList[index].src
    audio.play()
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    if (indexMusic > 0) {
      const newIndex = indexMusic - 1
      playMusicAuto(newIndex)
    } else {
      const newIndex = soundsList.length - 1
      playMusicAuto(newIndex)
    }
  }

  const handleNext = () => {
    if (indexMusic < soundsList.length - 1) {
      let newIndex
      if (!isRandomMusic) {
        newIndex = indexMusic + 1
      } else {
        newIndex = randomNumber()
      }
      playMusicAuto(newIndex)
    } else {
      let newIndex
      if (!isRandomMusic) {
        newIndex = 0
      } else {
        newIndex = randomNumber()
      }
      playMusicAuto(newIndex)
    }
  }
  const randomNumber = () => {
    const randomIndex = Math.floor(Math.random() * arrayRandomNumber.length)
    const randomNumber = arrayRandomNumber[randomIndex]
    arrayRandomNumber.splice(randomIndex, 1)

    if (arrayRandomNumber.length === 0) {
      setArrayRandomNumber([...Array(soundsList.length).keys()])
    }
    return randomNumber
  }
  return (
    <div className={style.container}>
      <div className={style.audioPlayer}>
        <div className={style.audioPlayerBox}>
          <div
            onClick={() => {
              setIsAudioPlayer(false)
            }}
            className={style.close}
          >
            &#10008;
          </div>
          <div className={style.title}>
            <span>{artist}</span>
            <span>{melody}</span>
          </div>

          <img className={style.img} src='https://picsum.photos/200' alt='' />
          <SlideLine audio={audio} handleNext={handleNext} />

          <div className={style.buttonAndValue}>
            <ValueSlider className={style.valueSlider} audio={audio} />

            <div className={style.button}>
              <IconButton onClick={handlePrevious} className={style.boxButton}>
                <SkipPrevious className={style.buttonPlay} />
              </IconButton>
              <IconButton onClick={togglePlay} className={style.boxButton}>
                {isPlaying ? (
                  <Pause className={style.buttonPlay2} />
                ) : (
                  <PlayArrow className={style.buttonPlay2} />
                )}
              </IconButton>
              <IconButton onClick={handleNext} className={style.boxButton}>
                <SkipNext className={style.buttonPlay} />
              </IconButton>
              <div
                className={style.buttonOther}
                // onClick={() => setIsButtonOther(!isbuttonOther)}
                onMouseEnter={() => setIsButtonOther(true)}
                onMouseLeave={() => setIsButtonOther(false)}
              >
                {!isbuttonOther && (
                  <IconButton className={style.boxButton}>
                    <SettingsApplicationsIcon className={style.buttonPlay3} />
                  </IconButton>
                )}

                {isbuttonOther && (
                  <>
                    <IconButton
                      className={style.boxButton}
                      onClick={randomMusic}
                    >
                      <ShuffleIcon
                        className={
                          !isRandomMusic
                            ? `${style.buttonPlay3}`
                            : `${style.buttonPlay3} ${style.buttonActive}`
                        }
                      />
                    </IconButton>

                    <IconButton
                      className={`${style.boxButton} ${style.containerPlayList}`}
                      onClick={() => setIsPlayList(!isPlayList)}
                    >
                      <MenuIcon
                        className={
                          !isPlayList
                            ? `${style.buttonPlay3}`
                            : `${style.buttonPlay3} ${style.buttonActive}`
                        }
                      />
                      {isPlayList && (
                        <div
                          className={style.playList}
                          style={{
                            top: `${-30 * Object.keys(sounds).length - 10}px`,
                          }}
                        >
                          <ul>
                            {Object.keys(sounds).map((el) => (
                              <li
                                onClick={() => {
                                  setSoundList(el)
                                  setIsButtonOther(false)
                                  setIsPlayList(false)
                                }}
                              >
                                {el}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </IconButton>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
