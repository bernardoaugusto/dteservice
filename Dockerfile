# BUILDER STAGE
FROM node:lts-alpine as builder

# Set working directory
WORKDIR /usr/app

# Install dependencies
COPY package*.json ./
# RUN npm ci
RUN npm cache clean --force && rm -rf node_modules && npm install

# Copy the rest of the application code
COPY . .

RUN npm run build


# RUNTIME STAGE
FROM node:lts-alpine as runtime

WORKDIR /usr/app

ENV NODE_ENV=PRODUCTION

COPY --from=builder "/usr/app/dist/" "/usr/app/dist/"
COPY --from=builder "/usr/app/node_modules/" "/usr/app/node_modules/"
COPY --from=builder "/usr/app/package.json" "/usr/app/package.json"


RUN npm prune --production

CMD ["npm", "run","start:prod"]
