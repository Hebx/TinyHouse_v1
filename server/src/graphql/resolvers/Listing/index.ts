import { Database, Listing } from "./../../../lib/types";
import { ObjectId } from "mongodb";
import { IResolvers } from "apollo-server-express";

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: Record<string | number, never>,
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      // throw new Error("Error!");
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!deleteRes.value) {
        throw new Error("failed to delete a listing");
      }
      return deleteRes.value;
    },
    favoriteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const listing = await db.listings.findOne({
        _id: new ObjectId(id),
      });
      if (!listing) {
        throw new Error("failed to find listing");
      }
      const updateRes = await db.listings.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { favorite: !listing.favorite } },
        { returnOriginal: false }
      );
      if (!updateRes.value) {
        throw new Error("failed to favorite listing");
      }
      return updateRes.value;
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
