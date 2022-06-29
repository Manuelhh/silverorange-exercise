import s from './App.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function App() {
  const [allRepos, setAllRepos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/repos').then((res) => {
      setAllRepos(res.data);
    });
  }, [allRepos]);

  const orderedRepos = allRepos.slice().sort((a, b) => {
    return Date.parse(a.created_at) - Date.parse(b.created_at);
  });

  return (
    <div className={s.appContainer}>
      {orderedRepos.map((repo) => (
        <div className={s.repoContainer} key={repo.id}>
          <div>Name: {repo.name} </div>
          <div>Desc: {repo.description ? repo.description : 'n/a'} </div>
          <div>
            language:
            <button>{repo.language}</button>
          </div>
          <div>Forks Count: {repo.forks} </div>
        </div>
      ))}
    </div>
  );
}
