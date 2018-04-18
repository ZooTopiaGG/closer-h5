FROM harbor.tiejin.cn/closer/umscloud-nginx-nodejs
MAINTAINER lichong <lichong@umscloud.com>

#COPY conf/closer-admin.conf /etc/nginx/conf.d/grouk-dashboard.conf

RUN mkdir /apps/closer-h5
COPY . /apps/closer-h5/
WORKDIR /apps/closer-h5
EXPOSE 3601
CMD npm run build
CMD npm run start
