module.exports = function(connection, upload) {
	var express = require('express');
    var router = express.Router();
	var sql_queries = require('../queries.js')
	const config = require('../config/config.js');
	var expJwt = require('express-jwt');

    router.post('/upload', upload.fields([{name: 'media', maxCount: 1}, {name: 'media_image', maxCount: 5}]), async (req, res)=>{
		if(req.files){
			console.log(req.files);


			for(const image of req.files['media_image']){
				await sql_queries.set_images(connection, parseInt(req.body.media), image.filename);
			}
			res.send(req.files['media_image']);
		}else{
			res.sendStatus(400);
		}
    })

	router.get('/games', async (req, res) => {
		const games = await sql_queries.get_all_games(connection);
		res.send(games);
	});


	router.get('/software', async (req, res) => {
		const software = await sql_queries.get_all_software(connection);
		res.send(software);
	});


	router.get('/hardware', async (req, res) => {
		const hardware = await sql_queries.get_all_hardware(connection);
		res.send(hardware);
	});


	router.get('/video', async (req, res) => {
		const video = await sql_queries.get_all_videos(connection);
		res.send(video);
	});


	router.get('/specials', async (req, res) => {
		const results = await sql_queries.get_all_specials(connection);
		res.send(results);
	});


	router.get('/specials/:id', async (req, res) => {
		const special = await sql_queries.get_specials_by_id(connection);
		res.send(special);
	});

	router.get('/total', async (req, res) =>{
		const query = req.query.query;
		res.send(query ? await sql_queries.get_page_count(connection, connection.escape(`%${query}%`)) : await sql_queries.get_page_count(connection));
	});

	router.get('/search', async (req, res) => {
		try {
			const search_query = req.query['query'] || '';
			const page = parseInt(req.query['page']) || 1;
			const sort = req.query['sortBy'] || 'DESC';

			res.send(await sql_queries.search(connection, page, connection.escape(`%${search_query}%`), connection.escape(sort)));

		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
    });
    

	router.get('/', async (req, res) => {
		const page = parseInt(req.query['page']);
		if (page) {
			res.send(await sql_queries.get_all_media(connection, page));
		} else {
			res.send(await sql_queries.get_all_media(connection));
		}
    });
    

	router.get('/:id', async (req, res) => {
		const id = req.params['id'];
		res.send(await sql_queries.get_media_by_id(connection, id));
	});

	// POST ENDPOINTS

    router.post('/specials', expJwt({ secret: config.JWT.Secret}), async (req, res) => {
        const body = req.body;
        await sql_queries.create_new_special(connection, body['percentage_off'], body['start_date'], body['end_date']);
        res.sendStatus(200);
    });



	router.post('/', expJwt({ secret: config.JWT.Secret}), async (req, res) => {
		if (!req.user || req.user.Account_Level !== 'Employee') {
			res.sendStatus(401);
			return;
		}

		const body = req.body;

		try {

			connection.beginTransaction();

			await sql_queries.add_new_media(
				connection,
				body
			);

			var id = await sql_queries.get_last_id(connection);

			connection.commit();
			res.redirect(`./${id}`);
		} catch (err) {
			console.log(err)
			connection.rollback();
			res.send(err, 500);
		}
	});


	router.delete('/:id', expJwt({ secret: config.JWT.Secret}), (req, res) =>{
		if (!req.user || req.user.Account_Level !== 'Employee') {
			res.sendStatus(401);
			return;
		}
		


	})


	router.put('/', expJwt({ secret: config.JWT.Secret}), async (req, res)=>{
		if (!req.user || req.user.Account_Level !== 'Employee') {
			res.sendStatus(401);
			return;
		}

		try{
			for (media of req.body){

				await sql_queries.update_media(connection, media);
	
			}
			res.sendStatus(200);
		}catch(err){
			res.sendStatus(500);
		}


	})

	router.put('/:id', expJwt({ secret: config.JWT.Secret}), (req, res)=>{
		if (!req.user || req.user.Account_Level !== 'Employee') {
			res.sendStatus(401);
			return;
		}

	})

	return router;
};
