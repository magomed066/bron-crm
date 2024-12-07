import React from 'react'
import { routes } from '@/shared/lib/config'
import NotFoundPage from './not-found'

const LoginPage = React.lazy(() => import('./login'))
const OrdersPage = React.lazy(() => import('./orders'))
const BranchesPage = React.lazy(() => import('./branches'))
const CategoriesPage = React.lazy(() => import('./categories'))
const UsersPage = React.lazy(() => import('./users'))
const ProfilePage = React.lazy(() => import('./profile'))
const EmployeesPage = React.lazy(() => import('./employees'))

export const publicRoutes = [
	{
		Component: LoginPage,
		path: routes.login,
	},
]

export const privateRoutes = [
	{
		Component: OrdersPage,
		path: routes.orders,
	},
	{
		Component: BranchesPage,
		path: routes.branches,
	},
	{
		Component: CategoriesPage,
		path: routes.categories,
	},
	{
		Component: UsersPage,
		path: routes.users,
	},
	{
		Component: ProfilePage,
		path: routes.profile,
	},
	{
		Component: EmployeesPage,
		path: routes.employees,
	},
	{
		Component: NotFoundPage,
		path: routes.notFound,
	},
]
