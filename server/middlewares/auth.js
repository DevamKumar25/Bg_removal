import jwt from "jsonwebtoken";

// Middelware function to decode jwt token to get clerkId

export const authUser = async (req, res, next) => {
  try {
    // const { token } = req.headers;
    // if (!token) {
    //   return res.json({
    //     success: false,
    //     message: "Not Authorized login again",
    //   });
    // }
    // const token_decode = jwt.decode(token);
    // req.clerkId = token_decode.clerkId;


       const { token } = req.headers; // header name matches front‑end
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized login again" });
    }
    const decoded = jwt.decode(token);
    const clerkId = decoded?.sub || decoded?.clerkId; // <-- Clerk user id

    if (!clerkId) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.clerkId = clerkId; // attach to request
    next();
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// export default authUser;
