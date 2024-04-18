import { Link, Outlet, useMatch, useParams } from '@remix-run/react'
import { Pt } from 'pts'
import { useMemo } from 'react'
import { useAnimation } from '@util/Anim'
import { useEventListener } from '@util/util'

function Blob({ to, order }: { to: string; order: number }) {
  const position = useMemo(
    () => new Pt(0, -0.25).rotate2D((order / 3) * Math.PI * 2),
    [],
  )
  const { role } = useParams()

  const props = useAnimation(
    true,
    () => ({
      currentPosition: position,
    }),
    () => {},
  )
  useEventListener('mousemove', (ev) => {})

  return (
    <Link
      to={to}
      preventScrollReset
      className={`h-[50%] min-h-[100px] aspect-square !transition-[transform,left,top,border-color] !duration-500 circle -translate-x-1/2 -translate-y-1/2 absolute hover:scale-125 hover:brightness-125 hover:z-10 ${role === to ? 'scale-125 brightness-125 border-white' : 'border-transparent'} border !bg-slate-700/50`}
      style={{
        left: !role
          ? `calc(50% + ${position.x * 100}vh)`
          : `${order * 33 + 16}%`,
        top: !role ? `calc(50% + ${position.y * 100}vh)` : `50%`,
      }}
    >
      {to}
    </Link>
  )
}

export default function Portfolio() {
  const { role, slug } = useParams()
  console.log(role)

  return (
    <>
      <Link
        to="/portfolio"
        className={`${role ? 'h-[150px]' : 'h-[calc(100vh-100px)]'} transition-[height] duration-500 flex items-center justify-around -mt-2 relative`}
      >
        <Blob to="artist" order={0} />
        <Blob to="researcher" order={1} />
        <Blob to="designer" order={2} />
      </Link>
      <Outlet />
    </>
  )
}
