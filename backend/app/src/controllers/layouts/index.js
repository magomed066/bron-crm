import generateError from '../../lib/helpers/generate-error-response.js'
import { Material } from '../../models/index.js'
import Layout from '../../models/layouts/index.js'

export const createLayout = async (req, res) => {
	try {
		const { name } = req.body

		if (!name) {
			return res
				.status(404)
				.json(generateError('Не удалось добавить оформление'))
		}

		const layout = await Layout.create({
			name,
		})

		return res.json({
			success: true,
			data: layout,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось добавить оформление'))
	}
}

export const getAllLayouts = async (req, res) => {
	try {
		const { search } = req.query

		const whereClause = {}
		if (search) {
			whereClause[Op.or] = [{ name: { [Op.like]: `%${search}%` } }]
		}

		const layouts = await Layout.findAll({
			where: whereClause,
			order: [['createdAt', 'desc']],
		})

		return res.status(200).json({
			success: true,
			data: layouts,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить оформления'))
	}
}

export const getLayoutById = async (req, res) => {
	try {
		const { id } = req.params
		const layout = await Layout.findByPk(id)

		return res.json({
			success: true,
			data: layout,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить оформление'))
	}
}

export const updateLayout = async (req, res) => {
	try {
		const { id, name } = req.body

		await Layout.update(
			{ name },
			{
				where: { id },
			},
		)

		return res.status(200).json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось обновить оформление'))
	}
}

export const deleteLayout = async (req, res) => {
	try {
		const { id } = req.params

		await Layout.destroy({
			where: {
				id,
			},
		})

		return res.json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось удалить оформление'))
	}
}
