import { DataTypes } from 'sequelize'
import sequelize from '../../config/db.js'

const Branch = sequelize.define('branch', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
	},
	address: {
		type: DataTypes.STRING,
	},
})

export default Branch
