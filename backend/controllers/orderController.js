import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//@desc create new order
//@route POST /api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No ordered items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

//@desc Get order by ID
//@route GET /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc Update order to paid
//@route GET /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPayed = true
    order.payedAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

//@desc Get all orders for the admin
//@route GET /api/orders
//@access private/admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name') // populate used to : from the user i want to gate the id and the name
  res.json(orders)
})

//@desc Update order to delivered
//@route GET /api/orders/:id/deliver
//@access private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.isPayed = true
    order.deliveredAt = Date.now()
    order.payedAt = Date.now()
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
}