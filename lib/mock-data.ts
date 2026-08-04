import { Guest } from '@/types/concourse';

export const MOCK_GUESTS: Guest[] = [
  {
    id: 'G-101',
    familyName: 'Sterling Family',
    primaryContact: 'Eleanor Sterling',
    organization: 'Apex Global Media',
    guestType: 'VIP',
    partySize: 3,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',

    arrivalDate: '2026-08-04',
    arrivalTime: '08:15 AM',
    flightNumber: 'DL 1420',
    airline: 'Delta',
    airport: 'ATL',
    flightStatus: 'Landed',
    departureDate: '2026-08-07',
    departureFlight: 'DL 1487',
    travelNotes: 'Requested wheelchair assistance at gate.',

    assignedHost: 'Marcus Vance',
    backupHost: 'Priya Nair',
    hostPhone: '+1 (555) 019-2834',
    hostStatus: 'Confirmed',

    hotel: 'The Grand Hyatt',
    roomNumber: '1204',
    checkInStatus: 'Checked In',
    checkOutDate: '2026-08-07',

    transportationNeeded: true,
    driver: 'Dave Whitfield',
    vehicle: 'SUV #4',
    pickupLocation: 'ATL Terminal B, Gate 12',
    pickupTime: '08:40 AM',
    transportationStatus: 'Dropped Off',

    dietaryRestrictions: ['Gluten Free'],
    allergies: ['Nut Allergy'],
    accessibilityRequirements: ['Wheelchair assistance'],

    session: 'Opening Keynote',
    breakout: 'Media & Storytelling Track',
    vipEvents: ['Chairman\'s Reception', 'VIP Dinner'],

    venue: 'Main Hall',
    section: 'A',
    row: '3',
    seat: '12',
    seatStatus: 'VIP',

    lastContact: '2026-08-04 09:12 AM',
    emailSent: true,
    textSent: true,

    notes: 'Long-time sponsor. Prefers early morning contact only.',
    timeline: [
      { id: 't1', timestamp: '08:15 AM', user: 'System', action: 'FLIGHT_LANDED', notes: 'Flight DL 1420 landed safely at Gate B12.' },
      { id: 't2', timestamp: '08:40 AM', user: 'Sarah K.', action: 'TRANSPORT_ASSIGNED', notes: 'Assigned SUV Driver #4 (Dave).' },
      { id: 't3', timestamp: '09:12 AM', user: 'Marcus V.', action: 'HOST_GREETED', notes: 'Met primary contact at main lobby.' },
    ],
    attachments: [
      { id: 'a1', name: 'Sterling_Travel_Itinerary.pdf', type: 'pdf', uploadedAt: '2026-08-01', uploadedBy: 'Sarah K.' },
    ],
  },
  {
    id: 'G-102',
    familyName: 'Chen',
    primaryContact: 'Dr. David Chen',
    organization: 'BioTech Innovations',
    guestType: 'Speaker',
    partySize: 1,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',

    arrivalDate: '2026-08-04',
    arrivalTime: '11:30 AM',
    flightNumber: 'AA 402',
    airline: 'American',
    airport: 'ORD',
    flightStatus: 'Delayed',
    departureDate: '2026-08-06',
    departureFlight: 'AA 519',
    travelNotes: 'Connecting through Chicago, tight layover on return.',

    assignedHost: 'Elena Rostova',
    backupHost: 'Unassigned',
    hostPhone: '+1 (555) 014-9921',
    hostStatus: 'Assigned',

    hotel: 'Marriott Marquis',
    roomNumber: '815',
    checkInStatus: 'Pending',
    checkOutDate: '2026-08-06',

    transportationNeeded: true,
    driver: 'Unassigned',
    vehicle: 'Unassigned',
    pickupLocation: 'ORD Terminal 3',
    pickupTime: 'TBD',
    transportationStatus: 'Waiting',

    dietaryRestrictions: ['Vegetarian'],
    allergies: [],
    accessibilityRequirements: [],

    session: 'Future of Biotech Panel',
    breakout: 'Health & Sciences Track',
    vipEvents: [],

    venue: 'Main Hall',
    section: 'B',
    row: '1',
    seat: '4',
    seatStatus: 'Reserved',

    lastContact: '2026-08-03 04:20 PM',
    emailSent: true,
    textSent: false,

    notes: 'Speaking Friday morning — confirm AV needs before Thursday.',
    timeline: [
      { id: 't1', timestamp: '10:00 AM', user: 'FlightAware Bot', action: 'FLIGHT_DELAYED', notes: 'Flight delayed by 45 mins due to weather.' },
    ],
    attachments: [],
  },
  {
    id: 'G-103',
    familyName: 'O\'Connor Group',
    primaryContact: 'Siobhan O\'Connor',
    organization: 'Grace Community Church',
    guestType: 'Sponsor',
    partySize: 5,

    arrivalDate: '2026-08-04',
    arrivalTime: '01:15 PM',
    flightNumber: 'UA 1109',
    airline: 'United',
    airport: 'DEN',
    flightStatus: 'On Time',
    departureDate: '2026-08-08',
    departureFlight: 'UA 1187',
    travelNotes: 'Traveling with two children under 10.',

    assignedHost: 'Unassigned',
    backupHost: 'Unassigned',
    hostPhone: 'N/A',
    hostStatus: 'Unassigned',

    hotel: 'The Grand Hyatt',
    roomNumber: 'TBD',
    checkInStatus: 'Pending',
    checkOutDate: '2026-08-08',

    transportationNeeded: true,
    driver: 'Unassigned',
    vehicle: 'Unassigned',
    pickupLocation: 'DEN Terminal, Arrivals',
    pickupTime: 'TBD',
    transportationStatus: 'Waiting',

    dietaryRestrictions: ['Halal'],
    allergies: [],
    accessibilityRequirements: [],

    session: 'General Session',
    breakout: 'Community Partners Track',
    vipEvents: [],

    venue: 'Main Hall',
    section: 'C',
    row: '8',
    seat: '15',
    seatStatus: 'Available',

    lastContact: '2026-08-02 11:00 AM',
    emailSent: true,
    textSent: false,

    notes: 'Needs host assignment before Wednesday.',
    timeline: [],
    attachments: [],
  },
];
