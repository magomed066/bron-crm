import generateError from '../../lib/helpers/generate-error-response.js'
import { Material } from '../../models/index.js'

export const createMaterial = async (req, res) => {
	try {
		const { name } = req.body

		if (!name) {
			return res.status(404).json(generateError('Не удалось добавить материал'))
		}

		const material = await Material.create({
			name,
		})

		return res.json({
			success: true,
			data: material,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось добавить материал'))
	}
}

export const getAllMaterials = async (req, res) => {
	try {
		const { search } = req.query

		const whereClause = {}
		if (search) {
			whereClause[Op.or] = [{ name: { [Op.like]: `%${search}%` } }]
		}

		const materials = await Material.findAll({
			where: whereClause,
			order: [['createdAt', 'desc']],
		})

		return res.status(200).json({
			success: true,
			data: materials,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить материалы'))
	}
}

export const getMaterialById = async (req, res) => {
	try {
		const { id } = req.params
		const material = await Material.findByPk(id)

		return res.json({
			success: true,
			data: material,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить материал'))
	}
}

export const updateMaterial = async (req, res) => {
	try {
		const { id, name } = req.body

		await Material.update(
			{ name },
			{
				where: { id },
			},
		)

		return res.status(200).json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось обновить материал'))
	}
}

export const deleteMaterial = async (req, res) => {
	try {
		const { id } = req.params

		await Material.destroy({
			where: {
				id,
			},
		})

		return res.json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось удалить материал'))
	}
}
