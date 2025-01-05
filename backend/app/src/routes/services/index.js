import express from 'express'
import checkAuth from '../../lib/helpers/check-auth.js'
import checkRole from '../../lib/helpers/check-role.js'
import {
	createService,
	deleteService,
	getAllServices,
	getServiceById,
	updateService,
} from '../../controllers/service/index.js'

const router = express.Router()

router.post('/create', checkAuth, checkRole, createService)
router.get('/all', checkAuth, getAllServices)
router.get('/:id', checkAuth, getServiceById)
router.post('/update', checkAuth, checkRole, updateService)
router.delete('/delete/:id', checkAuth, checkRole, deleteService)

export default router
