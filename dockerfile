FROM node:20-alpine AS deps
WORKDIR /app

RUN corepack enable

COPY . .

RUN yarn install

FROM deps AS build
WORKDIR /app

RUN yarn workspace @epigraph/client build
RUN yarn workspace @epigraph/server build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable

COPY --from=build /app/package.json /app/yarn.lock /app/.yarnrc.yml /app/
COPY --from=build /app/.yarn /app/.yarn
COPY --from=build /app/node_modules /app/node_modules

COPY --from=build /app/packages/server /app/packages/server

CMD ["node", "packages/server/dist/index.js"]
