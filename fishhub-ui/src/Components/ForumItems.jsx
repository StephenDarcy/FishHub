/* eslint-disable react/prop-types */
import React from "react";
import ForumItem from "./ForumItem";

export default function ForumItems({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <ForumItem
            style={{ height: "100%" }}
            body={item.body}
            topic={item.topic}
            createdBy={item.createdBy}
            createdAt={item.createdAt}
            id={item.id}
          />
        ))}
    </>
  );
}
