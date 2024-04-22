import { pointsToBezier, subdivideLine } from '@util/svg'
import { Pt } from 'pts'
import { useEffect, useRef } from 'react'
import p5 from 'p5'

export default function Cover() {
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const frameRef = useRef<HTMLDivElement>(null!)

  const generateProps = () => {
    const path = frameRef.current!.querySelector('#leafCurve')!

    const p = new p5((p: p5) => {
      const { height, width } = frameRef.current.getBoundingClientRect()
      p.createCanvas(width, height, p.WEBGL, canvasRef.current)
      let x = -p.width / 2,
        y = -p.height / 2
      p.colorMode(p.HSL, 1)
      p.strokeWeight(1)
      p.background(40 / 360, 0.55, 0.91)

      const SIZE = 4
      const VARIATION = 1
      while (x < p.width / 2) {
        p.stroke(40 / 360, 0.55, 0.87 + p.random(-0.05))
        x += SIZE

        // p.stroke(244 / 256, 237 / 256, 223 / 256 + p.random(-0.1, 0.1))
        p.line(
          x + p.random(-VARIATION, VARIATION),
          -p.height / 2,
          x + p.random(-VARIATION, VARIATION),
          p.height / 2,
        )
      }
      while (y < p.height / 2) {
        p.stroke(40 / 360, 0.55, 0.87 + p.random(-0.05))
        y += SIZE
        // p.stroke(244 / 256, 237 / 256, 223 / 256 + p.random(-0.1, 0.1))
        p.line(
          -p.width / 2,
          y + p.random(-VARIATION, VARIATION),
          p.width / 2,
          y + p.random(-VARIATION, VARIATION),
        )
      }
    })

    return { p, path }
  }
  const props = useRef({} as ReturnType<typeof generateProps>)

  useEffect(() => {
    props.current = generateProps()
  }, [])

  // const animation = useCallback((time: number) => {
  //   const { gl, path, line } = props.current

  //   // path.setAttribute(
  //   //   'd',
  //   //   pointsToBezier(
  //   //     line.map((x, i) => {
  //   //       return x
  //   //         .clone()
  //   //         .add(
  //   //           math.sin((time / (Math.PI * 2)) * 20 + i * Math.PI * 0.8) * 0.05,
  //   //           0,
  //   //         )
  //   //     }),
  //   //   ),
  //   // )
  // }, [])

  // const time = useRef(0)

  // useInterval(() => {
  //   time.current += 1 / (1000 / frameRate)
  //   console.log(time)

  //   animation(time.current)
  // }, frameRate)

  return (
    <div ref={frameRef} className="-z-10 absolute top-0 left-0 h-full w-full">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 !h-full !w-full"
      ></canvas>
    </div>
  )
}
