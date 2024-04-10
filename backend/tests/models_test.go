package tests

import (
	"testing"

	"github.com/Harshal-Sase/Subjective/models"
)

func TestSetting(t *testing.T) {
	testData := models.Settings{
		NoOfWells:       96,
		NoOfWavelengths: 4,
		Lm:              []string{"456", "654", "765", "485"},
	}

	if testData.NoOfWells != 96 {
		t.Errorf("Expected No of wells to be 10, got %d", testData.NoOfWells)
	}

	if testData.NoOfWavelengths != 4 {
		t.Errorf("Expected No of wavelengths to be 4, got %d", testData.NoOfWavelengths)
	}

	expectedLm := []string{"456", "654", "765", "485"}
	for i, v := range testData.Lm {
		if v != expectedLm[i] {
			t.Errorf("Expected Lm[%d] to be %s, got %s", i, expectedLm[i], v)
		}
	}
}
