FROM node

LABEL maintainer=yinanli

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3007

CMD ["node", "src/app.js"]