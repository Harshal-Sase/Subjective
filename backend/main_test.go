package main

import (
	"context"
	"testing"
)

func TestConnect(t *testing.T) {
	client := Connect()
	defer client.Disconnect(context.Background())

	if client == nil {
		t.Errorf("connect() returned nil client")
		return
	}
}
