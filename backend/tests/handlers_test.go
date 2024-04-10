package tests

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Harshal-Sase/Subjective/handlers"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MockCollection struct {
	mock.Mock
}

func (m *MockCollection) FindOne(ctx context.Context, filter interface{}, opts ...*options.FindOneOptions) *mongo.SingleResult {
	args := m.Called(ctx, filter, opts)
	return args.Get(0).(*mongo.SingleResult)
}

type MockSettings struct {
	NoOfWells       int      `json:"NoOfWells"`
	NoOfWavelengths int      `json:"NoOfWavelengths"`
	Lm              []string `json:"Lm"`
}

func TestRetrieveSettings(t *testing.T) {
	gin.SetMode(gin.TestMode)
	c, _ := gin.CreateTestContext(httptest.NewRecorder())

	mockCollection := new(MockCollection)
	mockSettings := &MockSettings{
		NoOfWells:       96,
		NoOfWavelengths: 1,
		Lm:              []string{"456"},
	}

	mockCollection.On("FindOne", mock.Anything, mock.Anything, mock.Anything).
		Return(&mongo.SingleResult{}, nil).Run(func(args mock.Arguments) {
		result := args.Get(0).(*mongo.SingleResult)
		bytes, _ := json.Marshal(mockSettings)
		result.Decode(bytes)
	})

	handlers.SetCollection(mockCollection)

	handlers.RetrieveSettings(c)

	assert.Equal(t, http.StatusOK, c.Writer.Status())

}
