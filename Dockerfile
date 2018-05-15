FROM harbor.tiejin.cn/closer/umscloud-nginx-nodejs
MAINTAINER lichong <lichong@umscloud.com>

#COPY conf/closer-admin.conf /etc/nginx/conf.d/grouk-dashboard.conf

RUN mkdir /apps/closer-h5
# 安装npm模块
ADD package.json /apps/closer-h5/package.json

# 使用淘宝的npm镜像
RUN npm install --production -d --registry=https://registry.npm.taobao.org

# 添加源代码
ADD . /apps/closer-h5

# RUN npm run build

EXPOSE 3601

CMD ["npm", "start" ]
