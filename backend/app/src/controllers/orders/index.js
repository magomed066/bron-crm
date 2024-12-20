import { Op } from 'sequelize'
import generateError from '../../lib/helpers/generate-error-response.js'
import { Branch, Order, User } from '../../models/index.js'

export const createOrder = async (req, res) => {
	try {
		const { product, description, price } = req.body
		const branchId = req.branchId
		const userId = req.userId

		if (!branchId || !userId) {
			return res.status(404).json(generateError('Не удалось добавить заказ'))
		}

		const order = await Order.create({
			product,
			price,
			description,
			userId,
			branchId,
			isGuarantee: true,
		})

		return res.json({
			success: true,
			data: order,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось добавить заказ'))
	}
}

export const getAllOrder = async (req, res) => {
	try {
		const userId = req.userId
		const isAdmin = req.isAdmin
		const { search } = req.query

		const whereClause = {
			...(!isAdmin && userId && { userId }),
		}
		if (search) {
			whereClause[Op.or] = [
				{ product: { [Op.like]: `%${search}%` } },
				{ price: { [Op.like]: `%${search}%` } },
				{ description: { [Op.like]: `%${search}%` } },
			]
		}

		if (isAdmin) {
			const orders = await Order.findAll({
				where: whereClause,
				include: [
					{
						model: User,
						as: 'user',
						attributes: {
							exclude: ['password'],
						},
					},
					{ model: Branch, as: 'branch' },
				],
			})

			return res.status(200).json({
				success: true,
				data: orders,
			})
		}

		if (!isAdmin && userId) {
			const orders = await Order.findAll({
				where: whereClause,
				include: [
					{
						model: User,
						as: 'user',
						attributes: {
							exclude: ['password'],
						},
					},
					{ model: Branch, as: 'branch' },
				],
			})

			return res.status(200).json({
				success: true,
				data: orders,
			})
		}
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить заказы'))
	}
}

export const getOrderById = async (req, res) => {
	try {
		const { id } = req.params
		const branch = await Order.findByPk(id)

		return res.json({
			success: true,
			data: branch,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить филиал'))
	}
}

export const updatedOrder = async (req, res) => {
	try {
		const { id, data } = req.body
		const branchId = req.branchId
		const userId = req.userId

		await Order.update(data, {
			where: { id, branchId, userId },
		})

		return res.json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось обновить заказ'))
	}
}
