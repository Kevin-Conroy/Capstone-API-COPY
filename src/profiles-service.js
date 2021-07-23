
const { default: knex } = require('knex');
const bcrypt = require('bcrypt');


const ProfilesService = {

  async getAllProfiles(knex) {
    const [profiles, recommendations, bucketList] = await Promise.all([
    
      knex.select("*").from("profiles"),
      knex.select("*").from("recommendations").join("restaurants", "recommendations.restaurant_id", "restaurants.id"),
      knex.select("*").from("bucket_list").join("restaurants", "bucket_list.restaurant_id", "restaurants.id")
        
    ]);
    return profiles.map(profile => ({
      ...profile,
      recommendations: recommendations.filter(rec => rec.user_id === profile.id),
      bucketList: bucketList.filter(item => item.user_id === profile.id)
    })
    )
    ;
  },

  validate(uname, password, knex){
    console.log("jjj");
    
return knex.select("*").from("profiles").where("username",uname);
  
  },
  
  authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      
      console.log("success")
      next()
    })
  },


  getById(knex, id) {
    return knex.from("profiles").select("*").where("id", id).first();
  },

  async insertProfile(knex, newProfile) {
    
    const hashedPassword = await bcrypt.hash(newProfile.password, 10)
    console.log("Profile service test" + JSON.stringify(newProfile));
    try{
    return knex
      .insert({id: newProfile.id, first_name: newProfile.first_name, last_name: newProfile.last_name, username: newProfile.username,password:hashedPassword,bandname: newProfile.bandname, bio: newProfile.bio, pic_url: newProfile.pic_url })
      .into("profiles")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
    } catch(err)
  {console.log("Caught an error " + err)}
  },
  deleteProfile(knex, id) {
    return knex("profiles").where({ id }).delete();
  },
  updateProfile(knex, id, profileToUpdate) {
    console.log("Testing update profile service" + JSON.stringify(profileToUpdate));
    return knex("profiles").where({ id })
    .update({id: profileToUpdate.id, 
      first_name: profileToUpdate.first_name, 
      last_name: profileToUpdate.last_name, 
      username: profileToUpdate.username, 
      bandname: profileToUpdate.bandname, 
      bio: profileToUpdate.bio }).returning("*")
      .then((rows) => {
        console.log("Got to the end of updateProfile " + JSON.stringify(rows));
        //return "Done";
        return rows[0];


      });
      
  },
};

module.exports = ProfilesService;