import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import { Message, Loader, Segment, Pagination } from 'semantic-ui-react';
import Person from './Person';

const fetchPeople = async (_key, page) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['people', page],
    fetchPeople
  );

  let pages = null;
  if (status === 'success') {
    const count = resolvedData.count;
    pages = Math.ceil(count / 10);
  }

  const handlePaginationChange = (_e, { activePage }) => {
    setPage(activePage);
  };

  return (
    <div>
      <h2>People</h2>

      {status === 'error' && (
        <Message negative>
          <Message.Header>Error!</Message.Header>
          <p>There was an error fetching the data.</p>
        </Message>
      )}
      {status === 'loading' && (
        <Loader active inline="centered" size="big">
          Loading data...
        </Loader>
      )}
      {status === 'success' && (
        <>
          <Segment>
            <Pagination
              boundaryRange={null}
              activePage={page}
              onPageChange={handlePaginationChange}
              totalPages={pages}
            />
          </Segment>
          <div>
            {resolvedData.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
