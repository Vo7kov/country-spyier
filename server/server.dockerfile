# Stage: Development
FROM node:20

WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application in development mode
CMD [ "npx", "ts-node-dev", "--respawn", "src/index.ts" ]
