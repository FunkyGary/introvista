import { create } from 'zustand'

interface CollapsedSidebarState {
  isCollapsed: boolean
  toggleCollapsed: () => void
}

const useCollapsedSidebarStore = create<CollapsedSidebarState>((set) => ({
  isCollapsed: false,
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}))

export default useCollapsedSidebarStore
