export const convertCoordinates = (dd: number, isLng?: boolean) => {
  const dir = dd < 0
    ? isLng ? 'W' : 'S'
    : isLng ? 'E' : 'N';
  const absDd = Math.abs(dd);
  const deg = absDd | 0;
  const frac = absDd - deg;
  const min = (frac * 60) | 0;
  const sec = Math.round((frac * 3600 - min * 60) * 100) / 100;
  return `${deg}°${min}′${sec}″${dir}`;
}