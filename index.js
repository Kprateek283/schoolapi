import express from 'express'; 
import { testConnection } from './db.js';
import schoolRoutes from './routes/schoolRoutes.js'

const app = express();
app.use(express.json());

app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;

// Test database connection on server start
const testDBConnection = async () => {
  try {
    await testConnection();
    console.log("Database connection successful!");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
    process.exit(1);
  }
};

// Health check route
app.get('/', (req, res) => {
  res.send('School Management API is running!');
});

// Start the server
app.listen(PORT, async () => {
  await testDBConnection(); 
  console.log(`Server is running on port ${PORT}`);
});
