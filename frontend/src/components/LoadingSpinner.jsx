import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingSpinner = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Positions des points décoratifs
  const dotPositions = [
    { top: '0%', left: '50%' },    // Haut
    { top: '50%', left: '100%' },  // Droite
    { top: '100%', left: '50%' },  // Bas
    { top: '50%', left: '0%' }     // Gauche
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 0.95,
        transition: {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-gradient-to-br from-white to-gray-100 z-50 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ 
          scale: 0.9,
          y: -20,
          transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-24 h-24">
          {/* Cercle extérieur */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-black border-t-transparent rounded-full"
          />
          {/* Cercle intérieur */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 border-4 border-black border-b-transparent rounded-full"
          />
          {/* Cercle central */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-6 border-4 border-black rounded-full"
          />
          {/* Points décoratifs */}
          {dotPositions.map((position, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={position}
            />
          ))}
        </div>
        
        <div className="h-1.5 bg-gray-200 rounded-full mt-8 w-[200px] overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-black to-gray-700"
          />
        </div>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ 
            y: 10,
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-black font-itim text-lg tracking-wider"
        >
          Chargement... {progress}%
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner; 