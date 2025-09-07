import request from 'supertest';
import { app } from '#src/index.ts';

describe('Todo API', () => {
  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const todoData = {
        title: 'Test Todo',
        description: 'Test Description',
        priority: 'high'
      };

      const response = await request(app)
        .post('/todos')
        .send(todoData)
        .expect(201);

      expect(response.body.message).toBe('Create a new todo item');
    });

    it('should reject invalid todo data', async () => {
      const invalidData = {
        title: '',
        description: 'Test Description'
      };

      const response = await request(app)
        .post('/todos')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /todos', () => {
    it('should list all todos', async () => {
      const response = await request(app).get('/todos').expect(200);

      expect(response.body.message).toBe('List all todo items');
    });
  });

  describe('GET /todos/:id', () => {
    it('should get a specific todo', async () => {
      const response = await request(app).get('/todos/1').expect(200);

      expect(response.body.message).toBe('Get todo item with id 1');
    });
  });

  describe('PUT /todos/:id', () => {
    it('should update a todo', async () => {
      const updateData = {
        title: 'Updated Todo',
        description: 'Updated Description'
      };

      const response = await request(app)
        .put('/todos/1')
        .send(updateData)
        .expect(200);

      expect(response.body.message).toBe('Update todo item with id 1');
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete a todo', async () => {
      const response = await request(app).delete('/todos/1').expect(200);

      expect(response.body.message).toBe('Delete todo item with id 1');
    });
  });
});
