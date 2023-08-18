FROM ubuntu
WORKDIR /app
COPY package.json /app
RUN apt-get update && apt-get install ffmpeg nodejs
RUN npm install
COPY . /app
CMD ["npm", "start"]
