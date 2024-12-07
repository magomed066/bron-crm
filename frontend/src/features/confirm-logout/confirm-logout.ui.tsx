import { Button, Flex } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useUserStore } from '@/entities/auth'
import { ModalType } from '@/shared/lib/config'

export const ConfirmLogoutModalFeature = () => {
	const { isLoggingOut, logout } = useUserStore()

	const handleClick = () => {
		setTimeout(() => {
			modals.close(ModalType.LOGOUT_CONFIRM)
		}, 500)
		logout()
	}

	const handleCancel = () => modals.close(ModalType.LOGOUT_CONFIRM)

	return (
		<Flex gap={16}>
			<Button size="sm" onClick={handleCancel} variant="default" c="dark">
				Отменить
			</Button>
			<Button
				size="sm"
				onClick={handleClick}
				loading={isLoggingOut}
				disabled={isLoggingOut}
				variant="filled"
			>
				Да
			</Button>
		</Flex>
	)
}
