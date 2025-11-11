import bcrypt from "bcryptjs";

const generarHash = async () => {
  const hash = await bcrypt.hash("Admin1234", 10);
  console.log("HASH GENERADO:\n", hash);
};

generarHash();
