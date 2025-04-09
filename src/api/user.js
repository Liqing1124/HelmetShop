// Mock implementation for development without a backend
// Will be replaced with actual API calls when backend is ready

// Login user
export const login = async (credentials) => {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock validation
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        const userData = {
          id: 1,
          name: 'Test User',
          email: credentials.email,
          token: 'mock-jwt-token-12345'
        };
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        resolve(userData);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

// Register new user
export const register = async (userData) => {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email === 'user@example.com') {
        // Simulate email already taken
        reject(new Error('Email already in use'));
      } else {
        resolve({
          success: true,
          message: 'User registered successfully'
        });
      }
    }, 500);
  });
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return !!user;
};

// Get user profile
export const getUserProfile = async () => {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!user || !user.token) {
        reject(new Error('User not authenticated'));
      } else {
        resolve({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: '555-123-4567'
        });
      }
    }, 500);
  });
};

// Update user profile
export const updateUserProfile = async (userData) => {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!user || !user.token) {
        reject(new Error('User not authenticated'));
      } else {
        // Update user data
        const updatedUser = {
          ...user,
          name: userData.name,
          email: userData.email
        };
        
        // Store updated user in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        resolve(updatedUser);
      }
    }, 500);
  });
}; 