let api = {
  // 测试接口地址
  // base: 'http://api-sandbox.tiejin.cn/',
  // filepath: 'http://file-sandbox.tiejin.cn',
  // 正式接口地址
  base: 'http://api.tiejin.cn/',
  filepath: 'http://file.tiejin.cn',
  admin: {
    // 微信授权获取code
    get_auth_path: 'closer_auth.get_auth_path',
    login_with_wechat: 'closer_auth.login_with_wechat',
    closeruser_regist: 'closer_auth.closeruser_regist',
    get_code_by_phone: 'closer_account.get_code_by_phone',
    // 用户详情
    user_show: 'closer_user.show',
    // 点赞
    like: 'closer_reply.like',
    // 回复 评论
    add_reply: 'closer_reply.add_reply',
    // 邀请人书
    invite_counts: 'closer_user.invite_counts'
  },
  command: {
    // 贴子详情
    show: 'closer_subject.show',
    // 留言列表
    comments: 'closer_reply.comments',
    // 获取video播放密钥
    videos: 'ali_vod.accessInfo',
    // 举报
    report: 'closer_report.add',
    // 点赞
    like: 'closer_reply.like',
    // 评论以及回复评论
    add_reply: 'closer_reply.add_reply',
    // 富评论下的子评论
    replys: 'closer_reply.replys',
    // 返回某一主题id下的父评论(包括官方)
    comments: 'closer_reply.comments',
    reportType: 'closer_report.get_report_types'
  },
  community: {
    show: 'closer_community.show'
  },
  group: {
    show: 'closer_class.show',
    group_subject_list: 'closer_subject.class_subject_list_index',
    share_group: 'closer_share.outer_group'
  }
}

export default api
