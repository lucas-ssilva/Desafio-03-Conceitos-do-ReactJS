import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', { 
      title: "Desafio angular", 
      url: "http://github.com/...", 
      techs: ["Node.js", "..."]
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`/repositories/${id}`);

    const repoIndex = repositories.findIndex(x => x.id === id);

    const temp = [...repositories];

    temp.splice(repoIndex, 1);

    setRepositories(temp);

  };

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(rep => 
          <li key={rep.id}>{rep.title} 
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
