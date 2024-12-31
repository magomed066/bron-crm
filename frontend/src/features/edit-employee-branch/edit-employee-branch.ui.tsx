import { FC, useEffect, useMemo, useState } from 'react'
import { useGetBranches } from '@/entities/branches'
import { mapDataForSelect } from '@/shared/lib/helpers'
import { ActionIcon, Flex, Select } from '@mantine/core'
import { FaCheck } from 'react-icons/fa6'
import { Props } from './types'
import { useUpdateEmployeeBranchMutation } from '@/entities/auth'
import { notifications } from '@mantine/notifications'

export const EditEMployeeBranchFeature: FC<Props> = ({ branchId, userId }) => {
	const { branches, isFetching } = useGetBranches()
	const [defaultValue, setDefaultValue] = useState<null | string>(null)

	const { mutate, isPending } = useUpdateEmployeeBranchMutation(
		() => {
			notifications.show({
				color: 'green',
				autoClose: 2500,
				title: 'Смена филиала',
				message: 'Филиал успешно сменен',
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

	const mappedBranches = useMemo(() => {
		if (branches) {
			return mapDataForSelect(branches, 'name', 'id')
		}
	}, [branches])

	const handleClick = () => {
		if (defaultValue) {
			mutate({ id: userId, branchId: Number(defaultValue) })
		}
	}

	useEffect(() => {
		if (!isFetching && mappedBranches && mappedBranches.length > 0) {
			setDefaultValue(String(branchId))
		}
	}, [mappedBranches, branchId, isFetching])

	return (
		<Flex align="center" gap={16}>
			<Select
				w={240}
				data={mappedBranches}
				value={defaultValue}
				disabled={isFetching}
				placeholder="Филиал"
				onChange={(value) => setDefaultValue(value)}
			/>
			<ActionIcon
				color="whiteColor"
				loaderProps={{
					color: 'dark',
				}}
				onClick={handleClick}
				loading={isPending}
				disabled={isPending}
			>
				<FaCheck className="text-gray-600" size={18} />
			</ActionIcon>
		</Flex>
	)
}
