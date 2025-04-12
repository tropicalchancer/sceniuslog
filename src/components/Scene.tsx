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
  const targetY = useRef(0)
  const currentY = useRef(0)
  const scrollSpeed = 0.1
  const scrollRange = 8 // Total scrollable range

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      // Update target Y position based on scroll
      targetY.current = Math.max(
        -scrollRange,
        Math.min(scrollRange, targetY.current + e.deltaY * 0.005)
      )
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [])

  useEffect(() => {
    const animate = () => {
      // Smooth interpolation between current and target position
      currentY.current += (targetY.current - currentY.current) * scrollSpeed
      camera.position.y = currentY.current
      requestAnimationFrame(animate)
    }
    animate()
  }, [camera])

  return null
}

const Scene = () => {
  const { books, selectedBook, setSelectedBook } = useBookStore()

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [3, 0, 8], fov: 45 }}
        className="bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <Suspense fallback={null}>
          <CameraController />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
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