FROM node:21 as build-stage

WORKDIR /app

COPY . /app/

RUN rm -rf /app/package-lock.json /app/dist && \
    npm config set registry http://registry.npmjs.org/ && \
    npm i && \
    npm run build

FROM nginx:1.15

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY --from=build-stage /app/src/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
