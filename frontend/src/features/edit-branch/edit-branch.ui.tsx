import { FaPen } from 'react-icons/fa'
import { ActionIcon } from '@mantine/core'

export const EditBranchFeature = () => {
	return (
		<ActionIcon variant="white" className="group">
			<FaPen className="text-gray-600 group-hover:text-gray-800 transition" />
		</ActionIcon>
	)
}
