// Toast notification function remains the same

// Database functions
const API_BASE = 'http://localhost:3000/api';

export async function saveUserProfile(user) {
  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
}

export async function getUserProfile(userId) {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

export async function saveOrder(order) {
  try {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
}

export async function getOrdersByUserId(userId) {
  try {
    const response = await fetch(`${API_BASE}/orders/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export async function saveReview(review) {
  try {
    const response = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving review:', error);
    throw error;
  }
}

export async function getAllReviews() {
  try {
    const response = await fetch(`${API_BASE}/reviews`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
}