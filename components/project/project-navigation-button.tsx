'use client'

import React from 'react'
import { Share2, Mail, Download, Pencil } from 'lucide-react'
import { ROUTES } from '@/paths'

const navItems = [
  {
    icon: <Pencil size={14} />,
    text: '返回3D編輯器',
    href: ROUTES.DESIGNER.EDITOR,
  },
  { icon: <Download size={14} />, text: '列印', href: '' },
  { icon: <Share2 size={14} />, text: '分享', href: '' },
  { icon: <Mail size={14} />, text: '糾紛投訴', href: '' },
]

const NavButton = ({
  icon,
  text,
  href,
}: {
  icon: JSX.Element
  text: string
  href: string
}) => {
  return (
    <a
      href={href}
      className="flex gap-2 justify-center items-center py-1 px-2 text-xs font-semibold rounded-md border text-primary-500 border-primary-500 hover:bg-primary-500 hover:text-white "
    >
      {icon}
      {text}
    </a>
  )
}

const ProjectNavigationButton = () => {
  return (
    <div className="flex justify-end w-full">
      <div className="grid grid-cols-4 gap-4">
        {navItems.map((item, index) => (
          <NavButton key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default ProjectNavigationButton
