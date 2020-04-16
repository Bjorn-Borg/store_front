# Use the official cypress image
FROM cypress/base:8.15.1

# Set the working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy the file from your host to your current location
COPY package.json /app/package.json

# Run the command inside your image filesystem
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

# Choose port to expose
EXPOSE 8080

# Run the specified command within the container.
CMD [ "npm", "run", "dev" ]
