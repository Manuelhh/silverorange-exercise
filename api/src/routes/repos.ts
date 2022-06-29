import { Router, Request, Response } from 'express';

// import axios for fetching data
import axios from 'axios';
// import json data from repos.json
import jsonRepos from '../../../api/data/repos.json';

export const repos = Router();

repos.get('/', async (req, res) => {
  res.header('Cache-Control', 'no-store');
  res.status(200);
  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  //
  // fetching data from github's api
  // all gitHub repos
  const gitHubRepos = await axios
    .get('https://api.github.com/users/silverorange/repos')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('something happened');
      console.log(err);
    });
  // adding array of json & github repos together
  const allRepos = gitHubRepos.concat(jsonRepos);
  // filtering repo.fork false from all repos
  const forkFalseRepos = allRepos.filter((repository: any) => {
    return repository.fork === false;
  });
  // returning repo.fork false repos
  res.json(forkFalseRepos);
});
