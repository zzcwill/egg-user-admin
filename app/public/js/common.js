var random = function() {
	var max = 10;
	var min = 2;
	return parseInt(Math.random()*(max-min+1)+min)
}

var baseUrl = '/api/';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoienpjIiwibGV2ZWwiOm51bGwsImlhdCI6MTYxOTA5MDg1NCwiZXhwIjoxNjE5MTc3MjU0fQ.fv5b4LndQIun7D4Prz_KUpK7Ac0chLK39cud_iULhLQ';