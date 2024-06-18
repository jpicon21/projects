import { NextApiRequest, NextApiResponse } from "next";
import { players } from "../../../data/players";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if(method === "GET") {
    return res.status(200).json(players)
  }
}

