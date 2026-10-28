
# Use Node.js 22 with Alpine Linux
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Install the Ionic CLI globally
RUN npm install -g @ionic/cli

# Copy package files
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the remaining project files
COPY . .

# Document the application port
EXPOSE 8101

# Start the Ionic development server
CMD ["ionic", "serve", "--host=0.0.0.0", "--port=8100", "--no-open"]
