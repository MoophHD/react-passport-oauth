const passport = require("passport");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");
const GitHubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = model("User");
const secret = process.env.JWT_SECRET;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  User.findOne({id}, function (err, user) {
    done(err, user);
  });
});


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
      session: false,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const candidate = await User.findOne({ email });

        if (!candidate) {
          const user = new User({ email, id: profile.id, loginCounter: 0 });
          await user.save();
          return done(null, user);
        }
        candidate.updateOne({ loginCounter: candidate.loginCounter + 1 });

        return done(null, candidate);
      } catch (e) {
        return done(e);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const candidate = await User.findOne({ email });
        if (!candidate) {
          const user = new User({ email, password });
          await user.save();
        }

        if (candidate.password != password) {
          return done(null, false, {
            errors: { "email or password": "is invalid" },
          });
        }

        return done(null, {});
      } catch (e) {
        console.log(`Error while signing in/up, ${e}`);
      }
    }
  )
);


module.exports = passport;
