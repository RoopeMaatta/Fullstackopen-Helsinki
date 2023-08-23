import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins:[
    react(),
    // {
    //   name: 'set-content-type',
    //   configureServer(server) {
    //     server.middlewares.use((req, res, next) => {
    //       //res.setHeader('Content-Type', 'text/html');
    //       res.setHeader('Content-Type', 'text/html');
    //       res.setHeader('Content-Disposition', 'inline');
    //       res.setHeader('X-Content-Type-Options', 'nosniff');

    //       next();
    //     });
    //   },
    // },
  ]
  

  
})
