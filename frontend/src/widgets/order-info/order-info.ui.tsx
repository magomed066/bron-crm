import { useGetOrderById } from '@/entities/orders'
import { EditOrderFeature } from '@/features/edit-order'
import { useQueryParams } from '@/shared/lib/hooks'
import { Center, Loader, Title } from '@mantine/core'

export const OrderInfoWidget = () => {
	const { getQueryParam } = useQueryParams()
	const orderId = getQueryParam('orderId')
	const { order, isFetching } = useGetOrderById(Number(orderId))

	if (isFetching) {
		return <Loader className="mx-auto" />
	}

	if (order === undefined) {
		return (
			<Center>
				<Title order={3}>Информации не найдено...</Title>
			</Center>
		)
	}

	return <EditOrderFeature data={order} />
}
