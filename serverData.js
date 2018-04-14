function makeRequest(method, url){
  return new Promise(function(resolve, reject){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, url);
    xmlhttp.onload = function(){
      if (this.status >= 200 && this.status < 300) {
        resolve(xmlhttp.response);
      } else {
        reject({
          status: this.status,
          statusText: this.statusText
        });
      }
    };
    xmlhttp.onerror = function() {
      reject({
          status: this.status,
          statusText: this.statusText
      });
    };
    xmlhttp.send();
  });
}

// function getServerDataMockup() {
//   var pupils = [];
//   makerequest("GET", "pupils.json")
//   .then(function (data){
    
//   })

//   xmlhttp.onreadystatechange = function(){
//     if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
//       pupils = JSON.parse(xmlhttp.responseText);
//       return pupils;
//     }
//   };

//   xmlhttp.open("GET", "pupils.json");
//   xmlhttp.send();

  
// }