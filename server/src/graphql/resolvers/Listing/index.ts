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
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
