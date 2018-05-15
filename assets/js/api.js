let api = {
  // 接口地址
  base: 'http://api-sandbox.tiejin.cn/',
  admin: {
    // 微信授权获取code
    get_auth_path: 'closer_auth.get_auth_path',
    login_with_wechat: 'closer_auth.login_with_wechat'
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
