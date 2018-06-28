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
    // 获取 feed列表
    let data = await app.$axios.$post(`${api.group.group_subject_list}`, para)
    if (data.code === 0) {
      let arr = await data.result.data.map(x => {
        x.content = JSON.parse(x.content)
        return x
      })
      store.commit('SET_FEED_LIST', arr)
    } else {
      error({
        message: `错误代码:${data.code}, ${data.result}`
      })
    }
    // 获取群组信息
    let data2 = await app.$axios.$post(`${api.group.share_group}`, para2)
    if (data2.code === 0) {
      let monitor_uid = data2.result.group_info ? data2.result.group_info.group.attributes.monitor.uid : '';

      for (let i = 0; i < data2.result.group_user_info.length; i++) {
        if (data2.result.group_user_info[i].uid === monitor_uid) {
          data2.result.group_user_info.splice(i, 1)
        }
      }
      store.commit('SET_GROUP_INFO', data2.result)
    } else {
      error({
        message: `错误代码:${data2.code}, ${data2.result}`
      })
    }
  } catch (err) {
    error({
      message: `${err}`
    })
  }
}
