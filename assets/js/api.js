let api = {
    // 接口地址
    base: 'https://api-sandbox.tiejin.cn/',
    command: {
        // 贴子详情
        show: 'command/closer_subject.show',
        // 留言列表
        comments: 'command/closer_reply.comments',
        // 获取video播放密钥
        videos: 'command/ali_vod.accessInfo'
    },
    community: {
        show: 'command/closer_community.show'
    }
}

export default api
