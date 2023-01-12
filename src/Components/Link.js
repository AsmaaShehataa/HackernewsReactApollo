import React from "react";
import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../Constants";
import { timeDifferenceForDate } from "../utils";
import { feed_Query } from "./LinkList";

const take = LINKS_PER_PAGE;
const skip = 0;
const orderBy = { createdAt: "desc" };

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = (props) => {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    // update: (cache, { data: { vote } }) => {
    //   const data = cache.readQuery({
    //     query: feed_Query,
    //     variables: {
    //       take,
    //       skip,
    //       orderBy,
    //     },
    //   });
    //   const updatedLinks = data.feed.links.map((feedLink) => {
    //     if (feedLink.id === link.id) {
    //       const updatedLink = {
    //         ...feedLink,
    //         votes: [...feedLink.votes, vote],
    //       };
    //       console.log("updated link", updatedLink);
    //       return updatedLink;
    //     }
    //     return feedLink;
    //   });

    //   cache.writeQuery({
    //     query: feed_Query,
    //     data: {
    //       ...data,
    //       feed: {
    //         ...data.feed,
    //         links: updatedLinks,
    //       },
    //     },
    //     variables: {
    //       take,
    //       skip,
    //       orderBy,
    //     },
    //   });
    // },
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={vote}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{" "}
            {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </div>
  );
};

export default Link;
