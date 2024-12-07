import { User } from '@/shared/api/services'

export type AuthFields = {
	password: string
	email: string
}

export type UserStore = {
	accessToken: string | null
	user: User | null
	setTokens: (accessToken: string, refreshToken: string) => void
	clearToken: () => void
	setUser: (data: User) => void
	isLoggingOut: boolean
	logout: () => void
}
