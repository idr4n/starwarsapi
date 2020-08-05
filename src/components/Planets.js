import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import { Message, Loader, Button, Segment, Label } from 'semantic-ui-react';
import Planet from './Planet';

const fetchPlanets = async (_key, page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['planets', page],
    fetchPlanets
  );

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
