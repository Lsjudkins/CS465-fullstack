/* GET Homepage */
const index = function(req, res) {
  res.render('index', { title: 'Travlr Getaways' });
};

const dives = function(req, res) {
  res.render('dives', { title: 'Dive Sites' });
};

module.exports = {
    index,
    dives
};