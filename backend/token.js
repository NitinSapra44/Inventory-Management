const jwt = await import("jsonwebtoken");

function TokenMaker(a) {
  const Payload = {
    name: a.name,
    email: a.email,
    id: a._id,
  };
  const token = jwt.default.sign(Payload, process.env.jwtSecret);
  return token;
}

function TokenExtractInfo(a) {
  const user = jwt.default.verify(a, process.env.jwtSecret);
  return user;
}

export default TokenMaker;
export { TokenExtractInfo };
