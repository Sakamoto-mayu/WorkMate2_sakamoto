//exist
db.authors.find({
  dob: { $exists: true }
})

//type
db.authors.find({
  dob: { $type: 'string' }
})

//exist and type
db.authors.find({
  $and: [{ dob: { $exists: true } }, { dob: { $not: { $type: 'string' } } }]
})
