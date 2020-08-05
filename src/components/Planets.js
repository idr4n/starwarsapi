import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Message, Loader, Button } from 'semantic-ui-react';
import Planet from './Planet';

const fetchPlanets = async (_key, page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(['planets', page], fetchPlanets, {
    retry: 1,
  });

  return (
    <div>
      <h2>Planets</h2>

      <Button size="small" onClick={() => setPage(1)}>
        page 1
      </Button>
      <Button size="small" onClick={() => setPage(2)}>
        page 2
      </Button>
      <Button size="small" onClick={() => setPage(3)}>
        page 3
      </Button>

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
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
