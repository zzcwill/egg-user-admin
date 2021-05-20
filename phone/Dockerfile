FROM nginx:latest

COPY ./dist /usr/app/egg-user-admin/phone
COPY nginx.conf /etc/nginx/conf.d/egg-user-admin-phone.conf

EXPOSE 3302
CMD ["nginx","-g","daemon off;"]
