const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));

app.post('/api/upload', upload.single('profilePic'), (req, res) => {
    const profilePicPath = req.file.path;

    res.json({ filePath: profilePicPath });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
