import React from "react";
import { server } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData,
} from "../../lib/api/types";

const LISTINGS = `
query Listings {
  listings {
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
   }
}
`;
const DELETE_LISTING = `
mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
}
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data.listings);
  };
  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: "6044ad74110393068321a6ef",
      },
    });
    console.log(data);
  };
  return (
    <div>
      <h2> {title} </h2>
      <button onClick={fetchListings}>Query Listing!</button>
      <button onClick={deleteListing}>Delete a Listing!</button>
    </div>
  );
};