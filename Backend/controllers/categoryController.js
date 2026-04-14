import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, image, icon, parentCategory, displayOrder } = req.body;

  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = await Category.create({
    name,
    description,
    image,
    icon,
    parentCategory: parentCategory || null,
    displayOrder: displayOrder || 0,
  });

  if (parentCategory) {
    await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategories: category._id }
    });
  }

  res.status(201).json(category);
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})
    .populate('subCategories')
    .sort('displayOrder');
  
  res.json(categories);
});

// @desc    Get main categories
// @route   GET /api/categories/main
// @access  Public
export const getMainCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ 
    parentCategory: null 
  })
    .populate('subCategories')
    .sort('displayOrder');
  
  res.json(categories);
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
    .populate('subCategories')
    .populate('parentCategory');
  
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  
  const products = await Product.find({ 
    category: category.name,
    isApproved: true 
  }).limit(10);
  
  res.json({
    ...category.toObject(),
    products,
  });
});

// @desc    Get category by slug
// @route   GET /api/categories/slug/:slug
// @access  Public
export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug })
    .populate('subCategories')
    .populate('parentCategory');
  
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  
  const products = await Product.find({ 
    category: category.name,
    isApproved: true 
  });
  
  res.json({
    ...category.toObject(),
    products,
    productCount: products.length,
  });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  
  const { name, description, image, icon, parentCategory, displayOrder, isActive } = req.body;
  
  // Handle parent category change
  if (parentCategory !== category.parentCategory?.toString()) {
    // Remove from old parent
    if (category.parentCategory) {
      await Category.findByIdAndUpdate(category.parentCategory, {
        $pull: { subCategories: category._id }
      });
    }
    // Add to new parent
    if (parentCategory) {
      await Category.findByIdAndUpdate(parentCategory, {
        $push: { subCategories: category._id }
      });
    }
  }
  
  category.name = name || category.name;
  category.description = description || category.description;
  category.image = image || category.image;
  category.icon = icon || category.icon;
  category.parentCategory = parentCategory || null;
  category.displayOrder = displayOrder !== undefined ? displayOrder : category.displayOrder;
  category.isActive = isActive !== undefined ? isActive : category.isActive;
  
  const updatedCategory = await category.save();
  res.json(updatedCategory);
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  
  // Check if category has products
  const productCount = await Product.countDocuments({ category: category.name });
  if (productCount > 0) {
    res.status(400);
    throw new Error(`Cannot delete category with ${productCount} products. Reassign products first.`);
  }
  
  // Remove from parent's subcategories
  if (category.parentCategory) {
    await Category.findByIdAndUpdate(category.parentCategory, {
      $pull: { subCategories: category._id }
    });
  }
  
  // Delete all subcategories
  if (category.subCategories && category.subCategories.length > 0) {
    await Category.deleteMany({ _id: { $in: category.subCategories } });
  }
  
  await category.deleteOne();
  res.json({ message: 'Category removed' });
});

// @desc    Update product count for category
// @route   PUT /api/categories/:id/update-count
// @access  Private/Admin
export const updateCategoryProductCount = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  
  const productCount = await Product.countDocuments({ 
    category: category.name,
    isApproved: true 
  });
  
  category.productCount = productCount;
  await category.save();
  
  res.json({ message: 'Product count updated', productCount });
});