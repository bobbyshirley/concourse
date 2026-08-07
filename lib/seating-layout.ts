export interface SeatLayoutSection {
  id: string;
  label: string;
  rows: number;
  seatsPerRow: number;
}

export const VENUE_NAME = 'Main Hall';

// Sized to comfortably contain the seats already referenced on mock guest
// records (A-3-12, B-1-4, C-8-15) while still looking like a real venue.
export const SEAT_LAYOUT: SeatLayoutSection[] = [
  { id: 'A', label: 'Section A', rows: 5, seatsPerRow: 16 },
  { id: 'B', label: 'Section B', rows: 6, seatsPerRow: 20 },
  { id: 'C', label: 'Section C', rows: 8, seatsPerRow: 20 },
];

export function seatId(section: string, row: number, seat: number): string {
  return `${section}-${row}-${seat}`;
}

export function totalSeats(): number {
  return SEAT_LAYOUT.reduce((sum, s) => sum + s.rows * s.seatsPerRow, 0);
}
