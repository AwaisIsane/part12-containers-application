const express = require('express');
const { Todo } = require('../mongo');
const { setAsync, getAsync } = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

const todoCounter = async () => {
  const count = await getAsync("count")
  if (count) {
    setAsync("count", parseInt(count) + 1)
  }
  else {
    setAsync("count", 1)
  }
}

// router.get('/statistics', async (_, res) => {

//   const count = await getAsync("count")
//   return res.json({ "added_todos": count | "no count" })
// })



/* POST todo to listing. */
router.post('/', async (req, res) => {
  todoCounter()
  console.log("here")
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  //todoCounter()
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo
  todo.done = req.body.done
  await todo.save()
  res.json(todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
