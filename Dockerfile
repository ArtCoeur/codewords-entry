FROM ubuntu:latest
MAINTAINER Tim Rodger

# Install dependencies
RUN apt-get update -qq && \
    apt-get -y install \
    nodejs \
    yarn

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

RUN yarn install
