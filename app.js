const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("joi");
const Sequelize = require("sequelize");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelize = new Sequelize("notatnik", "root", "Programowanie1!", {
	dialect: "mysql",
	host: "localhost",
	pool: {
		max: 5,
		min: 1,
		acquire: 30000,
		idle: 10000,
	},
});


    sequelize.authenticate();

const Notes = sequelize.define(
	"notes",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		title: {
			type: "VARCHAR(100)",
			allownull: false,
		},
		note: {
			type: Sequelize.STRING,
			allownull: true,
		},
	},
	{
		paranoid: true,
	}
);

app.get("/notes", async (_, res) => {
	try {
		const notes = await Notes.findAll();
		res.json({ success: true, data: notes });
		return;
	} catch (error) {
		res.status(500).send({ success: false, reason: "programist error" });
		return;
	}
});

app.get("/notes/:id", async ({ params: { id } }, res) => {
	const idSchema = Joi.object({
		id: Joi.number().min(1).required(),
	});
	const { error } = idSchema.validate({ id });
	if(error) {
		res.status(400).send({ success: false, reason: error });
		return; 
	}
	const note = await Notes.findByPk(id);
	if (!note) {
		res.status(400).send({ success: false, reason: "note does not exist" });
		return;
	}
	res.status(200).send({ succes: true, data: note });
	return
});

app.post("/notes", async ({ body: { title, note } }, res) => {
	const noteSchema = Joi.object({
		title: Joi.string().min(1).max(100).required(),
		note: Joi.string().min(1).max(256).required(),
	});
	const { error } = noteSchema.validate({ title, note });
	if (error) {
		res.status(400).send({ success: false, reason: error });
		return;
	}
	const noteWithTitle = await Notes.findOne({ where: { title } });
	if (!noteWithTitle) {
		try {
			const notes = await Notes.create({ title, note });
			res.status(200).send({ success: true, data : {title, note} });
			return;
		} catch (error) {
			res.status(500).send({ success: false, reason: "something went wrong" });
			return;
		}
	}
	res.status(400).send({ success: false, reason: "title already exist" });
	return;
});

app.delete("/notes/:id", async ({ params: { id } }, res) => {
	const idSchema = Joi.object({
		id: Joi.number().min(1).required(),
	});
	const { error } = idSchema.validate({ id });
	if (error) {
		res.status(400).send({ success: false, reason: error });
		return;
	}
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
});

app.patch("/notes/:id",async ({ params: { id }, body: { title, note } }, res) => {
		const changeSchema = Joi.object({
			id: Joi.number().required(),
			title: Joi.string().min(1).max(100).required(),
			note: Joi.string().min(1).max(255).required(),
		});

		const { error } = changeSchema.validate({ id, title, note });

		if (error) {
			res.status(400).send({ success: false, reason: error });
			return;
		}

		const noteWithTitle = await Notes.findOne({ where: { title } });

		if (!noteWithTitle) {
			try {
				const oneNote = await Notes.findByPk(id);
				await oneNote.update({ title, note });
				res.status(200).send({ success: true, reason: "the note has been updated" });
				return;
			} catch (error) {
				res.status(500).send({ success: false, reasons: "something went wrong" });
				return;
			}
		}
		res.status(400).send({ success: false, reason: "title already exist" });
		return;
	}
);

app.listen(3000, () => {
	console.log("serwer slucha");
});
