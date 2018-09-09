FROM daocloud.io/nginx
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build
COPY /dist /usr/share/nginx/html
