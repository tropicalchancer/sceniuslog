"use client"

import { useRef, useState, useEffect } from 'react'
import { Book as BookType } from '@/store/useBookStore'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

/**
 * Material configurations for the book's appearance
 * These settings control how light interacts with the book surfaces
 */
const BOOK_MATERIALS = {
  cover: {
    roughness: 0.4,    // Smoother finish
    metalness: 0.1,    // Slight metallic sheen
    reflectivity: 0.8, // High reflectivity
    clearcoat: 0.8,    // Glossy finish
    clearcoatRoughness: 0.2,
    envMapIntensity: 1.5, // Enhanced environment reflections
  },
  spine: {
    roughness: 0.3,
    metalness: 0.1,
    transparent: true,
    color: '#ffffff',
  }
} as const

interface BookProps {
  book: BookType
  onClick: () => void
  index: number
  mousePosition: { x: number; y: number }
}

/**
 * Book Component
 * 
 * Renders a single 3D book with proper geometry, materials, and text.
 * Handles hover states and click interactions.
 */
const Book = ({ book, onClick, index, mousePosition }: BookProps) => {
  // Reference to the mesh for potential direct manipulations
  const meshRef = useRef<THREE.Mesh>(null)
  // State for hover interactions
  const [hovered, setHovered] = useState(false)
  const targetRotation = useRef([0, 0, 0]) // Reset initial rotation

  // Book dimensions - adjusted to match Stripe Press
  const width = 12   // Wider book
  const height = 1.5 // Taller spine (increased from 0.4)
  const depth = 7    // Slightly taller spine

  // Handle mouse interaction
  useEffect(() => {
    if (meshRef.current) {
      targetRotation.current = [
        mousePosition.y * 0.1,
        mousePosition.x * 0.1,
        0
      ]
    }
  }, [mousePosition])

  // Smooth rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += (targetRotation.current[0] - meshRef.current.rotation.x) * 0.1
      meshRef.current.rotation.y += (targetRotation.current[1] - meshRef.current.rotation.y) * 0.1
    }
  })

  // Calculate vertical offset based on index
  const yOffset = -index * 2.2 // Reduced spacing between books for tighter stacking

  return (
    <mesh
      ref={meshRef}
      position={[book.position[0], book.position[1] + yOffset, book.position[2]]}
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

      {/* Book spine */}
      <group position={[-width/2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Spine background */}
        <mesh>
          <planeGeometry args={[depth, height]} />
          <meshStandardMaterial 
            {...BOOK_MATERIALS.spine} 
            color={book.coverColor}
          />
        </mesh>
        
        {/* Author text */}
        <Text
          position={[-depth/2 + 0.6, 0, 0.01]}
          fontSize={0.2}
          color="white"
          anchorX="left"
          anchorY="middle"
          maxWidth={depth - 1.5}
          letterSpacing={0.05}
        >
          {book.authors.join(', ').toUpperCase()}
        </Text>

        {/* Title text */}
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={depth - 1.5}
          letterSpacing={0.05}
        >
          {book.title.toUpperCase()}
        </Text>

        {/* Logo */}
        <Text
          position={[depth/2 - 0.3, 0, 0.01]}
          fontSize={0.2}
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