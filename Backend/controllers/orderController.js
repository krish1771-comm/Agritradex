import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Helper function to generate order number
function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `AGR${year}${month}${day}${random}`;
}

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod, notes } = req.body;
  
  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }
  
  let totalAmount = 0;
  const orderItems = [];
  
  for (const item of items) {
    const product = await Product.findById(item.id);
    
    if (!product) {
      res.status(404);
      throw new Error(`Product ${item.id} not found`);
    }
    
    if (product.quantity < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for ${product.name}`);
    }
    
    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      unit: product.unit,
      image: item.image || product.images?.[0],
      farmer: product.farmer,
    });
    
    totalAmount += product.price * item.quantity;
    
    product.quantity -= item.quantity;
    await product.save();
  }
  
  let orderNumber = generateOrderNumber();
  let isUnique = false;
  let attempts = 0;
  
  while (!isUnique && attempts < 5) {
    const existingOrder = await Order.findOne({ orderNumber });
    if (!existingOrder) {
      isUnique = true;
    } else {
      orderNumber = generateOrderNumber();
    }
    attempts++;
  }
  
  const order = await Order.create({
    orderNumber,
    buyer: req.user._id,
    items: orderItems,
    totalAmount,
    shippingAddress,
    paymentMethod: paymentMethod || 'cod',
    notes: notes || '',
  });
  
  res.status(201).json(order);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('buyer', 'name email phone')
    .populate('items.farmer', 'name farmName');
  
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  
  const isBuyer = order.buyer._id.toString() === req.user._id.toString();
  const isFarmer = order.items.some(item => 
    item.farmer._id.toString() === req.user._id.toString()
  );
  const isAdmin = req.user.role === 'admin';
  
  if (!isBuyer && !isFarmer && !isAdmin) {
    res.status(403);
    throw new Error('Not authorized to view this order');
  }
  
  res.json(order);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  console.log('getMyOrders called for user:', req.user._id);
  
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('items.farmer', 'name farmName')
      .sort('-createdAt');
    
    console.log(`Found ${orders.length} orders for user ${req.user._id}`);
    res.json(orders);
  } catch (error) {
    console.error('Error in getMyOrders:', error);
    res.status(500).json({ 
      message: 'Failed to fetch orders', 
      error: error.message 
    });
  }
});

// @desc    Get farmer's orders
// @route   GET /api/orders/farmer/orders
// @access  Private/Farmer
export const getFarmerOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({
      'items.farmer': req.user._id,
    })
      .populate('buyer', 'name email phone')
      .sort('-createdAt');
    
    res.json(orders);
  } catch (error) {
    console.error('Error in getFarmerOrders:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Farmer
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, trackingNumber } = req.body;
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  
  const isFarmer = order.items.some(item => 
    item.farmer.toString() === req.user._id.toString()
  );
  const isAdmin = req.user.role === 'admin';
  
  if (!isFarmer && !isAdmin) {
    res.status(403);
    throw new Error('Not authorized to update this order');
  }
  
  order.orderStatus = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (status === 'delivered') order.deliveredAt = Date.now();
  
  await order.save();
  res.json(order);
});

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment
// @access  Private/Admin
export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { paymentStatus } = req.body;
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  
  order.paymentStatus = paymentStatus;
  await order.save();
  
  res.json(order);
});