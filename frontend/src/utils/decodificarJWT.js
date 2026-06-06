const decodificarJWT = (token) => {
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return null;

    // Base64URL -> Base64
    const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("[DECODE JWT ERROR]:", err);
    return null;
  }
};

export default decodificarJWT;
