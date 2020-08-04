import React from 'react';
import { Card } from 'semantic-ui-react';

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const Planet = ({ planet }) => {
  let { name, population, terrain } = planet;
  population =
    population === 'unknown'
      ? 'unknown'
      : `${formatNumber(population / 1000000)} million`;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>Population - {population}</Card.Meta>
        <Card.Description>
          <p>Terrain: {terrain}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default Planet;
