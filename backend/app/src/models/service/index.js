import { DataTypes } from 'sequelize'
import sequelize from '../../config/db.js'

const Service = sequelize.define('service', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
	},
})

export default Service
