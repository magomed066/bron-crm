import { Branch, Order, User } from '../models/index.js'

// Branch ↔ User
Branch.hasMany(User, { foreignKey: 'branchId' }) // Один филиал имеет много пользователей
User.belongsTo(Branch, { as: 'user', foreignKey: 'branchId' }) // Пользователь принадлежит одному филиалу

// Branch ↔ Order
Branch.hasMany(Order, { foreignKey: 'branchId' }) // Один филиал имеет много заказов
Order.belongsTo(Branch, { as: 'branch', foreignKey: 'branchId' }) // Заказ принадлежит одному филиалу

// User ↔ Order
User.hasMany(Order, { foreignKey: 'userId' }) // Один пользователь обрабатывает много заказов
Order.belongsTo(User, { as: 'user', foreignKey: 'userId' }) // Заказ обрабатывается одним пользователем
