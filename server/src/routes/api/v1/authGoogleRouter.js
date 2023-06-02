import express from "express";
import passport from "passport";

const authGoogleRouter = new express.Router();

authGoogleRouter.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

authGoogleRouter.get('/callback', passport.authenticate('google', 
  { 
    successRedirect: "/profile",
    failureRedirect: "/auth/failure"
  })
)

export default authGoogleRouter;