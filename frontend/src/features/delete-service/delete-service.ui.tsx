import { ActionIcon, Text } from '@mantine/core'
import { FC } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Props } from './types'
import { ModalType } from '@/shared/lib/config'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useDeleteService } from '@/entities/services'

export const DeleteServiceFeature: FC<Props> = ({ serviceId }) => {
	const { mutate } = useDeleteService(() => {
		notifications.show({
			color: 'green',
			autoClose: 2500,
			title: 'Услуги',
			message: 'Услуга успешно удалена',
		})
	})

	const handleConfirm = () => {
		if (!serviceId) return

		modals.openConfirmModal({
			modalId: ModalType.CONFIRM_DELETE_SERVICE,
			size: 380,
			children: (
				<Text size="lg" mb={30} className="text-center">
					Вы точно хотите удалить услугу?
				</Text>
			),
			labels: { confirm: 'Удалить', cancel: 'Отмена' },
			onConfirm: () => mutate(serviceId),
		})
	}

	return (
		<ActionIcon variant="white" className="group" onClick={handleConfirm}>
			<FaRegTrashAlt className="text-gray-600 group-hover:text-red-600 transition" />
		</ActionIcon>
	)
}
