import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message:{
        succes: false,
        msg: "Las peticiones de esta IP son demasiadas, intente luego"
    }
})

export default limiter;