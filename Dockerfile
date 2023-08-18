FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
RUN apt install ffmpeg
COPY . /app
CMD ["npm", "start"]
