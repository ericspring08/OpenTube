FROM ubuntu
WORKDIR /app
COPY package.json /app
RUN apt install ffmpeg node
RUN npm install
COPY . /app
CMD ["npm", "start"]
