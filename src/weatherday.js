export const weatherday = ({ min, max, weatherType }) => {
  return (
    <div>
      <div>Type: {weatherType}</div>
      <div>
        Temp: {min} / {max}
      </div>
    </div>
  )
}
