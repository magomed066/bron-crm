import express from 'express'
import checkAuth from '../../lib/helpers/check-auth.js'
import checkRole from '../../lib/helpers/check-role.js'
import {
	createLayout,
	deleteLayout,
	getAllLayouts,
	getLayoutById,
	updateLayout,
} from '../../controllers/layouts/index.js'

const router = express.Router()

router.post('/create', checkAuth, checkRole, createLayout)
router.get('/all', checkAuth, getAllLayouts)
router.get('/:id', checkAuth, getLayoutById)
router.post('/update', checkAuth, checkRole, updateLayout)
router.delete('/delete/:id', checkAuth, checkRole, deleteLayout)

export default router
