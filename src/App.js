import React, { useState, Fragment, useEffect } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { ReactQueryDevtools } from 'react-query-devtools';

import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';

function App() {
  const [page, setPage] = useState(() => {
    const localPage = localStorage.getItem('page');
    return localPage ? localPage : '';
  });

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    localStorage.setItem('page', page);
  }, [page]);

  return (
    <Fragment>
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
            <Navbar page={page} handlePage={handlePage} />
            {page === 'planets' ? <Planets /> : <People />}
          </Grid.Column>
        </Grid>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </Fragment>
  );
}

export default App;
