import { ActionIcon, Text } from '@mantine/core'
import { FC } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Props } from './types'
import { modals } from '@mantine/modals'
import { ModalType } from '@/shared/lib/config'
import { useDeleteBranch } from '@/entities/branches'
import { notifications } from '@mantine/notifications'

export const DeleteBranchFeature: FC<Props> = ({ branchId }) => {
	const { mutate } = useDeleteBranch(
		() => {
			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Филиалы',
				message: 'Филиал успешно удалена',
			})
		},
		() => {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Филиалы',
				message: 'Не удалось удалить филиал',
			})
		},
	)

	const handleConfirm = () => {
		if (!branchId) return

		modals.openConfirmModal({
			modalId: ModalType.CONFIRM_DELETE_BRANCH,
			size: 380,
			children: (
				<Text size="lg" mb={30} className="text-center">
					Вы точно хотите удалить этот филиал?
				</Text>
			),
			labels: { confirm: 'Удалить', cancel: 'Отмена' },
			onConfirm: () => mutate(branchId),
		})
	}

	return (
		<ActionIcon variant="white" className="group" onClick={handleConfirm}>
			<FaRegTrashAlt className="text-gray-600 group-hover:text-red-600 transition" />
		</ActionIcon>
	)
}
