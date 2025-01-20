'use client'

import * as React from 'react'
import { CrownSimple as CrownSimpleIcon } from '@phosphor-icons/react/dist/ssr/CrownSimple'
import { useUser } from '@/hooks/use-user'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthClient } from '@/hooks/use-auth-client'
import Link from 'next/link'
import Typography from '@mui/material/Typography'

const HeaderBar = () => {
  const session = useUser()

  const authClient = useAuthClient()
  const router = useRouter()
  const handleLogout = async () => {
    await authClient.signOut()
    router.refresh()
  }
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-300 shadow-xl shadow-slate-100/50 ">
      <div className="flex justify-between items-center px-4 h-16">
        <Link href={'/'} className="inline-flex gap-4 items-center px-3">
          <img className="size-8" src="/assets/logo.svg" alt="logo" />
          <Typography color="#9900FF" variant="h4">
            IntroVista
          </Typography>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="py-1.5 w-28 font-semibold tracking-widest rounded-lg border hover:text-white text-primary-main border-primary-main hover:bg-primary-main"
        >
          登出
        </button>
      </div>
    </header>
  )
}

export default HeaderBar
