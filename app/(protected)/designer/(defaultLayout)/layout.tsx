export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="flex relative justify-between">
      {/* <Sidebar /> */}
      {children}
    </section>
  )
}
