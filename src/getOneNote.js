const Notes = require('./models/notes').Notes

exports.get =  async ({ params: { id } }, res) => {
	const note = await Notes.findByPk(id);
	if (!note) {
		res.status(400).send({ success: false, reason: "note does not exist" });
		return;
	}
	res.status(200).send({ succes: true, data: note });
	return
}