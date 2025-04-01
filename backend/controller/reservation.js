import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservationSchema.js";


const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  }
  catch (err) {
  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({
      success: false,
      message: validationErrors.join(", "),
    });
  }

  // Handle other errors
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
}


export default sendReservation;