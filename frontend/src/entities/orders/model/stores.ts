import { create } from 'zustand'
import { OrderStore } from './types'

export const useOrderStore = create<OrderStore>((set) => ({
	drawOpened: false,
	setDrawOpened: (value) => {
		set((prev) => ({ ...prev, drawOpened: value }))
	},
}))
