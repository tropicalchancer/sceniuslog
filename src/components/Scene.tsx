"use client"

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Book } from './Book'
import { BookDetails } from './BookDetails'
import { useBookStore } from '@/store/useBookStore'
import { AnimatePresence } from 'framer-motion'

const Scene = () => {
  const { books, selectedBook, setSelectedBook } = useBookStore()

  return (
    <div className="w-full h-screen">
      <Canvas
        className="bg-gradient-to-b from-gray-900 to-gray-800"
        shadows
      >
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[25, 1.5, 18]}  // Further back, slightly higher for better top view
            fov={15}  // Narrower FOV to zoom out
            near={0.1}
            far={1000}
            rotation={[-0.08, -Math.PI / 4, 0]}  // Slight downward tilt
          />
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={0.8}
            castShadow
          />
          <spotLight
            position={[10, 10, 5]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.1}  // Slight upward view
            maxPolarAngle={Math.PI / 2.1}
            minAzimuthAngle={Math.PI / 4}   // Lock at 45 degrees
            maxAzimuthAngle={Math.PI / 4}
            rotateSpeed={0}
          />
          
          <group position={[0, 0, 0]} scale={0.8}>  {/* Scale down entire stack */}
            {books.map((book) => (
              <Book
                key={book.id}
                book={book}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </group>
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