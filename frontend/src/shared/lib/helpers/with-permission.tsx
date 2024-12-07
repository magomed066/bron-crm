// import { FC, ReactNode } from 'react'
// import { permissions, Resource } from '../config/roles'
// import { Navigate } from 'react-router-dom'
// import { routes } from '../config'

// type Props = {
// 	userId: number
// 	access?: Resource
// 	children: ReactNode
// 	isPage?: boolean
// }

// export const WithPermission: FC<Props> = ({
// 	userId,
// 	access,
// 	children,
// 	isPage,
// }) => {
// 	const permission = permissions[userId]

// 	const isPermission = access ? permission.accesses.includes(access) : false

// 	if (isPermission) {
// 		return children
// 	}

// 	return isPage ? <Navigate to={routes.orders} /> : null
// }
