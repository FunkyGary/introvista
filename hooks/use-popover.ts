import * as React from 'react'

interface PopoverController<T> {
  anchorRef: React.MutableRefObject<T | null>
  handleOpen: () => void
  handleClose: () => void
  handleToggle: () => void
  isOpen: boolean
}

export function usePopover<T = HTMLElement>(): PopoverController<T> {
  const anchorRef = React.useRef<T>(null)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const handleOpen = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleToggle = React.useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])

  return { anchorRef, handleClose, handleOpen, handleToggle, isOpen }
}
