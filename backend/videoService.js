// backend/videoService.js
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

async function downloadVideo(url, format, quality) {
  const videoId = ytdl.getVideoID(url);
  const info = await ytdl.getInfo(videoId);
  const fileName = `${info.videoDetails.title}.${format}`;
  const filePath = path.resolve(__dirname, 'downloads', fileName);

  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { quality: format === 'mp4' ? quality : 'highestaudio' });
    const output = format === 'mp3'
      ? ffmpeg(stream).audioCodec('libmp3lame').save(filePath)
      : ffmpeg(stream).videoCodec('libx264').save(filePath);

    output.on('end', () => resolve(fileName));
    output.on('error', (error) => reject(error));
  });
}

module.exports = { downloadVideo };
