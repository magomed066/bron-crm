import { DataTypes } from 'sequelize'
import sequelize from '../../config/db.js'

const Order = sequelize.define('order', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	product: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.STRING,
	},
	phone: {
		type: DataTypes.STRING,
	},
	price: {
		type: DataTypes.INTEGER,
	},
	isGuarantee: {
		type: DataTypes.BOOLEAN,
	},
	deleted: {
		type: DataTypes.BOOLEAN,
	},
	branchId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'branches',
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'users',
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},

	categoryId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'categories',
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
	serviceId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'services',
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
})

export default Order
