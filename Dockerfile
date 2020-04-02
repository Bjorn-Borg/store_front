# Use the official image as a parent image,  base image
FROM node:current-slim

# Set the working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add group with permissions
RUN addgroup --gid 1024 mygroup
RUN adduser --disabled-password --gecos "" --force-badname --ingroup 1024 myuser 
USER myuser

# Copy the file from your host to your current location
COPY package.json /app/package.json

# Run the command inside your image filesystem
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

# Run the specified command within the container.
CMD [ "npm", "run", "dev" ]
