export default async function ({ params, store, app, error}) {
    let para = {
        regionid: '-1',
        longitude: '0.0',
        latitude: '0.0'
    }
    let para1 = {
      classid: '8W0Ya9qZ0a'
    }
    try {
        let data = await app.$axios.$post('closer_subject.list_index', para)
        if (data.code === 0) {
          let arr = await data.result.data.map(x => {
            x.content = JSON.parse(x.content)
            return x
          })
          // console.log('arr ====', arr)
          // return {
          //     res: arr
          // }
          store.commit('SET_GROUP_RES', arr)
        } else {
          error({ message: `错误代码:${data.code}, ${data.result}` })
        }
        let data1 = await app.$axios.$post(`${api.group.show}`, para1)
        console.log('data1=====', data1)
    } catch(error){
      // console.log(error)
      error({ message: `${error}` })
        // app.$loading.fail()
    }
}