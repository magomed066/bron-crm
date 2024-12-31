import express from 'express'
import {
	getAllEmployees,
	login,
	register,
	updateEmployeeBranch,
	updateProfile,
} from '../../controllers/users/index.js'
import {
	registerValidation,
	loginValidation,
} from '../../lib/validators/index.js'
import handleValidationErrors from '../../lib/helpers/handle-validation-errors.js'
import checkAuth from '../../lib/helpers/check-auth.js'
import checkRole from '../../lib/helpers/check-role.js'

const router = express.Router()

router.post('/register', registerValidation, handleValidationErrors, register)
router.post('/login', loginValidation, handleValidationErrors, login)
router.get('/employees', checkAuth, checkRole, getAllEmployees)
router.post(
	'/employees/update/branch',
	checkAuth,
	checkRole,
	updateEmployeeBranch,
)
router.post('/update/profile', checkAuth, updateProfile)

export default router
