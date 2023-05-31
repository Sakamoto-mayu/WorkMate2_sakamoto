//match（条件一致検索）
db.books.aggregate([{ $match: { publisher: '講話社' } }])

db.books.aggregate([{ $match: { publisher: { $ne: '講話社' } } }])

db.books.aggregate([{ $match: { price: { $gt: 500 } } }])

db.books.aggregate([{ $match: { price: { $lt: 500 } } }])

db.books.aggregate([{ $match: { publisher: /社/ } }])

//project（再フォーマット）
db.books.aggregate([
  { $match: { publisher: '講話社' } },
  {
    $project: { _id: 0 }
  }
])
//id非表示title表示
db.books.aggregate([
  { $match: { publisher: '講話社' } },
  {
    $project: { _id: 0, title: 1 }
  }
])
//id、title以外表示
db.books.aggregate([
  { $match: { publisher: '講話社' } },
  {
    $project: { _id: 0, title: 0 }
  }
])

//sort（検索結果ソート）
db.books.aggregate(
  {
    $project: { _id: 0, title: 1, price: 1 }
  },
  { $sort: { price: 1 } }
)

db.books.aggregate(
  {
    $project: { _id: 0, title: 1, price: 1 }
  },
  { $sort: { price: -1 } }
)

//count（件数取得）
db.books.aggregate([{ $count: 'count' }])

db.books.aggregate([{ $match: { publisher: '講話社' } }, { $count: 'count' }])

//group(グループ集計)
db.books.aggregate([
  {
    $group: {
      _id: '$publisher'
    }
  }
])

db.books.aggregate([
  {
    $group: {
      _id: '$publisher',
      count: { $sum: 1 }
    }
  }
])

db.books.aggregate([
  {
    $group: {
      _id: '$publisher',
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  }
])

//データ合計値を集計
db.books.aggregate([
  {
    $group: {
      _id: '$publisher',
      cost: { $sum: '$price' },
      page: { $sum: '$pages' }
    }
  }
])

db.books.aggregate([
  {
    $group: {
      _id: '$publisher',
      cost: { $sum: '$price' },
      page: { $sum: '$pages' }
    }
  },
  {
    $project: {
      cpp: { $multiply: [{ $divide: ['$cost', '$page'] }, 100] }
    }
  }
])

//最小値と最大値を集計
db.books.aggregate([
  {
    $group: { _id: '$publisher', min: { $min: '$price' }, max: { $max: '$price' } }
  }
])

db.books.aggregate([
  {
    $group: {
      _id: { year: { $year: '$launch' }, month: { $month: '$launch' } },
      min: { $min: '$price' },
      max: { $max: '$price' }
    }
  }
])

db.books.aggregate([
  {
    $group: {
      _id: { year: { $year: '$launch' }, month: { $month: '$launch' } },
      min: { $min: '$price' },
      max: { $max: '$price' }
    }
  },
  {
    $sort: { _id: -1 }
  }
])

//平均と分散集計
db.books.aggregate([
  {
    $group: { _id: 0, avg: { $avg: '$price' }, stddev: { $stdDevPop: '$price' } }
  }
])

//skip,limit(指定範囲を取得)
db.books.aggregate([
  { $sort: { launch: -1 } },
  {
    $project: { _id: 0, title: 1, launch: 1 }
  }
])

db.books.aggregate([
  { $sort: { launch: -1 } },
  {
    $project: { _id: 0, title: 1, launch: 1 }
  },
  {
    $skip: 2
  }
])

db.books.aggregate([
  { $sort: { launch: -1 } },
  {
    $project: { _id: 0, title: 1, launch: 1 }
  },
  {
    $skip: 2
  },
  {
    $limit: 3
  }
])

//検索結果のフィールド名を変更
db.books.aggregate([
  {
    $group: { _id: '$publisher', count: { $sum: 1 } }
  }
])

db.books.aggregate([
  {
    $group: { _id: '$publisher', count: { $sum: 1 } }
  },
  {
    $project: { _id: 0, publisher: '$_id', count: 1 }
  }
])

//検索結果のフィールド値を変更
db.authors.aggregate([
  {
    $project: { _id: 0, name: { $split: ['$name', ' '] } }
  }
])

db.books.aggregate([
  {
    $project: { _id: 0, title: { $concat: ['$title', '(', '$publisher', ')'] } }
  }
])

//検索結果の表記変更
db.books.aggregate([
  {
    $project: {
      _id: 0,
      title: 1,
      status: {
        $cond: {
          if: { $gte: [{ $size: '$reviews' }, 2] },
          then: 'Hot!',
          else: ''
        }
      }
    }
  }
])

db.books.aggregate([
  {
    $project: {
      _id: 0,
      title: 1,
      status: {
        $switch: {
          branches: [
            { case: { $gte: [{ $size: '$reviews' }, 2] }, then: 'A' },
            { case: { $eq: [{ $size: '$reviews' }, 1] }, then: 'B' }
          ],
          default: 'C'
        }
      }
    }
  }
])

//lookup(コレクションの結合)
db.books.aggregate([
  {
    $match: {
      _id: ObjectId('5b6f03376c25c37f77e69177')
    }
  },
  {
    $lookup: {
      from: 'reviews',
      localField: '_id',
      foreignField: 'book',
      as: 'reviews'
    }
  }
])

db.books.aggregate([
  {
    $match: {
      _id: ObjectId('5b6f03376c25c37f77e69177')
    }
  },
  {
    $lookup: {
      from: 'reviews',
      let: { targets: '$reviews' },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ['$_id', '$$targets']
            }
          }
        }
      ],
      as: 'reviews'
    }
  }
])

//unwind(配列の展開)
db.books.aggregate([
  {
    $match: {
      _id: ObjectId('5b6f03376c25c37f77e69177')
    }
  },
  {
    $unwind: '$categories'
  }
])

db.books.aggregate([
  {
    $unwind: '$categories'
  },
  {
    $group: {
      _id: '$categories',
      count: { $sum: 1 }
    }
  }
])

db.books.aggregate([
  {
    $unwind: '$categories'
  },
  {
    $group: {
      _id: '$categories',
      count: { $sum: 1 },
      books: { $push: '$title' }
    }
  }
])

//db.createView()
db.books.aggregate([
  {
    $unwind: '$categories'
  },
  {
    $group: {
      _id: '$categories',
      count: { $sum: 1 },
      books: { $push: '$$ROOT' }
    }
  }
])

db.books.aggregate([
  {
    $unwind: '$categories'
  },
  {
    $group: {
      _id: '$categories',
      count: { $sum: 1 },
      books: { $push: '$$ROOT' }
    }
  },
  {
    $project: {
      _id: 0,
      categories: '$_id',
      count: 1,
      books: 1
    }
  }
])

db.createView('categories', 'books', [
  {
    $unwind: '$categories'
  },
  {
    $group: {
      _id: '$categories',
      count: { $sum: 1 },
      books: { $push: '$$ROOT' }
    }
  },
  {
    $project: {
      _id: 0,
      categories: '$_id',
      count: 1,
      books: 1
    }
  }
])
