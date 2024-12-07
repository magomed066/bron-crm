import express from 'express'
import checkAuth from '../../lib/helpers/check-auth.js'
import {
	createOrder,
	getAllOrder,
	getOrderById,
	updatedOrder,
} from '../../controllers/orders/index.js'

const router = express.Router()

router.post('/create', checkAuth, createOrder)
router.get('/all', checkAuth, getAllOrder)
router.get('/:id', checkAuth, getOrderById)
router.post('/update', checkAuth, updatedOrder)

export default router
