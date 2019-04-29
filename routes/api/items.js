const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  public
router.get('/', (req, res) => {
    //console.log('got a requestfor all items');
    Item.find()
        .sort({date: -1})
        //.then( items => {console.log(items);return items;} )
        .then(items => res.json(items))
        .catch(err => console.log(err))
});

// @route   GET api/item/:id
// @desc    Get an item
// @access  public
router.get('/:id', (req, res) => {
    console.log('got a request for item ' + req.params.id);
    Item.findById(req.params.id)
        .then( item => {console.log(item);return item;} )
        .then(item => res.json(item))
        .catch(err => console.log(err))
});

// @route   POST api/items
// @desc    Create an item
// @access  public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
        .then(item => { res.json(item) })
        .catch(err => console.log(err))
});

// @route  DELETE /api/items/:id
// @desc   delete an item
// @access public
router.delete('/:id', (req, res) => {
    //console.log('got a delete request for ' + req.params.id);
    Item.findById(req.params.id)
        .then(item => item.remove().then( () =>  res.json({success: true})))
        .catch(err => { console.log(err); res.status(404).json({success:false})});
})

module.exports = router;

