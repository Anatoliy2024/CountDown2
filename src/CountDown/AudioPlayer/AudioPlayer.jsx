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
// console.log(sounds.DRADGE)
// const sounds1 = [
//   {
//     artist: 'Dredge',
//     melody: 'MainTheme',
//     src: '/CountDown2/audio/MainTheme.mp3',
//   },
//   {
//     artist: 'Dredge',
//     melody: 'TheCollapsedTown',
//     src: '/CountDown2/audio/TheCollapsedTown.mp3',
//   },
//   {
//     artist: 'Dredge',
//     melody: 'TheDoldrums',
//     src: '/CountDown2/audio/TheDoldrums.mp3',
//   },
//   {
//     artist: 'Dredge',
//     melody: 'TheExodus',
//     src: '/CountDown2/audio/TheExodus.mp3',
//   },
//   {
//     artist: 'Dredge',
//     melody: 'TheGlassJourney',
//     src: '/CountDown2/audio/TheGlassJourney.mp3',
//   },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheLeftBehind',
//   //   src: '/CountDown2/audio/TheLeftBehind.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheLighthouse',
//   //   src: '/CountDown2/audio/TheLighthouse.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheMorning_sPlans',
//   //   src: '/CountDown2/audio/TheMorning_sPlans.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheParasite',
//   //   src: '/CountDown2/audio/TheParasite.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'ThePathtotheDoor',
//   //   src: '/CountDown2/audio/ThePathtotheDoor.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'ThePeriphery',
//   //   src: '/CountDown2/audio/ThePeriphery.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'ThePiercingWind',
//   //   src: '/CountDown2/audio/ThePiercingWind.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheResilientTraveller',
//   //   src: '/CountDown2/audio/TheResilientTraveller.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheRestlessTown',
//   //   src: '/CountDown2/audio/TheRestlessTown.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheShelter',
//   //   src: '/CountDown2/audio/TheShelter.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheSunkenMemory',
//   //   src: '/CountDown2/audio/TheSunkenMemory.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheTumblingRocks',
//   //   src: '/CountDown2/audio/TheTumblingRocks.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheTwinnedTown',
//   //   src: '/CountDown2/audio/TheTwinnedTown.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheVaultedWalls',
//   //   src: '/CountDown2/audio/TheVaultedWalls.mp3',
//   // },
//   // {
//   //   artist: 'Dredge',
//   //   melody: 'TheWinnowedTown',
//   //   src: '/CountDown2/audio/TheWinnowedTown.mp3',
//   // },
// ]
// const sounds2 = [
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Asylum',
//     src: '/CountDown2/audio/HMM4/Asylum.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'AWiseTail',
//     src: '/CountDown2/audio/HMM4/AWiseTail.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Castle Stronghold',
//     src: '/CountDown2/audio/HMM4/CastleStronghold.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Credit Theme',
//     src: '/CountDown2/audio/HMM4/CreditTheme.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Desolation',
//     src: '/CountDown2/audio/HMM4/Desolation.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Floating Across Water',
//     src: '/CountDown2/audio/HMM4/FloatingAcrossWater.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Hope',
//     src: '/CountDown2/audio/HMM4/Hope.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Necropolis',
//     src: '/CountDown2/audio/HMM4/Necropolis.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Searching For A Dream',
//     src: '/CountDown2/audio/HMM4/SearchingForADream.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Subterranean',
//     src: '/CountDown2/audio/HMM4/Subterranean.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'The Academy Of Honor',
//     src: '/CountDown2/audio/HMM4/TheAcademyOfHonor.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'The Gathering Storm',
//     src: '/CountDown2/audio/HMM4/TheGatheringStorm.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'The Haven',
//     src: '/CountDown2/audio/HMM4/TheHaven.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'The Last Battle',
//     src: '/CountDown2/audio/HMM4/TheLastBattle.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'The Mountain Song',
//     src: '/CountDown2/audio/HMM4/TheMountainSong.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'The Prayer',
//     src: '/CountDown2/audio/HMM4/ThePrayer.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'The Preserve',
//     src: '/CountDown2/audio/HMM4/ThePreserve.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Valhalla',
//     src: '/CountDown2/audio/HMM4/Valhalla.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Wandering',
//     src: '/CountDown2/audio/HMM4/Wandering.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Battle I',
//     src: '/CountDown2/audio/HMM4/BattleI.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Battle II',
//     src: '/CountDown2/audio/HMM4/BattleII.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Battle III',
//     src: '/CountDown2/audio/HMM4/BattleIII.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Battle IV',
//     src: '/CountDown2/audio/HMM4/BattleIV.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Battle V',
//     src: '/CountDown2/audio/HMM4/BattleV.mp3',
//   },
//   {
//     artist: 'Paul Romero, Rob King',
//     melody: 'Battle VI',
//     src: '/CountDown2/audio/HMM4/BattleVI.mp3',
//   },
// ]
const AudioPlayer = ({ setIsAudioPlayer }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isbuttonOther, setIsButtonOther] = useState(false)
  const [isRandomMusic, setIsRandomMusic] = useState(false)
  const [indexMusic, setIndexMusic] = useState(0)
  const [arrayRandomNumber, setArrayRandomNumber] = useState(null)

  const soundsList = sounds.DRADGE
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
  // const generationUniqueNumbers = () => {

  //   let numbers = Array.from({ length: soundsList.length }, (_, i) => i + 1)
  //   let uniqueNumbers =[]
  //   const randomIndex =Math.floor(Math.random() * soundsList.length)
  //   newIndex = numbers[randomIndex]
  //   uniqueNumbers.push(newIndex)
  //   numbers.splice(randomIndex,1)

  // }
  // generationUniqueNumbers()
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
      setIndexMusic(newIndex)
      audio.src = soundsList[newIndex].src
      audio.play()
      setIsPlaying(true)
    } else {
      const newIndex = soundsList.length - 1
      setIndexMusic(newIndex)
      audio.src = soundsList[newIndex].src
      audio.play()
      setIsPlaying(true)
    }
  }

  const handleNext = () => {
    if (indexMusic < soundsList.length - 1) {
      let newIndex
      if (!isRandomMusic) {
        newIndex = indexMusic + 1
      } else {
        const randomIndex = Math.floor(Math.random() * arrayRandomNumber.length)
        const randomNumber = arrayRandomNumber[randomIndex]
        arrayRandomNumber.splice(randomIndex, 1)
        console.log(randomIndex)
        console.log(randomNumber)
        console.log(arrayRandomNumber)
        newIndex = randomNumber
        if (arrayRandomNumber.length === 0) {
          setArrayRandomNumber([...Array(soundsList.length).keys()])
        }
      }
      setIndexMusic(newIndex)
      audio.src = soundsList[newIndex].src
      setIsPlaying(true)
      audio.play()
    } else {
      let newIndex
      if (!isRandomMusic) {
        newIndex = 0
      } else {
        const randomIndex = Math.floor(Math.random() * arrayRandomNumber.length)
        const randomNumber = arrayRandomNumber[randomIndex]
        arrayRandomNumber.splice(randomIndex, 1)
        console.log(randomIndex)
        console.log(randomNumber)
        console.log(arrayRandomNumber)
        newIndex = randomNumber
        if (arrayRandomNumber.length === 0) {
          setArrayRandomNumber([...Array(soundsList.length).keys()])
        }
      }
      setIndexMusic(newIndex)
      audio.src = soundsList[newIndex].src
      setIsPlaying(true)
      audio.play()
    }
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
                    <IconButton className={style.boxButton}>
                      <MenuIcon className={style.buttonPlay3} />
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
