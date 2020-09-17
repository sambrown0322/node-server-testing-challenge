const express = require('express')

const [HELPER]= require('./[HELPER.js]') //CHANGE321

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({msg: 'working'})
})

router.get('/:id', (req, res) => {
  res.status(200).json({msg: 'working'})
})

router.post('/', (req, res) => {
  res.status(200).json({msg: 'working'})
})

router.put('/:id', (req, res) => {
  res.status(200).json({msg: 'working'})
})

router.delete('/:id', (req, res) => {
  res.status(200).json({msg: 'working'})
})

module.exports = router;