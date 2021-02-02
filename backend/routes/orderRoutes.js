import express from 'express'
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js'
import Router from 'express'
import { protect, admin } from '../middleware/authMiddleWare.js'
const router = Router()

// route to get order for the admin
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)

router.route('/myorders').get(protect, getMyOrders)

router.route('/:id').get(protect, getOrderById)

router.route('/:id/pay').put(protect, updateOrderToPaid)

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router