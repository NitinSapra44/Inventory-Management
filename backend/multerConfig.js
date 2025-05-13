import multer from "multer";

//Multer Settings as this will be used as middleware in product api
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const newName = "photo" + Date.now() + ".jpg";
    cb(null, newName);
  },
});

const upload = multer({ storage: storage });

export default upload;
