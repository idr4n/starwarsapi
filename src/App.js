import React, { useState } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';

function App() {
  const [page, setPage] = useState('planets');

  return (
    <div className="App">
      <Container text>
        <Header
          as="h1"
          textAlign="center"
          content="Star Wars Info"
          style={{
            fontSize: '3em',
            margin: '0.5em 0em',
          }}
        />
      </Container>
      <Grid style={{ maxWidth: 700, margin: '0 auto' }}>
        <Grid.Column style={{ margin: '0 20px' }}>
          <Navbar page={page} setPage={setPage} />
          {page === 'planets' ? <Planets /> : <People />}
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
