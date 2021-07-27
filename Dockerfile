FROM nginx:latest
LABEL maintainer="Gorkem Aktas" version="1.0.0" name="todo-list-app"
WORKDIR /usr/share/nginx/html
COPY . /usr/share/nginx/html
