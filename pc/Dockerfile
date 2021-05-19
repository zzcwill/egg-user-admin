FROM nginx:latest

COPY ./dist /usr/app/egg-user-admin/pc
COPY nginx.conf /etc/nginx/conf.d/egg-user-admin-pc.conf

EXPOSE 3301
CMD ["nginx","-g","daemon off;"]
