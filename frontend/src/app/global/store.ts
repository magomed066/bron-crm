import { create } from 'zustand'

type NavbarStore = {
	mobileOpened: boolean
	desktopOpened: boolean
	toggleMobile(): void
	toggleDesktop(): void
}

export const useNavbarStore = create<NavbarStore>((set) => ({
	desktopOpened: true,
	mobileOpened: false,
	toggleMobile() {
		set((prev) => ({ ...prev, mobileOpened: !prev.mobileOpened }))
	},
	toggleDesktop() {
		set((prev) => ({ ...prev, desktopOpened: !prev.desktopOpened }))
	},
}))
