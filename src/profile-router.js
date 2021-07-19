const express = require("express");
const ProfilesService = require("./profiles-service");
const profileRouter = express.Router();

const bodyParser = express.json();

const serializeProfile = (profile) => ({
  id: profile.id,
  firstName: profile.first_name,
  lastName: profile.last_name,
  userName: profile.username,
  password: profile.password,
  bandname: profile.bandname,
  profilePicture: profile.pic_url,
  bio: profile.bio,
  bucketList: profile.bucketList,
  recommendations: profile.recommendations
});

profileRouter
  .route("/profiles")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    ProfilesService.getAllProfiles(knexInstance)
      .then((profiles) => {
        res.json(profiles.map(serializeProfile));
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    console.log("In the program");
    for (const field of ["firstName", "lastName", "userName"]) {
      console.log("In the for loop");
      if (!req.body[field]) {
        return res.status(400).send({
          error: { message: `'${field}' is required` },
        });
      }
    }
    console.log("Line 67 test");


    const { firstName, lastName, userName, password, bandname, bio, profilePicture } = req.body;

    const newProfile = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.userName,
      password: req.body.password,
      bandname: req.body.bandname,
      bio: req.body.bio,
      pic_url: req.body.profilePicture
    };

console.log("Line 80 test");
    ProfilesService.insertProfile(req.app.get("db"), newProfile)
      .then((profile) => {
        console.log("Passed line 52 then");
        res
          .status(201)
          .location(`/profiles/${profile.id}`)
          .json(serializeProfile(profile));
      })
      .catch(next);
  });

profileRouter.route("/profile/:profile_id").get((req, res, next) => {
  const { profile_id } = req.params;
  ProfilesService.getById(req.app.get("db"), profile_id).then((profile) => {
    if (!profile) {
      return res.status(404).json({
        error: { message: `Profile not found` },
      });
    }
    res.json(serializeProfile(profile)).catch(next);
  });
}).patch(bodyParser, (req, res, next) => {
  const { firstName, lastName, userName, bandname, bio, profilePicture } = req.body
  const profileToUpdate = { first_name: firstName, last_name: lastName, username: userName, bandname: bandname, bio: bio, pic_url: profilePicture }

  if (!firstName && !lastName && !userName && !bandname && !bio) {
    return res.status(400).json({
      error: {
        message: `Please select a field to update`
      }
    })
  }

  ProfilesService.updateProfile (
  req.app.get('db'),
			req.params.profile_id,
			profileToUpdate
		)
			.then((profile) => {
        console.log("Line 90 in profile router " + JSON.stringify(profile));
				res.send(serializeProfile(profile)).status(204).end()

			})
			//.catch(next)
	})
  .delete((req, res, next) => {
  ProfilesService.deleteProfile(req.app.get('db'), req.params.profile_id)
    .then(() => {
      res.send(`Profile with id ${profile_id} deleted`).status(204).end()
    })
    .catch(next)
})

profileRouter.route("/profile").get((req, res) => {
  res.status(200).send("Here is the logged in user");
});

profileRouter.route("/createprofile").post(bodyParser, (req, res) => {
  res.status(200).send("Here is the create profile page");
});

//change to post
profileRouter.route("/editprofile").get((req, res) => {
  res.status(200).send("Here is the edit profile page");
});

module.exports = profileRouter;
