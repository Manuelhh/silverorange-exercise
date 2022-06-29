import s from './App.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function App() {
  // initiliazing data
  const [allRepos, setAllRepos] = useState([]);
  // initial data for displaying repo details div
  const [displayDetail, setDisplayDetail] = useState(false);

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
          <div>
            <br />
            <button onClick={() => setDisplayDetail(!displayDetail)}>
              Name: {repo.name}
            </button>
          </div>
          <div>Desc: {repo.description ? repo.description : 'n/a'} </div>
          <div>
            language:
            <button onClick={(e) => filterRepos(e)}>{repo.language}</button>
          </div>
          <div>Forks Count: {repo.forks} </div>

          {displayDetail ? (
            <div>
              <div> +++details+++ </div>
              <div> most recent commit date: </div>
              <div> author: </div>
              <div> message: </div>
              <div> README: </div>

              <button onClick={() => setDisplayDetail(false)}>
                close details
              </button>
            </div>
          ) : (
            <div>{''}</div>
          )}
        </div>
      ))}
    </div>
  );
}
