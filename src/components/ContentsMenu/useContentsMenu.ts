import { useEffect, useId } from 'react'
import { useIntersectionObserver } from '@uidotdev/usehooks'

const visibilityMap = new Map<string, boolean>()

const syncHtmlAttribute = () => {
  if (typeof document === 'undefined') return
  const anyVisible = Array.from(visibilityMap.values()).some(Boolean)
  if (anyVisible) {
    delete document.documentElement.dataset.visibleNav
  } else {
    document.documentElement.dataset.visibleNav = ''
  }
}

export const useContentsMenu = () => {
  const id = useId()
  const [ref, entry] = useIntersectionObserver({ threshold: 0 })
  const isVisible = Boolean(entry?.isIntersecting)

  useEffect(() => {
    visibilityMap.set(id, isVisible)
    syncHtmlAttribute()
  }, [id, isVisible])

  useEffect(() => {
    return () => {
      visibilityMap.delete(id)
      syncHtmlAttribute()
    }
  }, [id])

  return ref
}
