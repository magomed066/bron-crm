import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { AppShell, Burger, Group, Image } from '@mantine/core'
import Logo from '@/assets/logo.jpg'
import { SidebarWidget } from '@/widgets/sidebar'

export const BaseLayout = () => {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

	return (
		// <div className="min-h-screen bg-slate-50">
		// 	<Header />

		// 	<div className="mt-4">
		// 		<Container fluid pb={32}>
		// 			<Outlet />
		// 		</Container>
		// 	</div>
		// </div>

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
					{/* <MantineLogo size={30} /> */}

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
