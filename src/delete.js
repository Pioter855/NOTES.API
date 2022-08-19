const Notes = require('./models/notes').Notes

exports.delete = async ({ params: { id } }, res) => {
	const note = await Notes.findByPk(id);
	if(!note){
		res.status(400).send({success : false, reason : 'something went wrong'})
		return
	}
	try {
		 await note.destroy();
		res.status(200).send({ success: true, reason: "the note has been deleted" });
		return;
	} catch (error) {
		res.status(400).send({ success: false, reason: "note does not exist" });
		return;
	}
}