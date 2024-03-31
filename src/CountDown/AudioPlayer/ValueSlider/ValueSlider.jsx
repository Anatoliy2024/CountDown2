import style from './ValueSlider.module.scss'
import Stack from '@mui/material/Stack'
import { Slider } from '@mui/material'
import { useState } from 'react'
import VolumeDown from '@mui/icons-material/VolumeDown'

export function ValueSlider({ audio }) {
  const [value, setValue] = useState(100)
  const [showSlider, setShowSlider] = useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue)
    audio.volume = newValue / 100
  }

  return (
    <Stack
      className={style.value}
      spacing={2}
      direction='row'
      sx={{ mb: 1 }}
      alignItems='center'
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <VolumeDown className={style.buttonShow} />
      {/* <VolumeDown className={style.buttonShow} /> */}
      {showSlider && (
        <Slider
          className={style.valueSlider}
          aria-label='Volume'
          value={value}
          onChange={handleChange}
        />
      )}

      {/* <VolumeUp /> */}
    </Stack>
  )
}
