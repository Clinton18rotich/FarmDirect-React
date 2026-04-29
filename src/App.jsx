import React, { useState } from 'react'
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
  { id:5, name:'Peter Otieno', vehicle:'Livestock Truck', rating:4.5, location:'Narok', price:2000, image:'🚚', available:true },
]

const weatherData = {
  'Nairobi': { temp:24, humidity:65, wind:12, condition:'Partly Cloudy', icon:'⛅', forecast:[{day:'Today',hi:26,lo:17,icon:'⛅'},{day:'Thu',hi:27,lo:16,icon:'☀️'},{day:'Fri',hi:25,lo:18,icon:'🌧️'},{day:'Sat',hi:24,lo:17,icon:'⛅'},{day:'Sun',hi:26,lo:16,icon:'☀️'}], advisory:'Good time for planting maize. Light irrigation recommended.' },
  'Kitale': { temp:22, humidity:72, wind:8, condition:'Sunny', icon:'☀️', forecast:[{day:'Today',hi:25,lo:14,icon:'☀️'},{day:'Thu',hi:26,lo:13,icon:'☀️'},{day:'Fri',hi:24,lo:15,icon:'⛅'},{day:'Sat',hi:23,lo:14,icon:'🌧️'},{day:'Sun',hi:25,lo:13,icon:'☀️'}], advisory:'Excellent conditions for wheat harvesting. Low pest risk.' },
  'Nakuru': { temp:23, humidity:60, wind:15, condition:'Windy', icon:'💨', forecast:[{day:'Today',hi:25,lo:15,icon:'💨'},{day:'Thu',hi:26,lo:14,icon:'⛅'},{day:'Fri',hi:24,lo:16,icon:'☀️'},{day:'Sat',hi:23,lo:15,icon:'☀️'},{day:'Sun',hi:25,lo:14,icon:'⛅'}], advisory:'Windy conditions - delay spraying pesticides. Check greenhouses.' },
}

function Navbar({ dark, setDark, cart }) {
  const nav = useNavigate()
  return <nav style={{background:dark?'#1a3c2a':'#166534',padding:'12px 16px',position:'sticky',top:0,zIndex:50}}>
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
  const [moreOpen, setMoreOpen] = useState(false);
  const m = [{icon:"🏠",label:"Market",path:"/"},{icon:"🐄",label:"Livestock",path:"/livestock"},{icon:"🚚",label:"Delivery",path:"/delivery"},{icon:"🌤️",label:"Weather",path:"/weather"},{icon:"👥",label:"Community",path:"/community"}];
  const x = [{icon:"🥚",label:"Products",path:"/products"},{icon:"🤖",label:"FarmBot",path:"/farmbot"},{icon:"⛓️",label:"Ledger",path:"/blockchain"},{icon:"🎓",label:"Academy",path:"/academy"},{icon:"⚖️",label:"Disputes",path:"/disputes"},{icon:"🌍",label:"Green",path:"/sustainability"},{icon:"🎁",label:"Refer",path:"/refer"},{icon:"🛒",label:"Cart",path:"/cart"}];
  return React.createElement("div",null,
    moreOpen && React.createElement("div",{style:{position:"fixed",bottom:56,left:0,right:0,background:"#14532d",padding:12,zIndex:49,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}},
      x.map(i=>React.createElement(Link,{key:i.path,to:i.path,onClick:()=>setMoreOpen(false),style:{color:"white",textDecoration:"none",fontSize:8,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:6}},React.createElement("span",{style:{fontSize:18}},i.icon),i.label))
    ),
    React.createElement("div",{style:{position:"fixed",bottom:0,left:0,right:0,background:"#166534",display:"flex",justifyContent:"space-around",padding:"6px 0",zIndex:50}},
      m.map(i=>React.createElement(Link,{key:i.path,to:i.path,style:{color:"white",textDecoration:"none",fontSize:8,display:"flex",flexDirection:"column",alignItems:"center",gap:1}},React.createElement("span",{style:{fontSize:16}},i.icon),i.label)),
      React.createElement("div",{onClick:()=>setMoreOpen(!moreOpen),style:{color:"white",fontSize:8,display:"flex",flexDirection:"column",alignItems:"center",gap:1,cursor:"pointer"}},React.createElement("span",{style:{fontSize:16}},moreOpen?"✕":"⋯"),"More")
    )
  );
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
          <span style={{fontSize:36}}>{item.image}</span>
          <h3 style={{fontSize:16,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{item.name}</h3>
          <p style={{fontSize:11,color:'#6b7280'}}>{item.category} | {item.unit} | 📍 {item.location}</p>
          <p style={{fontSize:11,color:'#6b7280'}}>👨‍🌾 {item.seller} | {item.grade}</p>
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
      {cart.length===0?<p style={{textAlign:'center',color:'#6b7280',padding:40}}>Cart is empty. Start shopping!</p>:
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
  const [estimatedFee,setEstimatedFee]=useState(0); const [selectedRider,setSelectedRider]=useState(null)
  const calcFee = () => { if(!pickup||!dropoff||!weight) return; setEstimatedFee(Math.floor(Math.random()*2000)+300+parseInt(weight||0)*5) }
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1000,margin:'0 auto'}}>
      <h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🚚 Delivery & Logistics</h1>
      <div style={{background:dark?'#1f2937':'white',borderRadius:14,padding:20,marginBottom:20}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:10,marginBottom:12}}>
          <input placeholder="Pickup location" value={pickup} onChange={e=>setPickup(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid #d1d5db',fontSize:12}} />
          <input placeholder="Drop-off location" value={dropoff} onChange={e=>setDropoff(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid #d1d5db',fontSize:12}} />
          <input placeholder="Weight (kg)" type="number" value={weight} onChange={e=>setWeight(e.target.value)} style={{padding:10,borderRadius:8,border:'1px solid #d1d5db',fontSize:12}} />
        </div>
        <button onClick={calcFee} disabled={!pickup||!dropoff||!weight} style={{padding:'10px 20px',borderRadius:8,background:(!pickup||!dropoff||!weight)?'#d1d5db':'#166534',color:'white',border:'none',cursor:(!pickup||!dropoff||!weight)?'default':'pointer',fontWeight:600}}>Calculate Fee</button>
        {estimatedFee>0&&<div style={{marginTop:12,background:'#dcfce7',borderRadius:8,padding:12}}><p style={{fontSize:14,fontWeight:'bold',color:'#15803d'}}>Estimated: KES {estimatedFee.toLocaleString()}</p></div>}
      </div>
      <h3 style={{fontSize:15,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:12}}>🏍️ Available Riders</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12,marginBottom:20}}>
        {riders.map(r=><div key={r.id} style={{background:dark?'#1f2937':'white',borderRadius:12,padding:16}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:28}}>{r.image}</span><div><h4 style={{fontSize:14,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{r.name}</h4><p style={{fontSize:11,color:'#6b7280'}}>{r.vehicle} | ⭐{r.rating}</p></div></div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
            <p style={{fontSize:16,fontWeight:'bold',color:'#166534'}}>From KES {r.price}</p>
            <button onClick={()=>setSelectedRider(selectedRider===r.id?null:r.id)} style={{padding:'6px 14px',borderRadius:8,background:selectedRider===r.id?'#166534':'#e5e7eb',color:selectedRider===r.id?'white':'#374151',border:'none',cursor:'pointer',fontSize:11}}>{selectedRider===r.id?'Selected':'Select'}</button>
          </div>
        </div>)}
      </div>
    </div>
  </div>
}

function WeatherPage({ dark }) {
  const [location,setLocation]=useState('Nairobi'); const w = weatherData[location]
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:900,margin:'0 auto'}}>
      <h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🌤️ Weather</h1>
      <select value={location} onChange={e=>setLocation(e.target.value)} style={{padding:10,borderRadius:10,border:'1px solid #d1d5db',fontSize:13,fontWeight:600,marginBottom:16}}>{Object.keys(weatherData).map(l=><option key={l}>{l}</option>)}</select>
      <div style={{background:dark?'#1f2937':'white',borderRadius:16,padding:24,marginBottom:20,textAlign:'center',backgroundImage:'linear-gradient(135deg, #fef3c7, #fde68a)'}}>
        <span style={{fontSize:60}}>{w.icon}</span><p style={{fontSize:40,fontWeight:'bold',color:'#111827'}}>{w.temp}°C</p><p style={{fontSize:16,color:'#374151'}}>{w.condition}</p>
      </div>
      <h3 style={{fontSize:15,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:8}}>📅 5-Day Forecast</h3>
      <div style={{display:'flex',gap:8,overflowX:'auto',marginBottom:20}}>
        {w.forecast.map((f,i)=><div key={i} style={{minWidth:90,background:dark?'#1f2937':'white',borderRadius:12,padding:12,textAlign:'center'}}>
          <p style={{fontSize:10,color:dark?'#9ca3af':'#6b7280'}}>{f.day}</p><span style={{fontSize:24}}>{f.icon}</span>
          <p style={{fontSize:13,fontWeight:'bold',color:dark?'#f9fafb':'#111827'}}>{f.hi}°</p><p style={{fontSize:10,color:'#6b7280'}}>{f.lo}°</p>
        </div>)}
      </div>
      <div style={{background:'#dcfce7',borderRadius:12,padding:16}}><h3 style={{fontSize:14,fontWeight:600,color:'#15803d',marginBottom:6}}>🌱 Farming Advisory</h3><p style={{fontSize:13,color:'#374151'}}>{w.advisory}</p></div>
    </div>
  </div>
}

function CommunityPage({ dark }) {
  const [activeTab, setActiveTab] = useState('forums')
  const [chatOpen, setChatOpen] = useState(null); const [chatText, setChatText] = useState('')
  const [messages] = useState([{id:1, from:'Grace Akinyi', text:'Anyone selling organic avocados?', time:'10:30 AM'},{id:2, from:'James Mwangi', text:'Delivery from Kitale to Nairobi tomorrow!', time:'9:15 AM'}])
  const forumPosts = [{id:1, title:'Best time to plant maize?', author:'John Farmer', replies:12, views:145, category:'Crops', time:'2h ago'},{id:2, title:'Tips for organic tomatoes', author:'Mary Wanjiku', replies:8, views:89, category:'Organic', time:'5h ago'},{id:3, title:'Affordable dairy feed?', author:'Kiprotich Farm', replies:23, views:230, category:'Livestock', time:'1d ago'}]
  const cooperatives = [{id:1, name:'Kitale Maize Co-op', members:234, location:'Kitale', crop:'Maize', image:'🌽'},{id:2, name:'Muranga Avocado Growers', members:156, location:'Muranga', crop:'Avocados', image:'🥑'}]
  const sendChat = () => { if(!chatText.trim()) return; setChatText('') }
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1000,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>👥 Community</h1>
      <div style={{display:'flex',gap:8,margin:'16px 0'}}>{['forums','chat','cooperatives','mentors'].map(tab=><button key={tab} onClick={()=>setActiveTab(tab)} style={{padding:'8px 18px',borderRadius:20,border:'none',background:activeTab===tab?'#166534':dark?'#374151':'#e5e7eb',color:activeTab===tab?'white':dark?'#d1d5db':'#374151',cursor:'pointer',fontSize:12,textTransform:'capitalize'}}>{tab}</button>)}</div>
      {activeTab==='forums' && forumPosts.map(p=><div key={p.id} style={{background:dark?'#1f2937':'white',borderRadius:10,padding:14,marginBottom:8}}><h4 style={{fontSize:14,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{p.title}</h4><div style={{display:'flex',gap:12,fontSize:10,color:dark?'#9ca3af':'#6b7280'}}><span>👤 {p.author}</span><span>💬 {p.replies}</span><span>👁️ {p.views}</span><span>🏷️ {p.category}</span></div></div>)}
      {activeTab==='cooperatives' && <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))',gap:12}}>{cooperatives.map(c=><div key={c.id} style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20,textAlign:'center'}}><span style={{fontSize:40}}>{c.image}</span><h4 style={{fontSize:15,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{c.name}</h4><p style={{fontSize:11,color:'#6b7280'}}>📍 {c.location} | 👥 {c.members}</p><button style={{marginTop:10,padding:'8px 20px',borderRadius:16,background:'#166534',color:'white',border:'none',cursor:'pointer',fontSize:11}}>Join</button></div>)}</div>}
    </div>
  </div>
}

function FarmBot({ dark }) {
  const [messages, setMessages] = useState([{role:'bot', text:'👋 Hello! I am FarmBot. Ask me about crops, weather, pests, or market prices!'}])
  const [input, setInput] = useState(''); const [thinking, setThinking] = useState(false)
  const farmKnowledge = { maize:'🌽 Maize grows best at 20-30°C. Plant at start of rains. Space 75cm apart. Harvest when dry (3-6 months). Price: KES 3,500/90kg.', beans:'🫘 Beans need well-drained soil. Plant 2-3cm deep. Fix nitrogen in soil. Price: KES 8,000/90kg.', default:'I can help with crops, livestock, weather, pests, and market prices. Try: "How to grow maize?"' }
  const ask = () => { if(!input.trim()) return; setMessages(prev=>[...prev,{role:'user',text:input}]); setInput(''); setThinking(true); setTimeout(()=>{ const q=input.toLowerCase(); let r=farmKnowledge.default; if(q.includes('maize')) r=farmKnowledge.maize; if(q.includes('bean')) r=farmKnowledge.beans; setMessages(prev=>[...prev,{role:'bot',text:r}]); setThinking(false) },1000) }
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:700,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534'}}>🤖 FarmBot AI</h1>
      <div style={{background:dark?'#1f2937':'white',borderRadius:16,padding:16,minHeight:350,maxHeight:450,overflowY:'auto',marginBottom:12}}>
        {messages.map((m,i)=><div key={i} style={{alignSelf:m.role==='user'?'flex-end':'flex-start',maxWidth:'85%',background:m.role==='user'?'#166534':dark?'#111827':'#f0fdf4',color:m.role==='user'?'white':dark?'#f9fafb':'#111827',padding:'10px 14px',borderRadius:12,fontSize:13,marginBottom:6}}>{m.text}</div>)}
        {thinking&&<div style={{color:dark?'#9ca3af':'#6b7280',fontSize:12,fontStyle:'italic'}}>🤔 Thinking...</div>}
      </div>
      <div style={{display:'flex',gap:6}}><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask()} placeholder="Ask about farming..." style={{flex:1,padding:12,borderRadius:24,border:'1px solid #d1d5db',fontSize:13}} /><button onClick={ask} style={{padding:'12px 20px',borderRadius:24,background:'#166534',color:'white',border:'none',cursor:'pointer',fontWeight:600}}>Send</button></div>
    </div>
  </div>
}

function MpesaCheckout({ dark, cart, setCart }) {
  const [phone, setPhone] = useState(''); const [step, setStep] = useState(0); const [pin, setPin] = useState('')
  const [processing, setProcessing] = useState(false); const [result, setResult] = useState(null)
  const total = cart.reduce((s,i)=>s+(i.price*i.qty),0)
  const confirmPayment = () => { if(pin.length<4) return; setProcessing(true); setTimeout(()=>{ setResult('success'); setProcessing(false); setStep(2); setCart([]); localStorage.setItem('fd_orders', JSON.stringify([...JSON.parse(localStorage.getItem('fd_orders')||'[]'), {items:cart, total, phone, date:new Date().toLocaleString(), ref:'MP'+Date.now().toString(36).toUpperCase()}])) },2000) }
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:500,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534',marginBottom:16}}>💳 M-Pesa Checkout</h1>
      {step===0 && <div style={{background:dark?'#1f2937':'white',borderRadius:16,padding:24,textAlign:'center'}}>
        <span style={{fontSize:48}}>📱</span><p style={{fontSize:28,fontWeight:'bold',color:dark?'#f9fafb':'#111827'}}>KES {total.toLocaleString()}</p>
        <input placeholder="0712345678" value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',padding:14,borderRadius:10,border:'1px solid #d1d5db',fontSize:16,textAlign:'center',margin:'16px 0',boxSizing:'border-box'}} />
        <button onClick={()=>setStep(1)} disabled={!phone} style={{width:'100%',padding:16,borderRadius:10,background:phone?'#166534':'#d1d5db',color:'white',border:'none',fontSize:16,fontWeight:'bold',cursor:phone?'pointer':'default'}}>💳 Pay with M-Pesa</button>
      </div>}
      {step===1 && <div style={{background:dark?'#1f2937':'white',borderRadius:16,padding:24,textAlign:'center'}}>
        <span style={{fontSize:48}}>🔐</span><p style={{fontSize:16,fontWeight:'bold',color:dark?'#f9fafb':'#111827'}}>Confirm Payment</p>
        <input type="password" placeholder="M-Pesa PIN" value={pin} onChange={e=>setPin(e.target.value)} maxLength={4} style={{width:'100%',padding:14,borderRadius:10,border:'1px solid #d1d5db',fontSize:20,textAlign:'center',margin:'16px 0',boxSizing:'border-box',letterSpacing:8}} />
        {processing?<p style={{color:'#166534'}}>⏳ Processing...</p>:<div style={{display:'flex',gap:8}}><button onClick={()=>setStep(0)} style={{flex:1,padding:14,borderRadius:10,border:'1px solid #d1d5db',background:'transparent',color:dark?'#d1d5db':'#374151',cursor:'pointer'}}>Cancel</button><button onClick={confirmPayment} style={{flex:1,padding:14,borderRadius:10,background:'#166534',color:'white',border:'none',cursor:'pointer',fontWeight:'bold'}}>Send</button></div>}
      </div>}
      {step===2 && <div style={{background:dark?'#1f2937':'white',borderRadius:16,padding:24,textAlign:'center'}}>
        <span style={{fontSize:60}}>✅</span><p style={{fontSize:20,fontWeight:'bold',color:'#15803d'}}>Payment Successful!</p>
        <p style={{fontSize:13,color:dark?'#9ca3af':'#6b7280',marginBottom:16}}>KES {total.toLocaleString()} paid. Receipt sent to {phone}.</p>
        <Link to="/" style={{display:'inline-block',padding:'10px 24px',borderRadius:8,background:'#166534',color:'white',textDecoration:'none',fontSize:13}}>Continue Shopping</Link>
      </div>}
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
      <Route path="/blockchain" element={<BlockchainLedger dark={dark} />} /><Route path="/academy" element={<EducationPage dark={dark} />} /><Route path="/disputes" element={<DisputeCenter dark={dark} />} /><Route path="/sustainability" element={<SustainabilityPage dark={dark} />} /><Route path="/refer" element={<ReferralPage dark={dark} />} /><Route path="/cart" element={<CartPage dark={dark} cart={cart} setCart={setCart} />} />
    </Routes>
    <BottomNav />
  </Router>
}

export default App

// ========== RECORDS & BLOCKCHAIN LEDGER ==========
function BlockchainLedger({ dark }) {
  const [transactions, setTransactions] = useState(()=>{try{return JSON.parse(localStorage.getItem('fd_blockchain')||'[]')}catch{return[]}})
  const [orders] = useState(()=>{try{return JSON.parse(localStorage.getItem('fd_orders')||'[]')}catch{return[]}})
  
  const allTransactions = [
    {id:'TX001', type:'Sale', from:'John Farmer', to:'Grace Akinyi', item:'Maize 5 bags', amount:17500, date:'2026-04-25', hash:'0x7f3a...b9c1', verified:true},
    {id:'TX002', type:'Sale', from:'Mary Wanjiku', to:'Kiprotich Farm', item:'Beans 3 bags', amount:24000, date:'2026-04-26', hash:'0x8e4b...d2f3', verified:true},
    {id:'TX003', type:'Delivery', from:'James Mwangi', to:'Peter Mwangi', item:'Transport', amount:750, date:'2026-04-27', hash:'0x9c5d...a1e4', verified:true},
    {id:'TX004', type:'Sale', from:'Grace Akinyi', to:'Sarah Chebet', item:'Avocados 2 crates', amount:9000, date:'2026-04-28', hash:'0x2f6e...c8b2', verified:true},
  ]

  const generateHash = () => '0x' + Math.random().toString(16).substring(2,10) + '...' + Math.random().toString(16).substring(2,6)

  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1000,margin:'0 auto'}}>
      <h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534',marginBottom:4}}>⛓️ Blockchain Ledger</h1>
      <p style={{color:dark?'#9ca3af':'#6b7280',fontSize:13,marginBottom:16}}>Immutable transaction records — every sale and delivery is permanently recorded</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))',gap:10,marginBottom:20}}>
        <div style={{background:dark?'#1f2937':'white',borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#166534'}}>{allTransactions.length+orders.length}</p><p style={{fontSize:9,color:dark?'#9ca3af':'#6b7280'}}>Total Transactions</p></div>
        <div style={{background:dark?'#1f2937':'white',borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#4f46e5'}}>{allTransactions.filter(t=>t.verified).length+orders.length}</p><p style={{fontSize:9,color:dark?'#9ca3af':'#6b7280'}}>Verified Blocks</p></div>
        <div style={{background:dark?'#1f2937':'white',borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#15803d'}}>KES {allTransactions.reduce((s,t)=>s+t.amount,0).toLocaleString()}</p><p style={{fontSize:9,color:dark?'#9ca3af':'#6b7280'}}>Total Value</p></div>
      </div>

      <div style={{background:dark?'#1f2937':'white',borderRadius:12,overflow:'auto',marginBottom:20}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:11}}>
          <thead><tr style={{background:dark?'#111827':'#f9fafb'}}>
            <th style={{padding:'8px 10px',textAlign:'left',color:dark?'#f9fafb':'#111827'}}>ID</th><th style={{padding:'8px 10px',textAlign:'left',color:dark?'#f9fafb':'#111827'}}>Type</th><th style={{padding:'8px 10px',textAlign:'left',color:dark?'#f9fafb':'#111827'}}>From → To</th><th style={{padding:'8px 10px',textAlign:'left',color:dark?'#f9fafb':'#111827'}}>Item</th><th style={{padding:'8px 10px',textAlign:'left',color:dark?'#f9fafb':'#111827'}}>Amount</th><th style={{padding:'8px 10px',textAlign:'left',color:dark?'#f9fafb':'#111827'}}>Hash</th><th style={{padding:'8px 10px',textAlign:'left',color:dark?'#f9fafb':'#111827'}}>Status</th>
          </tr></thead>
          <tbody>
            {allTransactions.map(tx=><tr key={tx.id} style={{borderTop:'1px solid '+(dark?'#374151':'#e5e7eb')}}>
              <td style={{padding:'8px 10px',color:'#4f46e5',fontSize:10}}>{tx.id}</td>
              <td style={{padding:'8px 10px',color:dark?'#f9fafb':'#111827'}}>{tx.type}</td>
              <td style={{padding:'8px 10px',color:dark?'#f9fafb':'#111827',fontSize:10}}>{tx.from} → {tx.to}</td>
              <td style={{padding:'8px 10px',color:dark?'#f9fafb':'#111827',fontSize:10}}>{tx.item}</td>
              <td style={{padding:'8px 10px',color:'#166534',fontWeight:'bold'}}>KES {tx.amount.toLocaleString()}</td>
              <td style={{padding:'8px 10px',fontFamily:'monospace',fontSize:10,color:dark?'#9ca3af':'#6b7280'}}>{tx.hash}</td>
              <td style={{padding:'8px 10px'}}><span style={{padding:'3px 8px',borderRadius:9999,fontSize:9,background:'#dcfce7',color:'#15803d'}}>✅ Verified</span></td>
            </tr>)}
          </tbody>
        </table>
      </div>

      <button onClick={()=>{const data={transactions:allTransactions,orders,hash:generateHash(),exportedAt:new Date().toISOString()};const b=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='farmdirect_ledger_'+Date.now()+'.json';a.click()}} style={{padding:'10px 20px',borderRadius:8,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:12}}>📥 Download Ledger Backup</button>
    </div>
  </div>
}

// ========== EDUCATION & CONTENT ==========
function EducationPage({ dark }) {
  const [activeCourse, setActiveCourse] = useState(null)
  const courses = [
    {id:1, title:'Sustainable Maize Farming', instructor:'Dr. Sarah Chen', lessons:8, duration:'4 hours', enrolled:234, rating:4.8, level:'Beginner', icon:'🌽', description:'Learn modern maize farming techniques: soil preparation, planting, pest control, harvesting, and storage.'},
    {id:2, title:'Organic Vegetable Production', instructor:'Prof. Emily Park', lessons:12, duration:'6 hours', enrolled:156, rating:4.9, level:'Intermediate', icon:'🍅', description:'Master organic farming: composting, natural pest control, crop rotation, and organic certification.'},
    {id:3, title:'Dairy Farming Best Practices', instructor:'James Rodriguez', lessons:6, duration:'3 hours', enrolled:89, rating:4.7, level:'Beginner', icon:'🐄', description:'Complete guide to dairy farming: breed selection, feeding, milking, health management, and marketing.'},
    {id:4, title:'Agribusiness & Marketing', instructor:'Grace Akinyi', lessons:10, duration:'5 hours', enrolled:312, rating:4.6, level:'Advanced', icon:'📊', description:'Turn farming into a business: market analysis, pricing strategies, value addition, and export opportunities.'},
  ]

  const podcastEpisodes = [
    {id:1, title:'Weather Patterns and Planting Seasons', host:'FarmDirect Radio', duration:'15 min', date:'April 28', icon:'🎙️'},
    {id:2, title:'Success Story: How I Earn KES 200K/Month from Tomatoes', host:'Farmer Stories', duration:'22 min', date:'April 25', icon:'🎙️'},
    {id:3, title:'Market Price Update: What to Plant This Season', host:'Market Watch', duration:'10 min', date:'April 24', icon:'🎙️'},
  ]

  const seasonalCalendar = [
    {month:'Jan-Feb', task:'Land preparation, order seeds', crops:'Maize, Beans'},
    {month:'Mar-Apr', task:'Planting (long rains)', crops:'Maize, Beans, Vegetables'},
    {month:'May-Jun', task:'Weeding, fertilizer application', crops:'All crops'},
    {month:'Jul-Aug', task:'Harvesting (long rains crops)', crops:'Maize, Beans'},
    {month:'Sep-Oct', task:'Planting (short rains)', crops:'Beans, Vegetables'},
    {month:'Nov-Dec', task:'Harvesting (short rains), soil resting', crops:'Beans, Vegetables'},
  ]

  if (activeCourse) {
    const course = courses.find(c=>c.id===activeCourse)
    return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
      <div style={{maxWidth:800,margin:'0 auto'}}>
        <button onClick={()=>setActiveCourse(null)} style={{background:'none',border:'none',color:'#166534',cursor:'pointer',fontSize:13,marginBottom:16}}>← Back to Courses</button>
        <div style={{background:dark?'#1f2937':'white',borderRadius:16,padding:24}}>
          <span style={{fontSize:60}}>{course.icon}</span>
          <h1 style={{fontSize:22,fontWeight:'bold',color:dark?'#f9fafb':'#111827',marginBottom:8}}>{course.title}</h1>
          <p style={{color:dark?'#9ca3af':'#6b7280',marginBottom:8}}>👨‍🏫 {course.instructor} | {course.lessons} lessons | {course.duration} | ⭐{course.rating}</p>
          <p style={{fontSize:13,color:dark?'#f9fafb':'#111827',lineHeight:1.6,marginBottom:16}}>{course.description}</p>
          <div style={{background:dark?'#111827':'#f0fdf4',borderRadius:8,padding:16,marginBottom:16}}>
            <h3 style={{fontSize:14,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:8}}>📚 Course Lessons</h3>
            {Array.from({length:course.lessons},(_,i)=><div key={i} style={{padding:'8px 0',borderBottom:i<course.lessons-1?'1px solid '+(dark?'#374151':'#e5e7eb'):'none',display:'flex',alignItems:'center',gap:8,fontSize:12,color:dark?'#d1d5db':'#374151'}}><span>📖</span> Lesson {i+1}: {['Introduction','Soil Preparation','Planting Techniques','Pest Management','Irrigation','Harvesting','Storage & Marketing','Certification'][i]||'Advanced Topics'}</div>)}
          </div>
          <button style={{width:'100%',padding:14,borderRadius:10,background:'#166534',color:'white',border:'none',fontSize:15,fontWeight:'bold',cursor:'pointer'}}>🎓 Enroll Now — Free</button>
        </div>
      </div>
    </div>
  }

  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1000,margin:'0 auto'}}>
      <h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534',marginBottom:4}}>🎓 Farming Academy</h1>
      <p style={{color:dark?'#9ca3af':'#6b7280',fontSize:13,marginBottom:16}}>Free courses, podcasts, and seasonal guides</p>

      <h3 style={{fontSize:16,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:12}}>📚 Popular Courses</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12,marginBottom:24}}>
        {courses.map(c=><div key={c.id} onClick={()=>setActiveCourse(c.id)} style={{background:dark?'#1f2937':'white',borderRadius:12,padding:16,cursor:'pointer',border:'1px solid '+(dark?'#374151':'#e5e7eb'),transition:'all 0.2s'}}>
          <span style={{fontSize:36}}>{c.icon}</span>
          <h4 style={{fontSize:15,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:4}}>{c.title}</h4>
          <p style={{fontSize:11,color:'#6b7280',marginBottom:4}}>👨‍🏫 {c.instructor}</p>
          <div style={{display:'flex',gap:8,fontSize:10,color:'#6b7280',marginBottom:4}}><span>📖 {c.lessons} lessons</span><span>⏱️ {c.duration}</span><span>⭐ {c.rating}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
            <span style={{padding:'3px 8px',borderRadius:9999,fontSize:9,background:'#eef2ff',color:'#4f46e5'}}>{c.level}</span>
            <span style={{fontSize:10,color:'#6b7280'}}>👥 {c.enrolled} enrolled</span>
          </div>
        </div>)}
      </div>

      <h3 style={{fontSize:16,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:12}}>🎙️ Podcast Network</h3>
      <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:24}}>
        {podcastEpisodes.map(p=><div key={p.id} style={{background:dark?'#1f2937':'white',borderRadius:10,padding:14,display:'flex',alignItems:'center',gap:12,cursor:'pointer'}}>
          <span style={{fontSize:28}}>{p.icon}</span>
          <div style={{flex:1}}><h4 style={{fontSize:13,fontWeight:600,color:dark?'#f9fafb':'#111827'}}>{p.title}</h4><p style={{fontSize:10,color:'#6b7280'}}>{p.host} · {p.duration} · {p.date}</p></div>
          <button style={{padding:'6px 14px',borderRadius:16,background:'#166534',color:'white',border:'none',cursor:'pointer',fontSize:10}}>▶️ Play</button>
        </div>)}
      </div>

      <h3 style={{fontSize:16,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:12}}>📅 Seasonal Planting Calendar</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))',gap:8}}>
        {seasonalCalendar.map((s,i)=><div key={i} style={{background:dark?'#1f2937':'white',borderRadius:10,padding:12,textAlign:'center'}}>
          <p style={{fontWeight:600,fontSize:12,color:'#166534',marginBottom:4}}>{s.month}</p>
          <p style={{fontSize:10,color:dark?'#f9fafb':'#111827',marginBottom:4}}>{s.task}</p>
          <p style={{fontSize:9,color:'#6b7280'}}>🌱 {s.crops}</p>
        </div>)}
      </div>
    </div>
  </div>
}

// ========== DISPUTE RESOLUTION ==========
function DisputeCenter({ dark }) {
  const [activeDispute, setActiveDispute] = useState(null)
  const disputes = [
    {id:'DSP-001', buyer:'Grace Akinyi', seller:'John Farmer', item:'Maize 5 bags', issue:'Quality not as described', amount:17500, status:'Open', filed:'2026-04-26', evidence:['Chat logs','Photos','Blockchain receipt']},
    {id:'DSP-002', buyer:'Kiprotich Farm', seller:'Mary Wanjiku', item:'Beans 3 bags', issue:'Delayed delivery', amount:24000, status:'Resolved', filed:'2026-04-24', evidence:['Delivery tracking','Messages','Payment proof']},
    {id:'DSP-003', buyer:'Peter Mwangi', seller:'James Mwangi', item:'Transport service', issue:'Damaged goods during transit', amount:750, status:'In Mediation', filed:'2026-04-28', evidence:['Photos of damage','Rider report']},
  ]

  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:900,margin:'0 auto'}}>
      <h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534',marginBottom:4}}>⚖️ Dispute Resolution Center</h1>
      <p style={{color:dark?'#9ca3af':'#6b7280',fontSize:13,marginBottom:16}}>Fair, transparent conflict resolution with blockchain evidence</p>

      <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
        {['All','Open','In Mediation','Resolved'].map(s=><button key={s} style={{padding:'6px 14px',borderRadius:16,border:'1px solid #166534',background:'transparent',color:'#166534',fontSize:10,cursor:'pointer'}}>{s}</button>)}
        <button style={{padding:'6px 14px',borderRadius:16,background:'#166534',color:'white',border:'none',cursor:'pointer',fontSize:10,marginLeft:'auto'}}>+ File Dispute</button>
      </div>

      {disputes.map(d=><div key={d.id} style={{background:dark?'#1f2937':'white',borderRadius:12,padding:16,marginBottom:8,cursor:'pointer'}} onClick={()=>setActiveDispute(activeDispute===d.id?null:d.id)}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <div>
            <span style={{fontWeight:600,color:dark?'#f9fafb':'#111827',fontSize:13}}>{d.id}</span>
            <span style={{marginLeft:8,padding:'3px 8px',borderRadius:9999,fontSize:9,fontWeight:'bold',
              background:d.status==='Open'?'#fef3c7':d.status==='Resolved'?'#dcfce7':'#dbeafe',
              color:d.status==='Open'?'#92400e':d.status==='Resolved'?'#15803d':'#1e40af'}}>{d.status}</span>
          </div>
          <span style={{fontSize:12,color:dark?'#9ca3af':'#6b7280'}}>{d.filed}</span>
        </div>
        <p style={{fontSize:12,color:dark?'#d1d5db':'#374151',marginTop:6}}>{d.buyer} vs {d.seller} — {d.issue}</p>
        <p style={{fontSize:14,fontWeight:'bold',color:'#166534',marginTop:4}}>KES {d.amount.toLocaleString()}</p>
        {activeDispute===d.id && <div style={{marginTop:12,padding:12,background:dark?'#111827':'#f9fafb',borderRadius:8}}>
          <p style={{fontSize:11,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:6}}>📎 Evidence ({d.evidence.length} items)</p>
          {d.evidence.map((e,i)=><div key={i} style={{padding:'4px 0',fontSize:11,color:'#4f46e5'}}>📄 {e}</div>)}
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <button style={{padding:'6px 12px',borderRadius:6,background:'#166534',color:'white',border:'none',cursor:'pointer',fontSize:10}}>Request Mediation</button>
            <button style={{padding:'6px 12px',borderRadius:6,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:10}}>Download Evidence</button>
          </div>
        </div>}
      </div>)}
    </div>
  </div>
}

// ========== SUSTAINABILITY ==========
function SustainabilityPage({ dark }) {
  const [carbonCredits] = useState(245)
  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:900,margin:'0 auto'}}>
      <h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534',marginBottom:4}}>🌍 Sustainability</h1>
      <p style={{color:dark?'#9ca3af':'#6b7280',fontSize:13,marginBottom:16}}>Earn from sustainable farming practices</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:12,marginBottom:20}}>
        <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20,textAlign:'center'}}>
          <span style={{fontSize:40}}>🌿</span>
          <p style={{fontSize:24,fontWeight:'bold',color:'#16a34a'}}>{carbonCredits}</p>
          <p style={{fontSize:11,color:dark?'#9ca3af':'#6b7280'}}>Carbon Credits Earned</p>
        </div>
        <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20,textAlign:'center'}}>
          <span style={{fontSize:40}}>💰</span>
          <p style={{fontSize:24,fontWeight:'bold',color:'#166534'}}>KES {carbonCredits*100}</p>
          <p style={{fontSize:11,color:dark?'#9ca3af':'#6b7280'}}>Credit Value</p>
        </div>
        <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20,textAlign:'center'}}>
          <span style={{fontSize:40}}>🌳</span>
          <p style={{fontSize:24,fontWeight:'bold',color:'#15803d'}}>1,200</p>
          <p style={{fontSize:11,color:dark?'#9ca3af':'#6b7280'}}>Trees Planted</p>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12,marginBottom:20}}>
        <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20}}>
          <h3 style={{fontSize:15,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:8}}>🌱 Carbon Credit Program</h3>
          <p style={{fontSize:12,color:dark?'#9ca3af':'#6b7280',marginBottom:12}}>Earn credits for: organic farming, agroforestry, reduced tillage, composting</p>
          <button style={{width:'100%',padding:10,borderRadius:8,background:'#16a34a',color:'white',border:'none',cursor:'pointer',fontWeight:600}}>Claim Credits</button>
        </div>
        <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20}}>
          <h3 style={{fontSize:15,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:8}}>🚜 Equipment Sharing</h3>
          <p style={{fontSize:12,color:dark?'#9ca3af':'#6b7280',marginBottom:12}}>Rent tractors, ploughs, irrigation equipment from nearby farmers</p>
          <button style={{width:'100%',padding:10,borderRadius:8,background:'#166534',color:'white',border:'none',cursor:'pointer',fontWeight:600}}>Browse Equipment</button>
        </div>
        <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20}}>
          <h3 style={{fontSize:15,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:8}}>🐝 Pollination Services</h3>
          <p style={{fontSize:12,color:dark?'#9ca3af':'#6b7280',marginBottom:12}}>Connect beekeepers with farmers for better crop pollination</p>
          <button style={{width:'100%',padding:10,borderRadius:8,background:'#f59e0b',color:'white',border:'none',cursor:'pointer',fontWeight:600}}>Find Beekeepers</button>
        </div>
      </div>

      <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:16}}>
        <h3 style={{fontSize:15,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:12}}>🌍 Seed-to-Plate Traceability</h3>
        <p style={{fontSize:12,color:dark?'#9ca3af':'#6b7280',marginBottom:12}}>Scan a QR code to see the full journey of your produce — from farm to table</p>
        <div style={{textAlign:'center',padding:20,background:dark?'#111827':'#f9fafb',borderRadius:8}}>
          <div style={{width:100,height:100,background:'white',margin:'0 auto',borderRadius:8,padding:10}}>📱 QR Code</div>
          <p style={{fontSize:10,color:'#6b7280',marginTop:8}}>Traceability verified by FarmDirect Blockchain</p>
        </div>
      </div>
    </div>
  </div>
}

// ========== REFERRAL SYSTEM ==========
function ReferralPage({ dark }) {
  const [referrals, setReferrals] = useState(()=>{try{return JSON.parse(localStorage.getItem('fd_referrals')||'[]')}catch{return[]}})
  const [refName, setRefName] = useState('')
  const code = 'FARM-' + Math.random().toString(36).substring(2,6).toUpperCase()
  const credits = referrals.length * 100

  return <div style={{minHeight:'100vh',background:dark?'#111827':'#f0fdf4',padding:'16px 16px 80px'}}>
    <div style={{maxWidth:700,margin:'0 auto'}}>
      <h1 style={{fontSize:24,fontWeight:'bold',color:dark?'#f9fafb':'#166534',marginBottom:4}}>🎁 Referral Program</h1>
      <p style={{color:dark?'#9ca3af':'#6b7280',fontSize:13,marginBottom:16}}>Invite farmers — earn KES 100 credit per referral</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:12,marginBottom:20}}>
        <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20,textAlign:'center'}}>
          <span style={{fontSize:36}}>🎁</span>
          <p style={{fontSize:22,fontWeight:'bold',color:'#166534'}}>KES {credits}</p>
          <p style={{fontSize:10,color:'#6b7280'}}>Credits Earned</p>
        </div>
        <div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:20,textAlign:'center'}}>
          <span style={{fontSize:36}}>👥</span>
          <p style={{fontSize:22,fontWeight:'bold',color:'#15803d'}}>{referrals.length}</p>
          <p style={{fontSize:10,color:'#6b7280'}}>Farmers Referred</p>
        </div>
      </div>

      <div style={{background:dark?'#1f2937':'white',borderRadius:14,padding:20,marginBottom:20,textAlign:'center'}}>
        <p style={{fontSize:11,color:'#6b7280',marginBottom:8}}>Your Referral Code</p>
        <p style={{fontSize:28,fontWeight:'bold',color:'#166534',letterSpacing:4}}>{code}</p>
        <button onClick={()=>navigator.clipboard.writeText('Join FarmDirect: '+window.location.origin+'?ref='+code)} style={{marginTop:10,padding:'8px 16px',borderRadius:8,background:'#166534',color:'white',border:'none',cursor:'pointer',fontSize:11}}>📋 Copy Referral Link</button>
      </div>

      <div style={{background:dark?'#1f2937':'white',borderRadius:14,padding:20,marginBottom:20}}>
        <h3 style={{fontSize:14,fontWeight:600,color:dark?'#f9fafb':'#111827',marginBottom:8}}>Add Referral</h3>
        <div style={{display:'flex',gap:8}}>
          <input placeholder="Farmer's name or phone" value={refName} onChange={e=>setRefName(e.target.value)} style={{flex:1,padding:10,borderRadius:8,border:'1px solid #d1d5db',fontSize:12}} />
          <button onClick={()=>{if(!refName.trim())return;setReferrals([...referrals,{name:refName,date:new Date().toLocaleDateString()}]);localStorage.setItem('fd_referrals',JSON.stringify([...referrals,{name:refName,date:new Date().toLocaleDateString()}]));setRefName('')}} disabled={!refName.trim()} style={{padding:'10px 20px',borderRadius:8,background:refName.trim()?'#166534':'#d1d5db',color:'white',border:'none',cursor:refName.trim()?'pointer':'default',fontWeight:600}}>Add</button>
        </div>
      </div>

      {referrals.length>0 && referrals.map((r,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 14px',background:dark?'#1f2937':'white',borderRadius:8,marginBottom:4,fontSize:12,color:dark?'#f9fafb':'#111827'}}><span>{r.name}</span><span style={{color:'#6b7280'}}>{r.date}</span><span style={{color:'#16a34a',fontWeight:600}}>+KES 100</span></div>)}
    </div>
  </div>
}
