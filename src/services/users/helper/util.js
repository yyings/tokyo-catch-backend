//get firstDay of week
exports.firstDayOfWeek = (at) => {
  let queryDate = new Date(at)
  
  let first = queryDate.getDate() - queryDate.getDay()
  return first
}

// remove user if from final response 
exports.formatResponse = (weeklyRewards) => {
  for (r of weeklyRewards) {
    delete r.userId
  }

  return weeklyRewards
}
