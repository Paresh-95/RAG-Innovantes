import rateLimit from "express-rate-limit";

export const askLimiter = rateLimit({
    windowMs:1*60*1000, // 1 minute 
    max:5,  // 5 request per minute for testing
    message:{
        error: "To many request. Please try again later.",
    }
})