// frontend/src/App.js
import React from 'react';
import VideoConverter from './components/VideoConverter';
import './index.css'; // Asegúrate de importar el archivo CSS de Tailwind

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="text-center py-4 bg-indigo-600 text-white">
        <h1 className="text-4xl font-bold">YouTube Video Converter</h1>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <VideoConverter />
      </main>
      <footer className="text-center py-4 bg-gray-800 text-white">
        <p>&copy; 2024 YouTube Video Converter</p>
      </footer>
    </div>
  );
}

export default App;
