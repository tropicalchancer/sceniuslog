"use client"

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Book } from './Book'
import { BookDetails } from './BookDetails'
import { useBookStore } from '@/store/useBookStore'
import { AnimatePresence } from 'framer-motion'

const Scene = () => {
  const { books, selectedBook, setSelectedBook } = useBookStore()

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [5, 0, 15], fov: 45 }}
        className="bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
            rotateSpeed={0.5}
          />
          
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              onClick={() => setSelectedBook(book)}
            />
          ))}
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