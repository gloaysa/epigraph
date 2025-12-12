FROM node:20-alpine AS deps
WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ .yarn/

RUN yarn install --immutable


FROM deps AS build
WORKDIR /app

COPY . .

RUN yarn workspace client build
RUN yarn workspace server build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable

COPY --from=build /app/package.json /app/yarn.lock /app/.yarnrc.yml /app/
COPY --from=build /app/.yarn /app/.yarn
COPY --from=build /app/node_modules /app/node_modules

COPY --from=build /app/packages/server /app/packages/server

EXPOSE 3000

CMD ["node", "packages/server/dist/index.js"]
