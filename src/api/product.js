import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Mock implementation for development without a backend
// Will be replaced with actual API calls when backend is ready

// Sample product data
const mockProducts = [
  {
    id: 1,
    name: "Premium Full Face Helmet",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    image: "https://placehold.co/300x300/3f51b5/FFFFFF?text=Full+Face+Helmet",
    category: "Full Face Helmets",
    rating: 4.5,
    reviewCount: 128,
    description: "Premium full face helmet with advanced protection features and superior comfort.",
    features: ["DOT and ECE certified", "Removable liner", "Anti-fog visor", "Excellent ventilation"],
    stock: 25,
    specifications: [
      { name: "Weight", value: "1580g" },
      { name: "Material", value: "Fiberglass composite" },
      { name: "Certification", value: "DOT, ECE 22.05" }
    ]
  },
  {
    id: 2,
    name: "Sport Open Face Helmet",
    price: 119.99,
    originalPrice: 119.99,
    discount: 0,
    image: "https://placehold.co/300x300/f50057/FFFFFF?text=Open+Face+Helmet",
    category: "Open Face Helmets",
    rating: 4.2,
    reviewCount: 75,
    description: "Lightweight open face helmet ideal for urban riding with great style and comfort.",
    features: ["DOT certified", "Quick-release buckle", "UV resistant shell", "Multiple color options"],
    stock: 42,
    specifications: [
      { name: "Weight", value: "1150g" },
      { name: "Material", value: "ABS Thermoplastic" },
      { name: "Certification", value: "DOT" }
    ]
  },
  {
    id: 3,
    name: "Adventure Modular Helmet",
    price: 229.99,
    originalPrice: 279.99,
    discount: 18,
    image: "https://placehold.co/300x300/009688/FFFFFF?text=Modular+Helmet",
    category: "Modular Helmets",
    rating: 4.8,
    reviewCount: 92,
    description: "Versatile modular helmet perfect for long rides with convenience and protection.",
    features: ["DOT and SNELL certified", "Flip-up chin bar", "Integrated sun visor", "Bluetooth ready"],
    stock: 18,
    specifications: [
      { name: "Weight", value: "1650g" },
      { name: "Material", value: "Carbon composite" },
      { name: "Certification", value: "DOT, SNELL" }
    ]
  },
  {
    id: 4,
    name: "Pro Off-Road Helmet",
    price: 179.99,
    originalPrice: 179.99,
    discount: 0,
    image: "https://placehold.co/300x300/ff9800/FFFFFF?text=Off-Road+Helmet",
    category: "Off-Road Helmets",
    rating: 4.6,
    reviewCount: 63,
    description: "Durable off-road helmet designed for challenging terrain with maximum ventilation.",
    features: ["Lightweight design", "Extended chin bar", "Adjustable visor", "Washable liner"],
    stock: 31,
    specifications: [
      { name: "Weight", value: "1420g" },
      { name: "Material", value: "Polycarbonate shell" },
      { name: "Certification", value: "DOT, ECE 22.05" }
    ]
  },
  {
    id: 5,
    name: "Racing Full Face Helmet",
    price: 299.99,
    originalPrice: 349.99,
    discount: 14,
    image: "https://placehold.co/300x300/3f51b5/FFFFFF?text=Racing+Helmet",
    category: "Full Face Helmets",
    rating: 4.9,
    reviewCount: 47,
    description: "High-performance racing helmet with aerodynamic design and superior protection.",
    features: ["DOT, ECE, and SNELL certified", "Wind tunnel tested", "Advanced ventilation", "Emergency release system"],
    stock: 12,
    specifications: [
      { name: "Weight", value: "1380g" },
      { name: "Material", value: "Carbon fiber" },
      { name: "Certification", value: "DOT, ECE 22.05, SNELL M2020" }
    ]
  },
  {
    id: 6,
    name: "Vintage Open Face Helmet",
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    image: "https://placehold.co/300x300/f50057/FFFFFF?text=Vintage+Helmet",
    category: "Open Face Helmets",
    rating: 4.1,
    reviewCount: 56,
    description: "Classic styled open face helmet with modern safety features and retro aesthetics.",
    features: ["DOT certified", "Leather trim", "Bubble shield compatible", "Classic styling"],
    stock: 22,
    specifications: [
      { name: "Weight", value: "1100g" },
      { name: "Material", value: "Fiberglass" },
      { name: "Certification", value: "DOT" }
    ]
  }
];

// Get all products
export const getProducts = async () => {
  // Simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};

// Get product by ID
export const getProductById = async (id) => {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error(`Product with id ${id} not found`));
      }
    }, 500);
  });
};

// Get products by category
export const getProductsByCategory = async (category) => {
  // Simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category === 'all') {
        resolve(mockProducts);
      } else {
        const filteredProducts = mockProducts.filter(
          p => p.category === category
        );
        resolve(filteredProducts);
      }
    }, 500);
  });
};

// Search products
export const searchProducts = async (query) => {
  // Simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      query = query.toLowerCase();
      const filteredProducts = mockProducts.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.description.toLowerCase().includes(query) ||
             p.category.toLowerCase().includes(query)
      );
      resolve(filteredProducts);
    }, 500);
  });
}; 