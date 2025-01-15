import { ReactNode } from 'react'
import { Roles } from './roles'
import { routes } from './routes'

import { FaClipboardList } from 'react-icons/fa'
import { PiBuildings } from 'react-icons/pi'
import { FaUsers } from 'react-icons/fa6'
import { TbCategory } from 'react-icons/tb'
import { LiaBusinessTimeSolid } from 'react-icons/lia'

type NavLink = {
	link: string
	label: string
	icon: ReactNode
	links?: NavLink[]
	roles: Roles[] // Recursive type for nested links
}

export const menuLinks: NavLink[] = [
	{
		link: `${routes.orders}?ordersPage=1`,
		label: 'Заказы',
		links: [],
		icon: <FaClipboardList className="text-white" size={18} />,
		roles: [Roles.Admin, Roles.Worker],
	},
	{
		link: routes.branches,
		label: 'Филиалы',
		links: [],
		icon: <PiBuildings className="text-white" size={18} />,
		roles: [Roles.Admin],
	},
	{
		link: routes.employees,
		label: 'Сотрудники',
		links: [],
		icon: <FaUsers className="text-white" size={18} />,
		roles: [Roles.Admin],
	},
	{
		link: routes.categories,
		label: 'Категории',
		links: [],
		icon: <TbCategory className="text-white" size={18} />,
		roles: [Roles.Admin],
	},
	{
		link: routes.services,
		label: 'Услуги',
		links: [],
		icon: <LiaBusinessTimeSolid className="text-white" size={18} />,
		roles: [Roles.Admin],
	},
]
