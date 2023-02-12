// const location=useLocation();
// const cat=location.pathname.split('/')[2];
// const [filters,setFilters]=useState({});
// const [sort,setSort]=useState('newest');

// const handleFilters=(e)=>{
//     setFilters({
//         ...filters,
//         [e.target.name]:e.target.value
//     })
// }

// const handleSort=(e)=>{
//     setSort(
//         [e.target.name]=e.target.value
//     )
//     console.log(sort)
// }

// const [products,setProduts]=useState([]);
// const [filteredProducts,setFilteredProducts]=useState([]);

// useEffect(()=>{
//     const getProducts=async()=>{
//         try{
//             const res=
//                 await axios.get(cat ? 
//                 `http://localhost:5000/api/products?category=${cat}` : 
//                 "http://localhost:5000/api/products"
//             );
//             console.log(res.data);
//             setProduts(res.data);  
//         }catch(err){
//             console.log(err);
//         }
//     }
//     getProducts()
// },[cat])

// //filtering the products
// useEffect(()=>{
//    cat && setFilteredProducts(
//         products.filter((item)=>
//             Object.entries(filters).every(([key,value])=>
//                 item[key].includes(value)
//         )
//     ) 
//    )
// },[filters,products,cat])

// //sorting the products
// useEffect(()=>{
//     if(sort==='newest'){
//         setFilteredProducts((prev)=>
//             [...prev].sort((a,b)=>a.createdAt-b.createdAt)
//         )
//     }
//     else if(sort==='asc'){
//         setFilteredProducts((prev)=>
//             [...prev].sort((a,b)=>a.price-b.price)
//         )
//     }
//     else{
//         setFilteredProducts((prev)=>
//             [...prev].sort((a,b)=>b.price-a.price)
//         )
//     }
// },[sort])

// return (
// <>
//     <h1>{cat}</h1>
//     <div className='below-nav'>
        
//         <div className='filters'>
//             <h4>Filters Products:-</h4>
//             <select class="form-select" aria-label="Default select example" name='color' onChange={handleFilters}>
//                 <option defaultValue>Colors</option>
//                 <option>Red</option>
//                 <option>Black</option>
//                 <option>Green</option>
//                 <option>White</option>
//                 <option>Blue</option>
//             </select>
//             <select class="form-select" aria-label="Default select example" name='size' onChange={handleFilters}>
//                 <option defaultValue>Size</option>
//                 <option>S</option>
//                 <option>M</option>
//                 <option>L</option>
//                 <option>XL</option>
//             </select>
//         </div>

//         <div className='sorts'>
//             <h4>Sort Products:-</h4>
//             <select class="form-select" aria-label="Default select example" name='sort' onChange={handleSort}>
//                 <option selected defaultValue>Sort</option>
//                 <option value='newest'>Newest</option>
//                 <option value='asc'>Price(asce)</option>
//                 <option value='des'>Price(desc)</option>
//             </select>
//         </div>
//     </div>

//     <div className='p-categories'>
//     <div className='p-wrapper'>  

//         {filteredProducts.map((item)=>{
//             return(
//                 <div className='card' key={item.id}>
//                 <img src={item.img}/>
//                 <FavoriteBorderOutlinedIcon className='like' color='red' />
//                 <p className='offer'>-25%</p>
//                 <div className='content'>
//                     <div className='p-text'>
//                         <h4 className='p-title'>{item.title}</h4>
//                         <h4>{item.price}</h4><hr />
//                     </div>
//                     <div className='prbtn'>
//                             <Button variant='text' size='small' sx={{color:'black',fontWeight:'bolder'}}>4.5 <StarBorderOutlinedIcon/></Button>
//                             <Link to={`/product/${item._id}`}><Button size='small' variant='contained' style={{backgroundColor:'blue',fontWeight:'lighter'}} className='pshop'>Shop</Button></Link>&nbsp;&nbsp;
//                             <Button size='small'variant='contained' style={{backgroundColor:'green',fontWeight:'lighter'}} className='ptcart'>Cart<AddShoppingCartIcon /></Button>
//                     </div>
//                 </div>
//             </div>
//         )
//         })}
//     </div>
//     </div>