import { Router } from 'express';
import { ToDoController } from '#src/resources/todo/todo.controller.ts';
import { validate } from '#src/middleware/validation.middleware.ts';
import { createToDoSchema } from '#src/resources/todo/todo.validation.ts';

const router = Router();

// controller middleware
//app.use(authenticationMiddleware);

router.post('/todos', validate(createToDoSchema), ToDoController.create);
router.get('/todos', ToDoController.list);
router.get('/todos/:id', ToDoController.get);
router.put('/todos/:id', ToDoController.update);
router.delete('/todos/:id', ToDoController.remove);

export default router;
