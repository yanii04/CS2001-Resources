import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherForecast = () => {
    const [todayWeather, setTodayWeather] = useState(null);
    const [error, setError] = useState(null);

    const fetchTodayWeather = async () => {
        try {
            const response = await axios.get(
                'https://api.open-meteo.com/v1/forecast',
                {
                    params: {
                        latitude: 51.509865, // London latitude
                        longitude: -0.118092, // London longitude
                        daily: 'temperature_2m_min,temperature_2m_max',
                        timezone: 'Europe/London',
                    },
                }
            );
            
            // Get today's data from the API response
            const todayData = {
                date: response.data.daily.time[0],
                minTemp: response.data.daily.temperature_2m_min[0],
                maxTemp: response.data.daily.temperature_2m_max[0]
            };

            setTodayWeather(todayData);
            setError(null);
        } catch (err) {
            setError('Could not fetch weather data');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTodayWeather();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!todayWeather) {
        return <p>Loading today's weather...</p>;
    }

    return (
        <div>
            <h3>Today's Weather</h3>
            <p>Date: {todayWeather.date}</p>
            <p>Min Temperature: {todayWeather.minTemp}°C</p>
            <p>Max Temperature: {todayWeather.maxTemp}°C</p>
        </div>
    );
};

export default WeatherForecast;
