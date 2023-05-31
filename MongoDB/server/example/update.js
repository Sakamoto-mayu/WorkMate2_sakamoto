//put
db.users.update(
  {
    email: 'test@test.jp'
  },
  {
    $set: { password: 'updated' }
  },
  { multi: true }
)

//field update
db.authors.update(
  {
    name: '与謝野 晶子'
  },
  { $set: { dob: ISODate('1887-12-07T00:00:00+09:00') } }
)

//field delete
db.authors.update(
  {
    name: '正岡 子規'
  },
  {
    $set: { dob: null }
  }
)

db.authors.update(
  {
    name: '正岡 子規'
  },
  {
    $unset: { dob: '' }
  }
)

//fieldName update
db.users.update({}, { $rename: { sex: 'gender' } }, { multi: true })

//fieldDate update currentDate
db.users.update(
  {
    name: '田中 剛'
  },
  { $set: { password: 'hoge' }, $currentDate: { update: true } }
)

//field update ++
db.reviews.update({}, { $inc: { score: 1 } }, { multi: true })

db.reviews.update({}, { $inc: { score: -1 } }, { multi: true })

//field update **
db.reviews.update({}, { $mul: { score: 2 } }, { multi: true })

db.reviews.update({}, { $mul: { score: 0.5 } }, { multi: true })

//arr push methods

//1
db.users.update(
  {
    name: '田中 剛'
  },
  {
    $push: {
      bookshelf: {
        book: 'book1',
        registered: ISODate()
      }
    }
  }
)

//over 2
db.users.update(
  {
    name: '田中 剛'
  },
  {
    $push: {
      bookshelf: {
        $each: [
          { book: 'book2', registered: ISODate() },
          { book: 'book3', registered: ISODate() }
        ]
      }
    }
  }
)

//update sort desc
db.users.update(
  {
    name: '田中 剛'
  },
  {
    $push: {
      bookshelf: {
        $each: [],
        $sort: { registered: -1 }
      }
    }
  }
)

//slice only 5
db.users.update(
  {
    name: '田中 剛'
  },
  {
    $push: {
      bookshelf: {
        $each: [],
        $slice: 5
      }
    }
  }
)

//push select position
db.users.update(
  {
    name: '田中 剛'
  },
  {
    $push: {
      bookshelf: {
        $each: [
          {
            book: 'book5',
            registered: ISODate()
          }
        ],
        $position: 0
      }
    }
  }
)

//each & sort & slice
db.users.update(
  {
    name: '田中 剛'
  },
  {
    $push: {
      bookshelf: {
        $each: [
          {
            book: 'book6',
            registered: ISODate()
          },
          {
            book: 'book7',
            registered: ISODate()
          }
        ],
        $sort: { registered: -1 },
        $slice: 5
      }
    }
  }
)

//arr value update
db.users.update(
  {
    name: '田中 剛'
  },
  {
    $set: {
      'bookshelf.$[item].status': '読了'
    }
  },
  { arrayFilters: [{ 'item.book': ObjectId('5b6f033a6c25c37f77e6917e') }] }
)

db.users.update(
  {
    name: '田中 剛'
  },
  {
    $set: {
      'bookshelf.$[item].status': '読了2',
      'bookshelf.$[item].readed': ISODate()
    }
  },
  { arrayFilters: [{ 'item.book': ObjectId('5b6f033a6c25c37f77e6917e') }] }
)

//arr value delete

//only last
db.users.update(
  {
    name: '田中 剛'
  },
  {
    $pop: {
      bookshelf: 1
    }
  }
)

//delete only select
db.users.update(
  {
    name: '田中 剛'
  },
  {
    $pull: {
      bookshelf: { status: '読了' }
    }
  }
)
