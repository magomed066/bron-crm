import { FC, useState } from 'react'
import { Props } from './types'
import { ActionIcon, Flex, TextInput } from '@mantine/core'
import { FaCheck } from 'react-icons/fa6'
import { useUpdateCategory } from '@/entities/categories'
import { notifications } from '@mantine/notifications'

export const UpdateCategoryFeature: FC<Props> = ({ name, categoryId }) => {
	const [value, setValue] = useState(name)

	const { mutate } = useUpdateCategory(
		() => {
			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Изменение категории',
				message: 'Категория успешно изменена',
			})
		},
		(errors) => {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Смена филиала',
				message: errors.map((el) => el.message).join(','),
			})
		},
	)

	const handleClick = () => {
		mutate({
			id: categoryId,
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
