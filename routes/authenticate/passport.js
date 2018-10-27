const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
// const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("../../config/index");
const db = require("../../database/index");
// const bcrypt = require("bcrypt");
// JSON Web Token
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        // Find the user that matches the token payload.
        const user = await db("users")
          .select("*")
          .where("email", payload.email)
          .returning("*");
        // If the token doesn't exist then return nothing
        if (JSON.stringify(user[0]) === "[]") {
          return done(null, false);
        }
        // Return only if it does exist.
        return done(null, user[0]);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
