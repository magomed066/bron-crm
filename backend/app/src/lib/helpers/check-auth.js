import { tokenService } from '../../services/index.js'
import generateError from './generate-error-response.js'

export default (req, res, next) => {
	try {
		const authorizationHeader = req.headers.authorization

		if (!authorizationHeader) {
			return next(res.status(401).json(generateError('Нет доступа')))
		}

		const accessToken = authorizationHeader.replace(/Bearer\s?/, '')

		if (!accessToken) {
			return next(res.status(401).json(generateError('Нет доступа')))
		}

		const userData = tokenService.verifyAccessToken(accessToken)

		if (!userData) {
			return next(res.status(401).json(generateError('Нет доступа')))
		}

		req.userId = userData._id
		req.isAdmin = userData.userInfo.isAdmin
		req.branchId = userData.userInfo.branchId

		next()
	} catch (error) {
		return res.status(401).json(generateError('Нет доступа'))
	}
}
