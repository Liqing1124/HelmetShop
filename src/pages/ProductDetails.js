import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProductDetails from '../components/product/ProductDetails';
import ProductList from '../components/product/ProductList';
import Loading from '../components/common/Loading';
import { getProductById } from '../api/product';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        setLoading(false);
        console.error('Error fetching product details:', err);
      }
    };
    
    fetchProduct();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);
  
  return (
    <div className="product-details-page">
      <Navbar />
      
      <div className="product-details-container">
        {loading ? (
          <Loading text="Loading product details..." />
        ) : error ? (
          <div className="product-details-error">{error}</div>
        ) : (
          <>
            <div className="breadcrumb">
              <span>Home</span> / <span>Products</span> / <span>{product?.category}</span> / <span>{product?.name}</span>
            </div>
            
            <ProductDetails product={product} />
            
            <div className="product-details-section">
              <h2 className="section-title">Product Specifications</h2>
              <div className="specifications">
                <table className="specs-table">
                  <tbody>
                    {product?.specifications?.map((spec, index) => (
                      <tr key={index}>
                        <td className="spec-name">{spec.name}</td>
                        <td className="spec-value">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {product?.reviews?.length > 0 && (
              <div className="product-details-section">
                <h2 className="section-title">Customer Reviews</h2>
                <div className="reviews">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <span className="reviewer-name">{review.userName}</span>
                          <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <div className="review-rating">
                          {Array(5).fill('').map((_, i) => (
                            <span 
                              key={i} 
                              className={`fa fa-star ${i < review.rating ? 'checked' : ''}`}
                            ></span>
                          ))}
                        </div>
                      </div>
                      <p className="review-text">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="product-details-section">
              <h2 className="section-title">Related Products</h2>
              <ProductList category={product?.category} limit={4} />
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailsPage; 