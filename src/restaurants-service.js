const RestaurantsService = {
  getAllRestaurants(knex) {
    return knex.select("*").from("restaurants");
  },
  
  getAllRecommendations(knex) {
  return knex.select("*").from("recommendations").join("restaurants", "recommendations.restaurant_id", "restaurants.id")
  },

  getAllBucketListItems(knex) {
   return knex.select("*").from("bucket_list").join("restaurants", "bucket_list.restaurant_id", "restaurants.id")
  },

  getById(knex, id) {
    return knex.from("restaurants").select("*").where("id", id).first();
  },
  
  getByName(knex, name) {
    return knex.from("restaurants").select("*").where("name", name).first();
  },

  insertRestaurant(knex, newRestaurant) {
    console.log("At insert service");
    return knex
      .insert({ id: newRestaurant.id, name: newRestaurant.name, city: newRestaurant.city, state: newRestaurant.state, url: newRestaurant.url })
      .into("restaurants")
      .returning("*")
      .then((rows) => {
        console.log("In the service then block");
        return rows[0];
      });

     
  },
  deleteRestaurant(knex, id) {
    return knex("restaurant").where({ id }).delete();
  },
  updateRestaurant(knex, id, newRestaurantFields) {
    return knex("restaurants").where({ id }).update(newRestaurantFields);
  },
  insertRecommendation(knex, newRecommendation) {
    return knex
      .insert({ user_id: newRecommendation.user_id, restaurant_id: newRecommendation.restaurant_id })
      .into("recommendations")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  insertBucketListItem(knex, newBucketListItem) {
    return knex
    .insert({ id: newBucketListItem.id, user_id: newBucketListItem.user_id, restaurant_id: newBucketListItem.restaurant_id })
    .into("bucket_list")
    .returning("*")
    .then((rows) => {
      return rows[0];
    })
  }
  
};

module.exports = RestaurantsService;
