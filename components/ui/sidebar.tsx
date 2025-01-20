'use client'

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {
  ClipboardList,
  Wrench,
  Layers,
  Boxes,
  GraduationCap,
  Settings,
  Bookmark,
  User,
  Folder,
  GalleryThumbnails,
} from 'lucide-react'
import { ROUTES } from '@/paths'
import { useUser } from '@/hooks/use-user'
import Link from 'next/link'

const navItems = [
  {
    label: '專案總覽',
    icon: Folder,
    path: '/projects-overview',
    category: 'project',
  },
  {
    label: '專案管理',
    icon: ClipboardList,
    path: '/project-management',
    category: 'project',
  },
  { label: '工具', icon: Wrench, path: '/tools', category: 'tool' },
  {
    label: '材料挑選器',
    icon: Layers,
    path: '/material-selector',
    category: 'tool',
  },
  {
    label: '常用材料',
    icon: Boxes,
    path: '/common-materials',
    category: 'tool',
  },
  { label: '推薦與教學', icon: Bookmark, path: '/recommendations' },
  { label: '平台教學', icon: GraduationCap, path: '/platform-tutorial' },
]

const editorItem = {
  label: '3D編輯器',
  icon: GalleryThumbnails,
  path: '/designer/3d-editor',
}

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const session = useUser()

  return (
    <aside className="fixed w-60 top-16 h-[calc(100vh-64px)] bg-white border-r border-slate-300">
      <div className="flex overflow-auto relative flex-col h-full">
        {/* Nav items section */}
        <nav className="flex-1 p-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`flex w-full items-center rounded-md px-4 py-2 text-sm transition-colors font-medium
                  ${
                    pathname === item.path
                      ? 'bg-gray-100 text-gray-800'
                      : 'text-gray-600 hover:bg-purple-200 hover:text-purple-700'
                  }`}
              >
                <Icon className="mr-3 w-5 h-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Editor section */}
        <div className="absolute right-0 bottom-[16%]">
          <Link
            href={editorItem.path}
            className="shadow-sm shadow-primary-300/30 inline-flex gap-3 items-center py-2 px-4 pr-8 rounded-l-2xl border border-r-0 border-primary-200 text-primary-500 bg-primary-100 hover:bg-primary-400 hover:text-white transition-colors cursor-pointer"
          >
            <div>
              <editorItem.icon className="w-5 h-5" />
            </div>

            <p className="font-medium tracking-wider">{editorItem.label}</p>
          </Link>
        </div>

        {/* User profile section */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex justify-between items-center px-2 w-full text-sm text-gray-600 rounded-lg">
            <div className="flex items-center">
              <div className="flex justify-center items-center w-8 h-8 bg-gray-100 rounded-full">
                {session.user?.avatar ? (
                  <div>
                    <img
                      src={session.user.avatar}
                      alt="avatar"
                      className="rounded-full size-5"
                    />
                  </div>
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <span className="ml-3">{session.user?.name}</span>
            </div>
            <button>
              <Settings className="ml-auto w-5 h-5 text-gray-500 hover:text-purple-500" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
