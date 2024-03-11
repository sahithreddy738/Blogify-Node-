const json=require("jsonwebtoken");
const secret_key="Sahith123";

const generateToken=(user) => {
    const payload={
        id:user.id,
        fullName:user.fullName,
        email:user.email,
        role:user.role,
        profileImage:user.profileImage
    }
    const token=json.sign(payload,secret_key);
    return token;
}

function validateToken(token) {
    const payload = json.verify(token, secret_key);
    return payload;
  }

module.exports={generateToken,validateToken}