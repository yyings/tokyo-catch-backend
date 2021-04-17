const fs = require('fs')
const util = require('./util')

//get weekly rewards
exports.retrieveReward = async (userId, at) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rewards = await getRewards()
      let weeklyRewards = []
      
      let queryDate = new Date(at)
      let first = util.firstDayOfWeek(at)
      let last = first + 6
      
      let firstDate = new Date(queryDate.setDate(first))
      let lastDate = new Date(queryDate.setDate(last)) 
      
      for (r of rewards) {
        if ((r.userId == userId) && (firstDate <= r.availableAt <= lastDate)) {
          weeklyRewards.push(r)
        }
      }
      resolve(weeklyRewards)
    } catch (err) {
      reject(err)
    }
  })
    
}

  
//return reward with {userId} and {at}
exports.findReward = async (userId, at) => {
  return new Promise(async (resolve, reject) => {
    try {
        const rewards = await getRewards()
        let queryDate = new Date(at).toDateString()
        for (const r of rewards) {
          if (new Date(r.availableAt).toDateString() == queryDate && r.userId == userId) resolve(r)
        } 
        resolve(null)
    } catch (err) {
        reject(err)
    }
  })
}

  
// get rewards data
const getRewards = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let rewards = fs.readFileSync('src\\data\\rewards.json')
      resolve(JSON.parse(rewards))
    } catch (err) {
      reject(err)
    }
  })
}
  

// save rewards data
const saveRewards = async (rewards) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = JSON.stringify(rewards, null, 2)
      fs.writeFileSync('src\\data\\rewards.json', data)
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

// create rewards
exports.createReward = async (userId, at) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rewards = await getRewards()
      let rewardsToCreate = []

      let queryDate = new Date(at)
      
      let first = util.firstDayOfWeek(at)
      let last = first + 6

      for (var i=first; i<=last; i++) {
        let availableDate = new Date(queryDate.setDate(i))
        availableDate.setUTCHours(0, 0, 0, 0)
        
        let expiredDate = new Date(queryDate.setDate(i+1))
        expiredDate.setUTCHours(0, 0, 0, 0)
        
        rewardsToCreate.push(
          {
            userId: userId,
            availableAt: availableDate,
            redeemedAt: null,
            expiresAt: expiredDate
          }
        )
      }
      let finalRewards = rewards.concat(rewardsToCreate)
      await saveRewards(finalRewards)
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

// Update RedeemedAt and return the changed record
exports.updateRedeemAt = async (currentDate, userId, at) => {
  return new Promise (async (resolve, reject) => {
      try {
          let allRewards = await getRewards()
          let redeemedReward
          for (r of allRewards) {
              let available = new Date(r.availableAt)
              let queryDate = new Date(at)
              
              if ((available.getTime() == queryDate.getTime()) && (r.userId == userId)) {
                  if (r.redeemedAt == null) {
                    redeemedReward = r
                    r.redeemedAt = currentDate
                  } else {
                    throw({
                      "error": {
                          "message": `This reward has been redeemed at ${r.redeemedAt}.`
                      }
                  })
                }
              }
          }
          await saveRewards(allRewards)
          resolve(r)
      } catch (err) {
          reject(err)
      }
  })
}
