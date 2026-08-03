import { useEffect, useState } from 'react'
import logoWhite from '../assets/logo-mark-white.png'

/** Branded preloader: phoenix rises, progress bar fills, then the overlay fades out. */
export default function Loader() {
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 1500)
    const t2 = setTimeout(() => setGone(true), 2400) // remove from DOM after fade
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (gone) return null
  return (
    <div id="loader" className={done ? 'done' : ''} aria-hidden="true">
      <img src={logoWhite} alt="" />
      <div className="bar">
        <i />
      </div>
      <p>Building People</p>
    </div>
  )
}
