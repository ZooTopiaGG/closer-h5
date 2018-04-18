FROM docker.intra.tiejin.cn/umscloud-nginx-nodejs
MAINTAINER lichong <lichong@umscloud.com>

#COPY conf/closer-admin.conf /etc/nginx/conf.d/grouk-dashboard.conf

RUN mkdir /apps/closer-web-new
COPY . /apps/closer-web-new/
WORKDIR /apps/closer-web-new
EXPOSE 3000
CMD npm run start
