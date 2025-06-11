const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const axios = require('axios')

app.use(cors())
dotenv.config();


const PORT = process.env.PORT || 3000;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;


app.get('/morning', async (req,res) => {
    try {
        const response = await axios.get('https://api.unsplash.com/photos/random?query=morning sun', {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
          }
        });
        res.json(response.data);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching photos from Unsplash' });
      }
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });