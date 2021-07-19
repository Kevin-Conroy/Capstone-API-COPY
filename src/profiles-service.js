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
    }));
  },

  

  getById(knex, id) {
    return knex.from("profiles").select("*").where("id", id).first();
  },
  insertProfile(knex, newProfile) {
    console.log("Profile service test" + JSON.stringify(newProfile));
    try{
    return knex
      .insert({id: newProfile.id, first_name: newProfile.first_name, last_name: newProfile.last_name, username: newProfile.username, bandname: newProfile.bandname, bio: newProfile.bio, pic_url: newProfile.pic_url })
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
