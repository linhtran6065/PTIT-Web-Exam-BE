// exams: id, name, question_id, description, type, date, length
// index chung: tạo sequelize theo dbconfig
// lấy products và review từ models
// tạo mối quan hệ 1-n

const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// db.products = require('./productModel.js')(sequelize, DataTypes)
// db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.exams = require('./examModel.js')(sequelize, DataTypes)
db.questions = require('./questionModel.js')(sequelize, DataTypes)
db.answers = require('./answerModel.js')(sequelize, DataTypes)


db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})



// 1 to Many Relation

// db.products.hasMany(db.reviews, {
//     foreignKey: 'product_id',
//     as: 'review'
// })

// db.reviews.belongsTo(db.products, {
//     foreignKey: 'product_id',
//     as: 'product'
// })


// 1 to Many Relation

db.exams.hasMany(db.questions, {
    foreignKey: 'examId',
    as: 'questions'
})

db.questions.belongsTo(db.exams, {
    foreignKey: 'examId',
    as: 'exam'
})

db.questions.hasMany(db.answers, {
    foreignKey: 'questionId',
    as: 'answers'
})

db.answers.belongsTo(db.questions, {
    foreignKey: 'questionId',
    as: 'question'
})

// Object.keys(db).forEach((modelName) => {
//     if (db[modelName].associate) {
//       db[modelName].associate(db)
//     }
//   })





module.exports = db
