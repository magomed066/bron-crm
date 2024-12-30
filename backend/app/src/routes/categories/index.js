import express from 'express'
import checkAuth from '../../lib/helpers/check-auth.js'

import {
	createCategory,
	getAllCategories,
	getCategoryById,
	updateCategory,
} from '../../controllers/categories/index.js'
import checkRole from '../../lib/helpers/check-role.js'

const router = express.Router()

router.post('/create', checkAuth, checkRole, createCategory)
router.get('/all', checkAuth, getAllCategories)
router.get('/:id', checkAuth, getCategoryById)
router.post('/update', checkAuth, checkRole, updateCategory)

export default router
