
FROM node

WORKDIR /home/app

COPY index.js index.js
COPY package*.json .

RUN npm install

RUN chmod +x index.js
# RUN chmod +x code.js

ENTRYPOINT [ "/home/app/index.js" ]