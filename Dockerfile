FROM harbor.tiejin.cn/closer/umscloud-nginx-nodejs

MAINTAINER dengpeng <peng.deng@tiejin.me>

# COPY conf/closer-admin.conf /etc/nginx/conf.d/grouk-dashboard.conf

# RUN rm -rf node_modules

# RUN rm -rf package.json

# RUN rm -rf package-lock.json

# RUN npm cache clean --force

RUN mkdir /apps/closer-h5

ADD . /apps/closer-h5/

WORKDIR /apps/closer-h5

RUN npm --registry=http://registry.npm.taobao.org install

RUN npm run build

EXPOSE 3601

CMD ["npm", "start" ]
