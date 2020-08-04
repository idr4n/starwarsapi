import React from 'react';
import { Card } from 'semantic-ui-react';

const Person = ({ person }) => {
  let { name, gender, birth_year } = person;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{gender}</Card.Meta>
        <Card.Description>
          <p>Birth year: {birth_year}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default Person;
