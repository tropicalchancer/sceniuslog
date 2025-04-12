"use client"

import { create } from 'zustand'

export interface Book {
  id: string
  title: string
  subtitle: string
  authors: string[]
  description: string
  coverColor: string
  position: [number, number, number]
  rotation: [number, number, number]
}

interface BookState {
  books: Book[]
  selectedBook: Book | null
  setSelectedBook: (book: Book | null) => void
  updateBookPosition: (id: string, position: [number, number, number]) => void
  updateBookRotation: (id: string, rotation: [number, number, number]) => void
}

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'The Making of Prince of Persia',
    subtitle: 'Journals 1985-1993',
    authors: ['Jordan Mechner'],
    description: 'A comprehensive look at the creation of the classic game.',
    coverColor: '#2A4B9B',
    position: [0, 8, 0],
    rotation: [-0.1, 0.2, 0],
  },
  {
    id: '2',
    title: 'Get Together',
    subtitle: 'How to Build a Community',
    authors: ['Bailey Richardson', 'Kevin Huynh', 'Kai Elmer Sotto'],
    description: 'A practical guide to cultivating and nurturing communities.',
    coverColor: '#FF8A00',
    position: [0, 4, 0],
    rotation: [0.1, -0.1, 0],
  },
  {
    id: '3',
    title: 'An Elegant Puzzle',
    subtitle: 'Systems of Engineering Management',
    authors: ['Will Larson'],
    description: 'A field guide to engineering management.',
    coverColor: '#FFFFFF',
    position: [0, 0, 0],
    rotation: [-0.05, 0.1, 0],
  },
  {
    id: '4',
    title: 'The Revolt of the Public',
    subtitle: 'And the Crisis of Authority',
    authors: ['Martin Gurri'],
    description: 'An analysis of how digital technology is reshaping the relationship between authority and the public.',
    coverColor: '#1A237E',
    position: [0, -4, 0],
    rotation: [0.05, -0.2, 0],
  },
  {
    id: '5',
    title: 'High Growth Handbook',
    subtitle: 'Scaling Startups from 10 to 10,000 People',
    authors: ['Elad Gil'],
    description: 'A guide to scaling startups into high-growth companies.',
    coverColor: '#FF4444',
    position: [0, -8, 0],
    rotation: [-0.1, 0.15, 0],
  },
]

export const useBookStore = create<BookState>((set) => ({
  books: initialBooks,
  selectedBook: null,
  setSelectedBook: (book) => set({ selectedBook: book }),
  updateBookPosition: (id, position) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, position } : book
      ),
    })),
  updateBookRotation: (id, rotation) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, rotation } : book
      ),
    })),
})) 