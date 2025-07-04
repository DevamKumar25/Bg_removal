import pkg from "svix";
const { Webhook } = pkg; 

import userModels from "../models/userModels.js";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModels.create(userData);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModels.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        await userModels.findOneAndDelete({ clerkId: data.id }); // ✅ Corrected: use delete, not update
        res.json({});
        break;
      }

      default:
        res.status(400).json({ message: "Unhandled event type" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { clerkWebhooks };
