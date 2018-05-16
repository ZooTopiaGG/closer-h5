FROM harbor.tiejin.cn/closer/umscloud-nginx-nodejs

MAINTAINER dengpeng <peng.deng@tiejin.me>

# COPY conf/closer-admin.conf /etc/nginx/conf.d/grouk-dashboard.conf

RUN mkdir /apps/closer-h5

COPY . /apps/closer-h5/

WORKDIR /apps/closer-h5

# RUN rm -rf node_modules

# RUN rm -rf package.json

# RUN rm -rf package-lock.json

# RUN npm cache clean --force

RUN npm --registry=https://registry.npm.taobao.org install nuxt -S
RUN npm run build

EXPOSE 3601

CMD ["npm", "start" ]
