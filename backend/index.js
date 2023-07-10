const cookieSession=require('cookie-session');
const express=require('express');
const passport=require('passport');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const port=process.env.PORT || 5000;
const cors=require('cors');
const passportSetUp=require('./passport');

const authRoutes=require('./routes/auth');
const productRoutes=require('./routes/product')
const orderRoutes=require('./routes/order');
const cartRoutes=require('./routes/cart');
const userRoutes=require('./routes/user');
const reviewRoutes=require('./routes/review');
const stripeRoutes=require('./routes/stripe');
const passportRoutes=require('./routes/authPassport');

dotenv.config();
app.use(cookieSession({name:"session",keys:["sachin_kumar"],maxAge: 24*60*60*100})); 
//keys->.env & maxAge=1day

//initializing passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongdb
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
  .then(()=>{
    console.log("DB connected successfully");
  })
    .catch((err)=>{
      console.log(`Error in connecting to the DB ${err}`)
})

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://full-stack-ecommerce-scm2.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors({
  "origin":["http://localhost:3000","https://visual-board-ten.vercel.app","https://full-stack-ecommerce-scm2.vercel.app","https://full-stack-ecommerce-mu.vercel.app"],
  methods:"GET,POST,PUT,DELETE",
  credentials:true,
}))

app.use(express.json());

//routes
app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/carts',cartRoutes);
app.use('/api/users',userRoutes);
app.use('/api/reviews',reviewRoutes);
app.use('/api/checkout',stripeRoutes);
app.use('/auth',passportRoutes);

app.listen(port,()=>{
  console.log(`Listening to port ${port}`);
})
