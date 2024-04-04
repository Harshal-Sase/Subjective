package models

type Settings struct {
	NoOfWells       int      `json:"NoOfWells"`
	NoOfWavelengths int      `json:"NoOfWavelengths"`
	Lm              []string `json:"Lm"`
}

type Data struct {
	WellIndex        int       `json:"WellIndex"`
	WavelengthValues []float64 `json:"WavelengthValues"`
}
