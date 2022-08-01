const express=require('express');
const router=express.Router();
const playlist=require('../model/model');

//Post Method
router.post('/post', async (req, res) => {
  const data = new playlist({
      artwork: req.body.artwork,
      songname: req.body.songname,
        date: req.body.date,
        artist: req.body.artist,
        artistdate: req.body.artistdate,
        artistbio: req.body.artistbio,
        rating: req.body.rating
    });
    await data.save();
    res.send(data);
}
);
//edit by song name
router.put('/top10/:songname', async (req, res) => {
    const data = await playlist.findOneAndUpdate({songname: req.params.songname}, req.body);
    res.send(data);
}
);
//top 10 songs based on rating
router.get('/top10', async (req, res) => {
    const data = await playlist.find().sort({rating: -1}).limit(10);
    res.send(data);
}
);
//delete top 10 songs based on songname
router.delete('/top10/:songname', async (req, res) => {
    const data = await playlist.findOneAndDelete({songname: req.params.songname});
    res.send(data);
}
);



//Get all Method
router.get('/getall', async (req, res) => {
  try {
      const data = await playlist.find();

        res.status(200).json(data)
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
})

//Get by song name
router.get('/getsong/:songname', async (req, res) => {
    try {
        const data = await playlist.find({ songname: req.params.songname });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
)
//sort by rating and get by id
router.get('/sortbyrating/:id', async (req, res) => {
    try {
        const data = await playlist.find({ _id: req.params.id }).sort({ rating: -1 });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
)

//delete by song name
router.delete('/deletesong/:songname', async (req, res) => {
    try {
        const songname = req.params.songname;
        const data = await playlist.findOneAndDelete({ songname: songname })
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}   
)
//insert many
router.post('/insertmany', async (req, res) => {
    try {
        const data = await playlist.insertMany(req.body)
        res.send(`${data.length} documents inserted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
} 
)

//delete all
router.delete('/deleteall', async (req, res) => {
    try {
        const data = await playlist.deleteMany({})
        res.send(`${data.deletedCount} documents have been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
)

module.exports = router;