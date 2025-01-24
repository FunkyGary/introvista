'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useUser } from '@/hooks/use-user'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthClient } from '@/hooks/use-auth-client'
import Link from 'next/link'
import ProjectSelector from './project-select'
import BreadcrumbWithMegaMenu from '@/components/ui/breadcrumb-with-mega-menu'

const HeaderBar = () => {
  const session = useUser()
  const authClient = useAuthClient()
  const router = useRouter()
  const handleLogout = async () => {
    await authClient.signOut()
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-300 shadow-md shadow-slate-400/15">
      <div className="relative flex justify-center items-center w-full h-16 ">
        <BreadcrumbWithMegaMenu />
        <Link
          href={'/'}
          className="inline-flex fixed left-0 flex-shrink gap-4 justify-center items-center w-60"
        >
          <img className="size-8" src="/assets/logo.svg" alt="logo" />
          <h1 className="text-3xl font-medium text-primary-main">IntroVista</h1>
        </Link>
        <div className="fixed left-60 z-50">
          <ProjectSelector />
        </div>
        <div className="fixed right-4 z-50">
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
