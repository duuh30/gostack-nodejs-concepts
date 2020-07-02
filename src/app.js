const express = require("express");
const cors = require("cors");
const _ = require('lodash');
const RepositoryValidate = require('./middlewares/RepositoryMiddleware');

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function repositoryExists(request, response, next) {
    const { id } = request.params;

    if (! _.find(repositories, {uuid: id})) {
        return response.status(400).json({
            message: "repository not found",
        })
    }

    return next();
};

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", RepositoryValidate.store,(request, response) => {
    const { title, url, techs } = request.body;

    const repository = {
        id: uuid(),
        likes: 0,
        techs: techs,
        title: title,
        url: url,
    };

    repositories.push(repository);

    return response.status(201).json(repository);
});

app.put("/repositories/:id", RepositoryValidate.update, repositoryExists, (request, response) => {
    const { id } = request.params;
    const { title, url, techs } = request.body;

    const repository = _.find(repositories, {uuid: id});

    if (title) repository.title = title;
    if (url) repository.url = url;
    if (techs && techs.length) repository.techs = techs;

    return response.status(200).json(repository);
});

app.delete("/repositories/:id", repositoryExists, (request, response) => {
  const { id } = request.params;

  _.remove(repositories, {uuid: id});

  return response.status(204);
});

app.post("/repositories/:id/like", repositoryExists, (request, response) => {
    const { id } = request.params;

    const repository = _.update(_.find(repositories, {uuid: id}), 'likes', (likes) => {
        return ++likes;
    });

    return response.status(200).json({
        likes: repository.likes
    });
});

module.exports = app;
