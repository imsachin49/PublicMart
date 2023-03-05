const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const dotenv=require('dotenv').config();
const passport=require('passport');
const User=require('./models/User');
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET
// const GITHUB_CLIENT_ID=process.env.GITHUB_CLIENT_ID
// const GITHUB_CLIENT_SECRET=process.env.GITHUB_CLIENT_SECRET

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
});

passport.use(
    new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            profileFields: ['emails']
        },(accessToken, refreshToken, profile, done)=>{ 
           User.findOne({googleId: profile.id}).then((currentUser)=>{
               if(currentUser){
                   console.log("user is: ", currentUser);
                   done(null,currentUser);
               }else{
                   new User({
                       googleId: profile.id,
                       username: profile.displayName,
                       email:profile.emails[0].value,
                   }).save().then((newUser)=>{
                       console.log("new user created: "+ newUser);
                       done(null,newUser);
                       res.status(200).json({newUser},);
                    });
                }
            });                    
        }
    )
)


// passport.use(
//     new GithubStrategy({
//             clientID: GITHUB_CLIENT_ID,
//             clientSecret: GITHUB_CLIENT_SECRET,
//             callbackURL: "/auth/github/callback",
//             profileFields: ['emails']
//         },(accessToken, refreshToken, profile, done)=>{ 
//             // console.log(profile.id);
//             // console.log(profile.emails[0].value);
//            User.findOne({githubId:profile.id}).then((currentUser)=>{
//                if(currentUser){
//                    console.log("user is: ", currentUser);
//                    done(null,currentUser);
//                }else{
//                    new User({
//                        githubId: profile.id,
//                        username: profile.displayName,
//                     //    email:profile.emails[0].value,
//                    }).save().then((newUser)=>{
//                        console.log("new user created: "+ newUser);
//                        done(null,newUser);
//                     });
//                 }
//             });
        
//         }
//     )
// );
