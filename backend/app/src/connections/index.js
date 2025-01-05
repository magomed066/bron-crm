import {
	Branch,
	Category,
	Material,
	Order,
	User,
	Service,
} from '../models/index.js'

// Branch ↔ User
Branch.hasMany(User, { foreignKey: 'branchId' }) // Один филиал имеет много пользователей
User.belongsTo(Branch, { as: 'user', foreignKey: 'branchId' }) // Пользователь принадлежит одному филиалу

// Branch ↔ Order
Branch.hasMany(Order, { foreignKey: 'branchId' }) // Один филиал имеет много заказов
Order.belongsTo(Branch, { as: 'branch', foreignKey: 'branchId' }) // Заказ принадлежит одному филиалу

// User ↔ Order
User.hasMany(Order, { foreignKey: 'userId' }) // Один пользователь обрабатывает много заказов
Order.belongsTo(User, { as: 'user', foreignKey: 'userId' }) // Заказ обрабатывается одним пользователем

// Order ↔ Category
Category.hasMany(Order, { foreignKey: 'categoryId' })
Order.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' })

// Order ↔ Material
Material.hasMany(Order, { foreignKey: 'materialId' })
Order.belongsTo(Material, { as: 'material', foreignKey: 'materialId' })

// Order ↔ Layout
Service.hasMany(Order, { foreignKey: 'layoutId' })
Order.belongsTo(Service, { as: 'layout', foreignKey: 'layoutId' })
