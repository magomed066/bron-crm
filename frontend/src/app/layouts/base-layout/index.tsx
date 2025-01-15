import { Outlet } from 'react-router-dom'
import { AppShell, Burger, Group, Image } from '@mantine/core'
import Logo from '@/assets/logo.jpg'
import { SidebarWidget } from '@/widgets/sidebar'
import { useNavbarStore } from '@/app/global/store'

export const BaseLayout = () => {
	const { mobileOpened, desktopOpened, toggleDesktop, toggleMobile } =
		useNavbarStore()

	return (
		<AppShell
			header={{ height: 70 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
			}}
			classNames={{
				main: 'h-full bg-slate-50',
			}}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger
						opened={mobileOpened}
						onClick={toggleMobile}
						hiddenFrom="sm"
						size="sm"
					/>
					<Burger
						opened={desktopOpened}
						onClick={toggleDesktop}
						visibleFrom="sm"
						size="sm"
					/>

					<Image src={Logo} alt="logo" w={50} h={50} />
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p="md">
				<SidebarWidget />
			</AppShell.Navbar>
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	)
}
