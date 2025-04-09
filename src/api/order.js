import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Get auth headers - helper function
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || !user.token) {
    throw new Error('User not authenticated');
  }
  
  return {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };
};

// Create new order
export const createOrder = async (orderData) => {
  try {
    const authHeader = getAuthHeader();
    const response = await axios.post(`${API_URL}/orders`, orderData, authHeader);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (id) => {
  try {
    const authHeader = getAuthHeader();
    const response = await axios.get(`${API_URL}/orders/${id}`, authHeader);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error;
  }
};

// Get user's order history
export const getUserOrders = async () => {
  try {
    const authHeader = getAuthHeader();
    const response = await axios.get(`${API_URL}/orders/myorders`, authHeader);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

// Update order to paid
export const updateOrderToPaid = async (orderId, paymentResult) => {
  try {
    const authHeader = getAuthHeader();
    const response = await axios.put(
      `${API_URL}/orders/${orderId}/pay`, 
      paymentResult, 
      authHeader
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating order ${orderId} to paid:`, error);
    throw error;
  }
};

// Cancel order
export const cancelOrder = async (orderId) => {
  try {
    const authHeader = getAuthHeader();
    const response = await axios.put(
      `${API_URL}/orders/${orderId}/cancel`, 
      {}, 
      authHeader
    );
    return response.data;
  } catch (error) {
    console.error(`Error cancelling order ${orderId}:`, error);
    throw error;
  }
}; 