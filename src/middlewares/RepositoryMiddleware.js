'use strict';
const uuid = require('uuidv4');

let errors = [];

const store = (request, response, next) => {
  errors = [];
  const { title, url, techs } = request.body;

  if (! title) errors.push("title field is required");
  if (! url) errors.push("url field is required");
  if (! techs || techs && ! techs.length) errors.push("techs field is required");

  if (errors.length) {
     return response.status(400).json({
        data: null,
        errors: errors,
        error: true,
     });
  }

   return next();
};

const update = (request, response, next) => {
  errors = [];
  const { id } = request.params;

  if (! validUuid(id)) errors.push("invalid uuid");

  if (errors.length) {
    return response.status(404).json({
      data: null,
      errors: errors,
      error: true,
    });
  }

  return next();
};

const remove = (request, response, next) => {
  errors = [];
  const { id } = request.params;

   if (! validUuid(id)) errors.push("invalid uuid");

   if (errors.length) {
      return response.status(404).json({
         data: null,
         errors: errors,
         error: true,
      });
   }

   return next();
};

const like = (request, response, next) => {
  errors = [];
  const { id } = request.params;

  if (! validUuid(id)) errors.push("invalid uuid");

  if (errors.length) {
    return response.status(404).json({
      data: null,
      errors: errors,
      error: true,
    });
  }

  return next();
};

const validUuid = (id) => {
   return uuid.isUuid(id);
};

module.exports = {
  store,
  update,
  remove,
  like,
};
