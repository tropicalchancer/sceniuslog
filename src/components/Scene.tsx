"use client"

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Center } from '@react-three/drei'
import { Book } from './Book'
import { BookDetails } from './BookDetails'
import { useBookStore } from '@/store/useBookStore'
import { AnimatePresence } from 'framer-motion'
import { calculateBookPosition, calculateBookRotation, GRID_CONFIG } from '@/config/grid'

/**
 * Scene Component
 * 
 * This is the main 3D scene component that renders the book display.
 * It uses React Three Fiber (R3F) to create a WebGL scene with Three.js
 * and manages the 3D environment, camera, and book positioning.
 */

// Scene lighting setup
const Lighting = () => {
  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={1.5} 
        castShadow
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.8}
      />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1.2}
        castShadow
      />
    </>
  )
}

const Scene = () => {
  const { books, selectedBook, setSelectedBook } = useBookStore()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  // Handle mouse movement for subtle book rotation
  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event
    const x = (clientX / window.innerWidth) * 2 - 1
    const y = -(clientY / window.innerHeight) * 2 + 1
    setMousePosition({ x, y })
  }

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate total height needed for all books
  const totalHeight = books.length * (GRID_CONFIG.BOOK_HEIGHT + GRID_CONFIG.VERTICAL_GAP)

  return (
    <div 
      className="w-full min-h-[400vh] bg-[#0F0F0F]"
      onMouseMove={handleMouseMove}
      style={{ height: `${Math.max(400, totalHeight * 100)}vh` }}
    >
      <header className="fixed top-8 left-8 z-10 text-white">
        <h1 className="text-2xl font-sans mb-1">SceniusLog</h1>
        <p className="font-libre italic text-lg text-white/80">Ideas for progress</p>
      </header>

      <div className="sticky top-0 w-full h-screen">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ 
            position: [25, 8, 0],
            fov: 30,
            near: 0.1,
            far: 100,
          }}
          className="bg-[#0F0F0F]"
        >
          <Suspense fallback={null}>
            <Lighting />
            <Environment preset="city" />
            
            <Center>
              <group 
                position={[0, scrollY * -0.01, 0]}
                rotation={[0, Math.PI / 2, 0]}
              >
                {books.map((book, index) => {
                  const position = calculateBookPosition(index);
                  const rotation = calculateBookRotation();
                  return (
                    <Book
                      key={book.id}
                      book={book}
                      index={index}
                      position={position}
                      rotation={rotation}
                      mousePosition={mousePosition}
                      onClick={() => setSelectedBook(book)}
                    />
                  );
                })}
              </group>
            </Center>

            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2.1}
              rotateSpeed={0.5}
              minAzimuthAngle={Math.PI / 4}
              maxAzimuthAngle={Math.PI / 1.5}
            />
          </Suspense>
        </Canvas>
      </div>

      <AnimatePresence>
        {selectedBook && (
          <BookDetails
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export { Scene } 