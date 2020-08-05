import React, { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import {
  Message,
  Loader,
  Button,
  Segment,
  Label,
  Pagination,
} from 'semantic-ui-react';
import Planet from './Planet';

const fetchPlanets = async (_key, page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(() => {
    const localPageNumPlanets = localStorage.getItem('pageNumPlanets');
    return localPageNumPlanets ? parseInt(localPageNumPlanets) : 1;
  });

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['planets', page],
    fetchPlanets
  );

  useEffect(() => {
    localStorage.setItem('pageNumPlanets', page.toString());
  }, [page]);

  let pages = null;
  if (status === 'success') {
    const count = resolvedData.count;
    const results = resolvedData.results.length;
    pages = Math.ceil(count / results);
  }

  const handlePaginationChange = (_e, { activePage }) => {
    setPage(activePage);
  };

  return (
    <div>
      <h2>Planets</h2>

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
          <Segment>
            <Button
              style={{ margin: 0 }}
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              Previous page
            </Button>
            <Label style={{ margin: '0 5px' }}>{page}</Label>
            <Button
              onClick={() =>
                setPage((old) =>
                  !latestData || !latestData.next ? old : old + 1
                )
              }
              disabled={!latestData || !latestData.next}
            >
              Next page
            </Button>
          </Segment>
          <div>
            {resolvedData.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
