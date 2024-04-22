import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useAnimation = <Props extends Record<string, any>>(
  initialize: boolean,
  init: () => Promise<Props> | Props,
  draw: (
    clock: { time: number; timeDelta: number },
    props: Props,
  ) => Partial<Props> | void,
  updates: {
    setup: (props: Props) => Partial<Props> | void
    deps?: any[]
    cleanup?: (props: Props) => void
  }[] = [],
) => {
  const props = useRef<Props>({} as Props)
  const [started, setStarted] = useState(false)

  const drawMemo = useCallback(draw, [])
  const initMemo = useCallback(init, [])

  const start = async () => {
    const newProps = await initMemo()
    props.current = newProps
    setStarted(true)
  }
  useEffect(() => {
    start()
  }, [initialize])

  const updateProps = (newProps: Partial<Props> | void) => {
    if (newProps) {
      for (let key of Object.keys(newProps)) {
        // @ts-ignore
        props.current[key] = newProps[key]
      }
    }
  }

  for (let { setup, deps = [], cleanup } of updates) {
    useEffect(() => {
      if (!started) return
      const newProps = setup(props.current)
      updateProps(newProps)
      return () => {
        if (cleanup) cleanup(props.current)
      }
    }, [started, ...deps])
  }

  useEffect(() => {
    let frameCounter: number
    let time = 0
    const animationFrame: FrameRequestCallback = (timeDelta) => {
      time += timeDelta / 1000
      const newProps = drawMemo({ time, timeDelta }, props.current)
      updateProps(newProps)
      frameCounter = requestAnimationFrame(animationFrame)
    }
    if (started) {
      frameCounter = requestAnimationFrame(animationFrame)
    }
    return () => {
      frameCounter && cancelAnimationFrame(frameCounter)
    }
  }, [started])

  return { props }
}
