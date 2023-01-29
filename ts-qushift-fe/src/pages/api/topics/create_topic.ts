import * as process from "process";
import { withoutRole } from "../../../lib/auth";

const handler = withoutRole("banned", async (req, res) => {
	const { topicName, topicMembers } = req.body;

	const members = [];
	topicMembers.map((user) => {
		members.push({
			"user": user
		})
	})

	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	const requestOptions = {
		method: "POST",
		headers: headers,
		body: JSON.stringify({
			name: topicName,
			members: members,
		}),
	}
	const response = await fetch(`${process.env.API_BASE_URL}/topics`, requestOptions);

	res.status(200).json({});
});

export default handler;