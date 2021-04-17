const e = require('express')
const fs = require('fs')
const rewards = require('./rewards')
const util = require('./util')

module.exports = req => {
  return new Promise(async (resolve, reject) => {
    try {
      const userId = req.params.userId
      const at = req.query.at
      
      //create user if doesn't exist
      if (!await isUserExist(userId)) {
          await createUser(userId)
      } 
      
      let weeklyReward = await rewards.findReward(userId, at) 
      //create rewards if doesnt exist
      if (weeklyReward == null) {
            await rewards.createReward(userId, at)
      }
  
      let weeklyRewards = await rewards.retrieveReward(userId, at)
      let formattedResponse = util.formatResponse(weeklyRewards)

      resolve({
        data: formattedResponse
      })
    } catch (err) {
      reject(err)
    }
  })
}


// create users
const createUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await getUsers()
      const user = {
        id: userId
      }
      users.push(user)
      await saveUsers(users)
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}
  
  
//check if user exist
const isUserExist = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await getUsers()
      
      for (const u of users) {
        if (u.id == userId) resolve(true)  
      } 
      resolve(false)
    } catch (err) {
      reject(err)
    }
  })
}
  
  
// get users data
const getUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = fs.readFileSync('src\\data\\users.json')
      resolve(JSON.parse(users))
    } catch (err) {
      reject(err)
    }
  })
}
  

// save users data
const saveUsers = async (users) => {
  return new Promise (async (resolve, reject) => {
    try {
      const data = JSON.stringify(users, null, 2)
      fs.writeFileSync('src\\data\\users.json', data)
      resolve()
    } catch (err) {
      reject(err)
    }
  })
    
}
  