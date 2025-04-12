"use client"

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import { Book as BookType } from '@/store/useBookStore'
import * as THREE from 'three'

const BOOK_MATERIALS = {
  cover: {
    roughness: 0.8,
    metalness: 0.1,
    reflectivity: 0.5,
    clearcoat: 0.3,
    clearcoatRoughness: 0.3,
  },
  spine: {
    roughness: 0.8,
    metalness: 0.1,
    opacity: 0.1,
    transparent: true,
    color: '#ffffff',
  }
} as const

interface BookProps {
  book: BookType
  onClick: () => void
}

const Book = ({ book, onClick }: BookProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)

  useFrame((state) => {
    if (!dragging && meshRef.current) {
      const time = state.clock.getElapsedTime()
      const offset = parseInt(book.id)
      meshRef.current.position.y = book.position[1] + Math.sin(time + offset) * 0.1
      meshRef.current.rotation.y = book.rotation[1] + Math.sin(time * 0.5 + offset) * 0.05
    }
  })

  const bind = useDrag(({ active, movement: [x, y], first, last }) => {
    if (first) setDragging(true)
    if (last) setDragging(false)
    if (active && meshRef.current) {
      meshRef.current.position.set(
        book.position[0] + x * 0.01,
        book.position[1] - y * 0.01,
        book.position[2]
      )
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={book.position}
      rotation={book.rotation}
      scale={hovered ? 1.1 : 1}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...bind()}
    >
      <boxGeometry args={[3, 0.4, 4]} />
      <meshPhysicalMaterial
        {...BOOK_MATERIALS.cover}
        color={book.coverColor}
      />
      <mesh position={[-1.4, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3.8, 0.3]} />
        <meshStandardMaterial {...BOOK_MATERIALS.spine} />
      </mesh>
    </mesh>
  )
}

export { Book } 