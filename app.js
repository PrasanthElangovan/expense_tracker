const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((error) => console.error('Error syncing database:', error));

const app = express();

app.use(bodyParser.json());
app.use('/api', userRoutes);  
app.use('/api', transactionRoutes); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
