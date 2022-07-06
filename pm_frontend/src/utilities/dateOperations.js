export function getFormattedDate(date) {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  let hour = date.getHours().toString();
  hour = hour.length > 1 ? hour : '0' + hour;

  let minutes = date.getMinutes().toString();
  minutes = minutes.length > 1 ? minutes : '0' + minutes;
  
  return year + '-' + month + '-' + day + 'T' + hour + ':' + minutes + ':00.000Z';
}