const router = require('express').Router();
const tutorial = require('../controller/controller.js');

// Create tutorial
router.post('/api/tutorial', tutorial.create);

// Retrieve all tutorials :검색, 찾다 모든 tutorials(테이블명)
router.get('/api/tutorial', tutorial.findAll);

// Retrieve  tutorial by id
router.get('/api/tutorial:id', tutorial.findOne);

// Update tutorial by id
router.put('/api/tutorial:id', tutorial.update);

// Delete tutorial by id
router.delete('/api/tutorial:id', tutorial.delete);

module.exports = router;