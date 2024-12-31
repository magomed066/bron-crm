import generateError from '../../lib/helpers/generate-error-response.js'
import { Category } from '../../models/index.js'

export const createCategory = async (req, res) => {
	try {
		const { name } = req.body

		if (!name) {
			return res
				.status(404)
				.json(generateError('Не удалось добавить категорию'))
		}

		const category = await Category.create({
			name,
		})

		return res.json({
			success: true,
			data: category,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось добавить категорию'))
	}
}

export const getAllCategories = async (req, res) => {
	try {
		const { search } = req.query

		const whereClause = {}
		if (search) {
			whereClause[Op.or] = [{ name: { [Op.like]: `%${search}%` } }]
		}

		const orders = await Category.findAll({
			where: whereClause,
			order: [['createdAt', 'desc']],
		})

		return res.status(200).json({
			success: true,
			data: orders,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить категории'))
	}
}

export const getCategoryById = async (req, res) => {
	try {
		const { id } = req.params
		const category = await Category.findByPk(id)

		return res.json({
			success: true,
			data: category,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить категорию'))
	}
}

export const updateCategory = async (req, res) => {
	try {
		const { id, name } = req.body

		await Category.update(
			{ name },
			{
				where: { id },
			},
		)

		return res.status(200).json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось обновить категорию'))
	}
}

export const deleteCategory = async (req, res) => {
	try {
		const { id } = req.params

		await Category.destroy({
			where: {
				id,
			},
		})

		return res.json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось удалить категорию'))
	}
}
