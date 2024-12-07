import { useUserStore } from '@/entities/auth'
import { Navigate } from 'react-router-dom'
import { routes } from '../config'

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const { accessToken } = useUserStore()
	if (!accessToken) {
		return <Navigate to={routes.login} replace />
	}

	return children
}
