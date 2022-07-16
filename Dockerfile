FROM node:12-slim
WORKDIR /usr/src/app
COPY . .
RUN yarn install
CMD ["yarn", "dev"]
