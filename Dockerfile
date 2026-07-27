FROM node:22-alpine3.24 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install 

COPY . .

RUN yarn generate 

FROM nginx:1.30-alpine3.24 as production

COPY --from=builder /usr/src/app/.output/public /usr/share/nginx/html

COPY ./configs/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


