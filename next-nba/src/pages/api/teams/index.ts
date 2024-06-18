import { NextApiRequest, NextApiResponse } from "next";
import { teams } from "../../../data/teams";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if(method === "GET") {
    return res.status(200).json(teams)
  }
}

