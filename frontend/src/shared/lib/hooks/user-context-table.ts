import { useCallback, useEffect, useState } from 'react'

export const useContextTableMenu = <T>() => {
	const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
	const [isShown, setIsShow] = useState(false)
	const [row, setRow] = useState<T>()

	const handleContextMenu = useCallback(
		(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, record: T) => {
			event.preventDefault()
			setAnchorPoint({ x: event.pageX + 10, y: event.pageY + 10 })
			setIsShow(true)
			setRow(record)
		},
		[setIsShow, setAnchorPoint],
	)

	const handleClick = useCallback(() => {
		if (isShown) {
			setIsShow(false)
		}
	}, [isShown])

	useEffect(() => {
		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	})

	return { anchorPoint, isShown, handleContextMenu, row }
}
