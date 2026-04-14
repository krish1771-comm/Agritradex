import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Order from './models/Order.js';

dotenv.config();

// Helper function to generate slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// Sample Data with slugs included
const users = [
  {
    name: 'Admin User',
    email: 'admin@agritradex.com',
    password: 'admin123',
    role: 'admin',
    phone: '9876543210',
    isVerified: true,
    isActive: true,
    address: {
      street: '123 Admin Street',
      city: 'Rajkot',
      state: 'Gujarat',
      pincode: '360001'
    }
  },
  {
    name: 'Harpreet Singh',
    email: 'farmer@agritradex.com',
    password: 'password123',
    role: 'farmer',
    phone: '9876543211',
    isVerified: true,
    isActive: true,
    address: {
      street: '456 Farm Road',
      city: 'Ludhiana',
      state: 'Punjab',
      pincode: '141001'
    },
    farmDetails: {
      farmName: 'Singh Organic Farms',
      farmAddress: 'Village Fatehgarh, Tehsil Jagraon',
      landSize: 25,
      experience: 15,
      crops: ['Organic Rice', 'Organic Wheat', 'Organic Vegetables'],
      certifications: ['India Organic', 'USDA Organic'],
      description: 'Third-generation organic farmers practicing sustainable agriculture since 1985.'
    }
  },
  {
    name: 'Ramesh Patel',
    email: 'farmer2@agritradex.com',
    password: 'password123',
    role: 'farmer',
    phone: '9876543212',
    isVerified: true,
    isActive: true,
    address: {
      street: '789 Orchard Road',
      city: 'Nasik',
      state: 'Maharashtra',
      pincode: '422001'
    },
    farmDetails: {
      farmName: 'Patel Organic Orchards',
      farmAddress: 'Gangapur Road, Nasik',
      landSize: 15,
      experience: 12,
      crops: ['Organic Grapes', 'Organic Mangoes', 'Organic Vegetables'],
      certifications: ['India Organic'],
      description: 'Specializing in organic Alphonso mangoes and table grapes.'
    }
  },
  {
    name: 'Priya Sharma',
    email: 'buyer@agritradex.com',
    password: 'buyer123',
    role: 'buyer',
    phone: '9876543213',
    isVerified: true,
    isActive: true,
    address: {
      street: '123 Customer Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    }
  }
];

const categories = [
  {
    name: 'Grains',
    slug: 'grains',
    description: 'Organic grains and cereals',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600',
    icon: '🌾',
    displayOrder: 1,
    isActive: true
  },
  {
    name: 'Fruits',
    slug: 'fruits',
    description: 'Fresh organic fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600',
    icon: '🍎',
    displayOrder: 2,
    isActive: true
  },
  {
    name: 'Vegetables',
    slug: 'vegetables',
    description: 'Fresh organic vegetables',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600',
    icon: '🥕',
    displayOrder: 3,
    isActive: true
  },
  {
    name: 'Spices',
    slug: 'spices',
    description: 'Organic spices and seasonings',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600',
    icon: '🌿',
    displayOrder: 4,
    isActive: true
  },
  {
    name: 'Mirchi',
    slug: 'mirchi',
    description: 'Fresh and dried chilies',
    image: 'https://mybageecha.com/cdn/shop/products/chili-pepper.jpg?v=1571438538',
    icon: '🌶️',
    displayOrder: 5,
    isActive: true
  },
  {
    name: 'Dry Fruits',
    slug: 'dry-fruits',
    description: 'Premium organic dry fruits',
    image: 'https://m.media-amazon.com/images/I/71m18e2dMAL._AC_UF894,1000_QL80_.jpg',
    icon: '🥜',
    displayOrder: 6,
    isActive: true
  }
];

const products = [
  // Grains
  {
    name: 'Organic Basmati Rice',
    slug: 'organic-basmati-rice',
    description: 'Premium quality organic basmati rice grown in the foothills of Himalayas.',
    longDescription: 'Our organic basmati rice is cultivated using traditional farming methods without any chemical pesticides or fertilizers. The grains are aged for 1 year to enhance their aroma and cooking quality.',
    price: 120,
    originalPrice: 150,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600'],
    category: 'Grains',
    quantity: 50,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.5,
    numReviews: 24
  },
  {
    name: 'Organic Wheat Flour (Atta)',
    slug: 'organic-wheat-flour-atta',
    description: 'Stone-ground organic whole wheat flour',
    longDescription: 'Made from premium organic wheat, stone-ground to preserve nutrients and natural taste.',
    price: 65,
    originalPrice: 80,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600'],
    category: 'Grains',
    quantity: 75,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.2,
    numReviews: 15
  },
  {
    name: 'Organic Brown Rice',
    slug: 'organic-brown-rice',
    description: 'Whole grain organic brown rice',
    longDescription: 'Nutrient-rich brown rice with high fiber content, perfect for health-conscious individuals.',
    price: 110,
    originalPrice: 140,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600'],
    category: 'Grains',
    quantity: 40,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.3,
    numReviews: 18
  },

  // Fruits
  {
    name: 'Organic Alphonso Mangoes',
    slug: 'organic-alphonso-mangoes',
    description: 'King of mangoes - sweet and aromatic',
    longDescription: 'Premium Alphonso mangoes grown organically in the Ratnagiri region. Known for their rich flavor and creamy texture.',
    price: 350,
    originalPrice: 450,
    unit: 'dozen',
    images: ['https://www.anishfarms.com/wp-content/uploads/2019/01/6.jpg'],
    category: 'Fruits',
    quantity: 25,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 5.0,
    numReviews: 18
  },
  {
    name: 'Fresh Apples (Shimla)',
    slug: 'fresh-apples-shimla',
    description: 'Crisp and juicy Himalayan apples',
    longDescription: 'Freshly harvested organic apples from the orchards of Shimla. Naturally sweet and crunchy.',
    price: 180,
    originalPrice: 220,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600'],
    category: 'Fruits',
    quantity: 40,
    organic: false,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.3,
    numReviews: 9
  },
  {
    name: 'Organic Bananas',
    slug: 'organic-bananas',
    description: 'Sweet and nutritious organic bananas',
    longDescription: 'Chemical-free bananas grown using natural farming methods.',
    price: 60,
    originalPrice: 80,
    unit: 'dozen',
    images: ['https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600'],
    category: 'Fruits',
    quantity: 60,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.6,
    numReviews: 22
  },

  // Vegetables
  {
    name: 'Organic Spinach (Palak)',
    slug: 'organic-spinach-palak',
    description: 'Fresh, tender organic spinach leaves',
    longDescription: 'Nutrient-rich organic spinach grown without pesticides. Perfect for salads and cooking.',
    price: 30,
    originalPrice: 40,
    unit: 'bunch',
    images: ['https://www.greendna.in/cdn/shop/files/babyspinach_1504x.jpg?v=1715600352'],
    category: 'Vegetables',
    quantity: 100,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.0,
    numReviews: 12
  },
  {
    name: 'Organic Tomatoes',
    slug: 'organic-tomatoes',
    description: 'Juicy, vine-ripened organic tomatoes',
    longDescription: 'Farm-fresh organic tomatoes with rich flavor. Grown using natural farming methods.',
    price: 40,
    originalPrice: 50,
    unit: 'kg',
    images: ['https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/d5673d4f-5d68-4129-9181-e96152253570.png'],
    category: 'Vegetables',
    quantity: 60,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.3,
    numReviews: 9
  },
  {
    name: 'Organic Carrots',
    slug: 'organic-carrots',
    description: 'Sweet and crunchy organic carrots',
    longDescription: 'Freshly harvested organic carrots rich in beta-carotene and antioxidants.',
    price: 50,
    originalPrice: 65,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600'],
    category: 'Vegetables',
    quantity: 80,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.4,
    numReviews: 14
  },

  // Spices
  {
    name: 'Organic Turmeric Powder',
    slug: 'organic-turmeric-powder',
    description: 'Pure organic turmeric powder with high curcumin content',
    longDescription: 'Made from sun-dried organic turmeric rhizomes. Known for its medicinal properties and vibrant color.',
    price: 180,
    originalPrice: 220,
    unit: 'kg',
    images: ['https://www.greendna.in/cdn/shop/files/turmeric-1-1030x687_1030x.jpg?v=1714732257'],
    category: 'Spices',
    quantity: 15,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.8,
    numReviews: 32
  },
  {
    name: 'Organic Black Pepper',
    slug: 'organic-black-pepper',
    description: 'Whole organic black peppercorns',
    longDescription: 'Premium quality organic black pepper with intense aroma and flavor.',
    price: 380,
    originalPrice: 450,
    unit: 'kg',
    images: ['https://www.greendna.in/cdn/shop/products/where-does-black-pepper-come-from_1000x.jpg?v=1560959604'],
    category: 'Spices',
    quantity: 20,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.9,
    numReviews: 27
  },
  {
    name: 'Organic Cumin Seeds (Jeera)',
    slug: 'organic-cumin-seeds-jeera',
    description: 'Aromatic organic cumin seeds',
    longDescription: 'Premium quality organic cumin seeds with rich earthy flavor. Essential for Indian cuisine.',
    price: 220,
    originalPrice: 280,
    unit: 'kg',
    images: ['https://www.greendna.in/cdn/shop/products/cumin1_1000x.jpg?v=1561041488'],
    category: 'Spices',
    quantity: 30,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.7,
    numReviews: 18
  },

  // Mirchi (Chili)
  {
    name: 'Organic Red Chili (Lal Mirchi)',
    slug: 'organic-red-chili-lal-mirchi',
    description: 'Whole dried organic red chilies',
    longDescription: 'Premium quality dried red chilies with perfect heat level. Grown organically without chemicals.',
    price: 280,
    originalPrice: 350,
    unit: 'kg',
    images: ['https://i0.wp.com/veganicmart.com/wp-content/uploads/2022/09/lal-mirchi.jpg?fit=510%2C510&ssl=1'],
    category: 'Mirchi',
    quantity: 35,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.8,
    numReviews: 16
  },
  {
    name: 'Fresh Green Chili (Hari Mirchi)',
    slug: 'fresh-green-chili-hari-mirchi',
    description: 'Fresh organic green chilies',
    longDescription: 'Freshly picked organic green chilies. Spicy and perfect for daily cooking.',
    price: 60,
    originalPrice: 80,
    unit: 'kg',
    images: ['https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/9b4cd95e-3f9e-4305-92a0-16d9875c6b4d.png'],
    category: 'Mirchi',
    quantity: 50,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.6,
    numReviews: 12
  },
  {
    name: 'Byadgi Red Chili',
    slug: 'byadgi-red-chili',
    description: 'Premium Byadgi variety red chilies',
    longDescription: 'Famous Byadgi chilies known for their deep red color and moderate heat.',
    price: 320,
    originalPrice: 400,
    unit: 'kg',
    images: ['https://devagisanmugam.com/wp-content/uploads/2024/01/bydagi-chillies-1140x1140.jpg'],
    category: 'Mirchi',
    quantity: 20,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.9,
    numReviews: 8
  },
  {
    name: 'Kashmiri Red Chili',
    slug: 'kashmiri-red-chili',
    description: 'Mild and aromatic Kashmiri red chilies',
    longDescription: 'Known for their vibrant red color and mild heat. Perfect for Kashmiri cuisine.',
    price: 350,
    originalPrice: 450,
    unit: 'kg',
    images: ['https://tulua.shop/cdn/shop/files/KashmiriChilliWhole.jpg?v=1740206188'],
    category: 'Mirchi',
    quantity: 15,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.9,
    numReviews: 11
  },
  {
    name: 'Chili Powder (Lal Mirchi Powder)',
    slug: 'chili-powder-lal-mirchi-powder',
    description: 'Pure organic red chili powder',
    longDescription: 'Made from premium organic red chilies. Perfect for adding heat and color to dishes.',
    price: 180,
    originalPrice: 230,
    unit: 'kg',
    images: ['https://5.imimg.com/data5/SELLER/Default/2023/2/KM/NU/QK/51747533/akc-red-chili-powder-lal-mirch-powder.JPG'],
    category: 'Mirchi',
    quantity: 40,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.7,
    numReviews: 23
  },

  // Dry Fruits
  {
    name: 'Organic Almonds',
    slug: 'organic-almonds',
    description: 'Premium California organic almonds',
    longDescription: 'High-quality organic almonds rich in vitamin E and healthy fats.',
    price: 450,
    originalPrice: 550,
    unit: 'kg',
    images: ['https://5.imimg.com/data5/SELLER/Default/2022/4/LM/RD/PF/121019584/organic-almonds-nut-500x500.jpg'],
    category: 'Dry Fruits',
    quantity: 30,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.7,
    numReviews: 21
  },
  {
    name: 'Organic Cashews',
    slug: 'organic-cashews',
    description: 'Premium whole organic cashews',
    longDescription: 'Creamy and delicious organic cashews. Perfect for snacking and cooking.',
    price: 550,
    originalPrice: 650,
    unit: 'kg',
    images: ['https://www.greendna.in/cdn/shop/products/cashew22_1000x.jpg?v=1587645256'],
    category: 'Dry Fruits',
    quantity: 25,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.8,
    numReviews: 18
  },
  {
    name: 'Organic Walnuts',
    slug: 'organic-walnuts',
    description: 'Premium organic walnut kernels',
    longDescription: 'Brain-shaped walnuts rich in omega-3 fatty acids and antioxidants.',
    price: 480,
    originalPrice: 580,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=600'],
    category: 'Dry Fruits',
    quantity: 20,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.6,
    numReviews: 14
  },
  {
    name: 'Organic Pistachios',
    slug: 'organic-pistachios',
    description: 'Premium organic pistachio kernels',
    longDescription: 'Premium quality organic pistachios with rich flavor and vibrant green color.',
    price: 650,
    originalPrice: 780,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1600348759986-4bb68e7cd1b5?w=600'],
    category: 'Dry Fruits',
    quantity: 15,
    organic: true,
    harvestDate: new Date(),
    quality: 'A',
    isAvailable: true,
    isApproved: true,
    farmer: null,
    rating: 4.9,
    numReviews: 20
  }
];

// Main seeding function
const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Order.deleteMany();
    console.log('🗑️ Cleared existing data');

    // Create Users
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Get farmer IDs
    const farmer1 = createdUsers.find(u => u.email === 'farmer@agritradex.com');
    const farmer2 = createdUsers.find(u => u.email === 'farmer2@agritradex.com');

    // Assign farmers to products
    const productsWithFarmers = products.map((product, index) => {
      // Assign first farmer to grains and spices
      if (product.category === 'Grains' || product.category === 'Spices') {
        return { ...product, farmer: farmer1._id };
      }
      // Assign second farmer to fruits and vegetables
      if (product.category === 'Fruits' || product.category === 'Vegetables') {
        return { ...product, farmer: farmer2._id };
      }
      // Assign randomly for others
      return { ...product, farmer: index % 2 === 0 ? farmer1._id : farmer2._id };
    });

    // Create Products
    const createdProducts = await Product.create(productsWithFarmers);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Create Categories
    const createdCategories = await Category.create(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Update product counts for categories
    for (const category of createdCategories) {
      const productCount = await Product.countDocuments({ category: category.name });
      category.productCount = productCount;
      await category.save();
    }
    console.log('✅ Updated category product counts');

    console.log('\n🎉 Data Import Complete!');
    console.log('📊 Summary:');
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Products: ${createdProducts.length}`);
    console.log(`   - Categories: ${createdCategories.length}`);
    
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin: admin@agritradex.com / admin123');
    console.log('   Farmer 1: farmer@agritradex.com / password123');
    console.log('   Farmer 2: farmer2@agritradex.com / password123');
    console.log('   Buyer: buyer@agritradex.com / buyer123');

    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

// Run the import
importData();