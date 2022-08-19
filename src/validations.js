const Joi = require("joi");

exports.idVal = async ({ params: { id } }, res, next) => {
	const idSchema = Joi.object({
		id: Joi.number().min(1).required(),
	});
	const { error } = idSchema.validate({ id });
	if(error) {
		res.status(400).send({ success: false, reason: error });
		return; 
	}
    next()
}

exports.allVal = async ({ params: { id }, body: { title, note } }, res, next) => {
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
    next()
}

exports.partVal = async ({ body: { title, note } }, res, next) => {
	const noteSchema = Joi.object({
		title: Joi.string().min(1).max(100).required(),
		note: Joi.string().min(1).max(256).required(),
	});
	const { error } = noteSchema.validate({ title, note });
	if (error) {
		res.status(400).send({ success: false, reason: error });
		return;
	}
    next()
}