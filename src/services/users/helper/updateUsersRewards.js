const rewards = require('./rewards')

module.exports = (req) => {
    return new Promise (async (resolve, reject) => {
        try {
            const userId = req.params.userId
            const at = req.params.at

            // get rewards for user {userId} with availableAt {at} 
            let reward = await rewards.findReward(userId, at)

            if (reward) {
                let expiredDate = new Date(reward.expiresAt)
                let currentDate = new Date(Date.now())

                if (expiredDate < Date.now()) {
                    throw ({
                        "error": {
                            "message": "This reward has already expired."
                        }
                    })
                } else {
                    reward = await rewards.updateRedeemAt(currentDate, userId, at)
                    delete reward.userId
                }

                resolve({
                    data: reward
                })

            } else {
                throw({
                    "error": {
                        "message": "This reward does not exist/ in the future."
                    }
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}