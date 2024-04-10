package tests

import (
	"testing"

	"github.com/Harshal-Sase/Subjective/routes"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestRoutes(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := routes.SetupRouter()

	routes := router.Routes()
	var registeredRoutes []string
	for _, route := range routes {
		registeredRoutes = append(registeredRoutes, route.Method+" "+route.Path)
	}
	expectedRoutes := []string{"GET /settings", "POST /settings"}
	assert.ElementsMatch(t, registeredRoutes, expectedRoutes, "Route(s) unregistered")
}
