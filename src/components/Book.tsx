"use client"

import { useRef, useState } from 'react'
import { Book as BookType } from '@/store/useBookStore'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

const BOOK_MATERIALS = {
  cover: {
    roughness: 0.5,
    metalness: 0.1,
    reflectivity: 0.5,
    clearcoat: 0.3,
    clearcoatRoughness: 0.3,
  },
  spine: {
    roughness: 0.5,
    metalness: 0.1,
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

  return (
    <mesh
      ref={meshRef}
      position={book.position}
      rotation={book.rotation}
      scale={hovered ? 1.1 : 1}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main book body */}
      <boxGeometry args={[4, 0.4, 5]} />
      <meshPhysicalMaterial
        {...BOOK_MATERIALS.cover}
        color={book.coverColor}
      />

      {/* Spine with text */}
      <group position={[-2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Spine background */}
        <mesh>
          <planeGeometry args={[5, 0.4]} />
          <meshStandardMaterial {...BOOK_MATERIALS.spine} color={book.coverColor} />
        </mesh>
        
        {/* Author text */}
        <Text
          position={[-2, 0, 0.01]}
          fontSize={0.15}
          color="white"
          anchorX="left"
          anchorY="middle"
          maxWidth={2}
        >
          {book.authors.join(', ')}
        </Text>

        {/* Title text */}
        <Text
          position={[0.2, 0, 0.01]}
          fontSize={0.15}
          color="white"
          anchorX="left"
          anchorY="middle"
          maxWidth={2}
        >
          {book.title}
        </Text>

        {/* Logo */}
        <Text
          position={[2.2, 0, 0.01]}
          fontSize={0.15}
          color="white"
          anchorX="right"
          anchorY="middle"
        >
          ∞
        </Text>
      </group>
    </mesh>
  )
}

export { Book } 