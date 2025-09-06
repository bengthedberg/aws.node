import express from 'express';

function create(_req: express.Request, res: express.Response) {
  res.status(201).json({ message: 'Create a new todo item' });
}

function list(_req: express.Request, res: express.Response) {
  res.status(200).json({ message: 'List all todo items' });
}

function get(req: express.Request, res: express.Response) {
  const { id } = req.params;
  res.status(200).json({ message: `Get todo item with id ${id}` });
}

function update(req: express.Request, res: express.Response) {
  const { id } = req.params;
  res.status(200).json({ message: `Update todo item with id ${id}` });
}

function remove(req: express.Request, res: express.Response) {
  const { id } = req.params;
  res.status(200).json({ message: `Delete todo item with id ${id}` });
}

export const ToDoController = {
  create,
  list,
  get,
  update,
  remove
};
