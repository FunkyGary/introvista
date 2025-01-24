'use client'

import React from 'react'
import Link from 'next/link'
import { ROUTES } from '@/paths'
import { Star, Ellipsis } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type ProjectData = {
  id: string
  name: string
  lastUpdated: string
}

interface ProjectProp {
  data: ProjectData
}

const ProjectCard: React.FC<ProjectProp> = ({ data }) => {
  const { id, name, lastUpdated } = data
  const [isStar, setIsStar] = React.useState(false)

  const handleStar = () => {
    setIsStar(!isStar)
    // TODO: Implement star feature with API
  }
  return (
    <div className="mx-auto border w-fit border-slate-600">
      <div className="flex relative flex-grow justify-center items-center">
        <div className="absolute top-4 right-4">
          <button onClick={handleStar}>
            <Star
              strokeWidth={1}
              className={cn(
                'size-8 fill-white text-slate-600 hover:fill-yellow-300/70',
                isStar ? 'fill-yellow-400 ' : ''
              )}
            />
          </button>
        </div>
        <div className="overflow-hidden w-full aspect-square">
          <img alt="prodcut image" src="https://fakeimg.pl/240/" />
        </div>
      </div>
      <div className="inline-flex justify-between items-start py-1.5 px-2 w-full text-slate-600">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-slate-500">{lastUpdated}</p>
        </div>
        <div className="relative mt-1">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" className="bg-white">
              <DropdownMenuItem>
                <button>重新命名</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>修改專案狀態</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={ROUTES.DESIGNER.PROJECTS.DETAILS(id)}>
                  查看價格細節
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>刪除專案</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
