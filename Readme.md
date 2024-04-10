## GoLang React Subjective Assignment

### Created By

- Hitesh Wagh - 46992
- Harshal Sase - 46863
- Sourav Bhadra - 48933

## How to Execute the Program?

> NOTE: Remember to create a database named `waves` and a collection called `settings` in MongoDB

### For the Backend

Open a terminal inside backend folder and type `go run .` to start the server.

### For the Frontend

Open a separate terminal inside frontend folder and type `npm start` to start the frontend.

---

A web browser should automatically take you to the web applicaiton. If not, then you can access it by typing `localhost:3000` in a web browser.

---

## Application Functionality

### Settings Dialog

- The ‘Number of wells’ combo box contains multiple entries: 24, 48, 96, 384. It will default to 96.
- The ‘Number of wavelengths’ drop box contains multiple entries: 1, 2, 3, 4, 5, 6. It will default to 1.
- Every time the ‘Number of wavelengths’ drop box is changed, the same number of “Lm” fields will be present on the UI. (Ex. If “2” is selected, Lm1 and Lm2 will appear)
- The text in each LmX text box is limited to integer values within the range 200-1000.
- When ‘OK’ is clicked, the dialog will close and the information on the dialog will be saved.
- If ‘Cancel’ is clicked, the dialog will close and all changes will be lost.
- After clicking ‘OK’, the user will be able view the settings they last configured by clicking the ‘Settings…’ button on the startup dialog again.

### Startup Dialogue

- When ‘Acquire Data’ is clicked, the list view will be populated once per second with the following information:

1. Well Index – an integer. The first row will contain 1, and every subsequent row will be incremented by 1 till it reaches the saved 'No of Wells'.
2. Wavelength values – a comma-delimited list of values, which will be determined by the formula: `(well index + (LmX * 0.1))`

- While data is ‘acquiring’, the ‘Settings’ button will become disabled.
- While data is ‘acquiring’, the ‘Acquire Data!’ button will change to ‘Stop Acquiring.’
- If the ‘Stop Acquiring’ button is clicked, the data that has been acquired will remain in the list view and no new data will appear.
- Once data for the number of wells specified in the Settings Dialog is acquired, acquisition will stop and all dialog controls will have the same enable/disable state as before acquisition started.
- If ‘Acquire Data’ is clicked while data is in the list view, the user will need to choose if they would like to overwrite their data. If they select ‘Yes’, the list view will be cleared and start acquiring data. If they select ‘No’, it will not start data acquisition.
