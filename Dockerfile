FROM node:10.0-alpine

RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

RUN mkdir -p /usr/src/egg-user-admin/

WORKDIR /usr/src/egg-user-admin/

# add npm package
COPY package.json /usr/src/egg-user-admin/package.json
RUN cd /usr/src/egg-user-admin/
RUN npm i --production

# RUN npm i --production --registry=https://registry.npm.taobao.org

# copy code
COPY . /usr/src/egg-user-admin/

EXPOSE 3000

CMD npm run start
