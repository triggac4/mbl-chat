import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't include password in query results by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePic: {
      type: String,
      default: "", // Default profile picture URL could go here
    },
    lastMessagesView: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create admin user if none exists
userSchema.statics.createAdminUser = async function () {
  try {
    const adminCount = await this.countDocuments({ role: "admin" });

    if (adminCount === 0) {
      await this.create({
        username: "admin",
        email: "admin@example.com",
        password: "adminPassword123", // This will be hashed by the pre-save hook
        role: "admin",
      });
      console.log("Admin user created successfully");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
