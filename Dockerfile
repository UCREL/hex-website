FROM node:latest AS build

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y git

USER node
WORKDIR /home/node/build
COPY --chown=node:node . /home/node/build/
RUN git submodule update --init && \
    npm install && \
    npm run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/node/build/dist/ /usr/share/nginx/html/

EXPOSE 80