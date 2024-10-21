# encapsulate all of the repeated init operations into a single layer
FROM node:lts-alpine AS base-yarn
WORKDIR /app

RUN corepack enable
RUN yarn set version berry

ADD package.json yarn.lock ./

# initialize a "builder" layer that has all dependencies needed for the project
FROM base-yarn AS builder

ADD . .

RUN yarn install

RUN yarn build

# initialize the "production" layer that only installs production deps
FROM base-yarn AS production

COPY --from=builder /app/build ./build

# install only the production dependencies
RUN yarn workspaces focus --production

CMD ["yarn", "start"]

EXPOSE 3000
