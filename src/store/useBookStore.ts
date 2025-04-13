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
    title: 'The Scaling Era',
    subtitle: 'An Oral History of AI, 2019-2025',
    authors: ['Dwarkesh Patel', 'Gavin Leech'],
    description: 'A comprehensive look at the rapid advancement of AI technology.',
    coverColor: '#FFFFFF',
    position: [0.4, 7.0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '2',
    title: 'BOOM',
    subtitle: '',
    authors: ['Hobart and Huber'],
    description: 'An exploration of exponential growth and its implications.',
    coverColor: '#B91C1C',
    position: [0.3, 5.2, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '3',
    title: "Poor Charlie's Almanack",
    subtitle: '',
    authors: ['Peter D. Kaufman'],
    description: 'The wit and wisdom of Charles T. Munger.',
    coverColor: '#EAB308',
    position: [0.2, 3.4, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '4',
    title: 'Scaling People',
    subtitle: '',
    authors: ['Claire Hughes Johnson'],
    description: 'A guide to building and leading high-growth organizations.',
    coverColor: '#B45309',
    position: [0.1, 1.6, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '5',
    title: 'The Beginning of Infinity',
    subtitle: 'Explanations That Transform the World',
    authors: ['David Deutsch'],
    description: 'An exploration of human knowledge and its infinite potential.',
    coverColor: '#1E3A8A',
    position: [0, -0.2, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '6',
    title: 'The Power Law',
    subtitle: 'Venture Capital and the Making of the New Future',
    authors: ['Sebastian Mallaby'],
    description: 'A deep dive into the venture capital industry and its impact.',
    coverColor: '#064E3B',
    position: [-0.1, -2.0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '7',
    title: 'Zero to One',
    subtitle: 'Notes on Startups, or How to Build the Future',
    authors: ['Peter Thiel', 'Blake Masters'],
    description: 'Insights on innovation and building breakthrough companies.',
    coverColor: '#3730A3',
    position: [-0.2, -3.8, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '8',
    title: 'The Idea Factory',
    subtitle: 'Bell Labs and the Great Age of American Innovation',
    authors: ['Jon Gertner'],
    description: 'The story of Bell Labs and its revolutionary innovations.',
    coverColor: '#831843',
    position: [-0.3, -5.6, 0],
    rotation: [0, 0, 0],
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