const { Router } = require('express');
const router = Router();

// routes
router.get('/',(req,res)=>{
    const data = {
        "name": "Frank",
        "website": "ZayBit.com"
    }
    res.json(data);
})

module.exports = router;