"use client"

import { useState } from 'react'
import { Book as BookType } from '@/store/useBookStore'
import { Text } from '@react-three/drei'

const BOOK_MATERIALS = {
  cover: {
    roughness: 0.75,
    metalness: 0.05,
    reflectivity: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.4,
  },
  spine: {
    roughness: 0.75,
    metalness: 0.05,
    transparent: false,
  },
  pages: {
    color: '#ffffff',
    roughness: 0.9,
    metalness: 0,
  }
} as const

interface BookProps {
  book: BookType
  onClick: () => void
}

const Book = ({ book, onClick }: BookProps) => {
  const [hovered, setHovered] = useState(false)

  // Book dimensions (wider, thinner shape)
  const width = 7.0      // Standard book width
  const height = 5.0     // Height about 71% of width
  const thickness = 0.7  // Thickness about 10% of width

  return (
    <group
      position={book.position}
      rotation={[0, Math.PI / 4, 0]} // 45-degree rotation
      scale={hovered ? 1.05 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Main book body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, thickness, height]} />
        <meshPhysicalMaterial
          {...BOOK_MATERIALS.cover}
          color={book.coverColor}
        />
      </mesh>

      {/* Book pages (white edges) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width - 0.05, thickness - 0.05, height - 0.05]} />
        <meshStandardMaterial {...BOOK_MATERIALS.pages} />
      </mesh>

      {/* Spine with text */}
      <group position={[-width/2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Spine background */}
        <mesh>
          <planeGeometry args={[height, thickness]} />
          <meshPhysicalMaterial 
            {...BOOK_MATERIALS.spine} 
            color={book.coverColor}
          />
        </mesh>
        
        {/* Author text */}
        <Text
          position={[-height/2 + 0.4, 0, 0.01]}
          fontSize={0.25}
          color="white"
          anchorX="left"
          anchorY="middle"
          maxWidth={height * 0.8}
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
          maxWidth={height * 0.8}
        >
          {book.title}
        </Text>

        {/* Logo */}
        <Text
          position={[height/2 - 0.4, 0, 0.01]}
          fontSize={0.25}
          color="white"
          anchorX="right"
          anchorY="middle"
        >
          ∞
        </Text>
      </group>
    </group>
  )
}

export { Book } 