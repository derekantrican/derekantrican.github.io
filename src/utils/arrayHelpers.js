Array.prototype.intersection = function(otherArray) {
  return this.filter(x => otherArray.includes(x));
}

Array.prototype.distinct = function() {
  return this.filter((value, index, array) => array.indexOf(value) === index);
}

Array.prototype.selectAll = function(selector) {
  return this.map(selector).flat(1);
}