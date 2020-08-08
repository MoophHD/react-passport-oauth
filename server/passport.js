const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // User.findById(id, (err, user) => {
  //   done(err, user);
  // });
  done(err, {});
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(`passport profile`);
      console.log(passport);
      
      done(null, profile);
    }
  )
);

module.exports = passport;
