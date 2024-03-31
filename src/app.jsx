import style from './app.module.scss'
import { CountDown } from './CountDown/CountDown'

export function App() {
  return (
    <div className={style.app}>
      <CountDown />
    </div>
  )
}
