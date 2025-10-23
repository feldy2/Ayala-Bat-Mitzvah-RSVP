export interface RSVPFormData {
  fullName: string;
  phone: string;
  email: string;
  attending: string;
  guests: string;
  dietaryRestrictions: string;
  message: string;
}

export interface EventDetails {
  name: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
}

export interface RSVPResponse {
  success: boolean;
  message: string;
  data?: RSVPFormData;
}
