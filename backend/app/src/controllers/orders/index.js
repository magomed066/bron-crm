import { Op } from 'sequelize'
import generateError from '../../lib/helpers/generate-error-response.js'
import {
	Branch,
	Category,
	Layout,
	Material,
	Order,
	User,
} from '../../models/index.js'

export const createOrder = async (req, res) => {
	try {
		const {
			product,
			description,
			price,
			materialId,
			categoryId,
			layoutId,
			phone,
		} = req.body
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
			materialId,
			categoryId,
			layoutId,
			phone,
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
		const {
			search,
			page = 1,
			limit = 20,
			categoryId,
			materialId,
			layoutId,
			priceFrom,
			priceTo,
		} = req.query // Extract query parameters

		const whereClause = {
			...(!isAdmin && userId ? { userId, deleted: { [Op.not]: true } } : {}),
			...(categoryId ? { categoryId: { [Op.eq]: categoryId } } : {}),
			...(materialId ? { materialId: { [Op.eq]: materialId } } : {}),
			...(layoutId ? { layoutId: { [Op.eq]: layoutId } } : {}),
		}

		// Add price filter if priceFrom or priceTo is provided
		if (priceFrom || priceTo) {
			whereClause.price = {}
			if (priceFrom) whereClause.price[Op.gte] = priceFrom // Greater than or equal to priceFrom
			if (priceTo) whereClause.price[Op.lte] = priceTo // Less than or equal to priceTo
		}

		// Add search filter if search term is provided
		if (search) {
			whereClause[Op.or] = [
				{ product: { [Op.like]: `%${search}%` } },
				{ price: { [Op.like]: `%${search}%` } },
				{ description: { [Op.like]: `%${search}%` } },
			]
		}

		const includingModels = [
			{
				model: User,
				as: 'user',
				attributes: {
					exclude: ['password'],
				},
			},
			{ model: Branch, as: 'branch' },
			{ model: Layout, as: 'layout' },
			{ model: Material, as: 'material' },
			{ model: Category, as: 'category' },
		]

		// Calculate offset
		const offset = (page - 1) * limit

		// Get total count of orders
		const totalOrders = await Order.count({
			where: whereClause,
		})

		// Fetch paginated orders
		const orders = await Order.findAll({
			where: whereClause,
			include: includingModels,
			order: [
				['createdAt', 'DESC'],
				['id', 'DESC'],
			],
			limit: parseInt(limit, 10) || 10, // Ensure limit is an integer
			offset: parseInt(offset, 10) || 0, // Ensure offset is an integer
		})

		return res.status(200).json({
			success: true,
			data: orders,
			total: totalOrders, // Include total count of orders
			page: parseInt(page, 10), // Return the current page
			limit: parseInt(limit, 10), // Return the limit
			totalPages: Math.ceil(totalOrders / limit), // Calculate total pages
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить заказы'))
	}
}

export const getOrderById = async (req, res) => {
	try {
		const includingModels = [
			{
				model: User,
				as: 'user',
				attributes: {
					exclude: ['password'],
				},
			},
			{ model: Branch, as: 'branch' },
			{ model: Layout, as: 'layout' },
			{ model: Material, as: 'material' },
			{ model: Category, as: 'category' },
		]

		const { id } = req.params
		const branch = await Order.findByPk(id, {
			include: includingModels,
		})

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
		const userId = req.userId

		await Order.update(data, {
			where: { id, userId },
		})

		return res.json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось обновить заказ'))
	}
}

export const deleteOrder = async (req, res) => {
	try {
		const { id } = req.params

		await Order.update(
			{ deleted: true },
			{
				where: {
					id,
				},
			},
		)

		return res.json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось удалить заказ'))
	}
}
