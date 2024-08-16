import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("Request method:", req.method);
    console.log("Request headers:", req.headers);

    const response = await fetch("https://api.calendly.com/scheduled_events", {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_API_TOKEN}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return res
            .status(response.status)
            .json({ error: "Failed to fetch data from Calendly" });
    }

    const data = await response.json();
    res.status(200).json(data);
}
