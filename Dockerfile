FROM harbor.huali-tec.com:5443/public/nginx:alpine

ENV OSP_HOST=172.16.1.172 OSP_PORT=8620

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/templates/dcp.conf.template
COPY ./build /usr/share/nginx/html
