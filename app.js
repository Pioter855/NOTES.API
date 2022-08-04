const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Programowanie1!",
	database: "notatnik",
});

connection.connect();

app.get("/", (req, res, next) => {
	connection.query("SELECT * FROM notes", (err, rows, fields) => {
		if (err) {
			res.status(500);
			res.send({ succes: "false" });
			console.log("blad przy wyswietlaniu notatnik");
			return;
		}
		console.log(rows);
		res.send(rows);
	});
});

app.post("/note", ({ body: { title, note } }, res) => {
	console.log(title);
	console.log(note);
	if (!title && !note) {
		res.send({ succes: "false", reason: "no data" });
		console.log("nie pyklo");
		return;
	}
	connection.query(
		`INSERT INTO notes(title,note) VALUES ('${title}', '${note}')`,
		(err) => {
			if (err) {
				res.status(500);
				res.send({ succes: "false" });
				console.log(err, "cos poszlo nie tak");
				return;
			}
			res.send({ succes: "true", title, note });
			console.log("udalo sie");
			return;
		}
	);
});

app.delete("/note/:id", ({ params: { id } }, res) => {
	connection.query(`SELECT id FROM notes where id=${id}`, (err, rows) => {
		console.log(id);
		if (rows.length === 0) {
			res.status(400);
			res.send({ succes: false, reason: "note not found" });
			console.log("zle podana prosba o usuniecie");
			return;
		}

		if (err) {
			res.status(500);
			res.send({ succes: "false", reason: "error in display" });
			console.log("blad przy wyswietlaniu usuwania");
			return;
		}
		console.log("usunieto");
		connection.query(`DELETE FROM notes WHERE id=${id}`, (err) => {
			if (err) throw err;
			return;
		});
		res.send({ succes: true });
		return;
	});
});

app.patch(
	"/note/:id",
	({ params: { id }, body: { changeTitle, changeNote } }, res) => {
		console.log(id);
		console.log(changeNote);
		console.log(changeTitle);
		if (!changeNote || !changeTitle) {
			res.status(400);
			res.send({ succes: "fatal", reason: "wrong data" });
			console.log("zle podana notatnka lub brak zmiany w jednej z kolumn");
			return;
		}
		connection.query(
			`SELECT id FROM notes where id='${id}'`,
			(err, rows, fields) => {
				console.log(rows);
				if (rows.length === 0) {
					res.status(400);
					res.send({ succes: false, reason: "note does not exist" });
					console.log("notatka nie isnieje");
					return;
				}
				if (err) {
					res.status(500);
					res.send({ succes: "false" });
					console.log("blad przy wyswietlaniu edytowania");
					return;
				}

				connection.query(
					`UPDATE notes SET title='${changeTitle}', note='${changeNote}' WHERE id='${id}'`,
					(err) => {
						if (err) throw err;
						return;
					}
				);
				res.send({ succes: true, reason: "note updated" });
				console.log("notatka zostala zaktualizowana");
				return;
			}
		);
	}
);

app.listen(3000, () => {
	console.log("server slucha");
});
