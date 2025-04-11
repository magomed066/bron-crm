# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./app
RUN npm install

# Copy the rest of the app
COPY . .

# Expose backend port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]