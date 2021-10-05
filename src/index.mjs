import express  from 'express'
import path from 'path'
import { MyDb } from './myDb.mjs'

const app = express()
app.use(express.json())

const port = 3300
const db_path = path.resolve(path.resolve(), 'src','db', 'db.txt')
const db = new MyDb(db_path)


app.get('/', (req, res) => {
  res.send("hellow!")
})

app.get('/users', async (req, res) => {
  const data = await db.getAllData()
  if (data) res.json(data)
  else res.send('database read error')
})

app.post('/users', async (req, res) => {
  const user = req.body
  const result = await db.addUser(user)
  if (result) res.status(201).json({ status: 'ok'})
  else res.status(501).json({ status: 'add user data error'})
})

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id
  const result = await db.removeUser(id)
  if (result) res.status(200).send('ok')
  else res.status(500 ).send('remove user data error')
})

app.listen(port, () => {
  console.log('Server have started at port: ', port)
})
