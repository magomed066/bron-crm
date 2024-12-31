import { FC, useState } from 'react'
import { Props } from './types'
import { ActionIcon, Flex, TextInput } from '@mantine/core'
import { FaCheck } from 'react-icons/fa6'
import { notifications } from '@mantine/notifications'
import { useUpdateLayout } from '@/entities/layouts'

export const UpdateLayoutFeature: FC<Props> = ({ name, layoutId }) => {
	const [value, setValue] = useState(name)

	const { mutate } = useUpdateLayout(
		() => {
			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Изменение оформления',
				message: 'Оформление успешно изменено',
			})
		},
		(errors) => {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Изменение оформления',
				message: errors.map((el) => el.message).join(','),
			})
		},
	)

	const handleClick = () => {
		if (!value) {
			notifications.show({
				color: 'red',
				autoClose: 2500,
				title: 'Изменение оформления',
				message: 'Название оформления не может быть пустым',
			})
			return
		}

		mutate({
			id: layoutId,
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
