const router = require('express').Router();
const productController = require('../controller/products')

router.get('/allproducts', productController.getallProducts);
router.get('/oneproduct/:id', productController.getoneProduct);
router.post('/addcategory', productController.addCategory);
router.get('/getallcategories', productController.getallCategories);
router.get('/singleproductcategory/:id', productController.getsingleproductCategory);
router.post('/review', productController.postReview);