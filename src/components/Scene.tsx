"use client"

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Center } from '@react-three/drei'
import { Book } from './Book'
import { BookDetails } from './BookDetails'
import { useBookStore } from '@/store/useBookStore'
import { AnimatePresence } from 'framer-motion'

const Scene = () => {
  const { books, selectedBook, setSelectedBook } = useBookStore()

  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        camera={{ 
          position: [8, 1, 15], // Closer camera position
          fov: 40,
          near: 0.1,
          far: 100
        }}
        className="bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          <Environment preset="city" />
          
          {/* Centered group with slight rotation */}
          <Center>
            <group>
              {books.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </group>
          </Center>

          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.1}
            maxPolarAngle={Math.PI / 2.1}
            minAzimuthAngle={-Math.PI * 0.15}
            maxAzimuthAngle={Math.PI * 0.15}
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