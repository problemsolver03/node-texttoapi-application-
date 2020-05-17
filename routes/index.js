var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */

router.post('/fileprocessing', function (req, res, next) { 
 
  const uploadedFile = req.files.files;
 

  if (uploadedFile.mimetype !== 'text/plain') {
    res.send({ err: 'please upload a text file' })
  }
  else { 
    uploadedFile.mv(__dirname + uploadedFile.name, function (err) { 
      if (err) {
        res.send({ err: 'Sorry we could not process your request' })
      }
      else { 
        fs.readFile(__dirname + uploadedFile.name, function (err, data) { 
          if (err) {
            res.send({ err: 'Sorry we could not process your request' })
          }
          else { 
            try {
              let datas = data.toString();
              let datasArray = datas.split(/\r?\n/);
              res.send(datasArray)
            }
            catch{ 
              res.send({ err: 'Sorry we could not process your request' })
            }
          }
        })
      }
    })
  
  }
 

})

module.exports = router;
