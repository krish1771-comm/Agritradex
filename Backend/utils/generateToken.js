import jwt from 'jsonwebtoken';

const JWT_SECRET = 'agritradex_super_secret_key_2024';

const generateToken = (id) => {
  console.log('🔑 Generating token for user:', id);
  
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
  
  console.log('   Token generated successfully');
  return token;
};

export default generateToken;