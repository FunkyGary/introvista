'use client'

import { cn } from '@/lib/utils'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { ChevronRight } from 'lucide-react'
import useCollapsedSidebarStore from '@/hooks/use-collapsed-sidebar-store'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { ROUTES } from '@/paths'

const BreadcrumbWithMegaMenu = () => {
  const { isCollapsed } = useCollapsedSidebarStore()
  return (
    <div className="absolute left-0 w-full">
      <NavigationMenu.Root delayDuration={100}>
        <Breadcrumb className="flex justify-center">
          <BreadcrumbList>
            <BreadcrumbItem className="h-16">
              <BreadcrumbLink asChild>
                <Link href={ROUTES.DESIGNER.PRODUCTS.LIST}>
                  <NavigationMenu.List>
                    <NavigationMenu.Item>
                      <NavigationMenu.Trigger className="font-medium hover:underline data-[state=open]:text-primary hover:text-primary-400 hover:text-primary">
                        所有產品
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="absolute top-0 left-0 mt-px w-full border-b shadow-md shadow-slate-400/30 bg-white/60 backdrop-blur-lg border-slate-300">
                        <div className="overflow-y-auto p-4 mx-auto w-full max-w-screen h-[430px]">
                          <div className="grid grid-cols-4 gap-4">
                            <NavigationMenu.Link className="p-4 rounded-lg">
                              col1
                            </NavigationMenu.Link>
                            <NavigationMenu.Link className="p-4 rounded-lg">
                              col2
                            </NavigationMenu.Link>
                            <NavigationMenu.Link className="p-4 rounded-lg">
                              col3
                            </NavigationMenu.Link>
                            <NavigationMenu.Link className="p-4 rounded-lg">
                              col4
                            </NavigationMenu.Link>
                          </div>
                        </div>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="size-4" />
            </BreadcrumbSeparator>
          </BreadcrumbList>
        </Breadcrumb>
        <NavigationMenu.Viewport
          className={cn(
            'relative ml-60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-8 data-[state=closed]:fade-out data-[state=open]:slide-in-from-top-8 data-[state=open]:fade-in',
            isCollapsed ? 'ml-0' : 'ml-60'
          )}
        />
      </NavigationMenu.Root>
    </div>
  )
}

export default BreadcrumbWithMegaMenu
