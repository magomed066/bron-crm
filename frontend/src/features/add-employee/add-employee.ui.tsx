import { ModalType } from '@/shared/lib/config'
import { Button } from '@mantine/core'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { FaPlus } from 'react-icons/fa'
import { AddEmployeeModalFeature } from '../add-employee-modal'

export const AddEmployeeFeature = () => {
	const { handleOpen } = useModal({
		title: 'Добавить сотрудника',
		type: ModalType.ADD_EMPLOYEE,
		children: <AddEmployeeModalFeature />,
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
			Добавить cотрудника
		</Button>
	)
}
