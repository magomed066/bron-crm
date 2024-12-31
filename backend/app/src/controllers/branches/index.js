import { Op } from 'sequelize'
import generateError from '../../lib/helpers/generate-error-response.js'
import { Branch, User } from '../../models/index.js'

export const addBranch = async (req, res) => {
	try {
		const { name, address } = req.body

		const isExist = await Branch.findOne({
			where: { name },
		})

		if (isExist) {
			res.status(404).json(generateError('Этот филиал уже существует!'))

			return
		}

		const data = await Branch.create({
			name,
			address,
		})

		return res.json({
			success: true,
			data,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось добавить филиал'))
	}
}

export const getAllBranches = async (req, res) => {
	try {
		const { search } = req.query

		const whereClause = {}
		if (search) {
			whereClause[Op.or] = [
				{ name: { [Op.like]: `%${search}%` } },
				{ address: { [Op.like]: `%${search}%` } },
			]
		}

		const branches = await Branch.findAll({
			where: whereClause,
			include: [
				{
					model: User,
					attributes: {
						exclude: ['password'],
					},
				},
			],
			order: [['createdAt', 'DESC']],
		})

		return res.json({
			success: true,
			data: branches,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить филиалы'))
	}
}

export const getBranchById = async (req, res) => {
	try {
		const { id } = req.params
		const branch = await Branch.findByPk(id)

		return res.json({
			success: true,
			data: branch,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось получить филиал'))
	}
}

export const deleteBranchById = async (req, res) => {
	try {
		const { id } = req.params

		await Branch.destroy({
			where: {
				id,
			},
		})

		return res.json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось удалить филиал'))
	}
}

export const updateBranch = async (req, res) => {
	try {
		const { id, name, address } = req.body

		await Branch.update(
			{ name, address },
			{
				where: { id },
			},
		)

		return res.status(200).json({
			success: true,
		})
	} catch (error) {
		res.status(500).json(generateError('Не удалось обновить филиал'))
	}
}
