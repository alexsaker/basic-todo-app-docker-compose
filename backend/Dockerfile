FROM node:12-alpine
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY index.js index.js
ENV NODE_ENV=production
CMD [ "npm", "start" ]
EXPOSE 3001