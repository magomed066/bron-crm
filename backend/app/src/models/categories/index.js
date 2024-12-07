import { DataTypes } from 'sequelize'
import sequelize from '../../config/db.js'

const Category = sequelize.define('category', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
	},
})

export default Category
