import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the App component

// The root element where your app will be mounted
const rootElement = document.getElementById('root');

// React 18 introduces createRoot for concurrent rendering
const root = ReactDOM.createRoot(rootElement);

// Render the App component into the root element
root.render(<App />);
