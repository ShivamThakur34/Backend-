const express = require ('express')
const mongoose = require ('mongoose')
const dotenv = require ('dotenv')
const noteRoutes = require ('./routes/noteRoutes')
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
app.use(cors());

dotenv.config();
const app = express();
const PORT = process.env.port || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);
app.use('/api/notes', require('./routes/noteRoutes'));  // this was added later
app.use("/api/users", userRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true})
  .then(() => { 
    console.log('MongoDB connected');
    app.listen(PORT,() => console.log(`Server running on http://localhost:${PORT}`));
  })
.catch(err=> console.error('MongoDB connected failed:',err));
