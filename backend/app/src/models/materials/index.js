import { DataTypes } from 'sequelize'
import sequelize from '../../config/db.js'

const Material = sequelize.define('materials', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
	},
})

export default Material
