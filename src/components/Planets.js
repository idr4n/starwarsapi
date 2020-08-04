import React from 'react';
import { useQuery } from 'react-query';
import { Message, Loader } from 'semantic-ui-react';
import Planet from './Planet';

const fetchPlanets = async () => {
  const res = await fetch('https://swapi.dev/api/planets/');
  return res.json();
};

const Planets = () => {
  const { data, status } = useQuery('planets', fetchPlanets);

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
