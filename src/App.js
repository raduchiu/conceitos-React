import React, { useEffect,useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response =>{
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      title: "Web",
      url: "https://github.com/raduchiu/Be-The-Hero",
      techs: "React" 
    });
  
    const repository = response.data;
  
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/:${id}`)

    const repository = response.data;


    setRepositories([...repositories, repository]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => <li key={repository.id} >{repository.title}
          <button onClick={(repository) => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      )};
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
