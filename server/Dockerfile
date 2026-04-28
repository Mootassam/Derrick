
FROM node:14.16.0-alpine3.13
WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN npm install
#RUN npm ci --only=production
#RUN  npm install --production --silent && mv node_modules ../
# ENV BACKEND_URL="http://159.198.77.158:8080/api"
ENV BACKEND_URL="https://stelantiss.com/api/"
# ENV BACKEND_URL="http://159.198.77.158:8080/api"
EXPOSE 8082
CMD ["npm", "start"]
