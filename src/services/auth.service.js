import api from './api.js';

// NOTE: Mock authentication - not for production use

export async function findUserByEmail(email) {
  try {
    const response = await api.get('/users', {
      params: { email }
    });
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

export async function createUser(userData) {
  try {
    const randomNum = Math.floor(Math.random() * 70) + 1;
    const avatar = `https://i.pravatar.cc/150?img=${randomNum}`;
    
    const response = await api.post('/users', {
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'user',
      avatar: avatar
    });
    
    const { id, fullName, email, role, avatar: userAvatar } = response.data;
    return { id, fullName, email, role, avatar: userAvatar };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function emailExists(email) {
  try {
    const user = await findUserByEmail(email);
    return user !== null;
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
}

export async function validateCredentials(email, password) {
  try {
    const user = await findUserByEmail(email);
    if (user && user.password === password) {
      const { id, fullName, email: userEmail, role, avatar } = user;
      return { id, fullName, email: userEmail, role, avatar };
    }
    return null;
  } catch (error) {
    console.error('Error validating credentials:', error);
    throw error;
  }
}
