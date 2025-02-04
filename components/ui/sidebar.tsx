'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {
  Wrench,
  GraduationCap,
  Settings,
  User,
  Folder,
  GalleryThumbnails,
  Store,
  ArrowRight,
} from 'lucide-react'
import { ROUTES } from '@/paths'
import { useUser } from '@/hooks/use-user'
import { useUserRole } from '@/hooks/user-user-role'
import Link from 'next/link'

const navItems = [
  {
    category: '專案總覧',
    icon: Folder,
    roles: ['designer'],
    items: [{ label: '專案管理', path: ROUTES.DESIGNER.PROJECTS.LIST }],
  },
  {
    category: '工具與材料',
    icon: Wrench,
    roles: ['designer'],
    items: [
      { label: '材料挑選器', path: ROUTES.DESIGNER.PRODUCTS.LIST },
      { label: '常用材料', path: ROUTES.DESIGNER.FAVORITES },
    ],
  },
  {
    category: '商家中心',
    icon: Store,
    roles: ['supplier'],
    items: [
      { label: '廠商後台', path: '/' },
      { label: '產品上架', path: '/' },
    ],
  },
]

const editorItem = {
  label: '3D編輯器',
  icon: GalleryThumbnails,
  path: ROUTES.DESIGNER.EDITOR,
}

type SidebarProps = {
  isCollapsed: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const pathname = usePathname()
  const router = useRouter()
  const session = useUser()
  const { userRole } = useUserRole()

  const filteredNavItems = navItems.filter((category) =>
    category.roles.includes(userRole as string)
  )

  return (
    <>
      <aside
        className={cn(
          'fixed top-0 h-full bg-slate-50 w-60 border-r border-slate-300',
          isCollapsed ? '-translate-x-60' : 'translate-x-0',
          'transition-all duration-300 ease-in-out delay-100'
        )}
      >
        <div className="flex overflow-auto relative flex-col pt-16 h-full">
          {/* Nav items section */}
          <nav className="flex-1 p-5 space-y-1">
            {filteredNavItems.map((category, index) => {
              const Icon = category.icon
              return (
                <div key={index} className="space-y-1">
                  {/* Category Header */}
                  <div className="flex items-center py-2 px-4 text-sm font-medium text-slate-600">
                    <Icon className="mr-3 w-5 h-5" />
                    <span>{category.category}</span>
                  </div>
                  {/* Category Items */}
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => router.push(item.path)}
                        className={`flex w-full items-center rounded-md pl-12 pr-4 py-2 text-sm transition-colors font-medium
                        ${
                          pathname === item.path
                            ? 'bg-primary-100/80 text-primary-500'
                            : 'text-slate-600 hover:bg-primary-100/80 hover:text-primary-500'
                        }`}
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Editor section */}
          {userRole === 'designer' ? (
            <div className="absolute right-0 bottom-52">
              <Link
                href={editorItem.path}
                className="inline-flex gap-3 items-center py-2 px-4 pr-8 rounded-l-2xl border border-r-0 shadow-sm transition-colors cursor-pointer hover:text-white shadow-primary-300/30 border-primary-200 text-primary-500 bg-primary-100 hover:bg-primary-400"
              >
                <div>
                  <editorItem.icon className="w-5 h-5" />
                </div>

                <p className="font-medium tracking-wider">{editorItem.label}</p>
              </Link>
            </div>
          ) : null}

          {/* User profile section */}
          <div className="absolute bottom-0 left-0 p-3 w-full border-t border-slate-200">
            <div className="flex justify-between items-center px-2 w-full text-sm rounded-lg text-slate-600">
              <div className="flex items-center">
                <div className="flex justify-center items-center w-8 h-8 rounded-full bg-slate-100">
                  {session.user?.avatar ? (
                    <div>
                      <img
                        src={session.user.avatar}
                        alt="avatar"
                        className="rounded-full size-5"
                      />
                    </div>
                  ) : (
                    <User className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <span className="ml-3">{session.user?.name}</span>
              </div>
              <button>
                <Settings className="ml-auto w-5 h-5 hover:text-purple-500 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
