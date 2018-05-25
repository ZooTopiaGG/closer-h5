export default async function ({
  params,
  store,
  app,
  error
}) {
  let para = {
    flag: 1,
    classid: params.id,
    index: '',
    pagesize: 5
  }
  let para2 = {
    groupId: params.id
  }
  try {
    let data = await app.$axios.$post(`${api.group.group_subject_list}`, para)
    if (data.code === 0) {
      let arr = await data.result.data.map(x => {
        x.content = JSON.parse(x.content)
        return x
      })
      store.commit('SET_GROUP_RES', arr)
    } else {
      error({
        message: `错误代码:${data.code}, ${data.result}`
      })
    }
    let data2 = await app.$axios.$post(`${api.group.share_group}`, para2)
    console.log('data2== ==', data2.result)
    if (data2.code === 0) {
      // let newarr = []
      let monitor_uid = data2.result.group_info ? data2.result.group_info.group.attributes.monitor.uid : '';
      // let arr = await data2.result.group_user_info.map(x => {
      //   // 去重
      //   if (x.uid === monitor_uid) {
      //     delete x
      //   }
      //   return x
      // })
      // console.log('arr====', arr)
      for (let i = 0; i < data2.result.group_user_info.length; i++) {
        if (data2.result.group_user_info[i].uid === monitor_uid) {
          data2.result.group_user_info.splice(i, 1)
        }
      }
      console.log('data2.result.group_user_info===', data2.result.group_user_info)
      store.commit('SET_GROUP_INFO', data2.result)
    } else {
      error({
        message: `错误代码:${data2.code}, ${data2.result}`
      })
    }
  } catch (err) {
    // console.log(error)
    error({
      message: `${err}`
    })
    // app.$loading.fail()
  }
}
