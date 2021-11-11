FROM node:16.11.1-buster
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package lock.json are copied
WORKDIR /home/node/app
ENV PATH /home/node/app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --silent
# Add your source files
COPY --chown=node:node . .
ENV NODE_ENV=production
# ENV AUTH_SERVER_PORT=3000
# EXPOSE 3005
CMD ["npm", "start"]