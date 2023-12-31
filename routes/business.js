const {
  newBusiness,
  getAllBusiness,
  updateBusiness,
  removeBusiness,
  getBusiness,
  categoryFreelancer,
  deductBalance,
  addToBalance,
} = require("../controller/businessController");
const multer = require("multer");
const router = require("express").Router();
const freelancerModel = require("../models/freelancerAuthModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const file_name = Date.now() + "_" + file.originalname;
    cb(null, file_name);
  },
});

const uploadFile = multer({
  storage: storage,
  fileFilter: async function (req, file, cb) {
    // Check if email already exists
    const emailExists = await freelancerModel.findOne({
      email: req.body.email,
    });
    if (emailExists) {
      return cb(new Error("Email already exists."));
    }
    cb(null, true);
  },
});

router.get("/", getAllBusiness);
router.get("/:id", getBusiness);

// GET BY CATEGORY
router.get("/getcatgory/:category",categoryFreelancer)

// ADD NEW BUSINESS
router.post("/", uploadFile.single("image"), newBusiness);

// UPDATE BUSINESS
router.patch("/updateBusiness/:businessId", updateBusiness);
router.patch("/addBalance/:businessId", addToBalance); // ADD MONEY TO BLANCE
router.patch("/deductBalance/:businessId", deductBalance); //DEDUCT FROM BALANCE

// delete business
router.delete("/deleteBusiness/:businessId", removeBusiness);

module.exports = router;
