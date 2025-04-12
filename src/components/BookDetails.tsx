"use client"

import { motion } from 'framer-motion'
import { Book } from '@/store/useBookStore'

interface BookDetailsProps {
  book: Book
  onClose: () => void
}

export function BookDetails({ book, onClose }: BookDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative bg-white rounded-lg p-8 max-w-2xl w-full mx-4 shadow-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{book.title}</h2>
          <h3 className="text-xl text-gray-600">{book.subtitle}</h3>
          <p className="text-gray-500">
            by {book.authors.join(', ')}
          </p>
          <p className="text-gray-700">{book.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
} 