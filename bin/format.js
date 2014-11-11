
var formatters =
{ HOURNUM: function(h){var d = new Date(h*3600000); return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getUTCDay()]+' '+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours();}

, default: String
};

module.exports = function (key, val){
	var formatter = formatters[key] || formatters.default;
	return formatter(val);
};
