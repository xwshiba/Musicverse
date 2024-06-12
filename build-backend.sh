#!/bin/bash

cd backend/api/v2
go mod download
go build -o server cmd/server/main.go
