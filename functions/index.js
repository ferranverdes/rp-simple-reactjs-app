const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getRandomNumber } = require('./utils');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const phrasesRef = db.collection('phrases');

const CRON_SECRET_KEY = functions.config().cron ? functions.config().cron.key : 'developKey';

exports.changeActivatedPhrase = functions.https.onRequest((req, res) => {
	const { key } = req.query;

	if (key !== CRON_SECRET_KEY) {
		res.status(403).send({
			error: {
				code: 403,
				message:
					'Security key does not match. Make sure your "key" URL query ' +
					'parameter matches the key environment variable.'
			}
		});

		return;
	}

	const activatedPhrasesRef = phrasesRef.where('active', '==', true);
	const deactivatedPhrasesRef = phrasesRef.where('active', '==', false).orderBy('text');

	db.runTransaction(t => {
		const phrasesToDeactivate = t
			.get(activatedPhrasesRef)
			.then(querySnapshot => querySnapshot.docs);

		const phraseToActivate = t
			.get(deactivatedPhrasesRef)
			.then(querySnapshot => querySnapshot.docs[getRandomNumber(querySnapshot.size)]);

		return Promise.all([phrasesToDeactivate, phraseToActivate])
			.then(result => {
				// result[0] is a queryDocumentSnapshot[]
				// result[1] is a queryDocumentSnapshot

				const tasks = result[0].map(phrase => t.update(phrase.ref, { active: false }));

				tasks.push(t.update(result[1].ref, { active: true }));

				return Promise.all(tasks);
			})
			.then(() => res.send('OK'))
			.catch(err => {
				res.status(500).send({
					error: {
						code: 500,
						type: 'INTERNAL',
						message: 'function crashed'
					}
				});
				throw err;
			});
	});
});
