import React from 'react';
import { useQuery } from 'react-query';
import { Message, Loader } from 'semantic-ui-react';
import Person from './Person';

const fetchPeople = async () => {
  const res = await fetch('https://swapi.dev/api/people/');
  return res.json();
};

const People = () => {
  const { data, status } = useQuery('people', fetchPeople);

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
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
