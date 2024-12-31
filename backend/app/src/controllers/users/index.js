import bcrypt from 'bcryptjs'
import { User } from '../../models/index.js'
import { tokenService } from '../../services/index.js'
import generateError from '../../lib/helpers/generate-error-response.js'

export const register = async (req, res) => {
	try {
		const { firstName, lastName, email, phone, password, branchId, isAdmin } =
			req.body

		const isExist = await User.findOne({
			where: { email },
		})

		if (isExist) {
			res
				.status(404)
				.json(generateError('Пользователь с таким email уже существует!'))

			return
		}

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		const data = await User.create({
			firstName,
			lastName,
			email,
			phone,
			branchId: branchId || null,
			password: hashedPassword,
			isAdmin: isAdmin || false,
		})

		const { password: hashPass, ...userData } = data.dataValues

		const { accessToken, refreshToken } = tokenService.generateTokens({
			_id: userData.id,
			userInfo: {
				isAdmin: isAdmin || false,
			},
		})

		res.json({
			success: true,
			data: {
				...userData,
				accessToken,
				refreshToken,
			},
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось зарегистрироваться'))
	}
}

export const login = async (req, res) => {
	try {
		const { password, email } = req.body

		const user = await User.findOne({
			where: { email },
		})

		if (!user) {
			return res
				.status(404)
				.json(generateError('Пользователя с таким email не существует'))
		}

		const { password: hashPass, ...userData } = user?.dataValues

		const isValidPassword = await bcrypt.compare(password, hashPass)

		if (!isValidPassword) {
			return res.status(404).json(generateError('Введите коректный пароль'))
		}

		const { accessToken, refreshToken } = tokenService.generateTokens({
			_id: userData.id,
			userInfo: {
				isAdmin: user.dataValues.isAdmin,
				...(user.dataValues.branchId && { branchId: user.dataValues.branchId }),
			},
		})

		return res.json({
			success: true,
			data: {
				...userData,
				accessToken,
				refreshToken,
			},
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось авторизоваться'))
	}
}

export const getAllEmployees = async (req, res) => {
	try {
		const users = await User.findAll({
			where: {
				isAdmin: false,
			},
			attributes: {
				exclude: ['password'],
			},
		})

		return res.json({
			success: true,
			data: users,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить сотрудников'))
	}
}

export const updateEmployeeBranch = async (req, res) => {
	try {
		const { id, branchId } = req.body

		if (!id || !branchId) {
			return res
				.status(404)
				.json(generateError('Не удалось изменить филиал сотрудника'))
		}

		await User.update({ branchId }, { where: { id } })

		return res.json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить сотрудников'))
	}
}

export const updateProfile = async (req, res) => {
	try {
		const userId = req.userId
		const { firstName, lastName, email, phone } = req.body

		if (!userId) {
			return res
				.status(404)
				.json(generateError('Не удалось обновить данные профиля'))
		}

		await User.update(
			{
				firstName,
				lastName,
				email,
				phone,
			},
			{
				where: { id: userId },
				returning: true,
			},
		)

		return res.json({
			success: true,
			data: {
				firstName,
				lastName,
				email,
				phone,
			},
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось обновить данные профиля'))
	}
}

export const updatePassword = async (req, res) => {
	try {
		const userId = req.userId
		const { oldPassword, newPassword } = req.body

		if (!userId) {
			return res.status(404).json(generateError('Не удалось сменить пароль'))
		}

		const user = await User.findOne({ where: { id: userId } })

		const { password: hashPass, ...userData } = user?.dataValues

		const isValidPassword = await bcrypt.compare(oldPassword, hashPass)

		if (!isValidPassword) {
			return res.status(404).json(generateError('Введите коректный пароль'))
		}

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(newPassword, salt)

		const { accessToken, refreshToken } = tokenService.generateTokens({
			_id: userData.id,
			userInfo: {
				isAdmin: user.dataValues.isAdmin,
				...(user.dataValues.branchId && { branchId: user.dataValues.branchId }),
			},
		})

		await User.update(
			{
				password: hashedPassword,
			},
			{
				where: { id: userId },
				returning: true,
			},
		)

		return res.json({
			success: true,
			data: {
				...userData,
				accessToken,
				refreshToken,
			},
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось сменить пароль'))
	}
}
