"use client"

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Center } from '@react-three/drei'
import { Book } from './Book'
import { BookDetails } from './BookDetails'
import { useBookStore } from '@/store/useBookStore'
import { AnimatePresence } from 'framer-motion'

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
      <ambientLight intensity={0.4} />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={0.8} 
        castShadow
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.3}
      />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        castShadow
      />
    </>
  )
}

const Scene = () => {
  const { books, selectedBook, setSelectedBook } = useBookStore()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Handle mouse movement for subtle book rotation
  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event
    const x = (clientX / window.innerWidth) * 2 - 1
    const y = -(clientY / window.innerHeight) * 2 + 1
    setMousePosition({ x, y })
  }

  return (
    <div 
      className="w-full h-screen bg-[#0F0F0F]"
      onMouseMove={handleMouseMove}
    >
      <header className="absolute top-8 left-8 z-10 text-white">
        <h1 className="text-2xl font-sans mb-1">SceniusLog</h1>
        <p className="font-libre italic text-lg text-white/80">Ideas for progress</p>
      </header>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ 
          position: [15, 8, 15],
          fov: 35,
          near: 0.1,
          far: 100,
        }}
        className="bg-[#0F0F0F]"
      >
        <Suspense fallback={null}>
          <Lighting />
          <Environment preset="city" />
          
          <Center>
            <group>
              {books.map((book, index) => (
                <Book
                  key={book.id}
                  book={book}
                  index={index}
                  mousePosition={mousePosition}
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </group>
          </Center>

          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.1}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

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