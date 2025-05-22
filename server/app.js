const express = require('express');
const dotenv = require('dotenv');
const uploadRoute = require('./routes/upload');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/upload', uploadRoute);

app.get('/', (req, res) => {
  res.send('Quincy Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
