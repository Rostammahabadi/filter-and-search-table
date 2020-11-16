function filterState(data, filterType) {
  return data.filter(row => row.state === filterType);
};
function filterGenres(data, genre) {
  return data.filter(row => row.genre.split(",").includes(genre));
};
function filter(response) {
  var mappedData = response.map(row => row.genre);
  return [...new Set(mappedData.join().split(","))];
}
function sort(response) {
  return response.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}
function capitalize(s){
  if (typeof(s) !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1)
};

  export { filterState, filterGenres, filter, sort, capitalize }