import express from 'express';
const app = express();

// Serve files from the "public" directory
app.use(express.static('dist'));

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
