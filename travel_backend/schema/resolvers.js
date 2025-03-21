const Booking = require("../models/Booking");

const resolvers = {
  Query: {
    getBookings: async () => {
      try {
        return await Booking.find(); // Fetch all bookings
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    },
  },
  Mutation: {
    addBooking: async (_, { name, destination, date, price }) => {
      try {
        const newBooking = new Booking({ name, destination, date, price });
        const savedBooking = await newBooking.save(); // Save to MongoDB
        console.log("🆕 New booking added:", savedBooking);
        return savedBooking;
      } catch (error) {
        console.error(" Error adding booking:", error);
      }
    },
    deleteBooking: async (_, { id }) => {
      await Booking.findByIdAndDelete(id);
      return "Booking deleted successfully";
    },
    updateBooking: async (_, { id, name, destination, date, price, aadhar_card }) => {
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { name, destination, date, price, aadhar_card },
            { new: true }  // Return updated booking
        );
      return updatedBooking;
    }
  },
};

module.exports = resolvers;
