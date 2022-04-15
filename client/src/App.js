import React, {useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Layout from './Components/Layout';

const App = () => {

  useEffect(() => {
    axios.get('/api').then((response) => console.log(response.data)).catch((error) => console.error(error));
  }, []);

  return (
      <div className="App">
        <Layout>
          <h1>invoice management</h1>
        </Layout>
      </div>
  );
};

export default App;
