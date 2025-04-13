"use client"

import { create } from 'zustand'
import { calculateBookPosition, calculateBookRotation } from '@/config/grid'

export interface Book {
  id: string
  title: string
  subtitle: string
  authors: string[]
  description: string
  coverColor: string
}

interface BookState {
  books: Book[]
  selectedBook: Book | null
  setSelectedBook: (book: Book | null) => void
}

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'The Scaling Era',
    subtitle: 'An Oral History of AI, 2019-2025',
    authors: ['Dwarkesh Patel', 'Gavin Leech'],
    description: 'A comprehensive look at the rapid advancement of AI technology.',
    coverColor: '#FFFFFF',
  },
  {
    id: '2',
    title: 'BOOM',
    subtitle: '',
    authors: ['Hobart and Huber, Chance Taken'],
    description: 'An exploration of exponential growth and its implications.',
    coverColor: '#B91C1C',
  },
  {
    id: '3',
    title: "Poor Charlie's Almanack",
    subtitle: '',
    authors: ['Peter D. Kaufman'],
    description: 'The wit and wisdom of Charles T. Munger.',
    coverColor: '#EAB308',
  },
  {
    id: '4',
    title: 'Scaling People',
    subtitle: '',
    authors: ['Claire Hughes Johnson'],
    description: 'A guide to building and leading high-growth organizations.',
    coverColor: '#B45309',
  },
  {
    id: '5',
    title: 'The Beginning of Infinity',
    subtitle: 'Explanations That Transform the World',
    authors: ['David Deutsch'],
    description: 'An exploration of human knowledge and its infinite potential.',
    coverColor: '#1E3A8A',
  },
  {
    id: '6',
    title: 'The Power Law',
    subtitle: 'Venture Capital and the Making of the New Future',
    authors: ['Sebastian Mallaby'],
    description: 'A deep dive into the venture capital industry and its impact.',
    coverColor: '#064E3B',
  },
  {
    id: '7',
    title: 'Zero to One',
    subtitle: 'Notes on Startups, or How to Build the Future',
    authors: ['Peter Thiel', 'Blake Masters'],
    description: 'Insights on innovation and building breakthrough companies.',
    coverColor: '#3730A3',
  },
  {
    id: '8',
    title: 'The Idea Factory',
    subtitle: 'Bell Labs and the Great Age of American Innovation',
    authors: ['Jon Gertner'],
    description: 'The story of Bell Labs and its revolutionary innovations.',
    coverColor: '#831843',
  },
]

export const useBookStore = create<BookState>((set) => ({
  books: initialBooks,
  selectedBook: null,
  setSelectedBook: (book) => set({ selectedBook: book }),
})); 