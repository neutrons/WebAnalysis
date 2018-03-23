export default (to, from, next) => {
  // if query editData is non-existent or empty navigate back
  // this prevents users from going to edit chart component without data
  if (typeof to.query.editChartData === 'undefined' || to.query.editChartData.length === 0) {
    next('/');
  } else {
    next();
  }
};
