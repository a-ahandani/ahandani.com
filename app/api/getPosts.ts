import { gql } from "graphql-request";
import { graphql } from "~/lib/graphql";
import type { Node, Query } from "~/types/posts";
import { POSTS } from "./queries";

const GET_POSTS = gql`
  ${POSTS}
  query getPosts($first: Int, $last: Int, $after: String, $before: String) {
    posts(first: $first, last: $last, after: $after, before: $before) {
      nodes {
        ...PostExcerpt
      }
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const getPosts = async ({
  limit = 5,
  after,
  before,
}: Query): Promise<{ posts: { nodes: Node[] } }> => {
  const data = await graphql.request(GET_POSTS, {
    first: after ? limit : before ? null : limit,
    last: before ? limit : null,
    after,
    before,
  });
  return data.posts;
};
