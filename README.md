# Weather App

## Overview

This is a simple Weather App that allows users to enter a city, country name and view current weather conditions, including temperature, wind speed, humidity, and more. The app leverages a combination of **React** for the front-end, **Node.js** and **Express** for the back-end, and utilizes **Redux** for state management. The app fetches data from two APIs:

- [Geocoding API by API Ninjas](https://api-ninjas.com/api/geocoding)): Used to get geographical coordinates (latitude and longitude) based on the entered city, country name.
- [Open Meteo API](https://open-meteo.com/): Used to fetch the weather forecast based on the latitude and longitude.

## Features

- Search for weather by city, country name.
- Displays current weather details like temperature, wind speed, humidity, and weather conditions.
- Fetches geographical coordinates of the city via the Geocoding API.
- Uses Open Meteo API to display the weather forecast based on the coordinates.
- State management handled by Redux for a smooth user experience.

## Technologies Used

- **Frontend:**
  - **React** for building the user interface.
  - **Redux** for managing application state.
  
- **Backend:**
  - **Node.js** and **Express** for server-side logic and routing.

- **APIs:**
  - **Geocoding API by API Ninjas** (to fetch latitude and longitude of cities).
  - **Open Meteo API** (to fetch weather data based on coordinates).

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/hotskoj/weather-app.git
cd weather-app
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Environment Variables

You need to set up environment variables to connect to the APIs. Create a `.env` file in main directory with the following content:

```env
API_KEY=your_api_ninjas_key_here
```

Make sure to replace `your_api_ninjas_key_here` with your actual API key from API Ninjas.

### 4. Run the App

To run the application locally:

1. Development:

   ```bash
   npm run dev
   ```

2. Production:

   ```bash
   npm run build
   npm run start
   ```

The app will now be running at `http://localhost:3000` in your browser.

## How It Works

1. **Frontend (React)**:
   - The user enters the name of a city, country, and optionally a state in the search box.
   - The app sends a request to the backend API to get the coordinates of the city (latitude and longitude).
   - The coordinates are then used to query the Open Meteo API for the current weather.
   - The weather data is displayed to the user, including current temperature, high, low, wind speed, humidity, and pressure.

2. **Backend (Node.js + Express)**:
   - The backend handles API calls to the Geocoding API to fetch latitude and longitude for the entered city.
   - The backend also fetches weather data from the Open Meteo API based on the coordinates and sends it to the frontend.
   
3. **State Management (Redux)**:
   - The app uses Redux to manage and share data such as the weather information and search query state between different components of the app.

## API Endpoints

### 1. `/search/:city/:country/:state` - Fetch weather for a city

**Method**: `GET`  

### Example Request:

```bash
GET http://localhost:3000/weather/baltimore/us/md
```

### 2. `/search/:city/:country/` - Fetch weather for a city

**Method**: `GET`  

### Example Request:

```bash
GET http://localhost:3000/weather/tokyo/japan
```

## Contributing

We welcome contributions to the project! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a Pull Request.

---

Thank you for checking out this Weather App! If you have any questions or suggestions, feel free to open an issue or submit a pull request.
