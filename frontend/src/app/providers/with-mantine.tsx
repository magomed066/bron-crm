import { ReactNode } from 'react'
import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import '@mantine/core/styles.css'
import { ModalsProvider } from '@mantine/modals'
import { manTineColors } from '@/shared/lib/config'

const theme = createTheme({
	colors: manTineColors,
})

export const withMantine = (component: () => ReactNode) => () => {
	return (
		<MantineProvider theme={theme}>
			<Notifications position="top-right" />
			<ModalsProvider>{component()}</ModalsProvider>
		</MantineProvider>
	)
}
