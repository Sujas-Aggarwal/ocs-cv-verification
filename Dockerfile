# Use official Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Install Prisma CLI (for database migrations)
RUN npm install -g prisma

# Expose ports
EXPOSE 3000

# Start application
CMD ["npm", "start"]
