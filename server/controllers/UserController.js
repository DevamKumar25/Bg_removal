import pkg from "svix";
const { Webhook } = pkg;
import userModels from "../models/userModels.js";
import razorpay from 'razorpay';
import transcationModel from "../models/transactionModel.js";


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
        await userModels.findOneAndDelete({ clerkId: data.id });
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

// API controller function to get user available credits data

const userCredit = async (req, res) => {
  try {
    const  clerkId  = req.clerkId
    if (!clerkId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const userData = await userModels.findOne({ clerkId });
   
       // Auto‑create user with 5 credits if this is first login
       if (!userData) {
         user = await userModels.create({ clerkId, creditBalance: 5 });
       }
   
       res.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// gateway intitliaze
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


console.log(
  "RZP keys:",
  process.env.RAZORPAY_KEY_ID?.slice(0, 10),
  process.env.RAZORPAY_KEY_SECRET ? "present" : "missing"
);


// API to make payment for credits
const paymentRazorpay = async(req,res) => {
  try {
    const clerkId = req.clerkId;
    const { planId } = req.body || {};
    const userData = await userModels.findOne({clerkId})

    if(!userData || !planId){
      return res.json({success:false, message:'Invalid Credentials'})
    }

    let plan = planId; // copy once so switch works
    let credits = 0;
    let amount = 0; 
    let date

    switch (planId) {
      case 'Basic':
        plan = 'Basic'
        credits = 100
        amount = 10
        break;

      case 'Advance':
        plan = "Advance";
        credits = 500
        amount = 50
        break;

      case 'Business':
        plan = "Business";
        credits = 500
        amount = 250
        break;
    
      default:
        break;
    }

    

    // Creating transction 
    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date : Date.now()
    }

    const newtransaction = await transcationModel.create(transactionData);

    const options = {
      amount : amount * 100,
      currency: process.env.CURRENCY,
      receipt: newtransaction._id
    }

    await razorpayInstance.orders.create(options,(error,order) =>{
      if(error){
        return res.json({success:false,message:error})
      }

      res.json({success:true,order})
    })


  } catch (error) {
    console.log(error.message)
    res.json({success:false, message: error.message});
  }
}

// API COntoller function to verify razorpay payment

const verifyRazorpay = async(req,res) => {
  try {
    const {razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

    if(orderInfo.status === 'paid'){
      const transactionData = await transcationModel.findById(orderInfo.receipt)

      if(transactionData.payment){
        return res.json({success:false,message:"Payment Failed"})
      }

      // Adding Credits in user Data
       const userData = await userModels.findOne({clerkId : transactionData.clerkId})

       const creditBalance = userData.creditBalance + transactionData.credits
       await userModels.findByIdAndUpdate(userData._id,{creditBalance})

       // making the payment true
       await transcationModel.findByIdAndUpdate(transactionData._id,{payment:true})

       res.json({success:true, message :"Credits Added"})



    }
  } catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message})
  }
}


export { clerkWebhooks, userCredit,paymentRazorpay,verifyRazorpay };
