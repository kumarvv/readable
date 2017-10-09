export function randomString(length, chars) {
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

export function toDateString(timestamp) {
  if (!timestamp) {
    return ''
  }

  let dt = new Date(timestamp);
  return dt.getMonth() + '/' + dt.getDate() + '/' + dt.getYear() +
    ' at ' + dt.getHours() + ':' + dt.getMinutes();
}
