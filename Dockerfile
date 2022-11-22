FROM node:16-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \ 
    then npm install; \
    else npm install --only=production; \
    fi
ADD . .
ENV PORT 3000
EXPOSE $PORT
CMD ["echo node server.js; redis-server"]