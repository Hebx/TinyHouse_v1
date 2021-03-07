import { Collection, ObjectId } from "mongodb";

export interface Booking {
  _id: ObjectId;
  title: string;
  image: string;
  address: string;
  timestamp: string;
}
export interface Listing {
  _id: ObjectId;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
  bookings: ObjectId[];
  favorite: boolean;
}
export interface Database {
  listings: Collection<Listing>;
  bookings: Collection<Booking>;
}
