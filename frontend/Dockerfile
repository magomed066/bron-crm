# Use Node.js for building the app
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose Vite dev server port
EXPOSE 5173

CMD ["npm", "run", "dev"]