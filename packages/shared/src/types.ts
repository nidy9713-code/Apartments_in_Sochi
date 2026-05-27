export interface ApartmentDTO {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  capacity: number;
  photos: string[];
  homeReserveUrl?: string;
  websiteUrl?: string;
}

export interface FAQDTO {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface BookingDTO {
  id: string;
  name: string;
  phone: string;
  apartmentId: string;
  dates: string;
  comment?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface ManagerContact {
  telegram: string;
  phone: string;
}
