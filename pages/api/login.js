import cookie from "cookie";
import { API_URL } from "config";

export default async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const strapiData = await strapiRes.json();

    if (strapiRes.ok) {
      //Postavi http cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", strapiData.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 sedmica
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: strapiData.user });
    } else {
      res.status(strapiData.statusCode).json({
        message:
          strapiData.message[0].messages[0].message ===
          "Identifier or password invalid."
            ? "Pogrešan email ili šifra"
            : strapiData.message[0].messages[0].message ===
              "Please provide your username or your e-mail."
            ? "Molimo upišite email"
            : strapiData.message[0].messages[0].message ===
              "Please provide your password."
            ? "Molimo upišite šifru"
            : strapiData.message[0].messages[0].message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Metoda ${req.method} nije dozvoljena` });
  }
};
