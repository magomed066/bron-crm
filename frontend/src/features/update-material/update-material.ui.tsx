import { FC, useState } from 'react'
import { Props } from './types'
import { ActionIcon, Flex, TextInput } from '@mantine/core'
import { FaCheck } from 'react-icons/fa6'
import { notifications } from '@mantine/notifications'
import { useUpdateMaterial } from '@/entities/materials'

export const UpdateMaterialFeature: FC<Props> = ({ name, materialId }) => {
	const [value, setValue] = useState(name)

	const { mutate } = useUpdateMaterial(
		() => {
			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Изменение материала',
				message: 'Материал успешно изменен',
			})
		},
		(errors) => {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Изменение материала',
				message: errors.map((el) => el.message).join(','),
			})
		},
	)

	const handleClick = () => {
		if (!value) {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Изменение материала',
				message: 'Название материала не может быть пустым',
			})
			return
		}

		mutate({
			id: materialId,
			name: value,
		})
	}

	return (
		<Flex align="center" gap={8}>
			<TextInput
				defaultValue={value}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				autoFocus
			/>

			<ActionIcon
				color="whiteColor"
				loaderProps={{
					color: 'dark',
				}}
				onClick={handleClick}
			>
				<FaCheck className="text-gray-600" size={18} />
			</ActionIcon>
		</Flex>
	)
}
