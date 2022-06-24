import React, { useState } from 'react'
import './index.css'

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}forecast?q=${query}&appid=${api.key}&units=imperial`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result)
          setQuery('')
          console.log(result)
        })
    }
  }
  const dateBuilder = (d) => {
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    let day = days[d.getDay()]

    return `${day}`
  }

  const elements = []
  const day1 = []
  const day2 = []
  const day3 = []
  const day4 = []
  const day5 = []

  const time = [
    '0:00',
    '3:00',
    '6:00',
    '9:00',
    '12:00',
    '15:00',
    '18:00',
    '21:00',
  ]
  function CreateColumn() {
    var seen = 0
    for (let i = 0; i < weather.list.length; i++) {
      elements.push(Math.round(weather.list[i].main.temp))
      if (weather.list[i].dt_txt.slice(11) === '12:00:00') {
        seen += 1
      }
      if (seen === 0) {
        day1.push(
          [
            weather.list[i].weather[0].description +
              ' ' +
              Math.round(weather.list[i].main.temp),
          ] + '°F'
        )
      }
      if (seen === 1) {
        day2.push(
          [
            weather.list[i].weather[0].description +
              ' ' +
              Math.round(weather.list[i].main.temp),
          ] + '°F'
        )
      }
      if (seen === 2) {
        day3.push(
          [
            weather.list[i].weather[0].description +
              ' ' +
              Math.round(weather.list[i].main.temp),
          ] + '°F'
        )
      }
      if (seen === 3) {
        day4.push(
          [
            weather.list[i].weather[0].description +
              ' ' +
              Math.round(weather.list[i].main.temp),
          ] + '°F'
        )
      }
      if (seen === 4) {
        day5.push(
          [
            weather.list[i].weather[0].description +
              ' ' +
              Math.round(weather.list[i].main.temp),
          ] + '°F'
        )
      }
    }
    while (day1.length < 8) {
      day1.unshift('')
    }
    return
  }

  return (
    <div
      className={
        typeof weather.city != 'undefined'
          ? weather.list[0].main.temp > 61
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.city != 'undefined' ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.city.name}, {weather.city.country}
              </div>
              {CreateColumn()}
            </div>
            <table className='weather-box'>
              <thead className='weather-heading'>
                <tr>
                  <th>Time</th>
                  <th>{dateBuilder(new Date())}</th>
                  <th>
                    {dateBuilder(new Date(Date.now() + 3600 * 1000 * 24))}
                  </th>
                  <th>
                    {dateBuilder(new Date(Date.now() + 7200 * 1000 * 24))}
                  </th>
                  <th>
                    {dateBuilder(new Date(Date.now() + 10800 * 1000 * 24))}
                  </th>
                  <th>
                    {dateBuilder(new Date(Date.now() + 14400 * 1000 * 24))}
                  </th>
                </tr>
              </thead>
              <tbody className='weather-data'>
                {day1.map((e, i) => (
                  <tr>
                    <td>{time[i]}</td>
                    <td>{day1[i]}</td>
                    <td>{day2[i]}</td>
                    <td>{day3[i]}</td>
                    <td>{day4[i]}</td>
                    <td>{day5[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  )
}

export default App
