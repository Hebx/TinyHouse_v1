import { IResolvers } from "apollo-server-express";
import { Booking, bookings } from "../bookings";
import { Listing, listings } from "./../listings";

let numOfBookings = 0;

export const resolvers: IResolvers = {
  Query: {
    listings: () => {
      return listings;
    },
    bookings: () => {
      return bookings;
    },
  },
  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
          return listings.splice(i, 1)[0];
        }
      }
      throw new Error("failed to delete a listing");
    },
    createBooking: (
      _root: undefined,
      { id, timestamp }: { id: string; timestamp: string }
    ) => {
      for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
          numOfBookings++;

          const newBooking: Booking = {
            id: numOfBookings.toString(),
            title: listings[i].title,
            image: listings[i].image,
            address: listings[i].address,
            timestamp,
          };

          bookings.push(newBooking);
          listings[i].bookings.push(newBooking.id);

          return newBooking;
        }
      }
      throw new Error("failed to create a booking");
    },
  },
  Listing: {
    numOfBookings: (listing: Listing): number => listing.bookings.length,
  },
};
