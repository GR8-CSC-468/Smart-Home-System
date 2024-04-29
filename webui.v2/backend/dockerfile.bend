# Use the official Node.js base image
FROM node:latest

# Set the working directory in the Docker container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend application source files into the Docker container
COPY . .

# Your backend application should expose a port so it's accessible
EXPOSE 3000

# Start the backend application
CMD ["node", "server.js"]

