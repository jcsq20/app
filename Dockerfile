FROM node:18-alpine AS builder
WORKDIR "/app"
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine AS production
WORKDIR "/app"
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
CMD [ "sh", "-c", "serve -s dist"]
