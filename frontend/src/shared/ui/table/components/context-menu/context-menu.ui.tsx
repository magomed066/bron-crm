import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Props } from './types'
import { menuAnimate } from './config'

export const ContextMenu = <T,>({
	isShown,
	top,
	left,
	items,
	row,
}: Props<T>) => {
	return (
		<motion.div
			className={clsx(
				'bg-white flex flex-col absolute z-[9999] shadow rounded dark:bg-gray-800',
				{
					hidden: !isShown,
				},
			)}
			initial="closed"
			animate={isShown ? 'open' : 'closed'}
			variants={menuAnimate}
			style={{ top, left }}
		>
			{items?.map((item) => (
				<div
					key={item.text}
					onClick={() => {
						if (row) {
							item.handler(row)
						}
					}}
					className="p-3 hover:bg-slate-200 dark:hover:bg-gray-600 cursor-pointer transition"
				>
					{item.text}
				</div>
			))}
		</motion.div>
	)
}
