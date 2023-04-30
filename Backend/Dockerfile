
# Linux Alpine 3.17.x + Node.js 18.x
FROM node:18-alpine3.17

# Install global libraries:
RUN npm i -g ts-node

# Install nodemon
RUN npm i -g nodemon

# Create application directory
WORKDIR /app

# Copy package*.json to /app:
COPY package*.json /app

# Restore node_modules:
RUN npm i

# Take current directory and copy it into /app (inside the image)
COPY . /app

# Run application when container is up:
ENTRYPOINT npm start