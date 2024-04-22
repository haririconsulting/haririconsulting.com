export default function Banner({
  children,
  background,
}: React.PropsWithChildren & { background: React.ReactNode }) {
  return (
    <div className="h-[50vh] w-screen flex items-center justify-center relative">
      <div className="absolute top-0 left-0 h-full w-full">{background}</div>
      {children}
    </div>
  )
}
