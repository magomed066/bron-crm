import { DataTypes } from 'sequelize'
import sequelize from '../../config/db.js'

const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	firstName: {
		type: DataTypes.STRING,
	},
	lastName: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
	},
	phone: {
		type: DataTypes.STRING,
		defaultValue: '',
	},
	password: {
		type: DataTypes.STRING,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	branchId: {
		type: DataTypes.INTEGER,
		defaultValue: null,
		allowNull: true,
	},
})

export default User
