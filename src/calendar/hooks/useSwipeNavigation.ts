import {
  useRef,
  type PointerEvent,
} from 'react'

interface UseSwipeNavigationOptions {
  onSwipeLeft: () => void
  onSwipeRight: () => void
  threshold?: number
}

export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: UseSwipeNavigationOptions) {
  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)

  const reset = () => {
    startX.current = null
    startY.current = null
  }

  const handlePointerDown = (
    event: PointerEvent<HTMLElement>,
  ) => {
    startX.current = event.clientX
    startY.current = event.clientY
  }

  const handlePointerUp = (
    event: PointerEvent<HTMLElement>,
  ) => {
    if (
      startX.current === null ||
      startY.current === null
    ) {
      return
    }

    const deltaX = event.clientX - startX.current
    const deltaY = event.clientY - startY.current

    reset()

    if (Math.abs(deltaX) <= Math.abs(deltaY)) {
      return
    }

    if (Math.abs(deltaX) < threshold) {
      return
    }

    if (deltaX < 0) {
      onSwipeLeft()
      return
    }

    onSwipeRight()
  }

  return {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerCancel: reset,
  }
}