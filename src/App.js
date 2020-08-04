import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';

function App() {
  const [page, setPage] = useState('planets');

  return (
    <div className="App">
      <h1>Star Wars Info</h1>
      <Navbar page={page} setPage={setPage} />
      <Container>{page === 'planets' ? <Planets /> : <People />}</Container>
    </div>
  );
}

export default App;
