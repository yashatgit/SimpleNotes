/**
 * Created by Yash on 03/02/16.
 */

Date.prototype.ddmm = function() {
  var yyyy = this.getFullYear().toString();
  var mm = this.getMonth(); // getMonth() is zero-based
  var dd  = this.getDate().toString(),
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return  dd + ' ' + months[mm] + ' ' + (this.getHours() + ':' + this.getMinutes());
  //return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};