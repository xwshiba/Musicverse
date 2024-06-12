#!/bin/bash

cd backend/api/v2
go mod download
go run cmd/server/main.go
