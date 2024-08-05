import React, { useState } from 'react';
import axios from 'axios';

function VideoConverter() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');
  const [quality, setQuality] = useState('720p');
  const [downloadLink, setDownloadLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!url) {
      alert('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setDownloadLink('');

    try {
      const response = await axios.post('http://localhost:5000/api/download', { url, format, quality });
      setDownloadLink(response.data.filePath);
    } catch (error) {
      console.error('Error downloading the video:', error);
      setError('Failed to download video. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">YouTube Video Converter</h1>
        <input
          type="text"
          placeholder="Enter video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Select Format:</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="mp3">MP3</option>
            <option value="mp4">MP4</option>
          </select>
        </div>
        {format === 'mp4' && (
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Select Quality:</label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
            </select>
          </div>
        )}
        <button
          onClick={handleDownload}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 transform hover:scale-105"
        >
          {loading ? 'Downloading...' : 'Download'}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {downloadLink && (
          <div className="mt-4 text-center">
            <a href={`http://localhost:5000${downloadLink}`} download className="text-blue-500 underline">
              Download your file
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoConverter;
