import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let Hero = new Schema({
  created:{
    type: Date,
    default: Date.now
  },
  name:{
    type: String
  }
});
mongoose.model('Hero', Hero);
