import generateError from './generate-error-response.js'

export default (req, res, next) => {
	try {
		if (!req.isAdmin) {
			return next(res.status(401).json(generateError('Нет доступа')))
		}

		next()
	} catch (error) {
		return res.status(401).json(generateError('Нет доступа'))
	}
}
