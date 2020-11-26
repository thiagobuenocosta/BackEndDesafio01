const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use( express.json() );
app.use( cors() );

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { id, title, url, techs } = request.body;
  const likes = 0;
  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes
  };
  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found!!!" })
  }
  const { title, url, techs } = request.body;
  const repositorie = repositories.find(repositorie => repositorie.id === id);
  repositorie.url = url;
  repositorie.title = title;
  repositorie.techs = techs;
  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found!!!" })
  }
  repositories.splice(repositorieIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found!!!" })
  }
  const repositorie = repositories.find(repositorie => repositorie.id === id);
  repositorie.likes++;
  return response.json({ likes:repositorie.likes });
});

module.exports = app;
