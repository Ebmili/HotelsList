export interface NewHotelType {
  title?: string;
  description?: string;
  feature?: string;
  location?: string;
  stars?: string;
  country?: string;
  region?: string;
  review?: string;
  totalPrice?: string;
  perNight?: string;
  id?: string;
  search?: any;
}

export interface AddHotelType {
  description: string;
  feature: string;
  location: string;
  stars: string;
  country: string;
  region: string;
  review: string;
  totalPrice: string;
  perNight: string;
  title: string;
}