const format = function (arr) {
	for (let i = 0; i < arr.length; i++){
		arr[i].published_at.date = arr[i].published_at.date.slice(0, 19);
	}
	return arr;
}

module.exports = {
  format: format,
}