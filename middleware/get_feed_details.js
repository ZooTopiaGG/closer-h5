export default async function ({
  params,
  store,
  app,
  req
}) {
  try {
    let para = {
      subjectid: params.id
    }
    // let res = await app.$axios.$post(`${api.command.show}`, para)
    let [res, incr_view] = await Promise.all([
      app.$axios.$post(`${api.command.show}`, para),
      app.$axios.$post(`${api.command.incr_view}`, para)
    ])
    // 获取迷药
    if (res.code != 0) {
      store.commit('GET_EXIST_STATUS', false)
    } else {
      if (res.result.int_type === 1) {
        store.commit('SET_NO_NAV', false)
      }
      if (res.result.isFollowed) {
        store.commit('SET_FOCUS_STAT', res.result.isFollowed)
      }
      if (res.result.content) {
        var content = JSON.parse(res.result.content)
        if (content.discuss) {
          // var discuss = content.discuss
          var discuss = await content.discuss.map((x) => {
            if (x.text) {
              let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
              let res = x.text.match(reg)
              if (res) {
                x.weblink = true
                // this.$set(x, 'weblink', true)
                res.map(y => {
                  // 正则替换文本
                  let tag = `<a href="${y}" target="_blank">${y}</a>`
                  let newtag = x.text.replace(reg, tag)
                  // this.$set(x, 'newText', newtag)
                  x.newText = newtag
                })
              } else {
                x.weblink = false
                // this.$set(x, 'weblink', false)
              }
            }
            return x
          })
        }
      }
      // 投稿类型
      var postType = ''
      switch (res.result.int_post_limit) {
        case 0:
          postType = '图片';
          break;
        case 1:
          postType = '视频';
          break;
        case 2:
          postType = '长图文';
          break;
        case 3:
          postType = '全部';
          break;
        default:
          postType = '全部'
      }
      // console.log(';ressssss==sdada')
      // 返回在渲染页面之前得结果
      store.commit('SET_CONTENT', content)
      store.commit('SET_RES', res.result)
      store.commit('SET_POSTTYPE', postType)
      store.commit('SET_DISSCUSS', discuss)
      // store.commit('SET_OPTIONS', options)
    }
  } catch (err) {
    store.commit('GET_EXIST_STATUS', false)
    throw err
  }
  // store.dispatch('getFeedDetails', {
  //   subjectid: params.id
  // })
}
