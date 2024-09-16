import React from "react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

const GenreTabs = ({ genres }) => {
  const { genre: activeGenre } = useParams();

  return (
    <Tabs variant="soft-rounded" colorScheme="blue">
      <TabList>
        {genres.map((genre) => (
          <Tab key={genre} isSelected={genre === activeGenre}>
            <Link to={`/books/genre/${genre}`}>{genre}</Link>
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default GenreTabs;
