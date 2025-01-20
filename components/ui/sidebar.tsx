'use client'

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  ClipboardList,
  Wrench,
  Layers,
  Boxes,
  GraduationCap,
  Store,
  Settings,
  User,
  Box,
} from 'lucide-react'
import { ROUTES } from '@/paths'

const navItems = [
  { label: '專案總覽', icon: LayoutDashboard, path: '/projects-overview' },
  { label: '專案管理', icon: ClipboardList, path: '/project-management' },
  { label: '工具', icon: Wrench, path: '/tools' },
  { label: '材料挑選器', icon: Layers, path: '/material-selector' },
  { label: '常用材料', icon: Boxes, path: '/common-materials' },
  { label: '推薦與教學', icon: GraduationCap, path: '/recommendations' },
  { label: '平台教學', icon: GraduationCap, path: '/platform-tutorial' },
  { label: '廠商後台', icon: Store, path: '/vendor-dashboard' },
  { label: '產品上架', icon: Boxes, path: '/product-upload' },
  { label: '3D編輯器', icon: Box, path: '/3d-editor' },
]

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="fixed w-60 top-16 h-[calc(100vh-64px)] bg-white border-r border-slate-300">
      <div className="flex h-full flex-col overflow-auto">
        {/* Nav items section */}
        <nav className="flex-1 space-y-1 p-5">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`flex w-full items-center px-4 py-2 text-sm transition-colors
                  ${
                    pathname === item.path
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* User profile section */}
        <div className="border-t border-gray-200 p-3">
          <div className="flex w-full items-center justify-between px-2 rounded-lg  text-sm text-gray-600">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <span className="ml-3">Penny</span>
            </div>
            <button>
              <Settings className="ml-auto h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
