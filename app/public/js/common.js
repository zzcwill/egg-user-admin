var random = function() {
	var max = 10;
	var min = 2;
	return parseInt(Math.random()*(max-min+1)+min)
}

var baseUrl = '/api/';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoienpjIiwibGV2ZWwiOm51bGwsImlzX29uX2R1dHkiOjEsInJlZ2lzdGVyX3RpbWUiOiIyMDIxLTA0LTI4VDAxOjI5OjQ3LjAwMFoiLCJpYXQiOjE2MTk2MDI3ODUsImV4cCI6MTYxOTY4OTE4NX0.K3_uBL-EZaW0aefdxbi9Af6yO7A78VQoyMKKgX81zYE';