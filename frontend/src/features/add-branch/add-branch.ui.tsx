import { ModalType } from '@/shared/lib/config'
import { Button } from '@mantine/core'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { FaPlus } from 'react-icons/fa'
import { AddBranchModalFeature } from '../add-branch-modal'

export const AddBranchFeature = () => {
	const { handleOpen } = useModal({
		title: 'Добавить филиал',
		type: ModalType.ADD_BRANCH,
		children: <AddBranchModalFeature />,
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
			Добавить филиал
		</Button>
	)
}
