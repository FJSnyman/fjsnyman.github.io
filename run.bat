@ECHO OFF
CALL ./build
docker run -p 80:8000 --name cv-site -d ghcr.io/fjsnyman/cv-site:latest
