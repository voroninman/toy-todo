var $ = require('jquery');

$(document).ajaxError(function(e, jqXHR) {
  switch (jqXHR.status) {
    case 500:
      throw new Error('The server went crazy.');
      break;
  }
});

var ajaxCall = function(method, path, data, cb) {
  cb = cb || function(res) {
    console.log('Ajax succeed:', method.toUpperCase(), path, data);
  };
  $.ajax({
    url: path,
    type: method,
    data: JSON.stringify(data),
    contentType: 'application/json',
    dataType: 'json'
  }).done(cb);
};

module.exports = {
  ajaxCall: ajaxCall
};
