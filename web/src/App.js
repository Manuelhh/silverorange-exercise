import s from './App.module.css';
// import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function App() {
  // initiliazing data
  const [allRepos, setAllRepos] = useState([]);

  // fetching data upon loading and setting it to app state
  useEffect(() => {
    axios.get('http://localhost:4000/repos').then((res) => {
      setAllRepos(res.data);
    });
  }, []);

  // ordering data as requested
  const orderedRepos = allRepos.slice().sort((a, b) => {
    return Date.parse(a.created_at) - Date.parse(b.created_at);
  });

  // filters repos according to language
  const filterRepos = (e) => {
    console.log(e.target.innerHTML);
    setAllRepos(
      allRepos.filter((repo) => repo.language === e.target.innerHTML)
    );
  };

  return (
    <div className={s.appContainer}>
      {/* list of repos */}
      {orderedRepos.map((repo) => (
        <div className={s.repoContainer} key={repo.id}>
          <div>Name: {repo.name} </div>
          <div>Desc: {repo.description ? repo.description : 'n/a'} </div>
          <div>
            language:
            <button onClick={(e) => filterRepos(e)}>{repo.language}</button>
          </div>
          <div>Forks Count: {repo.forks} </div>
        </div>
      ))}
    </div>
  );
}
