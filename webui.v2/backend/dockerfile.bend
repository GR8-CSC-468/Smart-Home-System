# Use the official Node.js base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies, ensuring they are cached unless package.json changes
RUN npm install

# Copy the rest of the backend application source files into the Docker container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "server.js"]
