# FROM node:20 AS builder
# WORKDIR /app
# COPY package*.json ./
# COPY package-lock.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build:production

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder  /app/build /usr/share/nginx/html

# Copy pre-built React app
COPY ./build /usr/share/nginx/html


 