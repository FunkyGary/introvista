'use client'

import * as React from 'react'
import { useUser } from '@/hooks/use-user'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthClient } from '@/hooks/use-auth-client'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import ProjectSelector from './project-select'
import BreadcrumbWithDropdown from '@/components/ui/breadcrumb-with-dropdown'

const HeaderBar = () => {
  const session = useUser()
  const authClient = useAuthClient()
  const router = useRouter()
  const handleLogout = async () => {
    await authClient.signOut()
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-300">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <Link
            href={'/'}
            className="inline-flex gap-4 justify-center items-center w-60"
          >
            <img className="size-8" src="/assets/logo.svg" alt="logo" />
            <h1 className="text-3xl font-medium text-primary-main">
              IntroVista
            </h1>
          </Link>
          <ProjectSelector />
        </div>
        <BreadcrumbWithDropdown />
        <div className="pr-4">
          <button
            type="button"
            onClick={handleLogout}
            className="py-1 w-24 font-semibold tracking-widest rounded-lg border hover:text-white text-primary-main border-primary-main hover:bg-primary-main"
          >
            登出
          </button>
        </div>
      </div>
    </header>
  )
}

export default HeaderBar
