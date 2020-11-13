// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let dbName;
  // 根据类别查询对应表
  switch (event.cateId) {
    case 1:
      dbName = 'identify';
      break;
    case n:
      dbName = 'searchDB';
      break;
    default:
      console.log('hahahha')
  }
  // let _data = await db.collection(dbName).where({
  //   tags: $.indexOfBytes(['tags',event.keyWord])
  // }).get();
  // const res = await db
  //   .collection(dbName)
  //   .aggregate()
  //   .project({
  //     _id: 0,
  //     aStrIndex: $.indexOfBytes(['$tags', event.keyWord])
  //   })
  //   .end()
  let _data = await db.collection(dbName).where(_.or([//where中满足对象数组中的任意一个条件即成立
    {
      name:{
        $regex:'.*'+ event.keyWord,
        $options: '1'
      }
    },
    //模糊匹配title，content字段的内容，option=1表示不区分大小写
    {
        content:{
          $regex:'.*'+ event.keyWord,
          $options: '1'
        }
    },
    {
      tags:{
        $regex:'.*'+ event.keyWord,
        $options: '1'
      }
    }
  ])).get({})//查询得到所需数据记录
  let data = {
    resultData: _data,
    resultMsg: '接口调用成功',
    resultCode: '1001'
  }
  return {
    data
  }
}