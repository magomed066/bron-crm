import { FC } from 'react'
import { Props } from './types'

export const EmptyData: FC<Props> = ({
	emptyMessageText,
	emptyMessageTitle = 'Нет данных',
}) => {
	return (
		<div className="bg-white divide-gray-200 rounded-lg w-full">
			<div>
				<div className="w-full text-center py-12">
					<img
						className="w-32 h-32 mx-auto"
						src="https://res.cloudinary.com/daqsjyrgg/image/upload/v1690261234/di7tvpnzsesyo7vvsrq4.svg"
						alt="empty icon"
					/>
					<p className="text-gray-700 font-medium text-lg text-center">
						{emptyMessageTitle}
					</p>
					<p className="text-gray-500 text-center">{emptyMessageText}</p>
				</div>
			</div>
		</div>
	)
}
