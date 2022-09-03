const Notes = require("./models/notes").Notes;

exports.post = async ({ body: { title, note } }, res) => {
	const noteWithTitle = await Notes.findOne({ where: { title } });
	if (!noteWithTitle) {
		try {
			const notes = await Notes.create({ title, note });
			res.status(200).send({ success: true, data: { title, note } });
			return;
		} catch (error) {
			res.status(500).send({ success: false, reason: "something went wrong" });
			return;
		}
	}
	res.status(400).send({ success: false, reason: "title already exist" });
	return;
};
