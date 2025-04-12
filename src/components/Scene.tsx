"use client"

import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Book } from './Book'
import { BookDetails } from './BookDetails'
import { useBookStore } from '@/store/useBookStore'
import { AnimatePresence } from 'framer-motion'

// Camera controller component
const CameraController = () => {
  const { camera } = useThree()
  const scrollY = useRef(0)
  const SCROLL_SPEED = 0.005
  const SCROLL_RANGE = 8

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      scrollY.current = Math.max(
        -SCROLL_RANGE,
        Math.min(SCROLL_RANGE, scrollY.current + e.deltaY * SCROLL_SPEED)
      )
      camera.position.y = scrollY.current
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [camera])

  return null
}

const Scene = () => {
  const { books, selectedBook, setSelectedBook } = useBookStore()

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [3, 0, 15], fov: 50 }}
        className="bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <Suspense fallback={null}>
          <CameraController />
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