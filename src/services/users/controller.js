const retrieveUsersRewards = require('./helper/retrieveUsersRewards')
const updateUsersRewards = require('./helper/updateUsersRewards')
const rewards = require('./helper/rewards')

/* Get users rewards*/
exports.getUsersRewards = async (req, res) => {
    try {
        let results = await retrieveUsersRewards(req)
        res.send(results)
    } catch (err) {
        res.status(400).send(err)
    }
}

/* Update user rewards */
exports.updateUserRewards = async (req, res) => {
    try {
        let results = await updateUsersRewards(req)
        res.send(results)
    } catch (err) {
        res.status(400).send(err)
    }
}