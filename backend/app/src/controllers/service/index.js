import generateError from '../../lib/helpers/generate-error-response.js'
import { Service } from '../../models/index.js'

export const createService = async (req, res) => {
	try {
		const { name } = req.body

		if (!name) {
			return res.status(404).json(generateError('Не удалось добавить услугу'))
		}

		const service = await Service.create({
			name,
		})

		return res.json({
			success: true,
			data: service,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось добавить услугу'))
	}
}

export const getAllServices = async (req, res) => {
	try {
		const { search } = req.query

		const whereClause = {}
		if (search) {
			whereClause[Op.or] = [{ name: { [Op.like]: `%${search}%` } }]
		}

		const services = await Service.findAll({
			where: whereClause,
			order: [['createdAt', 'desc']],
		})

		return res.status(200).json({
			success: true,
			data: services,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить услуги'))
	}
}

export const getServiceById = async (req, res) => {
	try {
		const { id } = req.params
		const service = await Service.findByPk(id)

		return res.json({
			success: true,
			data: service,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить услугу'))
	}
}

export const updateService = async (req, res) => {
	try {
		const { id, name } = req.body

		await Service.update(
			{ name },
			{
				where: { id },
			},
		)

		return res.status(200).json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось обновить услугу'))
	}
}

export const deleteService = async (req, res) => {
	try {
		const { id } = req.params

		await Service.destroy({
			where: {
				id,
			},
		})

		return res.json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось удалить услугу'))
	}
}
