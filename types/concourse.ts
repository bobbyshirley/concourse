export type GuestType = 'VIP' | 'Speaker' | 'Attendee' | 'Sponsor' | 'Staff';

export type ActivityAction = 
  | 'FLIGHT_LANDED' 
  | 'TRANSPORT_ASSIGNED' 
  | 'HOTEL_CHECKIN' 
  | 'HOST_GREETED' 
  | 'MEAL_COMPLETED' 
  | 'SESSION_CHECKIN';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  user: string;
  action: ActivityAction;
  notes: string;
}

export interface Guest {
  id: string;
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
  flightStatus: 'On Time' | 'Delayed' | 'Landed' | 'Cancelled';
  // Hosting & Hotel
  assignedHost: string;
  hostPhone: string;
  hotel: string;
  roomNumber: string;
  checkInStatus: 'Pending' | 'Checked In' | 'Checked Out';
  // Extras
  dietaryRestrictions: string[];
  timeline: TimelineEvent[];
}

export interface StatKPI {
  label: string;
  value: string | number;
  change?: string;
  alert?: boolean;
}