import { Roles } from './roles'
import { routes } from './routes'

type NavLink = {
	link: string
	label: string
	links?: NavLink[]
	roles: Roles[] // Recursive type for nested links
}

export const menuLinks: NavLink[] = [
	{
		link: `${routes.orders}?orderPage=1`,
		label: 'Заказы',
		links: [],
		roles: [Roles.Admin, Roles.Worker],
	},
	{
		link: routes.branches,
		label: 'Филиалы',
		links: [],
		roles: [Roles.Admin],
	},
	{
		link: routes.employees,
		label: 'Сотрудники',
		links: [],
		roles: [Roles.Admin],
	},
	{
		link: routes.categories,
		label: 'Категории',
		links: [],
		roles: [Roles.Admin],
	},
]
