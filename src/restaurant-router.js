const express = require("express");
const RestaurantsService = require("./restaurants-service");
const RecommendationsService = require("./recommendations-service");
const restaurantRouter = express.Router();
//const bodyParser = require('body-parser');
const app = require("./app");
//app.use(bodyParser)

const bodyParser = express.json();
restaurantRouter.use(bodyParser);

const serializeRestaurant = (restaurant) => ({
  id: restaurant.id,
  name: restaurant.name,
  city: restaurant.city,
  state: restaurant.state,
  url: restaurant.url,
  price: restaurant.price,
});

const serializeRecommendation = (recommendation) => ({
  id: recommendation.id,
  user_id: recommendation.user_id,
  restaurant_id: recommendation.restaurant_id,
});

restaurantRouter.route("/searchcity").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  RestaurantsService.getAllRestaurants(knexInstance)
    .then((restaurants) => {
      res.json(restaurants);
    })
    .catch(next);
});

restaurantRouter
  .route("/addrecommendation")
  .post(bodyParser, (req, res, next) => {
    for (const field of ["name", "city", "state"]) {
      if (!req.body[field]) {
        return res.status(400).send({
          error: { message: `'${field}' is required` },
        });
      }
    }
    console.log("At line 46");
    const { name, city, state, url, price } = req.body;

    const newRestaurant = {
      name: name,
      city: city,
      state: state,
      url: url,
      price: price,
    };

    console.log("At line 48");
    RestaurantsService.insertRestaurant(req.app.get("db"), newRestaurant)
      .then((restaurant) => {
        console.log("At line 51");
        res
          .status(201)
          .location(`/restaurants/${restaurant.id}`)
          .json(serializeRestaurant(restaurant));
      })
      .catch(next);
  });

restaurantRouter.route("/restaurants/:restaurant_id").get((req, res, next) => {
  const { restaurant_id } = req.params;
  RestaurantsService.getById(req.app.get("db"), restaurant_id).then(
    (restaurant) => {
      if (!restaurant) {
        return res.status(404).json({
          error: { message: `Restaurant not found` },
        });
      }
      res.json(serializeRestaurant(restaurant)).catch(next);
    }
  );
});

restaurantRouter
  .route("/restaurantsbyname/:restaurant_name")
  .get((req, res, next) => {
    const { restaurant_name } = req.params;
    RestaurantsService.getByName(req.app.get("db"), restaurant_name).then(
      (restaurant) => {
        if (!restaurant) {
          return res.status(404).json({
            error: { message: `Restaurant not found` },
          });
        }
        res.json(serializeRestaurant(restaurant)).catch(next);
      }
    );
  });

restaurantRouter
  .route("/addnewrecommendation")
  .post(bodyParser, (req, res, next) => {
    //pass in user_id, city, state, URL, price
    const { name, city, state, url, price, user_id } = req.body;
    console.log(req.body);
    RestaurantsService.getByName(req.app.get("db"), name).then((restaurant) => {
      console.log("Inside get by name service")
      if (!restaurant) {
        //Add Restaurant
        const newRestaurant = {
          name: req.body.name,
          city: req.body.city,
          state: req.body.state,
          url: req.body.url,
          price: req.body.price,
        };

        restaurant = RestaurantsService.insertRestaurant(
          req.app.get("db"),
          newRestaurant
        );

        restaurant.catch((err) => {
          console.log("Caught an error");
        });
      }
      console.log("at line 125")
      RestaurantsService.getByName(req.app.get("db"), name).then(
        (newRestaurant) => {
          console.log("at line 127");
          const newRecommendation = {
            //pass in user_id from function
            restaurant_id: newRestaurant.id,
            user_id: user_id,
          };

          RestaurantsService.insertRecommendation(
            req.app.get("db"),
            newRecommendation,
            console.log(newRecommendation)
          ).then((aNewRecommendation) => {
            res.json(aNewRecommendation);
          });
        }
      );
    });
  });

restaurantRouter
  .route("/deleterecommendation/:recommendation_id")
  .delete((req, res, next) => {
    const { recommendation_id } = req.params;
    RecommendationsService.deleteRecommendation(
      req.app.get("db"),
      recommendation_id
    )
      .then(() => {
        res
          .send(`Recommendation with id ${recommendation_id} deleted`)
          .status(204)

          .end();
      })
      .catch(next);
  });

restaurantRouter.route("/bucketlist/:profile_id").post((req, res, next) => {
  const { profile_id, restaurant_id } = req.body;
  const newBucketListItem = {
    user_id: req.body.profile_id,
    restaurant_id: req.body.restaurant_id,
  };

  RestaurantsService.insertBucketListItem(req.app.get("db"), newBucketListItem)
    .then((newBucketListItem) => {
      res.send(`Bucket list added to profile ${newBucketListItem.user_id}`).status(201).end();
    })
    .catch(next);
});

module.exports = restaurantRouter;
