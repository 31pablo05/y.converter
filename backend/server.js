const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar la descarga
app.post('/api/download', async (req, res) => {
  const { url, format, quality } = req.body;

  try {
    const videoId = ytdl.getURLVideoID(url);
    const options = {
      filter: format === 'mp3' ? 'audioonly' : 'videoandaudio',
      quality: format === 'mp4' ? quality : 'highestaudio',
    };

    const filePath = path.resolve(__dirname, 'downloads', `${videoId}.${format}`);
    const fileStream = fs.createWriteStream(filePath);

    ytdl(url, options).pipe(fileStream);

    fileStream.on('finish', () => {
      res.json({ filePath: `/downloads/${videoId}.${format}` });
    });

    fileStream.on('error', (error) => {
      console.error('File Stream Error:', error);
      res.status(500).send('Internal Server Error');
    });

  } catch (error) {
    console.error('Error downloading the video:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Servir archivos estáticos desde la carpeta "downloads"
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
