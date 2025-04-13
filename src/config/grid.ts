export const GRID_CONFIG = {
  BOOK_HEIGHT: 1.5,
  BOOK_WIDTH: 12,
  BOOK_DEPTH: 7,
  VERTICAL_GAP: 2,
  START_Y: 8,
  START_X: 0,
  START_Z: 0,
  BOOKS_PER_PAGE: 10, // For future pagination
} as const

export const calculateBookPosition = (index: number): [number, number, number] => {
  const { START_X, START_Y, START_Z, BOOK_HEIGHT, VERTICAL_GAP } = GRID_CONFIG;
  return [
    START_X + (index * 0.1), // Slight offset for depth perception
    START_Y - (index * (BOOK_HEIGHT + VERTICAL_GAP)),
    START_Z
  ];
};

export const calculateBookRotation = (): [number, number, number] => {
  return [0, 0, 0];
}; 