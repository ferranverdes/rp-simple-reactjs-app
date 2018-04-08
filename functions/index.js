const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const { getRandomNumber } = require('./utils');

const db = admin.firestore();
const phrasesRef = db.collection('phrases');

// Si es vol pujar el codi al Github aquesta key ha de ser una variable de entorn
const CRON_SECRET_KEY =
	'mABtP9dR7Xg4QHWKyUL5ZEExf2jTDHgUbqfM3hFw3ew5QA4AwH' || functions.config().cron.key;

exports.updateCurrentPhrase = functions.https.onRequest((req, res) => {
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
