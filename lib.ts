import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function login(formData: FormData) {
  // where call to DB will go
  const user = { email: formData.get("email"), name: "Evan" };

  const expires = new Date(Date.now() + 10 + 1000);
  const session = await encrypt({ user, expires });

  (await cookies()).set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get();
}
