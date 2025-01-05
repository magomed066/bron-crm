import express from 'express'
import checkAuth from '../../lib/helpers/check-auth.js'
import {
	createOrder,
	deleteOrder,
	getAllOrder,
	getOrderById,
	getOrderProductHints,
	updatedOrder,
} from '../../controllers/orders/index.js'

const router = express.Router()

router.post('/create', checkAuth, createOrder)
router.get('/all', checkAuth, getAllOrder)
router.get('/:id', checkAuth, getOrderById)
router.post('/update', checkAuth, updatedOrder)
router.delete('/delete/:id', checkAuth, deleteOrder)
router.get('/product/hints', checkAuth, getOrderProductHints)

export default router
