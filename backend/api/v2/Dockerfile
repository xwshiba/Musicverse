FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . ./

RUN go build -o /backend/api/v2

EXPOSE 8080

CMD [ "/musicverse-backend" ]
