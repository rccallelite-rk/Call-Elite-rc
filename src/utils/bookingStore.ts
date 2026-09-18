import { StoredBooking, StoredProjectEnquiry, StoredContactMessage, BookingStatus, ProjectStatus, ContactStatus } from '../types';

const BOOKINGS_KEY = 'rc_call_elite_bookings_v1';
const PROJECTS_KEY = 'rc_call_elite_projects_v1';
const CONTACTS_KEY = 'rc_call_elite_contacts_v1';

// Seed demo bookings if nothing is stored
const SEED_BOOKINGS: StoredBooking[] = [
  {
    id: 'b-101',
    refCode: 'RCCE-8924',
    serviceName: 'Washing Machine Repair',
    serviceType: 'appointment',
    dateOption: 'today',
    scheduledDate: 'Today (2026-09-16)',
    timeSlot: '11:00 AM – 01:00 PM',
    customerName: 'Kavitha Ramaswamy',
    customerPhone: '+91 98452 33190',
    customerAddress: '#142, 5th Main, 4th Block, Koramangala, Bangalore - 560034',
    problemDescription: 'Front load drum not spinning during drain cycle, showing error code dE.',
    notes: 'Please call before arriving, gate code #402',
    createdAt: '2026-09-16T08:30:00.000Z',
    status: 'Technician Assigned',
    assignedTechnician: 'Suresh Kumar (Badge #RC-402)',
    estimatedAmount: '₹399 + Spares',
  },
  {
    id: 'b-102',
    refCode: 'RCCE-7719',
    serviceName: 'AC Service & Repair',
    serviceType: 'appointment',
    dateOption: 'today',
    scheduledDate: 'Today (2026-09-16)',
    timeSlot: '02:00 PM – 04:00 PM',
    customerName: 'Arjun Venkatesh',
    customerPhone: '+91 99008 11452',
    customerAddress: 'Flat 403, Sobha Dream Acres, Panathur, Bangalore - 560087',
    problemDescription: 'AC blowing normal air instead of cool air. Needs deep jet clean & gas check.',
    notes: 'Split AC 1.5 Ton Daikin',
    createdAt: '2026-09-16T09:15:00.000Z',
    status: 'Confirmed',
    assignedTechnician: 'Ravi Teja (Pending Dispatch)',
    estimatedAmount: '₹599',
  },
  {
    id: 'b-103',
    refCode: 'RCCE-6541',
    serviceName: 'Doorstep Bike Service',
    serviceType: 'appointment',
    dateOption: 'tomorrow',
    scheduledDate: 'Tomorrow (2026-09-17)',
    timeSlot: '09:00 AM – 11:00 AM',
    customerName: 'Manish Hegde',
    customerPhone: '+91 97410 88231',
    customerAddress: 'Villa 12, Rainbow Drive Layout, Sarjapur Road, Bangalore - 560035',
    problemDescription: 'General periodic service + synthetic engine oil replacement + disc brake bleeding.',
    notes: 'Royal Enfield Classic 350',
    createdAt: '2026-09-16T07:45:00.000Z',
    status: 'Pending',
    estimatedAmount: '₹899',
  },
  {
    id: 'b-104',
    refCode: 'RCCE-5120',
    serviceName: 'Refrigerator Service',
    serviceType: 'appointment',
    dateOption: 'custom',
    scheduledDate: '2026-09-15',
    timeSlot: '04:00 PM – 06:00 PM',
    customerName: 'Priya Nambiar',
    customerPhone: '+91 98860 44901',
    customerAddress: 'No. 88, 12th Cross, Indiranagar 2nd Stage, Bangalore - 560038',
    problemDescription: 'Double door freezer over-icing, bottom compartment not cooling.',
    createdAt: '2026-09-15T11:20:00.000Z',
    status: 'Completed',
    assignedTechnician: 'Prasad Gowda',
    estimatedAmount: '₹850',
  },
];

const SEED_PROJECTS: StoredProjectEnquiry[] = [
  {
    id: 'p-201',
    refCode: 'RCINT-9042',
    serviceName: 'Interior Design Consultation',
    customerName: 'Dr. Siddharth Menon',
    customerPhone: '+91 98450 67123',
    projectType: '3BHK Apartment',
    location: 'Prestige Falcon City, Kanakapura Road, Bangalore',
    approxArea: '1650 sq.ft',
    requirement: 'End-to-end modular kitchen in acrylic finish, master bedroom walk-in wardrobe, false ceiling with warm magnetic track lights.',
    preferredContactTime: 'Evening (4:00 PM - 7:00 PM)',
    createdAt: '2026-09-16T06:40:00.000Z',
    status: 'Site Visit Scheduled',
    budgetRange: '₹12 - 15 Lakhs',
  },
  {
    id: 'p-202',
    refCode: 'RCINT-8129',
    serviceName: 'Interior Construction',
    customerName: 'Deepak & Sneha Rao',
    customerPhone: '+91 99805 23789',
    projectType: 'Independent Villa / House',
    location: 'HSR Layout Sector 2, Bangalore',
    approxArea: '2800 sq.ft',
    requirement: 'Complete civil remodel, structural partition removal for open kitchen layout, waterproof terrace treatment & exterior texture paint.',
    preferredContactTime: 'Morning (9:00 AM – 12:00 PM)',
    createdAt: '2026-09-15T14:10:00.000Z',
    status: 'Proposal Sent',
    budgetRange: '₹25 - 30 Lakhs',
  },
];

const SEED_CONTACTS: StoredContactMessage[] = [
  {
    id: 'c-301',
    name: 'Ananya Deshmukh',
    phone: '+91 98455 12098',
    service: 'Home Painting',
    location: 'Whitefield (Near ITPL)',
    message: 'Looking for full 2BHK interior repaint with Asian Paints Royale Luxury Emulsion. Want estimate and wall moisture check.',
    createdAt: '2026-09-16T08:10:00.000Z',
    status: 'New',
  },
  {
    id: 'c-302',
    name: 'Raghavan Pillai',
    phone: '+91 97312 45890',
    service: 'Home Plumbing & Repairs',
    location: 'JP Nagar 7th Phase',
    message: 'Need concealed shower diverter replacement and overhead tank float valve repair.',
    createdAt: '2026-09-15T16:25:00.000Z',
    status: 'Resolved',
  },
];

// Helper to safely access localStorage
export const getBookings = (): StoredBooking[] => {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(SEED_BOOKINGS));
      return SEED_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_BOOKINGS;
  }
};

export const saveBooking = (
  booking: Omit<StoredBooking, 'id' | 'createdAt' | 'status'>
): StoredBooking => {
  const current = getBookings();
  const newBooking: StoredBooking = {
    ...booking,
    id: 'b-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'Pending',
  };
  const updated = [newBooking, ...current];
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save booking to localStorage:', err);
  }
  return newBooking;
};

export const updateBookingStatus = (
  id: string,
  status: BookingStatus,
  assignedTechnician?: string
): void => {
  const current = getBookings();
  const updated = current.map(b =>
    b.id === id
      ? {
          ...b,
          status,
          ...(assignedTechnician !== undefined ? { assignedTechnician } : {}),
        }
      : b
  );
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update booking status:', err);
  }
};

export const deleteBooking = (id: string): void => {
  const current = getBookings();
  const updated = current.filter(b => b.id !== id);
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete booking:', err);
  }
};

export const getProjects = (): StoredProjectEnquiry[] => {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(SEED_PROJECTS));
      return SEED_PROJECTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_PROJECTS;
  }
};

export const saveProject = (
  project: Omit<StoredProjectEnquiry, 'id' | 'createdAt' | 'status'>
): StoredProjectEnquiry => {
  const current = getProjects();
  const newProject: StoredProjectEnquiry = {
    ...project,
    id: 'p-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'New',
  };
  const updated = [newProject, ...current];
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save project enquiry to localStorage:', err);
  }
  return newProject;
};

export const updateProjectStatus = (id: string, status: ProjectStatus): void => {
  const current = getProjects();
  const updated = current.map(p => (p.id === id ? { ...p, status } : p));
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update project status:', err);
  }
};

export const getContacts = (): StoredContactMessage[] => {
  try {
    const raw = localStorage.getItem(CONTACTS_KEY);
    if (!raw) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(SEED_CONTACTS));
      return SEED_CONTACTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_CONTACTS;
  }
};

export const saveContact = (
  contact: Omit<StoredContactMessage, 'id' | 'createdAt' | 'status'>
): StoredContactMessage => {
  const current = getContacts();
  const newContact: StoredContactMessage = {
    ...contact,
    id: 'c-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'New',
  };
  const updated = [newContact, ...current];
  try {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save contact message to localStorage:', err);
  }
  return newContact;
};

export const updateContactStatus = (id: string, status: ContactStatus): void => {
  const current = getContacts();
  const updated = current.map(c => (c.id === id ? { ...c, status } : c));
  try {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update contact status:', err);
  }
};
