# dependencies stage
FROM docker.io/library/node:20-alpine AS deps

RUN apk add --no-cache libc6-compat && \
    npm install -g npm@10.8.2 && \
    npm --version

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# build stage
FROM docker.io/library/node:20-alpine AS builder
WORKDIR /app
COPY app/ ./app
COPY public/ ./public 
COPY tsconfig.json vite.config.ts tailwind.config.ts postcss.config.js tailwind.css .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
RUN npm run build

# final stage
FROM docker.io/library/node:20-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S remix -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER remix

CMD ["npm", "run", "start"]
EXPOSE 3000