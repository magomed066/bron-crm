import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { Box, Flex } from '@mantine/core'
import { menuLinks } from '@/shared/lib/config'
import { UserInfoFeature } from '@/features/user-info'

export const SidebarWidget = () => {
	const links = menuLinks.map((item) => (
		<NavLink
			className={({ isActive }) => {
				return clsx(
					'flex items-center text-sm gap-4 font-medium px-2 py-3 rounded transition text-gray-700 hover:bg-slate-100 hover:text-black [&>*]:hover:text-black',
					isActive ? 'bg-slate-100 ' : '',
				)
			}}
			key={item.link}
			to={item.link}
		>
			<Box
				w={32}
				h={32}
				className="bg-primary rounded-[4px] flex items-center justify-center"
			>
				{item.icon}
			</Box>
			<span>{item.label}</span>
		</NavLink>
	))

	return (
		<nav className="h-full flex flex-col justify-between">
			<Flex direction="column" gap={4}>
				{links}
			</Flex>

			<div className="pt-6 py-2 mt-auto border-t border-gray-300">
				<UserInfoFeature />
			</div>
		</nav>
	)
}
