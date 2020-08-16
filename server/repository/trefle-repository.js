const axios = require('axios');

const trefle = axios.create({
	baseURL: process.env.TREFLE_BASE_URL
});

const search = async (query) => {
    try{
    const {data} = await trefle.request({
      url: `/plants/search?token=${process.env.TREFLE_TOKEN}&q=${query}`,
      method: 'get',
    });
    return data;
	}
	catch(error){
		if(error.response.status === 404)
		console.log('trefle ERROR:', error)
		throw(error);
	}
}

const get = async (id) => {
  try{
    const {data} = await trefle.request({
      url: `/plants/${id}?token=${process.env.TREFLE_TOKEN}`,
      method: 'get',
    });
  console.log(data);
  return data;
}
catch(error){
  if(error.response.status === 404)
  console.log('trefle ERROR:', error)
  throw(error);
}
}

module.exports = {
  search,
  get
};