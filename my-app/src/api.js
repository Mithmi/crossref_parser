var api = {
	getData(){
		var url = "https://api.crossref.org/works?query.author=john&rows=1&mailto=workaintfun@yahoo.com";
		return fetch(url).then((response) => response.json());
	}
};

module.exports = api;