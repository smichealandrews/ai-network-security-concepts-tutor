const concepts = [
  {id:"firewall",title:"Firewalls",category:"NETWORK DEFENSE",icon:"▤",color:"#6958e8",bg:"#efedff",summary:"A firewall monitors network traffic and allows or blocks it according to a set of security rules.",example:"A college network firewall may block suspicious incoming connections while allowing students to access approved learning websites.",tip:"A firewall is one layer of defense, not complete protection.",keywords:["firewall","traffic rules","network firewall"]},
  {id:"encryption",title:"Encryption",category:"DATA PROTECTION",icon:"⌑",color:"#209b7a",bg:"#e1f8ef",summary:"Encryption changes readable information into an unreadable form using a key. The correct key is needed to decrypt it.",example:"HTTPS encrypts data exchanged between your browser and a website, helping protect information while it travels.",tip:"Encryption protects confidentiality; use trusted protocols and manage keys carefully.",keywords:["encryption","decrypt","cryptography","https","cipher"]},
  {id:"phishing",title:"Phishing",category:"SOCIAL ENGINEERING",icon:"✉",color:"#d78b29",bg:"#fff3dc",summary:"Phishing is a trick in which an attacker pretends to be a trusted person or organization to steal information or make someone take an unsafe action.",example:"A fake delivery message asks you to click a link and enter your bank password. Check the sender and visit the official website directly instead.",tip:"Pause, verify the sender, inspect links, and never share one-time passwords.",keywords:["phishing","email scam","social engineering","scam"]},
  {id:"ids",title:"Intrusion Detection",category:"THREAT MONITORING",icon:"⌁",color:"#d65d79",bg:"#ffedf1",summary:"An Intrusion Detection System (IDS) monitors events or network traffic and raises alerts when activity looks suspicious.",example:"An IDS can alert a security team when one device suddenly sends an unusual volume of connection requests.",tip:"An IDS detects and alerts; an Intrusion Prevention System (IPS) can also block traffic.",keywords:["ids","intrusion detection","ips","monitoring","alerts"]},
  {id:"vpn",title:"VPN",category:"SECURE CONNECTIONS",icon:"◈",color:"#347ac5",bg:"#e8f3ff",summary:"A Virtual Private Network (VPN) creates an encrypted tunnel between your device and a VPN endpoint.",example:"A remote employee may use the company VPN to connect securely to approved internal resources.",tip:"A VPN does not make every activity anonymous or protect against every malware or phishing attack.",keywords:["vpn","virtual private network","tunnel"]},
  {id:"malware",title:"Malware",category:"THREAT AWARENESS",icon:"⌘",color:"#d65d79",bg:"#ffedf1",summary:"Malware is software designed to harm a device, steal data, spy on users, or gain unauthorized access. Examples include ransomware, spyware, and trojans.",example:"Ransomware may encrypt files and demand payment. Keep offline backups and install updates to reduce risk.",tip:"Use trusted software, update devices, and keep regular backups.",keywords:["malware","ransomware","spyware","trojan","virus"]},
  {id:"ai-security",title:"AI in Security",category:"ARTIFICIAL INTELLIGENCE",icon:"✦",color:"#6958e8",bg:"#efedff",summary:"AI systems can learn patterns from data to help identify unusual activity, classify suspicious messages, and prioritize security alerts.",example:"A model may flag a login from an unusual location and time for a human analyst to review.",tip:"AI can make mistakes and can be manipulated. Validate alerts and keep humans involved in important decisions.",keywords:["ai","artificial intelligence","machine learning","anomaly detection","security ai"]},
  {id:"zero-trust",title:"Zero Trust",category:"SECURITY PRINCIPLE",icon:"◇",color:"#209b7a",bg:"#e1f8ef",summary:"Zero Trust is a security approach based on verifying each access request, using least privilege, and not automatically trusting a user or device because it is inside a network.",example:"An employee may need multi-factor authentication and permission checks before opening a sensitive company file.",tip:"Use least privilege, verify identity, and review access regularly.",keywords:["zero trust","least privilege","mfa","access control","authentication"]}
];
const tutorAnswers = {
  firewall:"A **firewall** checks incoming and outgoing network traffic against security rules. It can allow safe, expected connections and block traffic that violates the rules. Example: a company may block unsolicited incoming connections. Remember: firewalls are one layer of defense, so combine them with updates, strong authentication, and monitoring.",
  encryption:"**Encryption** transforms readable data (plaintext) into unreadable ciphertext using an algorithm and key. Decryption converts it back for an authorized recipient. HTTPS uses encryption to protect data in transit. Encryption is useful, but keys must be protected and the endpoint devices still need security.",
  phishing:"**Phishing** is a social-engineering attack that impersonates a trusted source to trick someone into revealing information or clicking a harmful link. Warning signs include urgent language, unexpected attachments, mismatched domains, and requests for passwords or one-time passwords. Verify using a separate, official channel.",
  ids:"An **Intrusion Detection System (IDS)** monitors network or system activity and alerts on suspicious patterns. A signature-based IDS looks for known patterns; an anomaly-based IDS looks for deviations from normal behavior. An **Intrusion Prevention System (IPS)** can actively block detected traffic. Alerts need review because false positives can occur.",
  vpn:"A **Virtual Private Network (VPN)** creates an encrypted connection between a device and a VPN server or organization network. It can protect traffic on untrusted networks and support remote access. A VPN does not automatically prevent phishing, malware, or tracking by every service.",
  malware:"**Malware** is software created to damage systems, steal information, spy, or gain unauthorized access. Common types include viruses, worms, trojans, spyware, and ransomware. Reduce risk by updating software, using trusted downloads, enabling multi-factor authentication, and maintaining tested backups.",
  "ai-security":"**AI helps security teams** by identifying unusual login patterns, classifying suspicious messages, grouping alerts, and helping analysts investigate. It can also produce false positives or miss new threats, and attackers may try to evade models. Use quality data, evaluate performance, protect sensitive data, and keep human review for high-impact decisions.",
  "zero-trust":"**Zero Trust** means do not grant access just because a request comes from inside a network. Verify identity and device context, give only the permissions needed (least privilege), and reassess access when appropriate. Multi-factor authentication and network segmentation can support a Zero Trust strategy.",
  "default":"I can help with beginner-friendly network security and AI topics such as firewalls, encryption, phishing, malware, IDS/IPS, VPNs, Zero Trust, and AI-based threat detection. Try asking: “What is a firewall?” or “How does AI help detect unusual logins?”"
};
let learned = new Set(JSON.parse(localStorage.getItem("netwise-learned") || "[]"));
let activeConcept = null;
const $ = id => document.getElementById(id);

function renderConcepts(filter=""){
  const q=filter.toLowerCase().trim();
  const items=concepts.filter(c=>(c.title+" "+c.summary+" "+c.category+" "+c.keywords.join(" ")).toLowerCase().includes(q));
  $("concept-count").textContent=`${items.length} topic${items.length===1?"":"s"}`;
  $("concept-grid").innerHTML=items.map(c=>`<article class="concept-card" data-id="${c.id}" tabindex="0" role="button" aria-label="Learn ${c.title}" style="--icon-bg:${c.bg};--icon-color:${c.color}">${learned.has(c.id)?'<span class="learned-check" title="Learned">✓</span>':""}<div class="concept-icon">${c.icon}</div><h3>${c.title}</h3><p>${c.summary}</p></article>`).join("");
  document.querySelectorAll(".concept-card").forEach(card=>{
    const open=()=>showConcept(card.dataset.id);
    card.addEventListener("click",open);
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
  });
  updateProgress();
}
function updateProgress(){
  const count=learned.size, pct=Math.round(count/concepts.length*100);
  $("progress-text").textContent=`You have explored ${count} of ${concepts.length} concepts.`;
  $("progress-bar").style.width=pct+"%"; $("progress-percent").textContent=pct+"%";
}
function showConcept(id){
  activeConcept=concepts.find(c=>c.id===id); if(!activeConcept)return;
  $("modal-icon").textContent=activeConcept.icon; $("modal-icon").style.background=activeConcept.bg; $("modal-icon").style.color=activeConcept.color;
  $("modal-category").textContent=activeConcept.category; $("modal-title").textContent=activeConcept.title;
  $("modal-summary").textContent=activeConcept.summary; $("modal-example").textContent=activeConcept.example; $("modal-tip").textContent=activeConcept.tip;
  $("mark-learned").textContent=learned.has(id)?"Learned ✓":"Mark as learned ✓";
  $("concept-modal").classList.remove("hidden");
}
function closeModal(){$("concept-modal").classList.add("hidden");}
function navigate(view){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  $("view-"+view).classList.add("active");
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  $("page-title").textContent=({learn:"AI & Network Security",tutor:"Ask the AI Tutor",quiz:"Knowledge Quiz"})[view];
}
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.view)));
$("concept-search").addEventListener("input",e=>renderConcepts(e.target.value));
$("start-learning").addEventListener("click",()=>showConcept("firewall"));
$("modal-close").addEventListener("click",closeModal);
$("concept-modal").querySelector(".modal-backdrop").addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
$("mark-learned").addEventListener("click",()=>{
  if(!activeConcept)return;
  learned.add(activeConcept.id); localStorage.setItem("netwise-learned",JSON.stringify([...learned]));
  $("mark-learned").textContent="Learned ✓";renderConcepts($("concept-search").value);
});
$("theme-toggle").addEventListener("click",()=>{document.body.classList.toggle("dark");$("theme-toggle").textContent=document.body.classList.contains("dark")?"☀":"☾";});

function formatAnswer(text){return text.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>");}
function addMessage(text,who){
  const row=document.createElement("div");row.className="message "+who;
  const avatar=document.createElement("span");avatar.className="message-avatar";avatar.textContent=who==="user"?"Y":"N";
  const body=document.createElement("div"),p=document.createElement("p"),small=document.createElement("small");
  p.innerHTML=who==="assistant"?formatAnswer(escapeHtml(text)):escapeHtml(text);
  small.textContent=who==="user"?"You":"NetWise Tutor";body.append(p,small);row.append(avatar,body);$("chat-messages").append(row);$("chat-messages").scrollTop=$("chat-messages").scrollHeight;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function answerQuestion(question){
  const q=question.toLowerCase();
  let best=null,score=0;
  for(const c of concepts){let s=0;for(const k of c.keywords){if(q.includes(k.toLowerCase()))s=Math.max(s,k.length);}if(q.includes(c.title.toLowerCase()))s+=10;if(s>score){score=s;best=c;}}
  if(best)return tutorAnswers[best.id]||`${best.title}: ${best.summary} Example: ${best.example} Remember: ${best.tip}`;
  if(q.includes("difference")&&(q.includes("ids")||q.includes("ips")))return tutorAnswers.ids;
  if(q.includes("hello")||q.includes("hi ")||q==="hi")return "Hello! Choose a security concept to explore, or ask me about firewalls, encryption, phishing, malware, VPNs, IDS/IPS, Zero Trust, or AI in security.";
  return tutorAnswers.default;
}
$("chat-form").addEventListener("submit",e=>{
  e.preventDefault();const q=$("chat-question").value.trim();if(!q)return;
  addMessage(q,"user");$("chat-question").value="";
  addMessage(answerQuestion(q),"assistant");
});
document.querySelectorAll(".suggestion").forEach(b=>b.addEventListener("click",()=>{$("chat-question").value=b.textContent;$("chat-form").requestSubmit();}));

const quizQuestions=[
 {q:"What is the main purpose of a firewall?",opts:["To increase screen brightness","To filter network traffic using rules","To store passwords in plain text","To create computer viruses"],a:1,why:"A firewall allows or blocks traffic based on configured security rules."},
 {q:"What does encryption do?",opts:["Makes data unreadable without the correct key","Deletes all network traffic","Guarantees a device has no malware","Makes every user anonymous"],a:0,why:"Encryption protects data confidentiality, but it does not solve every security problem."},
 {q:"Which is a common sign of phishing?",opts:["A normal software update from a verified app","An unexpected urgent request for a password","A file saved in your own folder","A known bookmark"],a:1,why:"Urgency and requests for credentials are warning signs. Verify messages independently."},
 {q:"What is a key role of an IDS?",opts:["Automatically replace all hardware","Detect suspicious activity and raise alerts","Guarantee all attacks are stopped","Create stronger Wi-Fi signals"],a:1,why:"An IDS detects and alerts. An IPS may also block suspicious traffic."},
 {q:"How can AI support a security team?",opts:["By guaranteeing zero cyberattacks","By identifying unusual patterns for review","By removing the need for updates","By making passwords unnecessary"],a:1,why:"AI can help identify patterns, but results need validation and human oversight."}
];
let quizIndex=0,quizScore=0,quizAnswered=false;
function renderQuiz(){
 const q=quizQuestions[quizIndex];quizAnswered=false;
 $("quiz-step").textContent=`QUESTION ${quizIndex+1} OF ${quizQuestions.length}`;$("quiz-score-label").textContent=`Score: ${quizScore}`;
 $("quiz-progress").style.width=(quizIndex/quizQuestions.length*100)+"%";$("quiz-question").textContent=q.q;
 $("quiz-feedback").textContent="";$("quiz-next").disabled=true;$("quiz-next").textContent=quizIndex===quizQuestions.length-1?"See results →":"Next question →";
 $("quiz-options").innerHTML=q.opts.map((o,i)=>`<button class="quiz-option" data-option="${i}"><span class="option-letter">${String.fromCharCode(65+i)}</span>${o}</button>`).join("");
 document.querySelectorAll(".quiz-option").forEach(b=>b.addEventListener("click",()=>chooseAnswer(Number(b.dataset.option))));
}
function chooseAnswer(n){
 if(quizAnswered)return;quizAnswered=true;const q=quizQuestions[quizIndex];
 document.querySelectorAll(".quiz-option").forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct");if(i===n&&n!==q.a)b.classList.add("wrong");});
 if(n===q.a)quizScore++;
 $("quiz-score-label").textContent=`Score: ${quizScore}`;
 $("quiz-feedback").textContent=(n===q.a?"Correct! ":"Not quite. ")+q.why;$("quiz-next").disabled=false;
}
$("quiz-next").addEventListener("click",()=>{
 if(!quizAnswered)return;
 if(quizIndex<quizQuestions.length-1){quizIndex++;renderQuiz();}
 else{$("quiz-step").textContent="QUIZ COMPLETE";$("quiz-progress").style.width="100%";$("quiz-question").textContent=`You scored ${quizScore} out of ${quizQuestions.length}!`; $("quiz-options").innerHTML=`<p class="muted">${quizScore>=4?"Great work — keep learning and practicing safely.": "Good start! Review the concepts and try again to improve your score."}</p>`;$("quiz-feedback").textContent="";$("quiz-next").disabled=true;$("quiz-next").textContent="Completed";}
});
$("quiz-restart").addEventListener("click",()=>{quizIndex=0;quizScore=0;renderQuiz();});
renderConcepts();renderQuiz();
