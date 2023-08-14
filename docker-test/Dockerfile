FROM node:alpine
WORKDIR /app
COPY . .
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install -g http-server

EXPOSE 8899
CMD ["http-server","-p","8899"]