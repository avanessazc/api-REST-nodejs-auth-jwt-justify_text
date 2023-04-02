FROM alpine:3.15

WORKDIR /usr/src/app/back

RUN apk add vim && \
    apk add openssl && \
    apk add --update nodejs npm

RUN mkdir -p /etc/node/ssl && \ 
    openssl req -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out server.crt -keyout server.key -subj "/C=FR/ST=Paris/L=Paris/O=42/OU=42/CN=ayzapata" && \
    mv server.crt /etc/node/ssl && \
    mv server.key /etc/node/ssl

COPY package*.json ./

RUN npm install -g ts-node
RUN npm install -g nodemon
RUN npm install

# COPY tsconfig.json ./
COPY . .