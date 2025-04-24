const express = require("express");
const router = express.Router();
const BookingComplexController = require("../controllers/BookingComplexController");

router.post("/", BookingComplexController.createBookingComplex);
router.get("/", BookingComplexController.getAllBookingComplexes);
router.get("/:id", BookingComplexController.getBookingComplexById);
router.put("/:id", BookingComplexController.updateBookingComplex);
router.delete("/:id", BookingComplexController.deleteBookingComplex);

module.exports = router;