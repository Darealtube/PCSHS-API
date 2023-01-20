import { Cursorify } from "./cursorOps/cursorify";

type RelayPaginate = {
  pageInfo: {
    endCursor: string | null;
    hasNextPage: boolean;
  };
  edges: {
    node: any;
  }[];
};

type RelayPaginateProps = {
  finalArray: any[];
  limit: number;
};

const relayPaginate = ({
  finalArray,
  limit,
}: RelayPaginateProps): RelayPaginate => {
  return {
    pageInfo: {
      endCursor:
        finalArray.length > 0
          ? Cursorify(finalArray[finalArray.length - 1]["_id"])
          : null,
      hasNextPage: finalArray.length < limit ? false : true,
    },
    edges: finalArray.map((a) => ({ node: a })),
  };
};

export default relayPaginate;
