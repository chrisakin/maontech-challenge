const Product = require('../models/allproductModel');
const Category = require('../models/categoryModel');

const getoneProduct = ((req, res, next) => {
    Product.findById({ _id: req.params.id })
      .populate('category')
      .populate('owner')
      .deepPopulate('reviews.owner')
      .exec((err, product) => {
        if (err) {
          res.json({
            success: false,
            message: 'Product is not found'
        });
        } else {
          if (product) {
            res.json({
              success: true,
              product: product
            });
          }
        }
      });
  });

  const getallProducts = ((req, res, next) => {
    const perPage = 1000;
    const page = req.query.page;
    async.parallel([
      function(callback) {
        Product.countDocuments({}, (err, count) => {
          var totalProducts = count;
          callback(err, totalProducts);
        });
      },
      function(callback) {
        Product.find({})
          .skip(perPage * page)
          .limit(perPage)
          .populate('category')
          .populate('owner')
          .exec((err, products) => {
            if(err) return next(err);
            callback(err, products);
          });
      }
    ], function(err, results) {
      var totalProducts = results[0];
      var products = results[1]; 
      res.json({
        success: true,
        message: 'category',
        products: products,
        totalProducts: totalProducts,
        pages: Math.ceil(totalProducts / perPage)
      });
    }); 
  });

//Function to facilitate categories GET and POST requests 
const getallCategories = ((req, res, next) => {
  Category.find({}, (err, categories) => {
    res.json({
      success: true,
      message: "Success",
      categories: categories
    })
  })
});

const addCategory = ((req, res, next) => {
  let category = new Category();
  category.name = req.body.category;
  category.save();
  res.json({
    success: true,
    message: "Successful"
  });
});

//Function to facilitate review functionality 
const postReview = (checkJWT, (req, res, next) => {
    async.waterfall([
      function(callback) {
        Product.findOne({ _id: req.body.productId}, (err, product) => {
          if (product) {
            callback(err, product);
          }
        });
      },
      function(product) {
        let review = new Review();
        review.owner = req.decoded.user._id;
        if (req.body.title) review.title = req.body.title;
        if (req.body.description) review.description = req.body.description
        review.rating = req.body.rating;
        product.reviews.push(review._id);
        product.save();
        review.save();
        res.json({
          success: true,
          message: "Successfully added the review"
        });
      }
    ]);
  });

//Function to facilitate get request of specific categories
const getsingleproductCategory = ((req, res, next) => {
    const perPage = 10;
    const page = req.query.page;
    async.parallel([
      function(callback) {
        Product.count({ category: req.params.id }, (err, count) => {
          var totalProducts = count;
          callback(err, totalProducts);
        });
      },
      function(callback) {
        Product.find({ category: req.params.id })
          .skip(perPage * page)
          .limit(perPage)
          .populate('category')
          .populate('owner')
          .populate('reviews')
          .exec((err, products) => {
            if(err) return next(err);
            callback(err, products);
          });
      },
      function(callback) {
        Category.findOne({ _id: req.params.id }, (err, category) => {
         callback(err, category)
        });
      }
    ], function(err, results) {
      var totalProducts = results[0];
      var products = results[1];
      var category = results[2];
      res.json({
        success: true,
        message: 'category',
        products: products,
        categoryName: category.name,
        totalProducts: totalProducts,
        pages: Math.ceil(totalProducts / perPage)
      });
    });
  });


module.exports = {
      getoneProduct,
      getallProducts,
      addCategory,
      getallCategories,
      getsingleproductCategory,
      postReview
  }