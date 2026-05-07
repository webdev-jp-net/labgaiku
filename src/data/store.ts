import { atom } from 'jotai'
import type { IndexNavigationItem } from '@/app/(contents)/interview/[slug]/_parts/components/IndexNavigation/IndexNavigation'

export const indexNavigationAtom = atom<IndexNavigationItem[]>([])
