"use client"

import { useRef, useState } from 'react'
import { Book as BookType } from '@/store/useBookStore'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { GRID_CONFIG } from '@/config/grid'

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
  position: [number, number, number]
  rotation: [number, number, number]
}

/**
 * Book Component
 * 
 * Renders a single 3D book with proper geometry, materials, and text.
 * Handles hover states and click interactions.
 */
const Book = ({ book, onClick, index, mousePosition, position, rotation }: BookProps) => {
  // Reference to the mesh for potential direct manipulations
  const meshRef = useRef<THREE.Mesh>(null)
  // State for hover interactions
  const [hovered, setHovered] = useState(false)
  const targetRotation = useRef(rotation)

  const { BOOK_WIDTH: width, BOOK_HEIGHT: height, BOOK_DEPTH: depth } = GRID_CONFIG

  // Handle mouse interaction
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += (targetRotation.current[0] + mousePosition.y * 0.1 - meshRef.current.rotation.x) * 0.1
      meshRef.current.rotation.y += (targetRotation.current[1] + mousePosition.x * 0.1 - meshRef.current.rotation.y) * 0.1
    }
  })

  // Calculate vertical offset based on index
  const yOffset = -index * 1.2 // Reduced spacing between books for tighter stacking

  return (
    <mesh
      ref={meshRef}
      position={[position[0], position[1] + yOffset, position[2]]}
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
        <mesh>
          <planeGeometry args={[depth, height]} />
          <meshStandardMaterial 
            {...BOOK_MATERIALS.spine} 
            color={book.coverColor}
          />
        </mesh>
        
        {/* Text group with adjusted rotation */}
        <group rotation={[0, -Math.PI / 2, 0]} position={[0, 0, 0.1]}>
          {/* Debug spheres to show text anchor points */}
          <mesh position={[0, height * 0.35, 0.05]} scale={0.1}>
            <sphereGeometry />
            <meshBasicMaterial color="red" />
          </mesh>
          <mesh position={[0, -height * 0.35, 0.05]} scale={0.1}>
            <sphereGeometry />
            <meshBasicMaterial color="blue" />
          </mesh>

          {/* Authors text */}
          <Text
            position={[0, height * 0.35, 0.05]}
            fontSize={0.35}
            color="white"
            anchorX="left"
            anchorY="middle"
            maxWidth={depth - 1}
            renderOrder={2}
            material-toneMapped={false}
            outlineWidth={0.02}
            outlineColor="#000000"
            outlineOpacity={0.8}
          >
            {book.authors.join('\n').toUpperCase()}
          </Text>

          {/* Title text */}
          <Text
            position={[0, -height * 0.35, 0.05]}
            fontSize={0.35}
            color="white"
            anchorX="left"
            anchorY="middle"
            maxWidth={depth - 1}
            renderOrder={2}
            material-toneMapped={false}
            outlineWidth={0.02}
            outlineColor="#000000"
            outlineOpacity={0.8}
          >
            {book.title.toUpperCase()}
          </Text>

          {/* Logo */}
          <Text
            position={[depth - 0.8, 0, 0.05]}
            fontSize={0.4}
            color="white"
            anchorX="right"
            anchorY="middle"
            renderOrder={2}
            material-toneMapped={false}
            outlineWidth={0.02}
            outlineColor="#000000"
            outlineOpacity={0.8}
          >
            ∞
          </Text>
        </group>
      </group>
    </mesh>
  )
}

export { Book } 