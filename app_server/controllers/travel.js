/* GET travel view */
const travel = (req, res) => {
    pageTitle = process.env.npm_package_decsription + ' - Travel';
    res.render('travel', {title: 'pageTitle'});
};

module.exports = {
    travel
};