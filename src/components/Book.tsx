"use client"

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import { Book as BookType } from '@/store/useBookStore'
import * as THREE from 'three'

interface BookProps {
  book: BookType
  onClick: () => void
}

const Book = ({ book, onClick }: BookProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)

  // Gentle floating animation
  useFrame((state) => {
    if (!dragging && meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.position.y = book.position[1] + Math.sin(time + parseInt(book.id)) * 0.1
      meshRef.current.rotation.y = book.rotation[1] + Math.sin(time * 0.5 + parseInt(book.id)) * 0.05
    }
  })

  const bind = useDrag(
    ({ active, movement: [x, y], first, last }) => {
      if (first) setDragging(true)
      if (last) setDragging(false)

      if (active && meshRef.current) {
        const newPosition = [
          book.position[0] + x * 0.01,
          book.position[1] - y * 0.01,
          book.position[2],
        ] as [number, number, number]
        meshRef.current.position.set(...newPosition)
      }
    }
  )

  return (
    <mesh
      ref={meshRef}
      position={book.position}
      rotation={book.rotation}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...bind()}
    >
      {/* Book cover */}
      <boxGeometry args={[3, 0.4, 4]} />
      <meshPhysicalMaterial
        color={book.coverColor}
        roughness={0.8}
        metalness={0.1}
        reflectivity={0.5}
        clearcoat={0.3}
        clearcoatRoughness={0.3}
      />

      {/* Book spine text (placeholder) */}
      <mesh position={[-1.4, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3.8, 0.3]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.8}
          metalness={0.1}
          opacity={0.1}
          transparent
        />
      </mesh>
    </mesh>
  )
}

export { Book } 