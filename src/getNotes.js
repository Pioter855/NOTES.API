const Notes = require('./models/notes').Notes

exports.get =  async (_, res) => {
	try {
		const notes = await Notes.findAll();
		res.json({ success: true, data: notes });
		return;
	} catch (error) {
		res.status(500).send({ success: false, reason: "something went wrong" });
		return;
	}
}


