'use client'

import { cn } from '@/lib/utils'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { ChevronRight } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const BreadcrumbWithDropdown = () => {
  return (
    <div className="relative w-full">
      <NavigationMenu.Root delayDuration={100}>
        <Breadcrumb className="flex justify-center mr-16">
          <BreadcrumbList>
            <BreadcrumbItem className="h-16">
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger className="font-medium data-[state=open]:text-primary hover:text-primary">
                    所有產品
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute left-0 mt-px w-full border-b shadow-md shadow-slate-400/30 bg-white/70 backdrop-blur-md border-slate-300">
                    <div className="overflow-y-auto p-4 mx-auto w-full max-w-screen h-[430px]">
                      <div className="grid grid-cols-4 gap-4">
                        <NavigationMenu.Link className="p-4 rounded-lg hover:bg-slate-50">
                          col1
                        </NavigationMenu.Link>
                        <NavigationMenu.Link className="p-4 rounded-lg hover:bg-slate-50">
                          col2
                        </NavigationMenu.Link>
                        <NavigationMenu.Link className="p-4 rounded-lg hover:bg-slate-50">
                          col3
                        </NavigationMenu.Link>
                        <NavigationMenu.Link className="p-4 rounded-lg hover:bg-slate-50">
                          col4
                        </NavigationMenu.Link>
                      </div>
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="size-4" />
            </BreadcrumbSeparator>
          </BreadcrumbList>
        </Breadcrumb>
        <NavigationMenu.Viewport className="w-[calc(100vw-240px)] fixed right-0  z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-8 data-[state=closed]:fade-out data-[state=open]:slide-in-from-top-8 data-[state=open]:fade-in" />
      </NavigationMenu.Root>
    </div>
  )
}

export default BreadcrumbWithDropdown
