import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';  // Import path for resolving aliases

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',               // Main React entry point
                'resources/js/Pages/Home.jsx',         // Home.jsx file
                'resources/js/Pages/Listings.jsx',     // Listings.jsx file
                'resources/js/Pages/ListingDetails.jsx', // ListingDetails.jsx file
                'resources/css/home.css',              // Home.css file
                'resources/css/listings.css',          // Listings.css file
                'resources/css/app.css',               // App.css file
            ],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@Pages': path.resolve(__dirname, 'resources/js/Pages'),  // Alias for Pages folder
            '@': '/resources/js',  // Alias for resources/js folder
        },
        
    },
});
