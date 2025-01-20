import Sidebar from '@/components/ui/sidebar'

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Sidebar />
      <main className="ml-60 flex-1 pt-16 px-6">{children}</main>
    </>
  )
}
