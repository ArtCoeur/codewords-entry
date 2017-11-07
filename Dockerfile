FROM ubuntu:latest
MAINTAINER Tim Rodger

# Install dependencies
RUN apt-get update -qq && \
    apt-get -y install \
    nodejs \
    npm

RUN npm install -g yarn

EXPOSE 80

CMD ["nodejs", "/home/app/index.js"]

# Move files into place
COPY lib/ /home/app/
COPY index.js /home/app/

# COPY npm-shrinkwrap.json /home/app/
COPY package.json /home/app/
COPY yarn.lock /home/app/

# Install dependencies
WORKDIR /home/app

# deal with unbuntu's daft naming of node binary
RUN sudo ln -s "$(which nodejs)" /usr/bin/node

RUN yarn install
