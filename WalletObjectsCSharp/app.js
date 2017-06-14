/**
 * Save to Wallet success handler
 */
var successHandler = function(params){
  console.log("Object added successfully", params);
}

/**
 * Save to Wallet failure handler
 */
var failureHandler = function(params){
  console.log("Object insertion failed", params);
  var errorLi = $('<li>').text('Error: ' + JSON.stringify(params));
  $('#errors').append(errorLi);
}

/**
 * Initialization function
 */
function init(){
  document.getElementById("loyalty").addEventListener("click", function(){
    $.get("insert?type=loyalty", function(data){
      console.log("Loyalty", data);
    })
  });
  document.getElementById("offer").addEventListener("click", function(){
    $.get("insert?type=offer", function(data){
      console.log("Offer", data);
    })
  });
  document.getElementById("giftcard").addEventListener("click", function(){
    $.get("insert?type=giftcard", function(data){
      console.log("Gift Card", data);
    })
  });
    /*
  saveToAndroidPay = document.createElement("g:savetoandroidpay");
  saveToAndroidPay.setAttribute("theme", "light");
  saveToAndroidPay.setAttribute("jwt", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhZG1pbi02NDNAdW5pdGVkLXBheS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imdvb2dsZSIsImlhdCI6MTQ5NzQ2MjkyOSwidHlwIjoic2F2ZXRvYW5kcm9pZHBheSIsInBheWxvYWQiOnsibG95YWx0eU9iamVjdHMiOlt7ImFjY291bnRJZCI6IjEyMzQ1Njc4OTEiLCJhY2NvdW50TmFtZSI6IkphbmUgRG9lIiwiYmFyY29kZSI6eyJhbHRlcm5hdGVUZXh0IjoiMTIzNDUiLCJ0eXBlIjoicXJDb2RlIiwidmFsdWUiOiIyODM0M0UzIn0sImNsYXNzSWQiOiIzMjE0MzIwMjQxMTgzNTA5Mjc3LlVuaXRlZF9Mb3lhbHR5IiwiaWQiOiIzMjE0MzIwMjQxMTgzNTA5Mjc3LjAyX0xveWFsdHlPYmplY3RJZCIsImluZm9Nb2R1bGVEYXRhIjp7ImxhYmVsVmFsdWVSb3dzIjpbeyJjb2x1bW5zIjpbeyJsYWJlbCI6Ik5leHQgUmV3YXJkIGluIiwidmFsdWUiOiIyIGNvZmZlZXMifSx7ImxhYmVsIjoiTWVtYmVyIFNpbmNlIiwidmFsdWUiOiIwMS8xNS8yMDEzIn1dfSx7ImNvbHVtbnMiOlt7ImxhYmVsIjoiTG9jYWwgU3RvcmUiLCJ2YWx1ZSI6Ik1vdW50YWluIFZpZXcifV19XSwic2hvd0xhc3RVcGRhdGVUaW1lIjp0cnVlfSwibGlua3NNb2R1bGVEYXRhIjp7InVyaXMiOlt7ImRlc2NyaXB0aW9uIjoiTXkgQmFjb25yaXN0YSBBY2NvdW50IiwidXJpIjoiaHR0cDovL3d3dy5iYWNvbnJpc3RhLmNvbS9teWFjY291bnQ_aWQ9MTIzNDU2Nzg5MCJ9XX0sImxveWFsdHlQb2ludHMiOnsiYmFsYW5jZSI6eyJzdHJpbmciOiI1MDAifSwibGFiZWwiOiJQb2ludHMiLCJwb2ludHNUeXBlIjoicG9pbnRzIn0sIm1lc3NhZ2VzIjpbeyJhY3Rpb25VcmkiOnsidXJpIjoiaHR0cDovL2JhY29ucmlzdGEuY29tIn0sImJvZHkiOiJUaGFua3MgZm9yIGpvaW5pbmcgb3VyIHByb2dyYW0uIFNob3cgdGhpcyBtZXNzYWdlIHRvIG91ciBiYXJpc3RhIGZvciB5b3VyIGZpcnN0IGZyZWUgY29mZmVlIG9uIHVzISIsImhlYWRlciI6IkhpIEphbmUhIn1dLCJzdGF0ZSI6ImFjdGl2ZSIsInRleHRNb2R1bGVzRGF0YSI6W3siYm9keSI6IlNhdmUgbW9yZSBhdCB5b3VyIGxvY2FsIE1vdW50YWluIFZpZXcgc3RvcmUgSmFuZS4gIFlvdSBnZXQgMSBiYWNvbiBmYXQgbGF0dGUgZm9yIGV2ZXJ5IDUgY29mZmVlcyBwdXJjaGFzZWQuICBBbHNvIGp1c3QgZm9yIHlvdSwgMTAlIG9mZiBhbGwgcGFzdHJpZXMgaW4gdGhlIE1vdW50YWluIFZpZXcgc3RvcmUuIiwiaGVhZGVyIjoiSmFuZSdzIEJhY29ucmlzdGEgUmV3YXJkcyJ9XSwidmVyc2lvbiI6MX1dLCJvZmZlck9iamVjdHMiOltdLCJnaWZ0Q2FyZE9iamVjdHMiOltdfSwib3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjU5MTEzIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgwIl19.P89OvID9ZNWoGX0jH80qzUdREz-phDOd9M3fSpRs5XHzcZvR9n9A0qKCtR6GycSc7MXDd3i5uO_2zZzRSd1khoIvQwBY4Dz8c0w5P9MyBlE0FnfXdBufSkPTDJbXzWl21zcRKehopaQVJVwYtZVh1rZy6Z5kvMKYvmbc71ip6KlaXh1lihbgN0O-8aDHqF8fCnfvmol5B_tP7nnLZbSk68n9lsuvK4_FY14sx1ySGpYyO1gc21Vxajg89wFa62yAJNaakoYnM8ztu4h8Qx5FmUWqf8FMyqA9PH4_zL530suY614BMf_wwxyL-Wgw3K22ie1CGcw7KYH4t3kAXQA9vw");
  saveToAndroidPay.setAttribute("onsuccess", "successHandler");
  saveToAndroidPay.setAttribute("onfailure", "failureHandler");
  document.querySelector("#loyaltysave").appendChild(saveToAndroidPay);
  script = document.createElement("script");
  script.src = "https://apis.google.com/js/plusone.js";
  document.head.appendChild(script);
  */

  $.when(
        $.get("restapi?type=loyalty", function (data) {
        })
        , $.get("jwt?type=loyalty", function (data) {
          saveToAndroidPay = document.createElement("g:savetoandroidpay");
          saveToAndroidPay.setAttribute("theme", "light");
          saveToAndroidPay.setAttribute("jwt", data);
          saveToAndroidPay.setAttribute("onsuccess","successHandler");
          saveToAndroidPay.setAttribute("onfailure","failureHandler");
          document.querySelector("#loyaltysave").appendChild(saveToAndroidPay);
        })
        ,
        $.get("jwt?type=offer", function(data) {
          saveToAndroidPay = document.createElement("g:savetoandroidpay");
          saveToAndroidPay.setAttribute("theme", "light");
          saveToAndroidPay.setAttribute("jwt", data);
          saveToAndroidPay.setAttribute("onsuccess","successHandler");
          saveToAndroidPay.setAttribute("onfailure","failureHandler");
          document.querySelector("#offersave").appendChild(saveToAndroidPay);
        }),
        $.get("jwt?type=giftcard", function(data) {
          saveToAndroidPay = document.createElement("g:savetoandroidpay");
          saveToAndroidPay.setAttribute("theme", "light");
          saveToAndroidPay.setAttribute("jwt", data);
          saveToAndroidPay.setAttribute("onsuccess","successHandler");
          saveToAndroidPay.setAttribute("onfailure","failureHandler");
          document.querySelector("#giftcardsave").appendChild(saveToAndroidPay);
      })
      ).done(function() {
        script = document.createElement("script");
        script.src = "https://apis.google.com/js/plusone.js";
        document.head.appendChild(script);
      });
    
}


$(window).ready(function(){
  init();
});
