"use client"

import { useRef, useState } from 'react'
import { Book as BookType } from '@/store/useBookStore'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

const BOOK_MATERIALS = {
  cover: {
    roughness: 0.6,
    metalness: 0.1,
    reflectivity: 0.8,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  },
  spine: {
    roughness: 0.4,
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

  // Book dimensions - adjusted for Stripe Press proportions
  const width = 8 // width of the book
  const height = 0.5 // thickness of the book
  const depth = 6 // height of the book spine

  return (
    <mesh
      ref={meshRef}
      position={book.position}
      rotation={[0, -Math.PI * 0.15, 0]} // ~27 degrees rotation
      scale={hovered ? 1.02 : 1}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      {/* Main book body */}
      <boxGeometry args={[width, height, depth]} />
      <meshPhysicalMaterial
        {...BOOK_MATERIALS.cover}
        color={book.coverColor}
      />

      {/* Spine with text */}
      <group position={[-width/2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Spine background */}
        <mesh>
          <planeGeometry args={[depth, height]} />
          <meshStandardMaterial {...BOOK_MATERIALS.spine} color={book.coverColor} />
        </mesh>
        
        {/* Author text */}
        <Text
          position={[-depth/2 + 0.6, 0, 0.01]}
          fontSize={0.25}
          color="white"
          anchorX="left"
          anchorY="middle"
          maxWidth={depth - 1.5}
        >
          {book.authors.join(', ')}
        </Text>

        {/* Title text */}
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={depth - 1.5}
        >
          {book.title}
        </Text>

        {/* Logo */}
        <Text
          position={[depth/2 - 0.3, 0, 0.01]}
          fontSize={0.25}
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