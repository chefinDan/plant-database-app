
/**
 * Given an object of query key and values, this builds a url string of the form k=v&k=v...
 * @param queryObject An object of query keys and values 
 */
const buildQueryString = (queryObject) => {
  return Object.keys(queryObject).map(k => (`${k}=${queryObject[k]}`)).join('&');
}
  
module.exports = {
  buildQueryString,
}