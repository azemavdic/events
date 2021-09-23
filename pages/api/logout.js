import cookie from "cookie";
import { API_URL } from "config";

export default async (req, res) => {
  if (req.method === "POST") {
    //Uništi http cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ message: "Uspješna odjava" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Metoda ${req.method} nije dozvoljena` });
  }
};
