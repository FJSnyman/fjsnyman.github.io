@ECHO OFF
CALL ./build
docker run -p 80:8000 --name cv-site -d fjsnyman.co.za/cv-site:latest
