import { useUserStore } from '@/entities/auth'
import { ModalType } from '@/shared/lib/config'
import { ActionIcon, Avatar, Flex, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { CiLogin } from 'react-icons/ci'

export const LogoutFeature = () => {
	const { user, logout } = useUserStore()

	const handleConfirm = () => {
		modals.openConfirmModal({
			modalId: ModalType.LOGOUT_CONFIRM,
			size: 380,

			children: (
				<Text size="lg" mb={30} className="text-center">
					Вы точно хотите выйти?
				</Text>
			),
			labels: { confirm: 'Выйти', cancel: 'Отмена' },
			onConfirm: () => logout(),
		})
	}

	return (
		<Flex w="100%" align="center" justify="space-between" className="mt-auto ">
			<Flex className="cursor-pointer" align="center">
				<Avatar bg="color-tertiary" color="bg-fill" />

				<Flex direction="column" ml={12}>
					<Text size="sm" fw={500} className="text-gray-300">
						{user?.firstName} {user?.lastName}
					</Text>
				</Flex>
			</Flex>

			<ActionIcon
				variant="white"
				size={32}
				className="border-none"
				classNames={{
					root: 'border-none',
				}}
				onClick={handleConfirm}
			>
				<CiLogin className="text-gray-500 w-6 h-6" />
			</ActionIcon>
		</Flex>
	)
}
