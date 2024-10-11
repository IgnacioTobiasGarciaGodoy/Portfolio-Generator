import mongoose from "mongoose";

const AboutMeSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    mainText: {
      text: { type: String, default: "Main Text" },
      isBlack: { type: Boolean, default: true },
      size: { type: Number, default: 20 },
    },
    userImage: {
      image: { type: String, default: "Default Image" },
    },
    auxText: {
      text: { type: String, default: "Aux Text" },
      isBlack: { type: Boolean, default: true },
      size: { type: Number, default: 10 },
    }
  });

const AboutMe = mongoose.model("AboutMe", AboutMeSchema, 'portfolio_aboutMe');

export default AboutMe;