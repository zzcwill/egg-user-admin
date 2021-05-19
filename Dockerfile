# FROM node:10.0-alpine
FROM node:12.18.3

# RUN apk --update add tzdata \
#     && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
#     && echo "Asia/Shanghai" > /etc/timezone \
#     && apk del tzdata

RUN mkdir -p /usr/app/egg-user-admin/node/

WORKDIR /usr/app/egg-user-admin/node/

# add npm package
COPY package.json /usr/app/egg-user-admin/node/package.json
RUN cd /usr/app/egg-user-admin/node/
RUN npm i --production

# RUN npm i --production --registry=https://registry.npm.taobao.org

# copy code
COPY . /usr/app/egg-user-admin/node/

EXPOSE 3000

CMD npm run start
