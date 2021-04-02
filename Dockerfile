FROM node:14.15.1-alpine AS node

# Build
FROM node AS build
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
COPY ormconfig.docker.json ./src/ormconfig.json
RUN yarn build

# Final
FROM node AS final
RUN mkdir -p /app/dist
WORKDIR /app
COPY package*.json ./
RUN yarn install --production
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 4000
ENTRYPOINT ["node", "./dist/index.js"]
