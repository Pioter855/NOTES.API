const Notes = require("./models/notes").Notes;

exports.patch = async ({ params: { id }, body: { title, note } }, res) => {
	const noteWithTitle = await Notes.findOne({ where: { title } });

	if (!noteWithTitle) {
		try {
			const oneNote = await Notes.findByPk(id);
			await oneNote.update({ title, note });
			res
				.status(200)
				.send({ success: true, reason: "the note has been updated" });
			return;
		} catch (error) {
			res.status(500).send({ success: false, reasons: "something went wrong" });
			return;
		}
	}
	res.status(400).send({ success: false, reason: "title already exist" });
	return;
};
