import express from 'express'
import {
	addBranch,
	deleteBranchById,
	getAllBranches,
	getBranchById,
} from '../../controllers/branches/index.js'
import checkAuth from '../../lib/helpers/check-auth.js'
import checkRole from '../../lib/helpers/check-role.js'

const router = express.Router()

router.post('/create', checkAuth, checkRole, addBranch)
router.get('/all', checkAuth, checkRole, getAllBranches)
router.get('/:id', checkAuth, checkRole, getBranchById)
router.delete('/delete/:id', checkAuth, checkRole, deleteBranchById)

export default router
