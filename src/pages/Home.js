import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProductList from '../components/product/ProductList';

const Home = () => {
  // Featured categories for the homepage
  const featuredCategories = [
    { id: 1, name: 'Full Face Helmets', image: 'https://placehold.co/400x300/3f51b5/FFFFFF?text=Full+Face+Helmets' },
    { id: 2, name: 'Open Face Helmets', image: 'https://placehold.co/400x300/f50057/FFFFFF?text=Open+Face+Helmets' },
    { id: 3, name: 'Modular Helmets', image: 'https://placehold.co/400x300/009688/FFFFFF?text=Modular+Helmets' },
    { id: 4, name: 'Off-Road Helmets', image: 'https://placehold.co/400x300/ff9800/FFFFFF?text=Off-Road+Helmets' }
  ];

  return (
    <div className="home">
      <Navbar />
      
      <div className="hero-section">
        <div className="hero-content">
          <h1>Safety Meets Style</h1>
          <p>Discover premium helmets for every rider</p>
          <Link to="/products" className="hero-button">Shop Now</Link>
        </div>
      </div>
      
      <div className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <ProductList limit={8} />
          <div className="view-all-container">
            <Link to="/products" className="view-all-button">View All Products</Link>
          </div>
        </div>
      </div>
      
      <div className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop By Category</h2>
          <div className="categories-grid">
            {featuredCategories.map(category => (
              <div key={category.id} className="category-card">
                <Link to={`/products?category=${category.name}`}>
                  <div className="category-image">
                    <img src={category.image} alt={category.name} />
                  </div>
                  <h3 className="category-name">{category.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="banner-section">
        <div className="container">
          <div className="banner-content">
            <h2>Premium Protection</h2>
            <p>Our helmets exceed safety standards while offering ultimate comfort and style.</p>
            <Link to="/about" className="banner-button">Learn More</Link>
          </div>
        </div>
      </div>
      
      <div className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "The helmet I purchased is not only stylish but also extremely comfortable. I can ride for hours without any discomfort."
              </p>
              <p className="testimonial-author">- Michael S.</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "The quality of these helmets is outstanding. Great ventilation and visibility. Will definitely buy again!"
              </p>
              <p className="testimonial-author">- Jessica T.</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "Fast shipping and excellent customer service. The helmet fits perfectly and looks even better in person."
              </p>
              <p className="testimonial-author">- Robert L.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home; 