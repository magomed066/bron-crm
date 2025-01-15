import { FaPen } from 'react-icons/fa'
import { ActionIcon } from '@mantine/core'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { ModalType } from '@/shared/lib/config'
import { EditBranchModalFeature } from '../edit-branch-modal'
import { FC } from 'react'
import { Props } from './types'

export const EditBranchFeature: FC<Props> = ({ branchId, name, address }) => {
	const { handleOpen } = useModal({
		title: 'Редактирование филиала',
		type: ModalType.EDIT_BRANCH,
		children: (
			<EditBranchModalFeature
				branchId={branchId}
				name={name}
				address={address}
			/>
		),
		size: 600,
	})

	return (
		<ActionIcon variant="white" className="group" onClick={handleOpen}>
			<FaPen className="text-gray-600 group-hover:text-gray-800 transition" />
		</ActionIcon>
	)
}
