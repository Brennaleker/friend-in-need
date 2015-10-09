var sequence = require('when/sequence');

// requires you to save your model in a seperate file
var UserModel = require('./models/post');

var posts = [
  {title: 'Title 1', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>'},
  {title: 'Title 2', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>'},
  {title: 'Title 3', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>'},
  {title: 'Title 4', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>'}
];


var operations = posts.map(function (post) {
  return function () {
  	return PostModel.forge(post).save();
  }
});


sequence(operations).then(function (createdModels) {
  console.log(createdModels);
})
.otherwise(function (error) {
  console.error(error.stack);
});
