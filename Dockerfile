FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
RUN apk add ffmpeg
COPY . /app
CMD ["npm", "start"]
