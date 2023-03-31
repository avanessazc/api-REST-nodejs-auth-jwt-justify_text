FROM alpine:3.15

WORKDIR /usr/src/app/back

RUN apk add vim && \
    apk add --update nodejs npm

COPY package*.json ./

RUN npm install -g ts-node
RUN npm install -g nodemon
RUN npm install

# COPY tsconfig.json ./
COPY . .