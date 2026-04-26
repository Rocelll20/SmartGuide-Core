import { useState, useEffect, useCallback, useRef } from "react";

interface User {
  id: string; name: string; email: string;
  status: "online" | "offline"; avatar: string; lastActive: Date;
}
type FilterType = "all" | "online" | "offline";

const SEED: User[] = [
  { id:"USR001", name:"John Doe", email:"john.doe@smartguide.com", status:"online", avatar:"JD", lastActive:new Date(Date.now()-2*60000) },
  { id:"USR002", name:"Jane Smith", email:"jane.smith@smartguide.com", status:"online", avatar:"JS", lastActive:new Date(Date.now()-5*60000) },
  { id:"USR003", name:"Mike Johnson", email:"mike.johnson@smartguide.com", status:"offline", avatar:"MJ", lastActive:new Date(Date.now()-2*3600000) },
  { id:"USR004", name:"Sarah Williams", email:"sarah.williams@smartguide.com", status:"online", avatar:"SW", lastActive:new Date(Date.now()-1*60000) },
  { id:"USR005", name:"Robert Brown", email:"robert.brown@smartguide.com", status:"offline", avatar:"RB", lastActive:new Date(Date.now()-6*3600000) },
  { id:"USR006", name:"Emily Davis", email:"emily.davis@smartguide.com", status:"online", avatar:"ED", lastActive:new Date(Date.now()-10*60000) },
  { id:"USR007", name:"Alex Martinez", email:"alex.martinez@smartguide.com", status:"offline", avatar:"AM", lastActive:new Date(Date.now()-12*3600000) },
  { id:"USR008", name:"Linda Walker", email:"linda.walker@smartguide.com", status:"online", avatar:"LG", lastActive:new Date(Date.now()-3*60000) },
  { id:"USR009", name:"David Rodriguez", email:"david.rodriguez@smartguide.com", status:"online", avatar:"DR", lastActive:new Date(Date.now()-4*60000) },
  { id:"USR010", name:"Jennifer Taylor", email:"jennifer.taylor@smartguide.com", status:"offline", avatar:"JT", lastActive:new Date(Date.now()-8*3600000) },
  { id:"USR011", name:"Christopher Lee", email:"christopher.lee@smartguide.com", status:"online", avatar:"CL", lastActive:new Date(Date.now()-7*60000) },
  { id:"USR012", name:"Maria Anderson", email:"maria.anderson@smartguide.com", status:"online", avatar:"MA", lastActive:new Date(Date.now()-15*60000) },
  { id:"USR013", name:"James Thomas", email:"james.thomas@smartguide.com", status:"offline", avatar:"JT", lastActive:new Date(Date.now()-4*3600000) },
  { id:"USR014", name:"Patricia Jackson", email:"patricia.jackson@smartguide.com", status:"online", avatar:"PJ", lastActive:new Date(Date.now()-1*60000) },
  { id:"USR015", name:"Michael White", email:"michael.white@smartguide.com", status:"offline", avatar:"MW", lastActive:new Date(Date.now()-10*3600000) },
  { id:"USR016", name:"Nancy Lewis", email:"nancy.lewis@smartguide.com", status:"online", avatar:"NH", lastActive:new Date(Date.now()-6*60000) },
  { id:"USR017", name:"Daniel Martin", email:"daniel.martin@smartguide.com", status:"online", avatar:"DM", lastActive:new Date(Date.now()-2*60000) },
  { id:"USR018", name:"Sandra Thompson", email:"sandra.thompson@smartguide.com", status:"offline", avatar:"ST", lastActive:new Date(Date.now()-14*3600000) },
  { id:"USR019", name:"Kevin Clark", email:"kevin.clark@smartguide.com", status:"online", avatar:"KC", lastActive:new Date(Date.now()-8*60000) },
  { id:"USR020", name:"Lisa Lewis", email:"lisa.lewis@smartguide.com", status:"offline", avatar:"LL", lastActive:new Date(Date.now()-9*3600000) },
  { id:"USR021", name:"Ethan Walker", email:"ethan.walker@smartguide.com", status:"online", avatar:"EW", lastActive:new Date(Date.now()-3*60000) },
  { id:"USR022", name:"Olivia Hall", email:"olivia.hall@smartguide.com", status:"offline", avatar:"OH", lastActive:new Date(Date.now()-5*3600000) },
  { id:"USR023", name:"Noah Allen", email:"noah.allen@smartguide.com", status:"online", avatar:"NA", lastActive:new Date(Date.now()-11*60000) },
  { id:"USR024", name:"Sophia Young", email:"sophia.young@smartguide.com", status:"online", avatar:"SY", lastActive:new Date(Date.now()-1*60000) },
  { id:"USR025", name:"Liam King", email:"liam.king@smartguide.com", status:"offline", avatar:"LK", lastActive:new Date(Date.now()-7*3600000) },
  { id:"USR026", name:"Ava Scott", email:"ava.scott@smartguide.com", status:"online", avatar:"AS", lastActive:new Date(Date.now()-4*60000) },
  { id:"USR027", name:"William Green", email:"william.green@smartguide.com", status:"offline", avatar:"WG", lastActive:new Date(Date.now()-11*3600000) },
  { id:"USR028", name:"Isabella Adams", email:"isabella.adams@smartguide.com", status:"online", avatar:"IA", lastActive:new Date(Date.now()-6*60000) },
  { id:"USR029", name:"Mason Baker", email:"mason.baker@smartguide.com", status:"online", avatar:"MB", lastActive:new Date(Date.now()-9*60000) },
  { id:"USR030", name:"Mia Nelson", email:"mia.nelson@smartguide.com", status:"offline", avatar:"MN", lastActive:new Date(Date.now()-13*3600000) },
  { id:"USR031", name:"Lucas Carter", email:"lucas.carter@smartguide.com", status:"online", avatar:"LC", lastActive:new Date(Date.now()-2*60000) },
  { id:"USR032", name:"Charlotte Mitchell", email:"charlotte.mitchell@smartguide.com", status:"online", avatar:"CM", lastActive:new Date(Date.now()-14*60000) },
  { id:"USR033", name:"Henry Perez", email:"henry.perez@smartguide.com", status:"offline", avatar:"HP", lastActive:new Date(Date.now()-3*3600000) },
  { id:"USR034", name:"Amelia Roberts", email:"amelia.roberts@smartguide.com", status:"online", avatar:"AR", lastActive:new Date(Date.now()-5*60000) },
  { id:"USR035", name:"Jackson Turner", email:"jackson.turner@smartguide.com", status:"offline", avatar:"JT", lastActive:new Date(Date.now()-16*3600000) },
  { id:"USR036", name:"Harper Phillips", email:"harper.phillips@smartguide.com", status:"online", avatar:"HP", lastActive:new Date(Date.now()-7*60000) },
  { id:"USR037", name:"Sebastian Campbell", email:"sebastian.campbell@smartguide.com", status:"offline", avatar:"SC", lastActive:new Date(Date.now()-8*3600000) },
  { id:"USR038", name:"Evelyn Parker", email:"evelyn.parker@smartguide.com", status:"online", avatar:"EP", lastActive:new Date(Date.now()-3*60000) },
  { id:"USR039", name:"Aiden Evans", email:"aiden.evans@smartguide.com", status:"online", avatar:"AE", lastActive:new Date(Date.now()-12*60000) },
  { id:"USR040", name:"Scarlett Edwards", email:"scarlett.edwards@smartguide.com", status:"offline", avatar:"SE", lastActive:new Date(Date.now()-6*3600000) },
];

function fmtAgo(date: Date): string {
  const d = Date.now() - date.getTime();
  const m = Math.floor(d/60000), h = Math.floor(d/3600000), dy = Math.floor(d/86400000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${dy}d ago`;
}
function mkAvatar(name: string): string {
  return name.split(" ").map(n => n[0]?.toUpperCase() ?? "").slice(0,2).join("");
}
const GRADIENTS = [
  "linear-gradient(135deg,#667eea,#764ba2)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
  "linear-gradient(135deg,#43e97b,#38f9d7)",
  "linear-gradient(135deg,#fa709a,#fee140)",
  "linear-gradient(135deg,#a18cd1,#fbc2eb)",
  "linear-gradient(135deg,#fda085,#f6d365)",
  "linear-gradient(135deg,#84fab0,#8fd3f4)",
];
function avatarGrad(id: string): string {
  return GRADIENTS[parseInt(id.replace(/\D/g,""),10) % GRADIENTS.length];
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
.au-wrap{font-family:'Plus Jakarta Sans',sans-serif;color:#e6edf3;width:100%;}
.au-hero{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:14px;margin-bottom:24px;}
.au-title{font-size:22px;font-weight:800;letter-spacing:-.5px;color:#e6edf3;}
.au-title em{color:#818cf8;font-style:normal;}
.au-sub{font-size:12.5px;color:#8b949e;margin-top:3px;font-weight:500;}
.au-pills{display:flex;gap:8px;flex-wrap:wrap;}
.au-pill{display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:40px;border:1px solid #21262d;background:#161b22;font-size:12px;font-weight:600;color:#8b949e;box-shadow:0 2px 8px rgba(0,0,0,.3);}
.au-pill strong{color:#e6edf3;}
.au-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.au-dot.on{background:#12b886;box-shadow:0 0 0 3px rgba(18,184,134,.2);}
.au-dot.off{background:#fa5252;box-shadow:0 0 0 3px rgba(250,82,82,.2);}
.au-dot.tot{background:#818cf8;box-shadow:0 0 0 3px rgba(129,140,248,.2);}
.au-bar{background:#161b22;border:1px solid #21262d;border-radius:16px;padding:14px 16px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;box-shadow:0 4px 16px rgba(0,0,0,.3);margin-bottom:18px;}
.au-sw{flex:1;min-width:180px;position:relative;}
.au-si{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:#484f58;font-size:13px;pointer-events:none;}
.au-input{width:100%;padding:8px 12px 8px 34px;border:1px solid #21262d;border-radius:10px;background:#0d1117;color:#e6edf3;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;outline:none;transition:all .18s;}
.au-input::placeholder{color:#484f58;}
.au-input:focus{border-color:#818cf8;box-shadow:0 0 0 3px rgba(129,140,248,.12);}
.au-filters{display:flex;gap:6px;flex-wrap:wrap;}
.au-fb{padding:7px 14px;border-radius:8px;border:1px solid #21262d;background:#0d1117;color:#8b949e;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all .18s;}
.au-fb:hover{border-color:#818cf8;color:#818cf8;}
.au-fb.act{background:#818cf8;color:#fff;border-color:#818cf8;box-shadow:0 2px 10px rgba(129,140,248,.35);}
.au-add{display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;border:none;background:#818cf8;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .18s;box-shadow:0 2px 10px rgba(129,140,248,.35);}
.au-add:hover{background:#6366f1;transform:translateY(-1px);}
.au-add:active{transform:translateY(0);}
.au-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;}
.au-card{background:#161b22;border:1px solid #21262d;border-radius:14px;padding:14px 16px;display:flex;gap:12px;align-items:center;cursor:pointer;transition:all .18s;box-shadow:0 2px 8px rgba(0,0,0,.2);position:relative;overflow:hidden;}
.au-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:14px 0 0 14px;}
.au-card.on::before{background:#12b886;}
.au-card.off::before{background:#fa5252;}
.au-card:hover{box-shadow:0 8px 28px rgba(0,0,0,.4);transform:translateY(-2px);border-color:#30363d;}
.au-card.off{opacity:.78;}
.au-card.off:hover{opacity:1;}
.au-av-wrap{position:relative;flex-shrink:0;}
.au-av{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:800;font-family:'JetBrains Mono',monospace;}
.au-av-dot{position:absolute;bottom:-2px;right:-2px;width:12px;height:12px;border-radius:50%;border:2.5px solid #161b22;}
.au-av-dot.on{background:#12b886;animation:aupulse 2s infinite;}
.au-av-dot.off{background:#fa5252;}
@keyframes aupulse{0%{box-shadow:0 0 0 0 rgba(18,184,134,.5);}70%{box-shadow:0 0 0 6px rgba(18,184,134,0);}100%{box-shadow:0 0 0 0 rgba(18,184,134,0);}}
.au-cb{flex:1;min-width:0;}
.au-cn{font-size:13.5px;font-weight:700;color:#e6edf3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px;}
.au-ce{font-size:11.5px;color:#8b949e;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px;}
.au-ci{font-size:10px;color:#484f58;font-family:'JetBrains Mono',monospace;}
.au-ct{display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0;}
.au-badge{padding:3px 8px;border-radius:6px;font-size:9.5px;font-weight:800;letter-spacing:.7px;text-transform:uppercase;}
.au-badge.on{background:rgba(18,184,134,.15);color:#12b886;}
.au-badge.off{background:rgba(250,82,82,.12);color:#fa5252;}
.au-ago{font-size:10px;color:#484f58;font-weight:500;}
.au-empty{grid-column:1/-1;padding:60px 20px;text-align:center;}
.au-empty-ico{font-size:40px;margin-bottom:10px;}
.au-empty-txt{font-size:13px;font-weight:600;color:#484f58;}
.au-ov{position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);z-index:200;animation:aufade .15s ease;}
@keyframes aufade{from{opacity:0}to{opacity:1}}
.au-modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;max-width:420px;background:#161b22;border:1px solid #30363d;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.6);z-index:201;overflow:hidden;animation:aumodal .2s cubic-bezier(.34,1.56,.64,1);}
@keyframes aumodal{from{opacity:0;transform:translate(-50%,-46%) scale(.95);}to{opacity:1;transform:translate(-50%,-50%) scale(1);}}
.au-mhd{padding:16px 20px;border-bottom:1px solid #21262d;background:#0d1117;display:flex;align-items:center;justify-content:space-between;}
.au-mtitle{font-size:14px;font-weight:800;color:#e6edf3;}
.au-mclose{width:28px;height:28px;border-radius:7px;border:1px solid #30363d;background:transparent;color:#8b949e;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;transition:all .18s;}
.au-mclose:hover{background:rgba(250,82,82,.12);border-color:#fa5252;color:#fa5252;}
.au-mbody{padding:20px;display:flex;flex-direction:column;gap:14px;}
.au-field{display:flex;flex-direction:column;gap:5px;}
.au-lbl{font-size:11.5px;font-weight:700;color:#8b949e;text-transform:uppercase;letter-spacing:.5px;}
.au-req{color:#fa5252;}
.au-finput{padding:9px 13px;border:1px solid #21262d;border-radius:9px;background:#0d1117;color:#e6edf3;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;outline:none;transition:all .18s;}
.au-finput:focus{border-color:#818cf8;box-shadow:0 0 0 3px rgba(129,140,248,.12);}
.au-finput::placeholder{color:#484f58;}
.au-ferr{font-size:11.5px;color:#fa5252;font-weight:600;min-height:14px;}
.au-mfoot{padding:13px 20px;border-top:1px solid #21262d;background:#0d1117;display:flex;justify-content:flex-end;gap:8px;}
.au-bcancel{padding:7px 16px;border-radius:9px;border:1px solid #30363d;background:transparent;color:#8b949e;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .18s;}
.au-bcancel:hover{background:#21262d;}
.au-bsubmit{padding:7px 18px;border-radius:9px;border:none;background:#818cf8;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:5px;box-shadow:0 2px 10px rgba(129,140,248,.35);transition:all .18s;}
.au-bsubmit:hover{background:#6366f1;}
@media(max-width:640px){.au-grid{grid-template-columns:1fr;}.au-bar{flex-direction:column;align-items:stretch;}.au-sw{min-width:0;}.au-modal{max-width:95vw;}}
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string, status: "online"|"offline") => string|null;
}
function AddModal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"online"|"offline">("online");
  const [err, setErr] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen) { setName(""); setEmail(""); setStatus("online"); setErr(""); setTimeout(() => ref.current?.focus(), 80); }
  }, [isOpen]);
  if (!isOpen) return null;
  const handle = () => { const e = onSubmit(name.trim(), email.trim(), status); if (e) { setErr(e); return; } onClose(); };
  return (
    <>
      <div className="au-ov" onClick={onClose} />
      <div className="au-modal" role="dialog" aria-modal="true">
        <div className="au-mhd">
          <div className="au-mtitle">✦ Add New User</div>
          <button className="au-mclose" onClick={onClose}>✕</button>
        </div>
        <div className="au-mbody">
          <div className="au-field"><label className="au-lbl">Full Name <span className="au-req">*</span></label><input ref={ref} className="au-finput" placeholder="e.g. Alex Johnson" value={name} onChange={e=>setName(e.target.value)} /></div>
          <div className="au-field"><label className="au-lbl">Email Address <span className="au-req">*</span></label><input className="au-finput" type="email" placeholder="user@smartguide.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div className="au-field"><label className="au-lbl">Initial Status</label><select className="au-finput" value={status} onChange={e=>setStatus(e.target.value as "online"|"offline")}><option value="online">🟢 Online</option><option value="offline">🔴 Offline</option></select></div>
          <p className="au-ferr" role="alert">{err}</p>
        </div>
        <div className="au-mfoot">
          <button className="au-bcancel" onClick={onClose}>Cancel</button>
          <button className="au-bsubmit" onClick={handle}>✓ Add User</button>
        </div>
      </div>
    </>
  );
}

export default function ActiveUsersPage() {
  const [users, setUsers] = useState<User[]>(SEED);
  const [filter, setFilter] = useState<FilterType>("all");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);
  const online = users.filter(u=>u.status==="online").length;
  const offline = users.filter(u=>u.status==="offline").length;
  const visible = users.filter(u => {
    if (filter!=="all" && u.status!==filter) return false;
    const q = query.toLowerCase();
    return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
  });
  const toggleStatus = useCallback((id:string) => {
    setUsers(p=>p.map(u=>u.id===id?{...u,status:u.status==="online"?"offline":"online",lastActive:new Date()}:u));
  },[]);
  const addUser = useCallback((name:string,email:string,status:"online"|"offline"):string|null=>{
    if (!name) return "Full name is required.";
    if (!email||!email.includes("@")) return "Please enter a valid email.";
    if (users.some(u=>u.email.toLowerCase()===email.toLowerCase())) return "Email already exists.";
    setUsers(p=>[...p,{id:`USR${String(p.length+1).padStart(3,"0")}`,name,email,status,avatar:mkAvatar(name),lastActive:new Date()}]);
    return null;
  },[users]);
  const counts:Record<FilterType,number> = {all:users.length,online,offline};
  return (
    <div className="au-wrap">
      <style>{CSS}</style>
      <div className="au-hero">
        <div><h1 className="au-title">Active <em>Users</em></h1><p className="au-sub">Monitor and manage all registered users in real-time</p></div>
        <div className="au-pills">
          <div className="au-pill"><span className="au-dot on"/>Online <strong>{online}</strong></div>
          <div className="au-pill"><span className="au-dot off"/>Offline <strong>{offline}</strong></div>
          <div className="au-pill"><span className="au-dot tot"/>Total <strong>{users.length}</strong></div>
        </div>
      </div>
      <div className="au-bar">
        <div className="au-sw"><span className="au-si">🔍</span><input className="au-input" placeholder="Search by name, email, or ID..." value={query} onChange={e=>setQuery(e.target.value)}/></div>
        <div className="au-filters">{(["all","online","offline"] as FilterType[]).map(f=>(<button key={f} className={`au-fb${filter===f?" act":""}`} onClick={()=>setFilter(f)}>{f==="all"?"All Users":f==="online"?"🟢 Online":"🔴 Offline"} ({counts[f]})</button>))}</div>
        <button className="au-add" onClick={()=>setModal(true)}>＋ Add User</button>
      </div>
      <div className="au-grid">
        {visible.length===0?(<div className="au-empty"><div className="au-empty-ico">🔍</div><div className="au-empty-txt">No users match your search</div></div>)
        :visible.map(u=>(
          <div key={u.id} className={`au-card ${u.status==="online"?"on":"off"}`} onClick={()=>toggleStatus(u.id)} title="Click to toggle status">
            <div className="au-av-wrap"><div className="au-av" style={{background:avatarGrad(u.id)}}>{u.avatar}</div><span className={`au-av-dot ${u.status==="online"?"on":"off"}`}/></div>
            <div className="au-cb"><div className="au-cn">{u.name}</div><div className="au-ce">{u.email}</div><div className="au-ci">{u.id}</div></div>
            <div className="au-ct"><span className={`au-badge ${u.status==="online"?"on":"off"}`}>{u.status}</span><span className="au-ago">{fmtAgo(u.lastActive)}</span></div>
          </div>
        ))}
      </div>
      <AddModal isOpen={modal} onClose={()=>setModal(false)} onSubmit={addUser}/>
    </div>
  );
}