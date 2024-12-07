import { validationResult } from 'express-validator'

export default (req, res, next) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json({
				status: false,
				errors: errors
					.array()
					.map((el) => ({ message: el.msg, value: el.value, field: el.path })),
			})
	}

	next()
}
