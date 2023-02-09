import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  res.status(200).json({ user: session.user });
};

export default handler;
