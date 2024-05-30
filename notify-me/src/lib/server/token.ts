import * as jose from "jose";

export async function SignAccessToken(userId: string) {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) return undefined;
  return await SignToken(userId, accessTokenSecret, "15s");
}

export async function SignRefreshToken(userId: string) {
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshTokenSecret) return undefined;
  return await SignToken(userId, refreshTokenSecret, "");
}

export async function VerifyAccessToken(token: string) {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) return undefined;
  return await VerifyToken(token, accessTokenSecret);
}

export async function VerifyRefreshToken(token: string) {
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshTokenSecret) return undefined;
  return await VerifyToken(token, refreshTokenSecret);
}

export async function SignToken(
  userId: string,
  secret: string,
  expiration: string
) {
  const jwt = new jose.SignJWT({
    userId: userId,
  });

  if (expiration !== "") {
    jwt.setExpirationTime(expiration);
  }

  const accessToken = await jwt
    .setIssuedAt()
    .setIssuer("notify-me")
    .setAudience("notify-me")
    .setSubject(userId)
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(secret));

  return accessToken;
}

export async function VerifyToken(token: string, secret: string) {
  try {
    const data = await jose.jwtVerify<{ userId: string }>(
      token,
      new TextEncoder().encode(secret)
    );

    return data.payload.userId;
  } catch (e) {
    return undefined;
  }
}
