import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import LoadingSpinner from './components/LoadingSpinner'

const App = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./App.jsx'));
    }, 4000);
  });
});

const Root = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 10, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <App />
      </motion.div>
    </Suspense>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
