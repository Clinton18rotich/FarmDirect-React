import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'

const crops = [
  { id:1, name:'Maize', category:'Grains', grade:'Premium', price:3500, unit:'90kg bag', organic:true, location:'Kitale', seller:'John Farmer', image:'🌽' },
  { id:2, name:'Beans', category:'Legumes', grade:'Grade 1', price:8000, unit:'90kg bag', organic:false, location:'Nakuru', seller:'Mary Wanjiku', image:'🫘' },
  { id:3, name:'Tomatoes', category:'Vegetables', grade:'Grade 2', price:2500, unit:'Crate', organic:true, location:'Loitoktok', seller:'Peter Mwangi', image:'🍅' },
  { id:4, name:'Avocados', category:'Fruits', grade:'Premium', price:4500, unit:'90kg bag', organic:true, location:'Muranga', seller:'Grace Akinyi', image:'🥑' },
  { id:5, name:'Mangoes', category:'Fruits', grade:'Premium', price:3200, unit:'Crate', organic:true, location:'Machakos', seller:'James Omondi', image:'🥭' },
]

const livestock = [
  { id:101, name:'Dairy Cows', type:'Cattle', breed:'Friesian', price:45000, location:'Eldoret', seller:'Kiprotich Farm', image:'🐄' },
  { id:102, name:'Goats', type:'Goats', breed:'Galla', price:4500, location:'Kitui', seller:'Mwende Muthoka', image:'🐐' },
  { id:103, name:'Chicken', type:'Poultry', breed:'Kienyeji', price:600, location:'Kisumu', seller:'Apondi Farm', image:'🐔' },
]

const animalProducts = [
  { id:201, name:'Fresh Milk', type:'Dairy', price:60, unit:'Litre', location:'Eldoret', organic:true, image:'🥛' },
  { id:202, name:'Eggs', type:'Poultry', price:350, unit:'Tray', location:'Kisumu', organic:true, image:'🥚' },
  { id:203, name:'Honey', type:'Apiculture', price:800, unit:'500ml', location:'Baringo', organic:true, image:'🍯' },
]

const riders = [
  { id:1, name:'James Mwangi', vehicle:'Motorcycle', rating:4.8, location:'Nairobi', price:300, image:'🏍️', available:true },
  { id:2, name:'Sarah Akello', vehicle:'Pickup Truck', rating:4.9, location:'Nakuru', price:800, image:'🛻', available:true },
  { id:4, name:'Grace Wambui', vehicle:'Motorcycle', rating:4.6, location:'Kisumu', price:350, image:'🏍️', available:true },
]

const weatherData = {
  'Nairobi': { temp:24, humidity:65, wind:12, condition:'Partly Cloudy', icon:'⛅', forecast:[{day:'Today',hi:26,lo:17,icon:'⛅'},{day:'Thu',hi:27,lo:16,icon:'☀️'},{day:'Fri',hi:25,lo:18,icon:'🌧️'}], advisory:'Good time for planting maize.' },
  'Kitale': { temp:22, humidity:72, wind:8, condition:'Sunny', icon:'☀️', forecast:[{day:'Today',hi:25,lo:14,icon:'☀️'},{day:'Thu',hi:26,lo:13,icon:'☀️'}], advisory:'Excellent for wheat harvesting.' },
  'Nakuru': { temp:23, humidity:60, wind:15, condition:'Windy', icon:'💨', forecast:[{day:'Today',hi:25,lo:15,icon:'💨'}], advisory:'Delay spraying pesticides.' },
}

function Navbar({ dark, setDark, cart }) {
  const nav = useNavigate()
  return <nav style={{background:'#166534',padding:'12px 16px',position:'sticky',top:0,zIndex:50}}>
    <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <Link to="/" style={{color:'white',textDecoration:'none',fontSize:20,fontWeight:'bold'}}>🌾 FarmDirect</Link>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <button onClick={()=>nav('/cart')} style={{background:'none',border:'none',fontSize:18,cursor:'pointer',color:'white'}}>🛒{cart.length>0?cart.length:''}</button>
        <button onClick={()=>setDark(!dark)} style={{background:'none',border:'none',fontSize:18,cursor:'pointer',color:'white'}}>{dark?'☀️':'🌙'}</button>
      </div>
    </div>
  </nav>
}

function BottomNav() {
  const [moreOpen, setMoreOpen] = useState(false)
  const mainItems = [{icon:'🏠',label:'Market',path:'/'},{icon:'🐄',label:'Livestock',path:'/livestock'},{icon:'🚚',label:'Delivery',path:'/delivery'},{icon:'🌤️',label:'Weather',path:'/weather'},{icon:'👥',label:'Community',path:'/community'}]
  const moreItems = [{icon:'🥚',label:'Products',path:'/products'},{icon:'🤖',label:'FarmBot',path:'/farmbot'},{icon:'⛓️',label:'Ledger',path:'/blockchain'},{icon:'🎓',label:'Academy',path:'/academy'},{icon:'⚖️',label:'Disputes',path:'/disputes'},{icon:'🌍',label:'Green',path:'/sustainability'},{icon:'🎁',label:'Refer',path:'/refer'},{icon:'📸',label:'Photos',path:'/photos'},{icon:'🗺️',label:'Map',path:'/map'},{icon:'🛒',label:'Cart',path:'/cart'}]
  
  return <div>
    {moreOpen && <div style={{position:'fixed',bottom:56,left:0,right:0,background:'#14532d',padding:12,zIndex:49,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6,maxHeight:'60vh',overflowY:'auto'}}>
      {moreItems.map(i=><Link key={i.path} to={i.path} onClick={()=>setMoreOpen(false)} style={{color:'white',textDecoration:'none',fontSize:8,display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:6}}><span style={{fontSize:18}}>{i.icon}</span>{i.label}</Link>)}
    </div>}
    <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#166534',display:'flex',justifyContent:'space-around',padding:'6px 0',zIndex:50}}>
      {mainItems.map(i=><Link key={i.path} to={i.path} style={{color:'white',textDecoration:'none',fontSize:8,display:'flex',flexDirection:'column',alignItems:'center',gap:1}}><span style={{fontSize:16}}>{i.icon}</span>{i.label}</Link>)}
      <div onClick={()=>setMoreOpen(!moreOpen)} style={{color:'white',fontSize:8,display:'flex',flexDirection:'column',alignItems:'center',gap:1,cursor:'pointer'}}><span style={{fontSize:16}}>{moreOpen?'✕':'⋯'}</span>More</div>
    </div>
  </div>
}

function Marketplace({ dark, cart, setCart }) {
  const [search, setSearch] = useState('')
  const addToCart = (item) => { const ex=cart.find(c=>c.id===item.id); if(ex) setCart(cart.map(c=>c.id===item.id?{...c,qty:c.qty+1}:c)); else setCart([...cart,{...item,qty:1}]) }
  const flt = crops.filter(c=>!search||c.name.toLowerCase().includes(search.toLowerCase()))
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1200,margin:'0 auto'}}>
      <h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🌽 Crop Marketplace</h1>
      <input placeholder="Search crops..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:'100%',padding:10,borderRadius:10,border:'1px solid #d1d5db',margin:'12px 0',fontSize:13}} />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12}}>
        {flt.map(item=><div key={item.id} style={{background:dark?'#1f2937':'white',borderRadius:12,padding:16}}>
          <span style={{fontSize:36}}>{item.image}</span><h3 style={{fontSize:16,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{item.name}</h3>
          <p style={{fontSize:11,color:'#6b7280'}}>{item.category} | {item.unit} | 📍 {item.location}</p>
          {item.organic&&<span style={{padding:'2px 8px',borderRadius:9999,fontSize:9,background:'#dcfce7',color:'#15803d'}}>🌿 Organic</span>}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
            <p style={{fontSize:20,fontWeight:'bold',color:'#166534'}}>KES {item.price.toLocaleString()}</p>
            <button onClick={()=>addToCart(item)} style={{padding:'8px 16px',borderRadius:8,background:'#166534',color:'white',border:'none',cursor:'pointer',fontWeight:600}}>🛒 Add</button>
          </div>
        </div>)}
      </div>
    </div>
  </div>
}

function LivestockPage({ dark, cart, setCart }) {
  const addToCart = (item) => { const ex=cart.find(c=>c.id===item.id); if(ex) setCart(cart.map(c=>c.id===item.id?{...c,qty:c.qty+1}:c)); else setCart([...cart,{...item,qty:1}]) }
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1200,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🐄 Livestock Market</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12,marginTop:12}}>
        {livestock.map(item=><div key={item.id} style={{background:dark?'#1f2937':'white',borderRadius:12,padding:16}}>
          <span style={{fontSize:36}}>{item.image}</span><h3 style={{fontSize:16,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{item.name}</h3>
          <p style={{fontSize:11,color:'#6b7280'}}>{item.breed} | 📍 {item.location}</p>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
            <p style={{fontSize:20,fontWeight:'bold',color:'#166534'}}>KES {item.price.toLocaleString()}</p>
            <button onClick={()=>addToCart(item)} style={{padding:'8px 16px',borderRadius:8,background:'#166534',color:'white',border:'none',cursor:'pointer',fontWeight:600}}>🛒 Add</button>
          </div>
        </div>)}
      </div>
    </div>
  </div>
}

function ProductsPage({ dark, cart, setCart }) {
  const addToCart = (item) => { const ex=cart.find(c=>c.id===item.id); if(ex) setCart(cart.map(c=>c.id===item.id?{...c,qty:c.qty+1}:c)); else setCart([...cart,{...item,qty:1}]) }
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1200,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🥚 Animal Products</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12,marginTop:12}}>
        {animalProducts.map(item=><div key={item.id} style={{background:dark?'#1f2937':'white',borderRadius:12,padding:16}}>
          <span style={{fontSize:36}}>{item.image}</span><h3 style={{fontSize:16,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{item.name}</h3>
          <p style={{fontSize:11,color:'#6b7280'}}>{item.type} | {item.unit} | 📍 {item.location}</p>
          {item.organic&&<span style={{padding:'2px 8px',borderRadius:9999,fontSize:9,background:'#dcfce7',color:'#15803d'}}>🌿 Organic</span>}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
            <p style={{fontSize:20,fontWeight:'bold',color:'#166534'}}>KES {item.price.toLocaleString()}</p>
            <button onClick={()=>addToCart(item)} style={{padding:'8px 16px',borderRadius:8,background:'#166534',color:'white',border:'none',cursor:'pointer',fontWeight:600}}>🛒 Add</button>
          </div>
        </div>)}
      </div>
    </div>
  </div>
}

function CartPage({ dark, cart, setCart }) {
  const total = cart.reduce((s,i)=>s+(i.price*i.qty),0)
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:700,margin:'0 auto'}}>
      <h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🛒 Cart ({cart.length})</h1>
      {cart.length===0?<p style={{textAlign:'center',color:'#6b7280',padding:40}}>Cart is empty.</p>:
      cart.map(item=><div key={item.id} style={{background:dark?'#1f2937':'white',borderRadius:10,padding:14,marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:24}}>{item.image}</span><span style={{fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{item.name} x{item.qty}</span>
        <span style={{fontWeight:'bold',color:'#166534'}}>KES {(item.price*item.qty).toLocaleString()}</span>
        <button onClick={()=>setCart(cart.filter(c=>c.id!==item.id))} style={{color:'#ef4444',background:'none',border:'none',cursor:'pointer'}}>✕</button>
      </div>)}
      {cart.length>0&&<div style={{textAlign:'right',marginTop:16,padding:20,background:dark?'#1f2937':'white',borderRadius:12}}>
        <p style={{fontSize:18,fontWeight:'bold',color:dark?'#f9fafb':'#111827'}}>Total: KES {total.toLocaleString()}</p>
        <Link to="/mpesa" style={{display:'inline-block',marginTop:10,padding:'10px 24px',borderRadius:8,background:'#166534',color:'white',textDecoration:'none',fontWeight:600}}>💳 Checkout (M-Pesa)</Link>
      </div>}
    </div>
  </div>
}

function DeliveryPage({ dark }) {
  const [pickup,setPickup]=useState(''); const [dropoff,setDropoff]=useState(''); const [weight,setWeight]=useState('')
  const [estimatedFee,setEstimatedFee]=useState(0)
  const calcFee = () => { if(!pickup||!dropoff||!weight) return; setEstimatedFee(Math.floor(Math.random()*2000)+300+parseInt(weight||0)*5) }
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1000,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🚚 Delivery</h1><Link to="/tracking" style={{display:"inline-block",marginLeft:12,padding:"6px 14px",borderRadius:8,background:"#4f46e5",color:"white",textDecoration:"none",fontSize:11}}>📍 Track Order</Link>
      <div style={{background:dark?'#1f2937':'white',borderRadius:14,padding:20,marginBottom:20}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:10,marginBottom:12}}>
          <input placeholder="Pickup" value={pickup} onChange={e=>setPickup(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid #d1d5db',fontSize:12}} />
          <input placeholder="Drop-off" value={dropoff} onChange={e=>setDropoff(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid #d1d5db',fontSize:12}} />
          <input placeholder="Weight (kg)" type="number" value={weight} onChange={e=>setWeight(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid #d1d5db',fontSize:12}} />
        </div>
        <button onClick={calcFee} disabled={!pickup||!dropoff||!weight} style={{padding:'10px 20px',borderRadius:8,background:(!pickup||!dropoff||!weight)?'#d1d5db':'#166534',color:'white',border:'none',cursor:(!pickup||!dropoff||!weight)?'default':'pointer',fontWeight:600}}>Calculate Fee</button>
        {estimatedFee>0&&<div style={{marginTop:12,background:'#dcfce7',borderRadius:8,padding:12}}><p style={{fontSize:14,fontWeight:'bold',color:'#15803d'}}>Estimated: KES {estimatedFee.toLocaleString()}</p></div>}
      </div>
      <h3 style={{fontSize:15,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:12}}>🏍️ Riders</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12}}>
        {riders.map(r=><div key={r.id} style={{background:dark?'#1f2937':'white',borderRadius:12,padding:16}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:28}}>{r.image}</span><div><h4 style={{fontSize:14,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{r.name}</h4><p style={{fontSize:11,color:'#6b7280'}}>{r.vehicle} | ⭐{r.rating}</p></div></div>
          <p style={{fontSize:16,fontWeight:'bold',color:'#166534',marginTop:8}}>From KES {r.price}</p>
        </div>)}
      </div>
    </div>
  </div>
}

function WeatherPage({ dark }) {
  const [location,setLocation]=useState('Nairobi'); const w = weatherData[location]
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:900,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🌤️ Weather</h1>
      <select value={location} onChange={e=>setLocation(e.target.value)} style={{padding:10,borderRadius:10,border:'1px solid #d1d5db',fontSize:13,fontWeight:600,marginBottom:16}}>{Object.keys(weatherData).map(l=><option key={l}>{l}</option>)}</select>
      <div style={{background:dark?'#1f2937':'white',borderRadius:16,padding:24,marginBottom:20,textAlign:'center',backgroundImage:'linear-gradient(135deg, #fef3c7, #fde68a)'}}>
        <span style={{fontSize:60}}>{w.icon}</span><p style={{fontSize:40,fontWeight:'bold',color:'#111827'}}>{w.temp}°C</p><p>{w.condition}</p>
      </div>
      <div style={{background:'#dcfce7',borderRadius:12,padding:16}}><h3 style={{fontSize:14,fontWeight:600,color:'#15803d'}}>🌱 Advisory</h3><p style={{fontSize:13}}>{w.advisory}</p></div>
    </div>
  </div>
}

function CommunityPage({ dark }) {
  const [activeTab, setActiveTab] = useState('forums')
  const forumPosts = [{id:1, title:'Best time to plant maize?', author:'John Farmer', replies:12, views:145, category:'Crops'},{id:2, title:'Tips for organic tomatoes', author:'Mary Wanjiku', replies:8, views:89, category:'Organic'}]
  const cooperatives = [{id:1, name:'Kitale Maize Co-op', members:234, location:'Kitale', crop:'Maize', image:'🌽'},{id:2, name:'Muranga Avocado Growers', members:156, location:'Muranga', crop:'Avocados', image:'🥑'}]
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1000,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>👥 Community</h1><Link to="/videocall" style={{display:"inline-block",marginLeft:12,padding:"6px 14px",borderRadius:8,background:"#dc2626",color:"white",textDecoration:"none",fontSize:11}}>📹 Video Call</Link>
      <div style={{display:'flex',gap:8,margin:'16px 0'}}>{['forums','cooperatives'].map(tab=><button key={tab} onClick={()=>setActiveTab(tab)} style={{padding:'8px 18px',borderRadius:20,border:'none',background:activeTab===tab?'#166534':'#e5e7eb',color:activeTab===tab?'white':'#374151',cursor:'pointer',fontSize:12,textTransform:'capitalize'}}>{tab}</button>)}</div>
      {activeTab==='forums' && forumPosts.map(p=><div key={p.id} style={{background:dark?'#1f2937':'white',borderRadius:10,padding:14,marginBottom:8}}><h4 style={{fontSize:14,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{p.title}</h4><div style={{display:'flex',gap:12,fontSize:10,color:'#6b7280'}}><span>👤 {p.author}</span><span>💬 {p.replies}</span></div></div>)}
      {activeTab==='cooperatives' && <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))',gap:12}}>{cooperatives.map(c=><div key={c.id} style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20,textAlign:'center'}}><span style={{fontSize:40}}>{c.image}</span><h4 style={{fontSize:15,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{c.name}</h4><p style={{fontSize:11,color:'#6b7280'}}>📍 {c.location} | 👥 {c.members}</p></div>)}</div>}
    </div>
  </div>
}

function FarmBot({ dark }) {
  const [messages, setMessages] = useState([{role:'bot', text:'👋 Hello! I am FarmBot. Ask me about crops, weather, pests, or market prices!'}])
  const [input, setInput] = useState(''); const [thinking, setThinking] = useState(false)
  const farmKnowledge = { maize:'🌽 Maize grows best at 20-30°C. Plant at start of rains. Price: KES 3,500/90kg.', beans:'🫘 Beans need well-drained soil. Price: KES 8,000/90kg.', default:'I can help with crops, livestock, weather, and market prices.' }
  const ask = () => { if(!input.trim()) return; setMessages(prev=>[...prev,{role:'user',text:input}]); setInput(''); setThinking(true); setTimeout(()=>{ const q=input.toLowerCase(); let r=farmKnowledge.default; if(q.includes('maize')) r=farmKnowledge.maize; if(q.includes('bean')) r=farmKnowledge.beans; setMessages(prev=>[...prev,{role:'bot',text:r}]); setThinking(false) },1000) }
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:700,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🤖 FarmBot AI</h1>
      <div style={{background:dark?'#1f2937':'white',borderRadius:16,padding:16,minHeight:350,maxHeight:450,overflowY:'auto',marginBottom:12}}>
        {messages.map((m,i)=><div key={i} style={{alignSelf:m.role==='user'?'flex-end':'flex-start',maxWidth:'85%',background:m.role==='user'?'#166534':dark?'#111827':'#f0fdf4',color:m.role==='user'?'white':dark?'#f9fafb':'#111827',padding:'10px 14px',borderRadius:12,fontSize:13,marginBottom:6}}>{m.text}</div>)}
      </div>
      <div style={{display:'flex',gap:6}}><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask()} placeholder="Ask about farming..." style={{flex:1,padding:12,borderRadius:24,border:'1px solid #d1d5db',fontSize:13}} /><button onClick={ask} style={{padding:'12px 20px',borderRadius:24,background:'#166534',color:'white',border:'none',cursor:'pointer',fontWeight:600}}>Send</button></div>
    </div>
  </div>
}

function MpesaCheckout({ dark, cart, setCart }) {
  const [phone, setPhone] = useState(''); const [step, setStep] = useState(0); const [pin, setPin] = useState('')
  const [processing, setProcessing] = useState(false); const [result, setResult] = useState(null)
  const total = cart.reduce((s,i)=>s+(i.price*i.qty),0)
  const confirmPayment = () => { setProcessing(true); setTimeout(()=>{ setResult('success'); setProcessing(false); setStep(2); setCart([]) },2000) }
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:500,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>💳 M-Pesa</h1>
      {step===0 && <div style={{background:dark?'#1f2937':'white',borderRadius:16,padding:24,textAlign:'center'}}>
        <span style={{fontSize:48}}>📱</span><p style={{fontSize:28,fontWeight:'bold'}}>KES {total.toLocaleString()}</p>
        <input placeholder="0712345678" value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',padding:14,borderRadius:10,border:'1px solid #d1d5db',fontSize:16,textAlign:'center',margin:'16px 0'}} />
        <button onClick={()=>setStep(1)} disabled={!phone} style={{width:'100%',padding:16,borderRadius:10,background:phone?'#166534':'#d1d5db',color:'white',border:'none',fontSize:16,fontWeight:'bold',cursor:phone?'pointer':'default'}}>💳 Pay with M-Pesa</button>
      </div>}
      {step===1 && <div style={{background:dark?'#1f2937':'white',borderRadius:16,padding:24,textAlign:'center'}}>
        <span style={{fontSize:48}}>🔐</span><p style={{fontSize:16,fontWeight:'bold'}}>Confirm Payment</p>
        <input type="password" placeholder="M-Pesa PIN" value={pin} onChange={e=>setPin(e.target.value)} maxLength={4} style={{width:'100%',padding:14,borderRadius:10,border:'1px solid #d1d5db',fontSize:20,textAlign:'center',margin:'16px 0',letterSpacing:8}} />
        {processing?<p>⏳ Processing...</p>:<div style={{display:'flex',gap:8}}><button onClick={()=>setStep(0)} style={{flex:1,padding:14,borderRadius:10,border:'1px solid #d1d5db',background:'transparent'}}>Cancel</button><button onClick={confirmPayment} style={{flex:1,padding:14,borderRadius:10,background:'#166534',color:'white',border:'none',cursor:'pointer',fontWeight:'bold'}}>Send</button></div>}
      </div>}
      {step===2 && <div style={{background:dark?'#1f2937':'white',borderRadius:16,padding:24,textAlign:'center'}}>
        <span style={{fontSize:60}}>✅</span><p style={{fontSize:20,fontWeight:'bold',color:'#15803d'}}>Payment Successful!</p>
        <Link to="/" style={{display:'inline-block',marginTop:16,padding:'10px 24px',borderRadius:8,background:'#166534',color:'white',textDecoration:'none'}}>Continue Shopping</Link>
      </div>}
    </div>
  </div>
}

function BlockchainLedger({ dark }) {
  const transactions = [{id:'TX001', type:'Sale', from:'John Farmer', to:'Grace Akinyi', item:'Maize 5 bags', amount:17500, hash:'0x7f3a...b9c1'},{id:'TX002', type:'Sale', from:'Mary Wanjiku', to:'Kiprotich', item:'Beans 3 bags', amount:24000, hash:'0x8e4b...d2f3'}]
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1000,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>⛓️ Blockchain Ledger</h1>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:11,marginTop:16,background:dark?'#1f2937':'white',borderRadius:12}}>
        <thead><tr><th style={{padding:'8px',textAlign:'left'}}>ID</th><th style={{padding:'8px',textAlign:'left'}}>Type</th><th style={{padding:'8px',textAlign:'left'}}>From → To</th><th style={{padding:'8px',textAlign:'left'}}>Item</th><th style={{padding:'8px',textAlign:'left'}}>Amount</th><th style={{padding:'8px',textAlign:'left'}}>Hash</th></tr></thead>
        <tbody>{transactions.map(tx=><tr key={tx.id} style={{borderTop:'1px solid #e5e7eb'}}><td style={{padding:'8px',color:'#4f46e5'}}>{tx.id}</td><td style={{padding:'8px'}}>{tx.type}</td><td style={{padding:'8px'}}>{tx.from} → {tx.to}</td><td style={{padding:'8px'}}>{tx.item}</td><td style={{padding:'8px',color:'#166534',fontWeight:'bold'}}>KES {tx.amount}</td><td style={{padding:'8px',fontFamily:'monospace',fontSize:10}}>{tx.hash}</td></tr>)}</tbody>
      </table>
    </div>
  </div>
}

function EducationPage({ dark }) {
  const courses = [{id:1, title:'Sustainable Maize Farming', instructor:'Dr. Sarah Chen', lessons:8, duration:'4 hours', enrolled:234, rating:4.8, level:'Beginner', icon:'🌽'},{id:2, title:'Organic Vegetable Production', instructor:'Prof. Emily Park', lessons:12, duration:'6 hours', enrolled:156, rating:4.9, level:'Intermediate', icon:'🍅'}]
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1000,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🎓 Farming Academy</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12,marginTop:16}}>
        {courses.map(c=><div key={c.id} style={{background:dark?'#1f2937':'white',borderRadius:12,padding:16,cursor:'pointer'}}>
          <span style={{fontSize:36}}>{c.icon}</span><h4 style={{fontSize:15,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{c.title}</h4>
          <p style={{fontSize:11,color:'#6b7280'}}>👨‍🏫 {c.instructor} | {c.lessons} lessons | ⭐{c.rating}</p>
          <span style={{padding:'3px 8px',borderRadius:9999,fontSize:9,background:'#eef2ff',color:'#4f46e5',marginTop:4,display:'inline-block'}}>{c.level}</span>
        </div>)}
      </div>
    </div>
  </div>
}

function DisputeCenter({ dark }) {
  const disputes = [{id:'DSP-001', buyer:'Grace Akinyi', seller:'John Farmer', issue:'Quality not as described', amount:17500, status:'Open'},{id:'DSP-002', buyer:'Kiprotich', seller:'Mary Wanjiku', issue:'Delayed delivery', amount:24000, status:'Resolved'}]
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:900,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>⚖️ Disputes</h1>
      {disputes.map(d=><div key={d.id} style={{background:dark?'#1f2937':'white',borderRadius:12,padding:16,marginBottom:8,marginTop:16}}>
        <span style={{fontWeight:600,fontSize:13}}>{d.id}</span><span style={{marginLeft:8,padding:'3px 8px',borderRadius:9999,fontSize:9,background:d.status==='Open'?'#fef3c7':'#dcfce7',color:d.status==='Open'?'#92400e':'#15803d'}}>{d.status}</span>
        <p style={{fontSize:12,marginTop:6}}>{d.buyer} vs {d.seller} — {d.issue}</p><p style={{fontSize:14,fontWeight:'bold',color:'#166534'}}>KES {d.amount.toLocaleString()}</p>
      </div>)}
    </div>
  </div>
}

function SustainabilityPage({ dark }) {
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:900,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🌍 Sustainability</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:12,marginTop:16}}>
        <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20,textAlign:'center'}}><span style={{fontSize:40}}>🌿</span><p style={{fontSize:24,fontWeight:'bold',color:'#16a34a'}}>245</p><p style={{fontSize:11}}>Carbon Credits</p></div>
        <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20,textAlign:'center'}}><span style={{fontSize:40}}>🚜</span><p style={{fontSize:24,fontWeight:'bold',color:'#166534'}}>Equipment Sharing</p><button style={{marginTop:8,padding:'8px 16px',borderRadius:8,background:'#166534',color:'white',border:'none',cursor:'pointer',fontSize:11}}>Browse</button></div>
        <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20,textAlign:'center'}}><span style={{fontSize:40}}>🐝</span><p style={{fontSize:24,fontWeight:'bold',color:'#f59e0b'}}>Pollination</p><button style={{marginTop:8,padding:'8px 16px',borderRadius:8,background:'#f59e0b',color:'white',border:'none',cursor:'pointer',fontSize:11}}>Connect</button></div>
      </div>
    </div>
  </div>
}

function ReferralPage({ dark }) {
  const [referrals, setReferrals] = useState(()=>{try{return JSON.parse(localStorage.getItem('fd_referrals')||'[]')}catch{return[]}})
  const [refName, setRefName] = useState('')
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:700,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🎁 Referral</h1>
      <div style={{background:dark?'#1f2937':'white',borderRadius:14,padding:20,margin:'16px 0',textAlign:'center'}}>
        <p style={{fontSize:28,fontWeight:'bold',color:'#166534'}}>KES {referrals.length*100}</p><p style={{fontSize:11}}>Credits Earned | {referrals.length} referred</p>
      </div>
      <div style={{display:'flex',gap:8}}><input placeholder="Farmer name" value={refName} onChange={e=>setRefName(e.target.value)} style={{flex:1,padding:10,borderRadius:8,border:'1px solid #d1d5db',fontSize:12}} /><button onClick={()=>{if(!refName.trim())return;setReferrals([...referrals,{name:refName}]);localStorage.setItem('fd_referrals',JSON.stringify([...referrals,{name:refName}]));setRefName('')}} style={{padding:'10px 20px',borderRadius:8,background:'#166534',color:'white',border:'none',cursor:'pointer'}}>Add</button></div>
    </div>
  </div>
}

function PhotoGallery({ dark }) {
  const [photos, setPhotos] = useState(()=>{try{return JSON.parse(localStorage.getItem('fd_photos')||'[]')}catch{return[]}})
  const [caption, setCaption] = useState(''); const [uploading, setUploading] = useState(false)
  const upload = () => { if(!caption.trim())return; setUploading(true); setTimeout(()=>{setPhotos([{id:Date.now(),caption,date:new Date().toLocaleDateString(),emoji:'📸'},...photos]);localStorage.setItem('fd_photos',JSON.stringify([{id:Date.now(),caption,date:new Date().toLocaleDateString(),emoji:'📸'},...photos]));setCaption('');setUploading(false)},1500) }
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:800,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>📸 Photos</h1>
      <div style={{background:dark?'#1f2937':'white',borderRadius:14,padding:20,margin:'16px 0'}}>
        <input placeholder="Caption..." value={caption} onChange={e=>setCaption(e.target.value)} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #d1d5db',marginBottom:8,fontSize:12,boxSizing:'border-box'}} />
        <button onClick={upload} disabled={uploading||!caption.trim()} style={{width:'100%',padding:12,borderRadius:8,background:(uploading||!caption.trim())?'#d1d5db':'#166534',color:'white',border:'none',cursor:(uploading||!caption.trim())?'default':'pointer',fontWeight:600}}>{uploading?'Uploading...':'📸 Upload Photo'}</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))',gap:8}}>
        {photos.map(p=><div key={p.id} style={{background:dark?'#1f2937':'white',borderRadius:10,padding:12,textAlign:'center'}}><span style={{fontSize:40}}>{p.emoji}</span><p style={{fontSize:11,marginTop:4}}>{p.caption}</p><p style={{fontSize:9,color:'#6b7280'}}>{p.date}</p></div>)}
      </div>
    </div>
  </div>
}

function LocationMap({ dark }) {
  const counties = ["Baringo","Bomet","Bungoma","Busia","Elgeyo Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Muranga","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita Taveta","Tana River","Tharaka Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"]
  const [search, setSearch] = useState('')
  const filtered = counties.filter(c=>c.toLowerCase().includes(search.toLowerCase()))
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:900,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🗺️ All 47 Counties</h1>
      <input placeholder="Search county..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:'100%',padding:10,borderRadius:10,border:'1px solid #d1d5db',margin:'12px 0',fontSize:13}} />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))',gap:8}}>
        {filtered.map(c=><div key={c} style={{background:dark?'#1f2937':'white',borderRadius:10,padding:12,border:'1px solid '+(dark?'#374151':'#e5e7eb')}}><p style={{fontWeight:600,fontSize:12,color:'#166534'}}>📍 {c}</p><p style={{fontSize:9,color:'#6b7280'}}>👨‍🌾 Farmers</p></div>)}
      </div>
    </div>
  </div>
}

function App() {
  const [dark,setDark]=useState(false); const [cart,setCart]=useState([])
  return <Router>
    <Navbar dark={dark} setDark={setDark} cart={cart} />
    <Routes>
      <Route path="/" element={<Marketplace dark={dark} cart={cart} setCart={setCart} />} />
      <Route path="/livestock" element={<LivestockPage dark={dark} cart={cart} setCart={setCart} />} />
      <Route path="/products" element={<ProductsPage dark={dark} cart={cart} setCart={setCart} />} />
      <Route path="/delivery" element={<DeliveryPage dark={dark} />} />
      <Route path="/weather" element={<WeatherPage dark={dark} />} />
      <Route path="/community" element={<CommunityPage dark={dark} />} />
      <Route path="/farmbot" element={<FarmBot dark={dark} />} />
      <Route path="/mpesa" element={<MpesaCheckout dark={dark} cart={cart} setCart={setCart} />} />
      <Route path="/blockchain" element={<BlockchainLedger dark={dark} />} />
      <Route path="/academy" element={<EducationPage dark={dark} />} />
      <Route path="/disputes" element={<DisputeCenter dark={dark} />} />
      <Route path="/sustainability" element={<SustainabilityPage dark={dark} />} />
      <Route path="/refer" element={<ReferralPage dark={dark} />} />
      <Route path="/photos" element={<PhotoGallery dark={dark} />} />
      <Route path="/videocall" element={<VideoCallPage dark={dark} />} /><Route path="/tracking" element={<TrackingPage dark={dark} />} /><Route path="/map" element={<LocationMap dark={dark} />} />
      <Route path="/cart" element={<CartPage dark={dark} cart={cart} setCart={setCart} />} />
    </Routes>
    <BottomNav />
  </Router>
}

export default App

function VideoCallPage({ dark }) {
  const [inCall, setInCall] = useState(false); const [callDuration, setCallDuration] = useState(0); const [timer, setTimer] = useState(null)
  const startCall = () => { setInCall(true); setTimer(setInterval(()=>setCallDuration(p=>p+1),1000)) }
  const endCall = () => { setInCall(false); clearInterval(timer); setCallDuration(0) }
  const fmt = (s) => { const m=Math.floor(s/60); return m.toString().padStart(2,'0')+':'+(s%60).toString().padStart(2,'0') }
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}><div style={{maxWidth:700,margin:'0 auto'}}>
    {!inCall ? <><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>📹 Video Calls</h1><div style={{background:dark?'#1f2937':'white',borderRadius:14,padding:20,margin:'16px 0',textAlign:'center'}}><span style={{fontSize:60}}>📹</span><p style={{marginTop:8}}>Live video call with farmers and buyers</p><button onClick={startCall} style={{marginTop:16,padding:'14px 40px',borderRadius:10,background:'#166534',color:'white',border:'none',cursor:'pointer',fontWeight:600,fontSize:16}}>📹 Start Call</button></div></>
    : <div style={{background:'#111827',borderRadius:16,overflow:'hidden',position:'relative',minHeight:'70vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <div style={{width:100,height:100,borderRadius:'50%',background:'#374151',display:'flex',alignItems:'center',justifyContent:'center',fontSize:40,marginBottom:12}}>👨‍🌾</div>
      <p style={{color:'white',fontSize:18,fontWeight:'bold'}}>John Farmer</p><p style={{color:'#9ca3af'}}>{fmt(callDuration)}</p>
      <button onClick={endCall} style={{marginTop:20,width:55,height:55,borderRadius:'50%',background:'#dc2626',color:'white',border:'none',cursor:'pointer',fontSize:22}}>📞</button>
    </div>}
  </div></div>
}

function TrackingPage({ dark }) {
  const [tid, setTid] = useState(''); const [res, setRes] = useState(null)
  const orders = { 'FD-001': {id:'FD-001',item:'Maize (5 bags)',farmer:'John Farmer',buyer:'Grace Akinyi',from:'Kitale',to:'Nairobi',rider:'James Mwangi',status:'In Transit',progress:65,eta:'2 hours',updates:[{time:'08:00',status:'Order Placed',location:'Kitale',icon:'📝'},{time:'08:30',status:'Picked up',location:'Kitale Depot',icon:'🏍️'},{time:'10:45',status:'Passing Nakuru',location:'Nakuru',icon:'📍'},{time:'12:30',status:'ETA Nairobi',location:'Naivasha',icon:'🚛'}]}}
  const track = () => setRes(orders[tid.toUpperCase()]||null)
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}><div style={{maxWidth:700,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>📍 Track Goods</h1><div style={{background:dark?'#1f2937':'white',borderRadius:14,padding:20,margin:'16px 0'}}><div style={{display:'flex',gap:8}}><input placeholder="FD-001" value={tid} onChange={e=>setTid(e.target.value)} onKeyDown={e=>e.key==='Enter'&&track()} style={{flex:1,padding:14,borderRadius:10,border:'1px solid #d1d5db',fontSize:18,textAlign:'center',textTransform:'uppercase',letterSpacing:2,fontWeight:'bold'}} /><button onClick={track} style={{padding:'14px 24px',borderRadius:10,background:'#166534',color:'white',border:'none',cursor:'pointer',fontWeight:600}}>Track</button></div></div>
  {res && <div style={{background:dark?'#1f2937':'white',borderRadius:14,padding:20}}><h3>{res.id} - {res.item}</h3><div style={{width:'100%',background:dark?'#374151':'#e5e7eb',borderRadius:9999,height:10,margin:'12px 0'}}><div style={{background:res.progress===100?'#16a34a':'#166534',height:10,borderRadius:9999,width:res.progress+'%'}}></div></div><p>👨‍🌾 {res.farmer} → 🛒 {res.buyer} | 🚚 {res.rider}</p><p style={{marginTop:8}}>📍 {res.from} → {res.to} | ETA: {res.eta}</p></div>}
  </div></div>
}
