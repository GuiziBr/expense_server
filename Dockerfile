FROM node:20.17.0-alpine AS base

WORKDIR /server

RUN apk add --no-cache libc6-compat

COPY package*.json ./server

COPY . .

RUN npm ci

RUN npx prisma generate

EXPOSE 3000
