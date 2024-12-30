import express from 'express'
import checkAuth from '../../lib/helpers/check-auth.js'
import checkRole from '../../lib/helpers/check-role.js'
import {
	createMaterial,
	getAllMaterials,
	getMaterialById,
	updateMaterial,
} from '../../controllers/materials/index.js'

const router = express.Router()

router.post('/create', checkAuth, checkRole, createMaterial)
router.get('/all', checkAuth, getAllMaterials)
router.get('/:id', checkAuth, getMaterialById)
router.post('/update', checkAuth, checkRole, updateMaterial)

export default router
