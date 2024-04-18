import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'

export function useWindow() {
  const [thisWindow, setWindow] = useState<typeof window>()

  useEffect(() => {
    setWindow(window)
  }, [])

  return thisWindow
}

export const useDimensions = () => {
  const [{ w, h }, setDimensions] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  })

  useEffect(() => {
    const updateSize = () =>
      setDimensions({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return { w, h }
}

export const lerp = (
  a: number,
  b: number,
  progress: number,
  config = { clamp: true },
) => {
  const value = a + (b - a) * progress
  return config.clamp
    ? _.clamp(value, ...([a, b].sort() as [number, number]))
    : value
}
