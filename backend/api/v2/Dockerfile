# Use the official Golang image as a base
FROM golang:1.18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum to the working directory
COPY go.mod go.sum ./

# Download and cache Go modules
RUN go mod download

# Copy the entire codebase into the working directory
COPY . .

# Build the Go application
RUN go build -o /app/server ./cmd/server/main.go

# Expose the port the application runs on
EXPOSE 8080

# Command to run the executable
CMD ["/app/server"]
