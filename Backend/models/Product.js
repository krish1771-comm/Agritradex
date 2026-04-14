import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    longDescription: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Grains', 'Vegetables', 'Fruits', 'Spices', 'Mirchi', 'Dry Fruits'],
      required: true,
    },
    subCategory: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      enum: ['kg', 'gram', 'dozen', 'piece', 'quintal', 'bunch'],
      default: 'kg',
    },
    quantity: {
      type: Number,
      required: [true, 'Please add quantity'],
      default: 0,
      min: 0,
    },
    minOrderQuantity: {
      type: Number,
      default: 1,
    },
    organic: {
      type: Boolean,
      default: false,
    },
    harvestDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
    },
    quality: {
      type: String,
      enum: ['A', 'B', 'C'],
      default: 'A',
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});

// Create slug from name before saving
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;