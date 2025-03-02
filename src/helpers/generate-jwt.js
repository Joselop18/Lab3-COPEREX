import jwt from 'jsonwebtoken';

export const generarJWT = (uid = '') => {
       return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '2h'
            },
            (err, token)=>{
                err ? (console.log(err), reject("No se generó Token")) : resolve(token);
            }
        );
    });
}