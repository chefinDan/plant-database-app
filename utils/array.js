/**
 * Given an array of objects and an array of keys, filters the objects and returns an array of objects containing only the values specified by keys.
 * @param bulk The array of objects to filter, may also be a single object if {strict: false} is specified in options. If bulk is omitted, an empty array is used. 
 * @param keep The array of keys to pluck from the objects in bulk. If keep is omitted, an empty array is used.
 * @param options An object for specifying functional options. Currently only supports strict. If omitted strict defaults to true.  
 */
const pluck = (bulk=[], keep=[''], options={strict: true}) => {
    if(keep.length === 0) return keep;
    if(typeof options !== 'object' && options !== null) throw new Error('if provided, options must be an object');
    if(options.strict === undefined) throw new Error('Must specify strict: true/false in options');
    if(options.strict !== true && Array.isArray(bulk) === false) {
      return pluck([bulk], keep);
    } 
    return( 
      bulk.map(obj => Object.keys(obj)
        .filter(k => keep.indexOf(k) !== -1)
        .map(key => ([key, obj[key]]))
      )
      .map(obj => obj.length > 0 ? Object.fromEntries(obj) : [])
      .flat()
    );
  }
  
  module.exports = {
    pluck,
  }