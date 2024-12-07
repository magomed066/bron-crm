export const menuAnimate = {
	closed: {
		scale: 0,
		transition: {
			delay: 0.15,
		},
	},
	open: {
		scale: 1,
		transition: {
			type: 'spring',
			duration: 0.4,
			delayChildren: 0.2,
			staggerChildren: 0.05,
		},
	},
}
