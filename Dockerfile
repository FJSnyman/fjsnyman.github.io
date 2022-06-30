FROM halverneus/static-file-server:latest
COPY . /var/www
ENV FOLDER=/var/www PORT=8000
