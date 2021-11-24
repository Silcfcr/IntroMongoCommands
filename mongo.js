// Create a database called 'my_first_db'.
use my_first_db
//Create students collection.
db.createCollection("students")
// Each document you insert into this collection should have the following format: ({name: STRING, home_state: STRING, lucky_number: NUMBER, birthday: {month: NUMBER, day: NUMBER, year: NUMBER}})
//Create 5 students with the appropriate info.
db.students.insert({name: "Sierra", home_state: "Liberia", lucky_number: 3, birthday:{month: 6, day: 20, year: 1997}})

db.students.insert({name: "India", home_state: "Liberia", lucky_number: 4, birthday:{month: 8, day: 30, year: 1993}})

db.students.insert({name: "Kevin", home_state: "Moravia", lucky_number: 8, birthday:{month: 6, day: 1, year: 1993}})

db.students.insert({name: "Alfa", home_state: "Rusia", lucky_number: 15, birthday:{month: 6, day: 18, year: 1993}})

db.students.insert({name: "Bravo", home_state: "Colombia", lucky_number: 20, birthday:{month: 6, day: 20, year: 1997}})

//Get all students.
db.students.find().pretty()

// Retrieve all students who are from California (San Jose Dojo) or Washington (Seattle Dojo).
db.students.find( { home_state: { $in: [ "Rusia", "Moravia" ] } } )
// Get all students whose lucky number is:
// greater than 3
db.students.find( { lucky_number: {$gt: 3} }  )
// less than or equal to 10
db.students.find( { lucky_number: {$lte: 10} }  )
// between 1 and 9 (inclusive)
db.students.find( { $and: [ { lucky_number: { $gte: 1 } }, { lucky_number: { $lte: 10 } } ] } )
// Add a field to each student collection called 'interests' that is an ARRAY.  It should contain the following entries: 'coding', 'brunch', 'MongoDB'. Do this in ONE operation.
db.students.update({},{$set: {"interests":['coding', 'brunch', 'MongoDB']}},{multi:true})
// Add some unique interests for each particular student into each of their interest arrays.
db.students.update({name: "Kevin"},{$push: {interests:{$each:['Swimming']}}})
// Add the interest 'taxes' into someone's interest array.
db.students.update({name: "Kevin"},{$push: {interests:{$each:['taxes']}}})
// Remove the 'taxes' interest you just added.
db.students.update({name: "Kevin"},{$pull: {interests: "taxes"}})
// Remove all students who are from California.
db.students.remove({$or: [{home_state:"Rusia"}, {home_state:"Moravia"}]})
// Remove a student by name. 
db.students.remove({name: "Bravo"})
// Remove a student whose lucky number is greater than 5 (JUST ONE)
db.students.remove({lucky_number: {$gt: 3}}, true)
// Add a field to each student collection called 'number_of_belts' and set it to 0.
db.students.update({},{$set: {"number_of_belts":0}},{multi:true})
// Increment this field by 1 for all students in Washington (Seattle Dojo).
db.students.update({home_state: "Liberia"},{$set: {"number_of_belts":1}},{multi:true})
// Rename the 'number_of_belts' field to 'belts_earned'
db.students.update({}, {$rename: {"number_of_belts":"belts_earned"}}, {multi: true})
// Remove the 'lucky_number' field.
db.students.update({}, {$unset:{lucky_number:""}},{multi:true})
// Add a 'updated_on' field, and set the value as the current date.
db.students.update({}, {$currentDate:{updated_on:true}},{multi:true})