// types/concourse.ts

export type GuestType = 'VIP' | 'Speaker' | 'Sponsor' | 'Staff' | 'Guest';
export type FlightStatus = 'On Time' | 'Delayed' | 'Landed' | 'Cancelled';
export type CheckInStatus = 'Checked In' | 'Pending';
export type HostStatus = 'Confirmed' | 'Assigned' | 'Unassigned' | 'Backup Only';
export type TransportationStatus =
  | 'Not Needed'
  | 'Waiting'
  | 'En Route'
  | 'Passenger Picked Up'
  | 'Dropped Off'
  | 'Cancelled';
export type SeatStatus = 'Available' | 'Reserved' | 'VIP' | 'Wheelchair' | 'Occupied';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  notes: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
}

export type HostAvailability = 'Full Day' | 'Morning Only' | 'Afternoon Only' | 'Evening Only' | 'On Call';
export type HostCurrentStatus = 'On Duty' | 'Active' | 'Off Duty' | 'Unavailable';

export interface Host {
  id: string;
  name: string;
  photoUrl?: string;
  phone: string;
  availability: HostAvailability;
  status: HostCurrentStatus;
  assignedGuestIds: string[];
}

export interface Guest {
  id: string;

  // Basic Information
  familyName: string;
  primaryContact: string;
  organization: string;
  guestType: GuestType;
  partySize: number;
  photoUrl?: string;

  // Travel
  arrivalDate: string;
  arrivalTime: string;
  flightNumber: string;
  airline: string;
  airport: string;
  flightStatus: FlightStatus;
  departureDate: string;
  departureFlight: string;
  travelNotes: string;

  // Hosting
  assignedHost: string;
  backupHost: string;
  hostPhone: string;
  hostStatus: HostStatus;

  // Hotel
  hotel: string;
  roomNumber: string;
  checkInStatus: CheckInStatus;
  checkOutDate: string;

  // Transportation
  transportationNeeded: boolean;
  driver: string;
  vehicle: string;
  pickupLocation: string;
  pickupTime: string;
  transportationStatus: TransportationStatus;

  // Meals
  dietaryRestrictions: string[];
  allergies: string[];
  accessibilityRequirements: string[];

  // Conference
  session: string;
  breakout: string;
  vipEvents: string[];

  // Seating
  venue: string;
  section: string;
  row: string;
  seat: string;
  seatStatus: SeatStatus;

  // Communication
  lastContact: string;
  emailSent: boolean;
  textSent: boolean;

  // Notes / Timeline / Attachments
  notes: string;
  timeline: TimelineEvent[];
  attachments: Attachment[];
}
