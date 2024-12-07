import { ModalType } from '@/shared/lib/config'
import { Button } from '@mantine/core'
import { AddOrderModalFeature } from '../add-order-modal'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { FaPlus } from 'react-icons/fa'

export const AddOrderFeature = () => {
	const { handleOpen } = useModal({
		title: 'Добавить заказ',
		type: ModalType.ADD_ORDER,
		children: <AddOrderModalFeature />,
		size: 600,
	})

	return (
		<Button
			variant="light"
			bg="primaryColor"
			color="whiteColor"
			onClick={handleOpen}
		>
			<FaPlus color="text-white" size={14} className="mr-3" />
			Добавить заказ
		</Button>
	)
}
