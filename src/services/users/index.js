const express = require('express')
const controller = require('./controller')
const router = express.Router()

/* GET users rewards. */
router.get('/:userId/rewards', controller.getUsersRewards)

/* PATCH users listing. */
router.patch('/:userId/rewards/:at/redeem', controller.updateUserRewards)

module.exports = router