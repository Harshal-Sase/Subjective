package tests

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Harshal-Sase/Subjective/middlewares"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestCORS(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.New()

	router.GET("/", middlewares.CORS(), func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})

	req, err := http.NewRequest("GET", "/", nil)
	assert.NoError(t, err)

	rr := httptest.NewRecorder()

	router.ServeHTTP(rr, req)

	assert.Equal(t, "http://localhost:3000", rr.Header().Get("Access-Control-Allow-Origin"))
	assert.Equal(t, "true", rr.Header().Get("Access-Control-Allow-Credentials"))
	assert.Equal(t, "GET, POST", rr.Header().Get("Access-Control-Allow-Methods"))
	assert.Equal(t, "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With", rr.Header().Get("Access-Control-Allow-Headers"))
}
