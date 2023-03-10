import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../Constants";
import { feed_Query } from "./LinkList";

const take = LINKS_PER_PAGE;
const skip = 0;
const orderBy = { createdAt: "desc" };

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });
  const Navigation = useNavigate();

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    update: (cache, { data: { post } }) => {
      const data = cache.readQuery({
        query: feed_Query,
        variables: {
          take,
          skip,
          orderBy,
        },
      });
      cache.writeQuery({
        query: feed_Query,
        variables: {
          take,
          skip,
          orderBy,
        },
        data: {
          ...data,
          feed: {
            ...data.feed,
            links: [post, ...data.feed.links],
          },
        },
      });
    },

    onCompleted: () => Navigation("/"),
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex felx-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
            type="text"
            placeholder="A description for the link "
          />

          <br />

          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({ ...formState, url: e.target.value })
            }
            type="text"
            placeholder="A link of the url "
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
