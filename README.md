README for Animatrix
====================

This README describe Animatrix.

Usage
-----

Start database

    docker run -p 27017:27017 mongo

Install dependencies

    yarn install

Start webserver

    DB_CONNECT='mongodb://localhost:27017/animatrix' yarn run start
