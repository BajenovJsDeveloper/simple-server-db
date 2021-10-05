import { promisify } from 'util'
import fs from 'fs'
import { v4 as uuidv4} from 'uuid'

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

export class MyDb {
  constructor(file) {
    this.file = file
  }
  
  async getAllData() {
    try {
      const result = await readFileAsync(this.file, "utf8")
      return JSON.parse(result)
    } catch (e) {
      return null
    }
  } 

  async addUser(user) {
    let isOk = null
    const uuid = uuidv4()
    try {
      let result = await readFileAsync(this.file, "utf8")
      result = JSON.parse(result)
      result.users.push({...user, id: uuid })
      result = JSON.stringify(result)
      await writeFileAsync(this.file, result)
      isOk = true
    } finally {
      return isOk
    }
  }

  async removeUser(id) {
    let isOk = null
    try {
      let result = await readFileAsync(this.file, "utf8")
      result = JSON.parse(result)
      const filteredUsers = result.users.filter(u => u.id.toString() !== id)
      result.users = filteredUsers
      result = JSON.stringify(result)
      await writeFileAsync(this.file, result)
      isOk = true
    } finally {
      return isOk
    }
  }
}



