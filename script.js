/* ═══════════════════════════════════════════════════════════
   MIDNIGHT BILLIARDS — Full Game + Progression System
═══════════════════════════════════════════════════════════ */

// ── PHYSICS CONSTANTS ──
const BALL_RADIUS=11,FRICTION=0.986,MIN_SPEED=0.08,POCKET_RADIUS=17;
const CUSHION_BOUNCE=0.72,BALL_BOUNCE=0.88,MAX_POWER=22;
const CUSHION=34;

// ── BALL COLORS ──
const BALL_COLORS={
  1:{color:'#f5c518',stripe:false},2:{color:'#1a55c0',stripe:false},
  3:{color:'#cc2200',stripe:false},4:{color:'#6a1fc2',stripe:false},
  5:{color:'#e87a10',stripe:false},6:{color:'#1a8c2a',stripe:false},
  7:{color:'#7a1515',stripe:false},8:{color:'#111111',stripe:false},
  9:{color:'#f5c518',stripe:true},10:{color:'#1a55c0',stripe:true},
  11:{color:'#cc2200',stripe:true},12:{color:'#6a1fc2',stripe:true},
  13:{color:'#e87a10',stripe:true},14:{color:'#1a8c2a',stripe:true},
  15:{color:'#7a1515',stripe:true},
  16:{color:'#ff2020',stripe:false},17:{color:'#f0f0e8',stripe:false},
  18:{color:'#1a8c2a',stripe:false},19:{color:'#8B4513',stripe:false},
  20:{color:'#1a55c0',stripe:false},21:{color:'#ff69b4',stripe:false},
  22:{color:'#111111',stripe:false}
};

// ── PROGRESSION DATA ──
const TITLES=[
  'Rookie','Beginner','Amateur','Club Player','Challenger',
  'Shot Maker','Table Runner','Pool Vet','Bank Shot Artist',
  'Combo King','Rack Breaker','Frame Master','Champion',
  'Elite Player','Grandmaster','Pool Legend','Midnight Legend'
];

const XP_PER_LEVEL=lvl=>Math.floor(100*Math.pow(1.3,lvl-1));
const LEVEL_REWARDS={5:200,10:500,15:750,20:1000,25:1500,30:2000,40:3000,50:5000};

// ── CUE STICKS DATA ──
const CUES=[
  {id:'oak',name:'Oak Classic',rarity:'common',price:0,color:'#8B5E1A',accent:'#c9a84c',desc:'A trusty oak cue. Free to start.'},
  {id:'maple',name:'Maple Pro',rarity:'common',price:150,color:'#D2A679',accent:'#fff',desc:'Smooth maple shaft.'},
  {id:'cherry',name:'Cherry Wood',rarity:'common',price:200,color:'#7B1C1C',accent:'#e8c56a',desc:'Rich cherry wood finish.'},
  {id:'carbon',name:'Carbon Elite',rarity:'uncommon',price:400,color:'#2a2a2a',accent:'#00c8ff',desc:'Carbon fiber construction.'},
  {id:'ivory',name:'Ivory Crest',rarity:'uncommon',price:450,color:'#F5F0E8',accent:'#c9a84c',desc:'Ivory-white premium cue.'},
  {id:'ebony',name:'Ebony Shadow',rarity:'uncommon',price:500,color:'#1a1a1a',accent:'#888',desc:'Dark ebony wood.'},
  {id:'gold',name:'Midnight Gold',rarity:'rare',price:800,color:'#4a3a10',accent:'#f5d98a',desc:'Gold-wrapped luxury cue.'},
  {id:'sapphire',name:'Sapphire Strike',rarity:'rare',price:900,color:'#1a3a7a',accent:'#00c8ff',desc:'Deep sapphire blue.'},
  {id:'ruby',name:'Ruby Flame',rarity:'rare',price:950,color:'#7a0a0a',accent:'#ff4444',desc:'Blazing ruby finish.'},
  {id:'emerald',name:'Emerald Rush',rarity:'rare',price:1000,color:'#0a4a1a',accent:'#2ecc71',desc:'Lush emerald green.'},
  {id:'thunder',name:'Thunderstrike',rarity:'epic',price:1800,color:'#2a2a4a',accent:'#ffdd00',desc:'Crackling with energy.'},
  {id:'frost',name:'Frostbite',rarity:'epic',price:2000,color:'#aadeff',accent:'#00c8ff',desc:'Ice-cold precision.'},
  {id:'phantom',name:'Phantom Shadow',rarity:'epic',price:2200,color:'#1a1a2e',accent:'#b44bea',desc:'Shadow-forged cue.'},
  {id:'dragon',name:'Dragon Fang',rarity:'epic',price:2500,color:'#3a0a0a',accent:'#ff6b00',desc:'Dragon-scale wrapped.'},
  {id:'nebula',name:'Nebula Master',rarity:'legendary',price:4000,color:'#0a0a2e',accent:'#ff69b4',desc:'Born from stardust.'},
  {id:'cosmic',name:'Cosmic Storm',rarity:'legendary',price:4500,color:'#0a1a3a',accent:'#00ffff',desc:'Universe in a cue.'},
  {id:'solar',name:'Solar Flare',rarity:'legendary',price:5000,color:'#3a1a00',accent:'#ff8c00',desc:'Harnessing the sun.'},
  {id:'void',name:'Void Breaker',rarity:'mythic',price:8000,color:'#050508',accent:'#b44bea',desc:'Exists between dimensions.'},
  {id:'eternity',name:'Cue of Eternity',rarity:'mythic',price:10000,color:'#2a1a0a',accent:'#f5d98a',desc:'The ultimate cue.'}
];

const AVATARS=[
  {id:'ball8',name:'Eight Ball',rarity:'common',price:0,emoji:'🎱'},
  {id:'trophy',name:'Trophy',rarity:'common',price:100,emoji:'🏆'},
  {id:'target',name:'Bullseye',rarity:'common',price:120,emoji:'🎯'},
  {id:'star',name:'Star',rarity:'common',price:150,emoji:'⭐'},
  {id:'fire',name:'Fire',rarity:'common',price:180,emoji:'🔥'},
  {id:'lightning',name:'Lightning',rarity:'uncommon',price:300,emoji:'⚡'},
  {id:'crown',name:'Crown',rarity:'uncommon',price:350,emoji:'👑'},
  {id:'diamond',name:'Diamond',rarity:'uncommon',price:400,emoji:'💎'},
  {id:'shield',name:'Shield',rarity:'rare',price:600,emoji:'🛡️'},
  {id:'sword',name:'Sword',rarity:'rare',price:650,emoji:'⚔️'},
  {id:'crystal',name:'Crystal',rarity:'rare',price:700,emoji:'🔮'},
  {id:'dragon',name:'Dragon',rarity:'epic',price:1500,emoji:'🐉'},
  {id:'phoenix',name:'Phoenix',rarity:'epic',price:1600,emoji:'🦅'},
  {id:'unicorn',name:'Unicorn',rarity:'legendary',price:3000,emoji:'🦄'},
  {id:'alien',name:'Galaxy Mind',rarity:'legendary',price:3500,emoji:'👽'},
  {id:'robot',name:'Cyber Bot',rarity:'mythic',price:7000,emoji:'🤖'}
];

// ── ACHIEVEMENTS DATA ──
const ACHIEVEMENTS=[
  {id:'first_win',name:'First Victory',desc:'Win your first game',icon:'🎱',cat:'Beginner',coins:50,xp:50,target:1,key:'wins'},
  {id:'win5',name:'On a Roll',desc:'Win 5 games',icon:'🎳',cat:'Beginner',coins:75,xp:60,target:5,key:'wins'},
  {id:'win10',name:'Consistent',desc:'Win 10 games',icon:'✅',cat:'Win',coins:100,xp:100,target:10,key:'wins'},
  {id:'win25',name:'Pool Veteran',desc:'Win 25 games',icon:'🎖️',cat:'Win',coins:200,xp:200,target:25,key:'wins'},
  {id:'win50',name:'Champion',desc:'Win 50 games',icon:'🏅',cat:'Win',coins:400,xp:400,target:50,key:'wins'},
  {id:'win100',name:'Pool Master',desc:'Win 100 games',icon:'👑',cat:'Win',coins:800,xp:800,target:100,key:'wins'},
  {id:'balls10',name:'Pocket Starter',desc:'Pocket 10 balls total',icon:'🔵',cat:'Beginner',coins:30,xp:30,target:10,key:'ballsPocketed'},
  {id:'balls50',name:'Pocket Pro',desc:'Pocket 50 balls',icon:'🟡',cat:'Skill',coins:75,xp:75,target:50,key:'ballsPocketed'},
  {id:'balls200',name:'Ball Machine',desc:'Pocket 200 balls',icon:'⚪',cat:'Skill',coins:200,xp:200,target:200,key:'ballsPocketed'},
  {id:'balls500',name:'Ball Legend',desc:'Pocket 500 balls',icon:'🎿',cat:'Skill',coins:500,xp:500,target:500,key:'ballsPocketed'},
  {id:'balls1000',name:'Pocket God',desc:'Pocket 1000 balls',icon:'🌟',cat:'Skill',coins:1000,xp:1000,target:1000,key:'ballsPocketed'},
  {id:'streak3',name:'Hat Trick',desc:'Win 3 games in a row',icon:'🔥',cat:'Streak',coins:150,xp:100,target:3,key:'maxStreak'},
  {id:'streak5',name:'On Fire',desc:'Win 5 games in a row',icon:'💥',cat:'Streak',coins:300,xp:200,target:5,key:'maxStreak'},
  {id:'streak10',name:'Unstoppable',desc:'Win 10 games in a row',icon:'⚡',cat:'Streak',coins:600,xp:400,target:10,key:'maxStreak'},
  {id:'coins500',name:'Pocket Change',desc:'Earn 500 coins',icon:'🪙',cat:'Coin',coins:50,xp:50,target:500,key:'totalCoinsEarned'},
  {id:'coins2000',name:'Coin Collector',desc:'Earn 2,000 coins',icon:'💰',cat:'Coin',coins:100,xp:100,target:2000,key:'totalCoinsEarned'},
  {id:'coins10000',name:'Rich Player',desc:'Earn 10,000 coins',icon:'💎',cat:'Coin',coins:500,xp:500,target:10000,key:'totalCoinsEarned'},
  {id:'bank5',name:'Bank Shot',desc:'Make 5 bank shots',icon:'↗️',cat:'Skill',coins:100,xp:75,target:5,key:'bankShots'},
  {id:'bank25',name:'Bank Artist',desc:'Make 25 bank shots',icon:'📐',cat:'Skill',coins:300,xp:250,target:25,key:'bankShots'},
  {id:'cue3',name:'Cue Collector',desc:'Own 3 cue sticks',icon:'🎱',cat:'Collection',coins:100,xp:100,target:3,key:'cuesOwned'},
  {id:'cue8',name:'Arsenal',desc:'Own 8 cue sticks',icon:'⚙️',cat:'Collection',coins:300,xp:300,target:8,key:'cuesOwned'},
  {id:'games10',name:'Regular',desc:'Play 10 games',icon:'🃏',cat:'Beginner',coins:50,xp:50,target:10,key:'gamesPlayed'},
  {id:'games50',name:'Dedicated',desc:'Play 50 games',icon:'📅',cat:'Skill',coins:200,xp:200,target:50,key:'gamesPlayed'},
  {id:'games100',name:'Addict',desc:'Play 100 games',icon:'🎮',cat:'Skill',coins:400,xp:400,target:100,key:'gamesPlayed'},
  {id:'ai_easy',name:'Too Easy',desc:'Beat Easy AI',icon:'🤖',cat:'Beginner',coins:50,xp:30,target:1,key:'aiEasyWins'},
  {id:'ai_medium',name:'Skilled',desc:'Beat Medium AI',icon:'🧠',cat:'Skill',coins:100,xp:75,target:1,key:'aiMediumWins'},
  {id:'ai_hard',name:'AI Crusher',desc:'Beat Hard AI',icon:'💪',cat:'Skill',coins:200,xp:150,target:1,key:'aiHardWins'},
  {id:'level5',name:'Rising Star',desc:'Reach Level 5',icon:'⭐',cat:'Beginner',coins:200,xp:0,target:5,key:'level'},
  {id:'level10',name:'Experienced',desc:'Reach Level 10',icon:'🌟',cat:'Skill',coins:500,xp:0,target:10,key:'level'},
  {id:'level25',name:'Elite',desc:'Reach Level 25',icon:'👑',cat:'Win',coins:1500,xp:0,target:25,key:'level'},
  {id:'daily3',name:'Streak Keeper',desc:'Claim 3 daily rewards',icon:'📅',cat:'Beginner',coins:75,xp:50,target:3,key:'dailyClaimed'},
  {id:'daily7',name:'Week Warrior',desc:'Claim 7 daily rewards',icon:'🗓️',cat:'Beginner',coins:200,xp:150,target:7,key:'dailyClaimed'},
  {id:'midnight_legend',name:'Midnight Legend',desc:'Win 250 games',icon:'🌙',cat:'Win',coins:2500,xp:2500,target:250,key:'wins'},
];

// ── CHALLENGES DATA ──
const DAILY_CHALLENGE_POOL=[
  {id:'d_win1',name:'Quick Win',desc:'Win 1 game',icon:'🏆',target:1,key:'wins',coins:50,xp:30},
  {id:'d_win3',name:'Hat Trick',desc:'Win 3 games',icon:'🎯',target:3,key:'wins',coins:120,xp:75},
  {id:'d_pocket15',name:'Ball Buster',desc:'Pocket 15 balls',icon:'🎱',target:15,key:'ballsPocketed',coins:80,xp:50},
  {id:'d_pocket30',name:'Pocket Machine',desc:'Pocket 30 balls',icon:'🔵',target:30,key:'ballsPocketed',coins:150,xp:90},
  {id:'d_bank3',name:'Bank Shot Day',desc:'Make 3 bank shots',icon:'↗️',target:3,key:'bankShots',coins:100,xp:60},
  {id:'d_coins200',name:'Coin Run',desc:'Earn 200 coins in matches',icon:'🪙',target:200,key:'sessionCoins',coins:75,xp:40},
  {id:'d_play5',name:'Practice Day',desc:'Play 5 games',icon:'🎮',target:5,key:'gamesPlayed',coins:90,xp:55},
  {id:'d_ai',name:'AI Challenger',desc:'Beat the AI once',icon:'🤖',target:1,key:'aiWins',coins:100,xp:60},
];

const WEEKLY_CHALLENGES=[
  {id:'w_win10',name:'Weekly Warrior',desc:'Win 10 games this week',icon:'⚔️',target:10,key:'wins',coins:400,xp:300},
  {id:'w_pocket100',name:'Century Club',desc:'Pocket 100 balls this week',icon:'💯',target:100,key:'ballsPocketed',coins:500,xp:350},
  {id:'w_bank15',name:'Bank Week',desc:'Make 15 bank shots',icon:'📐',target:15,key:'bankShots',coins:350,xp:250},
  {id:'w_coins1000',name:'Weekly Earner',desc:'Earn 1,000 coins',icon:'💰',target:1000,key:'totalCoinsEarned',coins:300,xp:200},
];

// ── PLAYER DATA (saved to localStorage) ──
const SAVE_KEY='midnightBilliards_v1';
function defaultProfile(){
  return {
    username:'Pool Rookie',equippedTitle:'Rookie',equippedAvatar:'ball8',equippedCue:'oak',
    level:1,xp:0,coins:500,wins:0,losses:0,gamesPlayed:0,maxStreak:0,currentStreak:0,
    ballsPocketed:0,bankShots:0,totalCoinsEarned:500,aiEasyWins:0,aiMediumWins:0,aiHardWins:0,
    aiWins:0,sessionCoins:0,cuesOwned:['oak'],avatarsOwned:['ball8'],
    dailyClaimed:0,dailyLastClaim:null,dailyStreak:0,dailyStreakDay:0,
    achUnlocked:[],challengeProgress:{},weeklyProgress:{},
    dailyChallenges:[],dailyChallengesDate:null
  };
}
let profile=loadProfile();
function loadProfile(){
  try{const d=localStorage.getItem(SAVE_KEY);if(d)return Object.assign(defaultProfile(),JSON.parse(d));}catch(e){}
  return defaultProfile();
}
function saveProfile(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(profile));}catch(e){}}

// ── RULES DATABASE ──
const RULES_DB={
  eightball:{title:'8-Ball Pool',icon:'8',sub:'Standard Rules',
    rules:[{h:'Objective',p:'Pocket all your group (solids or stripes) then legally pocket the 8-ball.'},{h:'Break',p:'Must hit rack and pocket a ball or drive 4 to cushions.'},{h:'Group Assignment',p:'Assigned on first legal pocket after break.'},{h:'8-Ball',p:'Shoot only after clearing your group. Early pocket = loss.'},{h:'Ball in Hand',p:'On foul, opponent gets ball-in-hand anywhere.'}],
    tips:[{icon:'🎯',title:'Break Power',text:'Hit dead-center with max power for best spread.'},{icon:'🔵',title:'Play Safe',text:"No clear shot? Safety — leave cue ball awkward."},{icon:'🧮',title:'Plan Ahead',text:'Think two shots ahead.'}],
    fouls:[{title:'Scratch',text:'Cue ball pocketed → ball in hand.'},{title:'No Rail',text:'No cushion after contact → ball in hand.'},{title:'Wrong Ball',text:'Hitting wrong ball first → ball in hand.'},{title:'8-Ball Foul',text:'Early 8-ball or scratch on it → immediate loss.'}]},
  nineball:{title:'9-Ball Pool',icon:'9',sub:'Standard Rules',
    rules:[{h:'Objective',p:'Pocket the 9-ball legally to win.'},{h:'Lowest Ball First',p:'Must strike lowest ball first on every shot.'},{h:'Combo Wins',p:'Can win anytime by legally pocketing the 9-ball.'},{h:'Break',p:'1-ball at front. 9-ball on break = instant win.'}],
    tips:[{icon:'🎯',title:'Lowest Ball First',text:'Always ensure lowest numbered ball is struck first.'},{icon:'🔢',title:'9-Ball Combos',text:'Scan constantly for 9-ball combo opportunities.'}],
    fouls:[{title:'Scratch',text:'Ball in hand anywhere.'},{title:'Wrong Ball',text:'Missing lowest ball → ball in hand.'},{title:'3 Fouls',text:'Three consecutive fouls → opponent wins.'}]},
  tenball:{title:'10-Ball Pool',icon:'10',sub:'Call Shot Rules',
    rules:[{h:'Objective',p:'Pocket the 10-ball legally to win.'},{h:'Call Shot',p:'Must call ball and pocket for every shot.'},{h:'Lowest Ball First',p:'Cue ball must strike lowest numbered ball first.'}],
    tips:[{icon:'📢',title:'Call Your Shot',text:'Announce ball and pocket before every shot.'}],
    fouls:[{title:'Scratch',text:'Ball in hand anywhere.'},{title:'Wrong Ball First',text:'Ball in hand.'},{title:'Uncalled Pocket',text:'Ball spotted, no point.'}]},
  sevenball:{title:'7-Ball Pool',icon:'7',sub:'Speed Rules',
    rules:[{h:'Objective',p:'Pocket the 7-ball to win.'},{h:'Rack',p:'1-7 racked in a circle. 7 in center.'},{h:'Win',p:'Legally pocket the 7-ball at any time.'}],
    tips:[{icon:'⚡',title:'Fast Paced',text:'Always look for 7-ball combos.'}],
    fouls:[{title:'Scratch',text:'Ball behind head string.'},{title:'Wrong Ball First',text:'Ball in hand.'}]},
  blackball:{title:'Blackball',icon:'●',sub:'British Pool',
    rules:[{h:'Objective',p:'Pocket all your group then the black ball.'},{h:'Two Shots',p:'Foul gives opponent two visits.'},{h:'Black Ball',p:'Must be called. Wrong pocket = loss.'}],
    tips:[{icon:'🎯',title:'Call Your Black',text:'Always declare target pocket for the black.'}],
    fouls:[{title:'Foul',text:'Opponent gets two visits.'},{title:'Black in Wrong Pocket',text:'Immediate loss.'}]},
  straightpool:{title:'Straight Pool (14.1)',icon:'15',sub:'Continuous Pool',
    rules:[{h:'Objective',p:'First to 50 points wins. Each pocketed ball = 1 point.'},{h:'Call Shot',p:'Every shot requires calling ball and pocket.'},{h:'Continuous',p:'When 1 ball remains, 14 others re-rack.'}],
    tips:[{icon:'🎯',title:'Cluster Busting',text:'Break clusters while maintaining cue ball position.'}],
    fouls:[{title:'Scratch',text:'-1 point, ball in hand.'},{title:'Three Fouls',text:'-16 points, re-rack.'}]},
  onepocket:{title:'One Pocket',icon:'◎',sub:'Strategic Pool',
    rules:[{h:'Objective',p:'First to pocket 8 balls in your designated corner pocket.'},{h:'Pockets',p:'P1 = bottom-left, P2 = bottom-right.'},{h:'Strategy',p:'Defense and safeties are critical.'}],
    tips:[{icon:'🛡️',title:'Defense First',text:'Deny opponent access to their pocket.'}],
    fouls:[{title:'Scratch',text:'One ball spotted from count.'},{title:'No Rail',text:'Foul, ball spotted.'}]},
  bankpool:{title:'Bank Pool',icon:'↗',sub:'Bank Shot Rules',
    rules:[{h:'Objective',p:'First to bank 5 balls wins.'},{h:'Bank Only',p:'Every shot must contact cushion before pocket.'},{h:'Call Shot',text:'Must call bank path before each shot.'}],
    tips:[{icon:'📐',title:'Angle is Everything',text:'Angle of incidence = angle of reflection.'}],
    fouls:[{title:'Scratch',text:'Ball in hand.'},{title:'No Bank',text:'Ball spotted, no score.'}]},
  snooker:{title:'Snooker',icon:'S',sub:'Full Rules',
    rules:[{h:'Objective',p:'Score more points than opponent.'},{h:'Ball Values',p:'Red=1, Yellow=2, Green=3, Brown=4, Blue=5, Pink=6, Black=7'},{h:'Sequence',p:'Alternate red and colour. After reds gone, pot colours in order.'}],
    tips:[{icon:'🎯',title:'Cue Ball Control',text:'Snooker is 90% cue ball position.'}],
    fouls:[{title:'Foul',text:'Minimum 4 points to opponent.'},{title:'In-Off',text:'Minimum 4pt penalty.'}]},
};

const GAME_TIPS=[
  "Click and drag away from the cue ball to aim.",
  "Hold longer while dragging for maximum power.",
  "The aim guide shows your cue ball's exact path.",
  "Ghost ball shows where your cue ball will contact.",
  "Speed control is just as important as direction.",
  "Plan your next shot before taking the current one.",
  "A safety is sometimes smarter than a risky shot.",
  "Complete daily challenges for bonus coins & XP.",
  "Bank shots earn more coins and achievement progress.",
  "Level up to unlock new titles and rewards.",
];

// ── COIN REWARDS ──
const COIN_REWARDS={
  easy_ai:50, medium_ai:100, hard_ai:200, multiplayer:150,
  pocket_bonus:5, win_streak_3:50, win_streak_5:100
};

// ── GAME STATE ──
let state={
  mode:'eightball',gameMode:null,aiDifficulty:'medium',
  currentPlayer:0,balls:[],cueBall:null,pockets:[],
  shooting:false,ballsMoving:false,aimAngle:0,power:0,
  isCharging:false,mousePos:{x:0,y:0},isDragging:false,
  dragStart:{x:0,y:0},tableW:0,tableH:0,tableX:0,tableY:0,
  scores:[0,0],playerGroups:[null,null],breakTaken:false,
  firstHitBall:null,ballsPocketed:[],consecutiveFouls:[0,0],
  gameOver:false,foulActive:false,ballInHand:false,placingBall:false,
  snookerPhase:'reds',snookerNextColor:null,snookerRedPotted:false,
  onePocketScores:[0,0],straightPoolTarget:50,straightPoolScores:[0,0],
  soundOn:true,animFrame:null,tipRotateInterval:null,
  sessionBallsPocketed:0,sessionBankShots:0,sessionCoins:0
};

let canvas=null,ctx=null,W,H;

// ── AUDIO ──
const AudioCtx=window.AudioContext||window.webkitAudioContext;
let audioCtx=null;
function getAudioCtx(){if(!audioCtx)audioCtx=new AudioCtx();return audioCtx;}
function playSound(type){
  if(!state.soundOn)return;
  try{
    const ac=getAudioCtx(),osc=ac.createOscillator(),gain=ac.createGain();
    osc.connect(gain);gain.connect(ac.destination);
    if(type==='hit'){osc.frequency.setValueAtTime(200,ac.currentTime);osc.frequency.exponentialRampToValueAtTime(80,ac.currentTime+0.1);gain.gain.setValueAtTime(0.3,ac.currentTime);gain.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.15);}
    else if(type==='pocket'){osc.frequency.setValueAtTime(520,ac.currentTime);osc.frequency.exponentialRampToValueAtTime(200,ac.currentTime+0.3);gain.gain.setValueAtTime(0.4,ac.currentTime);gain.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.35);}
    else if(type==='cushion'){osc.frequency.setValueAtTime(140,ac.currentTime);gain.gain.setValueAtTime(0.15,ac.currentTime);gain.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.08);}
    else if(type==='cue'){osc.type='sawtooth';osc.frequency.setValueAtTime(120+state.power*8,ac.currentTime);osc.frequency.exponentialRampToValueAtTime(40,ac.currentTime+0.2);gain.gain.setValueAtTime(0.25,ac.currentTime);gain.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.25);}
    else if(type==='win'){[523,659,784,1047].forEach((f,i)=>{const o2=ac.createOscillator(),g2=ac.createGain();o2.connect(g2);g2.connect(ac.destination);o2.frequency.value=f;g2.gain.setValueAtTime(0,ac.currentTime+i*0.1);g2.gain.linearRampToValueAtTime(0.3,ac.currentTime+i*0.1+0.05);g2.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+i*0.1+0.3);o2.start(ac.currentTime+i*0.1);o2.stop(ac.currentTime+i*0.1+0.35);});return;}
    osc.start(ac.currentTime);osc.stop(ac.currentTime+0.4);
  }catch(e){}
}

// ── MATH UTILS ──
function dist(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}
function norm(v){const m=Math.hypot(v.x,v.y);return m?{x:v.x/m,y:v.y/m}:{x:0,y:0};}
function dot(a,b){return a.x*b.x+a.y*b.y;}
function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}

// ── TABLE SETUP ──
function setupTable(){
  const wrap=document.getElementById('tableWrap');
  const wrW=wrap.clientWidth,wrH=wrap.clientHeight;
  let tW=Math.min(wrW*0.92,wrH*1.9*0.92);
  let tH=tW/1.9;
  if(tH>wrH*0.92){tH=wrH*0.92;tW=tH*1.9;}
  canvas.width=Math.floor(tW);canvas.height=Math.floor(tH);
  W=canvas.width;H=canvas.height;
  const px=CUSHION,py=CUSHION;
  state.pockets=[
    {x:px,y:py},{x:W/2,y:py},{x:W-px,y:py},
    {x:px,y:H-py},{x:W/2,y:H-py},{x:W-px,y:H-py}
  ];
}

function makeBall(num,x,y){
  const info=BALL_COLORS[num]||{color:'#888',stripe:false};
  return{num,x,y,vx:0,vy:0,active:true,pocketed:false,color:info.color,stripe:info.stripe,radius:BALL_RADIUS};
}

function getRackPos(mode){
  const rackX=W*0.72,rackY=H/2,r=BALL_RADIUS*2.04,positions=[];
  if(mode==='eightball'||mode==='blackball'){
    const nums=mode==='blackball'?[2,1,14,4,8,3,5,12,6,7,11,9,13,10,15]:[1,9,2,10,8,3,11,4,12,5,13,6,14,7,15];
    let i=0;for(let row=0;row<5;row++)for(let col=0;col<=row;col++){const bx=rackX+row*r*Math.cos(Math.PI/6),by=rackY+(col-row/2)*r;positions.push({x:bx,y:by,num:nums[i++]});}
  }else if(mode==='nineball'){
    const nums=[1,2,3,4,9,5,6,7,8],diamond=[[0,0],[-1,-1],[1,-1],[-1,1],[1,1],[0,-2],[0,2],[-2,0],[2,0]];
    diamond.forEach(([dx,dy],i)=>positions.push({x:rackX+dx*r*0.87,y:rackY+dy*r*0.87,num:nums[i]}));
  }else if(mode==='tenball'){
    const nums=[1,2,3,4,5,10,6,7,8,9];let i=0;
    for(let row=0;row<4;row++)for(let col=0;col<=row;col++){const bx=rackX+row*r*Math.cos(Math.PI/6),by=rackY+(col-row/2)*r;positions.push({x:bx,y:by,num:nums[i++]});}
    positions.push({x:rackX+r*Math.cos(Math.PI/6)*2,y:rackY,num:10});
  }else if(mode==='sevenball'){
    const nums=[1,2,3,4,5,6,7],hex=[[0,0],[0,-1],[1,-0.5],[1,0.5],[0,1],[-1,0.5],[-1,-0.5]];
    hex.forEach(([dx,dy],i)=>positions.push({x:rackX+dx*r,y:rackY+dy*r,num:nums[i]}));
  }else if(mode==='snooker'){
    let i=0;for(let row=0;row<5;row++)for(let col=0;col<=row;col++){positions.push({x:rackX+row*r*Math.cos(Math.PI/6),y:rackY+(col-row/2)*r,num:16});i++;}
    [{x:W*0.25,y:H/2-r*1.5,num:17},{x:W*0.25,y:H/2,num:18},{x:W*0.25,y:H/2+r*1.5,num:19},{x:W*0.5,y:H/2,num:20},{x:W*0.66,y:H/2,num:21},{x:W*0.86,y:H/2,num:22}].forEach(p=>positions.push(p));
  }else{
    const nums=[1,9,2,10,8,3,11,4,12,5,13,6,14,7,15];let i=0;
    for(let row=0;row<5;row++)for(let col=0;col<=row;col++){const bx=rackX+row*r*Math.cos(Math.PI/6),by=rackY+(col-row/2)*r;positions.push({x:bx,y:by,num:nums[i++]});}
  }
  return positions;
}

// ── INIT GAME ──
function initGame(mode,gameMode){
  state.mode=mode;state.gameMode=gameMode;
  state.aiDifficulty=document.getElementById('aiDifficulty').value;
  state.currentPlayer=0;state.scores=[0,0];state.playerGroups=[null,null];
  state.breakTaken=false;state.firstHitBall=null;state.ballsPocketed=[];
  state.consecutiveFouls=[0,0];state.gameOver=false;state.foulActive=false;
  state.ballInHand=false;state.placingBall=false;state.shooting=false;
  state.ballsMoving=false;state.isCharging=false;state.power=0;
  state.snookerPhase='reds';state.snookerRedPotted=false;state.snookerNextColor=null;
  state.onePocketScores=[0,0];state.straightPoolScores=[0,0];state.straightPoolTarget=50;
  state.sessionBallsPocketed=0;state.sessionBankShots=0;state.sessionCoins=0;
  setupTable();
  state.cueBall=makeBall(0,W*0.27,H/2);state.cueBall.color='#f0ece0';state.cueBall.stripe=false;
  const rackPositions=getRackPos(mode);
  state.balls=[state.cueBall,...rackPositions.map(p=>makeBall(p.num,p.x,p.y))];
  profile.gamesPlayed++;checkChallengeProgress('gamesPlayed',profile.gamesPlayed);saveProfile();
  updateHUD();updateBallRacks();showScreen('gameScreen');rotateTips();
  if(!state.animFrame)gameLoop();
}

// ── PHYSICS ──
function physicsStep(){
  let anyMoving=false;
  state.balls.forEach(b=>{
    if(!b.active||b.pocketed)return;
    const speed=Math.hypot(b.vx,b.vy);
    if(speed<=MIN_SPEED){b.vx=0;b.vy=0;return;}
    anyMoving=true;
    b.x+=b.vx;b.y+=b.vy;b.vx*=FRICTION;b.vy*=FRICTION;
    const minX=CUSHION+b.radius,maxX=W-CUSHION-b.radius,minY=CUSHION+b.radius,maxY=H-CUSHION-b.radius;
    let hitCushion=false;
    if(b.x<minX){b.x=minX;b.vx=Math.abs(b.vx)*CUSHION_BOUNCE;hitCushion=true;}
    if(b.x>maxX){b.x=maxX;b.vx=-Math.abs(b.vx)*CUSHION_BOUNCE;hitCushion=true;}
    if(b.y<minY){b.y=minY;b.vy=Math.abs(b.vy)*CUSHION_BOUNCE;hitCushion=true;}
    if(b.y>maxY){b.y=maxY;b.vy=-Math.abs(b.vy)*CUSHION_BOUNCE;hitCushion=true;}
    if(hitCushion)playSound('cushion');
    if(Math.abs(b.vx)<MIN_SPEED)b.vx=0;if(Math.abs(b.vy)<MIN_SPEED)b.vy=0;
  });
  for(let i=0;i<state.balls.length;i++){
    const a=state.balls[i];if(!a.active||a.pocketed)continue;
    for(let j=i+1;j<state.balls.length;j++){
      const b=state.balls[j];if(!b.active||b.pocketed)continue;
      const d=dist(a,b),minDist=a.radius+b.radius;
      if(d<minDist&&d>0.01){
        playSound('hit');
        if(!state.firstHitBall){if(a===state.cueBall)state.firstHitBall=b;else if(b===state.cueBall)state.firstHitBall=a;}
        const nx=(b.x-a.x)/d,ny=(b.y-a.y)/d,overlap=minDist-d;
        a.x-=nx*overlap/2;a.y-=ny*overlap/2;b.x+=nx*overlap/2;b.y+=ny*overlap/2;
        const dvx=a.vx-b.vx,dvy=a.vy-b.vy,dv=dvx*nx+dvy*ny;
        if(dv>0){const impulse=dv*(1+BALL_BOUNCE)/2;a.vx-=impulse*nx;a.vy-=impulse*ny;b.vx+=impulse*nx;b.vy+=impulse*ny;}
      }
    }
  }
  state.pockets.forEach(pocket=>{
    state.balls.forEach(b=>{
      if(!b.active||b.pocketed)return;
      if(dist(b,pocket)<POCKET_RADIUS){
        b.pocketed=true;b.active=false;b.vx=0;b.vy=0;
        playSound('pocket');
        state.ballsPocketed.push({ball:b,pocket});
        if(b.num!==0){
          state.sessionBallsPocketed++;
          showShotFeedback('🎯 Great Shot!','#c9a84c');
        }
      }
    });
  });
  return anyMoving;
}

// ── SHOT RESULT PROCESSING ──
function processShotResult(){
  const mode=state.mode,pocketed=state.ballsPocketed,fh=state.firstHitBall;
  let foul=false,foulMsg='',scored=false,switchTurn=true,winner=null;
  const cueScratch=pocketed.some(p=>p.ball.num===0);
  const activeBalls=state.balls.filter(b=>b.active&&!b.pocketed&&b.num!==0);

  if(mode==='eightball'||mode==='blackball'){
    const solids=pocketed.filter(p=>p.ball.num>=1&&p.ball.num<=7);
    const stripes=pocketed.filter(p=>p.ball.num>=9&&p.ball.num<=15);
    const eightBall=pocketed.find(p=>p.ball.num===8);
    if(!state.breakTaken){state.breakTaken=true;if(!fh&&pocketed.length===0){foul=true;foulMsg='No ball hit on break!';}}
    else{
      if(!fh){foul=true;foulMsg='No contact!';}
      else if(state.playerGroups[0]===null&&state.playerGroups[1]===null){if(fh.num===8){foul=true;foulMsg='Hit 8-ball first!';}}
      else{
        const myGroup=state.playerGroups[state.currentPlayer];
        if(myGroup==='solids'&&fh.num>=9&&fh.num<=15){foul=true;foulMsg='Wrong ball first!';}
        else if(myGroup==='stripes'&&fh.num>=1&&fh.num<=7){foul=true;foulMsg='Wrong ball first!';}
        else if(myGroup!==null&&fh.num===8){
          const myBalls=myGroup==='solids'?state.balls.filter(b=>b.num>=1&&b.num<=7&&!b.pocketed&&b.active):state.balls.filter(b=>b.num>=9&&b.num<=15&&!b.pocketed&&b.active);
          if(myBalls.length>0){foul=true;foulMsg='Hit 8-ball before clearing!';}
        }
      }
    }
    if(cueScratch){foul=true;foulMsg='Scratch!';}
    if(!foul){
      if(state.playerGroups[0]===null&&(solids.length>0||stripes.length>0)){
        if(solids.length>0&&stripes.length===0){state.playerGroups[state.currentPlayer]='solids';state.playerGroups[1-state.currentPlayer]='stripes';}
        else if(stripes.length>0&&solids.length===0){state.playerGroups[state.currentPlayer]='stripes';state.playerGroups[1-state.currentPlayer]='solids';}
        else{state.playerGroups[state.currentPlayer]='solids';state.playerGroups[1-state.currentPlayer]='stripes';}
      }
      const myGroup=state.playerGroups[state.currentPlayer];
      const myPocketed=pocketed.filter(p=>{if(myGroup==='solids')return p.ball.num>=1&&p.ball.num<=7;if(myGroup==='stripes')return p.ball.num>=9&&p.ball.num<=15;return false;});
      if(myPocketed.length>0){scored=true;switchTurn=false;}
      if(eightBall){
        const myGroupBalls=myGroup==='solids'?state.balls.filter(b=>b.num>=1&&b.num<=7&&!b.pocketed&&b.active):state.balls.filter(b=>b.num>=9&&b.num<=15&&!b.pocketed&&b.active);
        if(myGroup&&myGroupBalls.length===0){if(cueScratch){winner=1-state.currentPlayer;}else{winner=state.currentPlayer;}}
        else{winner=1-state.currentPlayer;foulMsg='8-Ball too early!';}
      }
    }
  }else if(mode==='nineball'||mode==='tenball'){
    const lowestBall=state.balls.filter(b=>b.num>=1&&b.active&&!b.pocketed).sort((a,b)=>a.num-b.num)[0];
    const ninePocketed=pocketed.find(p=>p.ball.num===9)||(mode==='tenball'&&pocketed.find(p=>p.ball.num===10));
    if(!fh){foul=true;foulMsg='No contact!';}else if(lowestBall&&fh.num!==lowestBall.num){foul=true;foulMsg=`Must hit ${lowestBall.num} first!`;}
    if(cueScratch){foul=true;foulMsg='Scratch!';}
    if(!foul&&ninePocketed)winner=state.currentPlayer;
    if(!foul&&pocketed.filter(p=>p.ball.num!==0).length>0){scored=true;switchTurn=false;}
  }else if(mode==='sevenball'){
    const lowestBall=state.balls.filter(b=>b.num>=1&&b.num<=7&&b.active&&!b.pocketed).sort((a,b)=>a.num-b.num)[0];
    const sevenPocketed=pocketed.find(p=>p.ball.num===7);
    if(!fh){foul=true;foulMsg='No contact!';}else if(lowestBall&&fh.num!==lowestBall.num){foul=true;foulMsg=`Must hit ${lowestBall.num} first!`;}
    if(cueScratch){foul=true;foulMsg='Scratch!';}
    if(!foul&&sevenPocketed)winner=state.currentPlayer;
    if(!foul&&pocketed.filter(p=>p.ball.num!==0).length>0){scored=true;switchTurn=false;}
  }else if(mode==='straightpool'){
    if(!fh){foul=true;foulMsg='No contact!';}if(cueScratch){foul=true;foulMsg='Scratch!';}
    if(!foul){
      const pts=pocketed.filter(p=>p.ball.num!==0).length;
      if(pts>0){state.straightPoolScores[state.currentPlayer]+=pts;scored=true;switchTurn=false;if(state.straightPoolScores[state.currentPlayer]>=state.straightPoolTarget)winner=state.currentPlayer;const remaining=state.balls.filter(b=>b.active&&!b.pocketed&&b.num!==0);if(remaining.length===0)rerackStraightPool();}
    }else{state.straightPoolScores[state.currentPlayer]=Math.max(0,state.straightPoolScores[state.currentPlayer]-1);}
  }else if(mode==='onepocket'){
    if(!fh){foul=true;foulMsg='No contact!';}if(cueScratch){foul=true;foulMsg='Scratch!';}
    if(!foul){
      pocketed.forEach(p=>{if(p.ball.num===0)return;const pocketIdx=state.pockets.indexOf(p.pocket);if(pocketIdx===3){state.onePocketScores[0]++;if(state.currentPlayer===0)scored=true;}else if(pocketIdx===5){state.onePocketScores[1]++;if(state.currentPlayer===1)scored=true;}else{p.ball.active=true;p.ball.pocketed=false;p.ball.x=W*0.5;p.ball.y=H*0.5;p.ball.vx=0;p.ball.vy=0;}});
      if(scored)switchTurn=false;if(state.onePocketScores[0]>=8)winner=0;else if(state.onePocketScores[1]>=8)winner=1;
    }
  }else if(mode==='bankpool'){
    if(!fh){foul=true;foulMsg='No contact!';}if(cueScratch){foul=true;foulMsg='Scratch!';}
    if(!foul){
      const pts=pocketed.filter(p=>p.ball.num!==0).length;
      if(pts>0){state.scores[state.currentPlayer]+=pts;scored=true;switchTurn=false;if(state.scores[state.currentPlayer]>=5)winner=state.currentPlayer;state.sessionBankShots+=pts;checkChallengeProgress('bankShots',profile.bankShots+state.sessionBankShots);}
    }
  }else if(mode==='snooker'){
    if(!fh){foul=true;foulMsg='No contact!';}if(cueScratch){foul=true;foulMsg='In-off!';}
    const snookerPocketedBalls=pocketed.filter(p=>p.ball.num!==0);
    if(!foul){
      snookerPocketedBalls.forEach(p=>{const num=p.ball.num;let pts=0;if(num===16)pts=1;else if(num===17)pts=2;else if(num===18)pts=3;else if(num===19)pts=4;else if(num===20)pts=5;else if(num===21)pts=6;else if(num===22)pts=7;state.scores[state.currentPlayer]+=pts;if(num===16){state.snookerRedPotted=true;}else{const redsLeft=state.balls.filter(b=>b.num===16&&b.active&&!b.pocketed);if(redsLeft.length>0){p.ball.active=true;p.ball.pocketed=false;p.ball.x=W*0.7;p.ball.y=H/2;p.ball.vx=0;p.ball.vy=0;}state.snookerRedPotted=false;}scored=true;switchTurn=false;});
      const remainingBalls=state.balls.filter(b=>b.num!==0&&b.active&&!b.pocketed);if(remainingBalls.length===0)winner=state.scores[0]>state.scores[1]?0:1;
    }else{state.scores[1-state.currentPlayer]+=4;}
  }

  if(foul){state.consecutiveFouls[state.currentPlayer]++;state.foulActive=true;showFoulMsg(foulMsg);if(cueScratch||foul){state.ballInHand=true;state.placingBall=true;if(cueScratch){state.cueBall.active=true;state.cueBall.pocketed=false;state.cueBall.x=W*0.27;state.cueBall.y=H/2;state.cueBall.vx=0;state.cueBall.vy=0;}}switchTurn=true;}
  else{state.consecutiveFouls[state.currentPlayer]=0;state.foulActive=false;}
  if(state.mode==='nineball'&&state.consecutiveFouls[state.currentPlayer]>=3)winner=1-state.currentPlayer;
  if(winner!==null&&winner!==undefined){setTimeout(()=>endGame(winner),600);return;}
  if(switchTurn)state.currentPlayer=1-state.currentPlayer;
  state.ballsPocketed=[];state.firstHitBall=null;
  updateHUD();updateBallRacks();
  if(state.gameMode==='ai'&&state.currentPlayer===1&&!state.gameOver)setTimeout(doAIShot,1200);
}

function rerackStraightPool(){
  const rackX=W*0.72,rackY=H/2,r=BALL_RADIUS*2.04,nums=[1,9,2,10,3,11,4,12,5,13,6,14,7,15,8];
  let i=0;for(let row=0;row<5;row++)for(let col=0;col<=row;col++){const bx=rackX+row*r*Math.cos(Math.PI/6),by=rackY+(col-row/2)*r;const ball=makeBall(nums[i++],bx,by);state.balls.push(ball);}
}

// ── SHOOT ──
function shoot(angle,power){
  if(state.gameOver)return;
  const speed=power*MAX_POWER;
  state.cueBall.vx=Math.cos(angle)*speed;state.cueBall.vy=Math.sin(angle)*speed;
  state.ballsMoving=true;state.shooting=false;state.firstHitBall=null;state.ballsPocketed=[];
  playSound('cue');
}

// ── AI ──
function doAIShot(){
  if(state.gameOver||state.ballsMoving)return;
  const diff=state.aiDifficulty,targetBalls=getAITargetBalls();
  if(targetBalls.length===0){shoot(Math.random()*Math.PI*2,0.4);return;}
  let bestShot=null,bestScore=-Infinity;
  targetBalls.forEach(target=>{
    state.pockets.forEach(pocket=>{
      const toPocket={x:pocket.x-target.x,y:pocket.y-target.y},toPocketLen=Math.hypot(toPocket.x,toPocket.y);
      const toPocketN={x:toPocket.x/toPocketLen,y:toPocket.y/toPocketLen};
      const ghostX=target.x-toPocketN.x*BALL_RADIUS*2,ghostY=target.y-toPocketN.y*BALL_RADIUS*2;
      const toCue={x:ghostX-state.cueBall.x,y:ghostY-state.cueBall.y},toCueLen=Math.hypot(toCue.x,toCue.y);
      if(toCueLen<1)return;
      const angle=Math.atan2(toCue.y,toCue.x),score=1/(1+toPocketLen/100)+1/(1+toCueLen/100)*0.5;
      if(score>bestScore){bestScore=score;bestShot={angle,target,pocket};}
    });
  });
  if(!bestShot){shoot(Math.random()*Math.PI*2,0.3);return;}
  let noise=0;if(diff==='easy')noise=(Math.random()-0.5)*0.6;else if(diff==='medium')noise=(Math.random()-0.5)*0.2;else noise=(Math.random()-0.5)*0.06;
  const power=diff==='easy'?0.35+Math.random()*0.3:diff==='medium'?0.45+Math.random()*0.25:0.55+Math.random()*0.2;
  shoot(bestShot.angle+noise,power);
}

function getAITargetBalls(){
  const mode=state.mode,player=1;let balls=[];
  if(mode==='eightball'||mode==='blackball'){const myGroup=state.playerGroups[player];if(!myGroup)balls=state.balls.filter(b=>b.num>=1&&b.num<=15&&b.num!==8&&b.active&&!b.pocketed);else if(myGroup==='solids'){balls=state.balls.filter(b=>b.num>=1&&b.num<=7&&b.active&&!b.pocketed);if(balls.length===0)balls=state.balls.filter(b=>b.num===8&&b.active&&!b.pocketed);}else{balls=state.balls.filter(b=>b.num>=9&&b.num<=15&&b.active&&!b.pocketed);if(balls.length===0)balls=state.balls.filter(b=>b.num===8&&b.active&&!b.pocketed);}}
  else if(mode==='nineball'||mode==='tenball'||mode==='sevenball'){const maxNum=mode==='nineball'?9:mode==='tenball'?10:7;const lowestBall=state.balls.filter(b=>b.num>=1&&b.num<=maxNum&&b.active&&!b.pocketed).sort((a,b)=>a.num-b.num)[0];if(lowestBall)balls=[lowestBall];}
  else if(mode==='snooker'){balls=state.balls.filter(b=>b.num===16&&b.active&&!b.pocketed);if(balls.length===0)balls=state.balls.filter(b=>b.num>=17&&b.active&&!b.pocketed);}
  else balls=state.balls.filter(b=>b.num!==0&&b.active&&!b.pocketed);
  return balls;
}

// ── DRAWING ──
function drawTable(){
  const grd=ctx.createLinearGradient(CUSHION,CUSHION,W-CUSHION,H-CUSHION);
  grd.addColorStop(0,'#1e5a34');grd.addColorStop(0.5,'#1a4a2e');grd.addColorStop(1,'#163d24');
  ctx.fillStyle=grd;ctx.fillRect(CUSHION,CUSHION,W-CUSHION*2,H-CUSHION*2);
  ctx.save();ctx.strokeStyle='rgba(255,255,255,0.02)';ctx.lineWidth=1;
  for(let y=CUSHION;y<H-CUSHION;y+=8){ctx.beginPath();ctx.moveTo(CUSHION,y);ctx.lineTo(W-CUSHION,y);ctx.stroke();}
  ctx.restore();
  ctx.save();ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.setLineDash([6,4]);
  ctx.beginPath();ctx.moveTo(W/2,CUSHION);ctx.lineTo(W/2,H-CUSHION);ctx.stroke();ctx.setLineDash([]);ctx.restore();
  ctx.save();ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(W*0.25,CUSHION);ctx.lineTo(W*0.25,H-CUSHION);ctx.stroke();ctx.restore();
  drawSpot(W*0.25,H/2);drawSpot(W*0.5,H/2);drawSpot(W*0.75,H/2);
  drawCushions();state.pockets.forEach(p=>drawPocket(p));
  if(state.mode==='onepocket'){const colors=['rgba(100,180,255,0.4)','rgba(255,120,80,0.4)'];[3,5].forEach((pi,i)=>{const p=state.pockets[pi];ctx.save();ctx.beginPath();ctx.arc(p.x,p.y,POCKET_RADIUS+5,0,Math.PI*2);ctx.strokeStyle=colors[i];ctx.lineWidth=2;ctx.stroke();ctx.restore();});}
}

function drawSpot(x,y){ctx.save();ctx.fillStyle='rgba(255,255,255,0.15)';ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();ctx.restore();}

function drawCushions(){
  ctx.save();
  const tg=ctx.createLinearGradient(0,0,0,CUSHION);tg.addColorStop(0,'#2a1206');tg.addColorStop(1,'#5a3010');ctx.fillStyle=tg;ctx.fillRect(0,0,W,CUSHION);
  const bg=ctx.createLinearGradient(0,H-CUSHION,0,H);bg.addColorStop(0,'#5a3010');bg.addColorStop(1,'#2a1206');ctx.fillStyle=bg;ctx.fillRect(0,H-CUSHION,W,CUSHION);
  const lg=ctx.createLinearGradient(0,0,CUSHION,0);lg.addColorStop(0,'#2a1206');lg.addColorStop(1,'#5a3010');ctx.fillStyle=lg;ctx.fillRect(0,0,CUSHION,H);
  const rg=ctx.createLinearGradient(W-CUSHION,0,W,0);rg.addColorStop(0,'#5a3010');rg.addColorStop(1,'#2a1206');ctx.fillStyle=rg;ctx.fillRect(W-CUSHION,0,CUSHION,H);
  ctx.strokeStyle='#c9a84c';ctx.lineWidth=2;ctx.strokeRect(CUSHION,CUSHION,W-CUSHION*2,H-CUSHION*2);
  ctx.strokeStyle='#7a6030';ctx.lineWidth=1;ctx.strokeRect(2,2,W-4,H-4);
  ctx.fillStyle='rgba(201,168,76,0.5)';
  const dSpacingX=(W-CUSHION*2)/8,dSpacingY=(H-CUSHION*2)/4;
  for(let i=1;i<8;i++){ctx.beginPath();ctx.arc(CUSHION+i*dSpacingX,CUSHION/2,3,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(CUSHION+i*dSpacingX,H-CUSHION/2,3,0,Math.PI*2);ctx.fill();}
  for(let i=1;i<4;i++){ctx.beginPath();ctx.arc(CUSHION/2,CUSHION+i*dSpacingY,3,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(W-CUSHION/2,CUSHION+i*dSpacingY,3,0,Math.PI*2);ctx.fill();}
  ctx.restore();
}

function drawPocket(p){
  ctx.save();const grd=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,POCKET_RADIUS);grd.addColorStop(0,'#000');grd.addColorStop(0.7,'#0a0a0a');grd.addColorStop(1,'#111');ctx.fillStyle=grd;ctx.beginPath();ctx.arc(p.x,p.y,POCKET_RADIUS,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(201,168,76,0.4)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(p.x,p.y,POCKET_RADIUS,0,Math.PI*2);ctx.stroke();ctx.restore();
}

function drawBall(b){
  if(!b.active||b.pocketed)return;
  ctx.save();const r=b.radius;
  ctx.beginPath();ctx.arc(b.x+2,b.y+3,r,0,Math.PI*2);ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fill();
  if(b.stripe){
    const bg=ctx.createRadialGradient(b.x-r*0.3,b.y-r*0.3,0,b.x,b.y,r);bg.addColorStop(0,'#f8f4ec');bg.addColorStop(0.6,'#e8e0cc');bg.addColorStop(1,'#c8c0b0');ctx.beginPath();ctx.arc(b.x,b.y,r,0,Math.PI*2);ctx.fillStyle=bg;ctx.fill();
    ctx.save();ctx.beginPath();ctx.arc(b.x,b.y,r,0,Math.PI*2);ctx.clip();ctx.fillStyle=b.color;ctx.fillRect(b.x-r,b.y-r*0.4,r*2,r*0.8);ctx.restore();
  }else if(b.num===0){
    const grd=ctx.createRadialGradient(b.x-r*0.35,b.y-r*0.35,r*0.1,b.x,b.y,r);grd.addColorStop(0,'#ffffff');grd.addColorStop(0.4,'#f4f0e8');grd.addColorStop(0.8,'#ddd8cc');grd.addColorStop(1,'#b8b0a0');ctx.beginPath();ctx.arc(b.x,b.y,r,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();
  }else{
    const grd=ctx.createRadialGradient(b.x-r*0.3,b.y-r*0.3,r*0.05,b.x,b.y,r);grd.addColorStop(0,lightenColor(b.color,40));grd.addColorStop(0.5,b.color);grd.addColorStop(1,darkenColor(b.color,40));ctx.beginPath();ctx.arc(b.x,b.y,r,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();
  }
  ctx.beginPath();ctx.arc(b.x,b.y,r,0,Math.PI*2);ctx.strokeStyle='rgba(0,0,0,0.3)';ctx.lineWidth=0.7;ctx.stroke();
  if(b.num>0){ctx.beginPath();ctx.arc(b.x,b.y,r*0.42,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.92)';ctx.fill();ctx.fillStyle='#1a1a1a';ctx.font=`bold ${r*0.55}px Rajdhani,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(b.num<=22?b.num:'',b.x,b.y+0.5);}
  ctx.beginPath();ctx.arc(b.x-r*0.28,b.y-r*0.3,r*0.22,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.3)';ctx.fill();
  ctx.restore();
}

function lightenColor(hex,amount){const num=parseInt(hex.slice(1),16);return`rgb(${Math.min(255,(num>>16)+amount)},${Math.min(255,((num>>8)&0xff)+amount)},${Math.min(255,(num&0xff)+amount)})`;}
function darkenColor(hex,amount){const num=parseInt(hex.slice(1),16);return`rgb(${Math.max(0,(num>>16)-amount)},${Math.max(0,((num>>8)&0xff)-amount)},${Math.max(0,(num&0xff)-amount)})`;}

// ── IMPROVED AIM LINE ──
function drawAimLine(){
  if(state.ballsMoving||state.placingBall)return;
  if(state.gameMode==='ai'&&state.currentPlayer===1)return;
  const cue=state.cueBall;if(!cue||!cue.active)return;
  const mx=state.mousePos.x,my=state.mousePos.y;
  const angle=Math.atan2(my-cue.y,mx-cue.x);state.aimAngle=angle;
  const cosA=Math.cos(angle),sinA=Math.sin(angle);
  ctx.save();

  // Find first ball hit
  let hitBall=null,hitDist=Infinity;
  state.balls.forEach(b=>{
    if(!b.active||b.pocketed||b===cue)return;
    const dx=b.x-cue.x,dy=b.y-cue.y,proj=dx*cosA+dy*sinA;
    if(proj<BALL_RADIUS)return;
    const perp=Math.abs(dy*cosA-dx*sinA);
    if(perp<BALL_RADIUS*2&&proj<hitDist){hitDist=proj;hitBall=b;}
  });

  // Aim line to first contact or wall
  const lineEnd=hitBall?{x:hitBall.x-cosA*BALL_RADIUS*2,y:hitBall.y-sinA*BALL_RADIUS*2}:rayCast(cue.x,cue.y,cosA,sinA,420);

  // Glow behind line
  ctx.strokeStyle='rgba(201,168,76,0.1)';ctx.lineWidth=7;ctx.setLineDash([]);
  ctx.beginPath();ctx.moveTo(cue.x,cue.y);ctx.lineTo(lineEnd.x,lineEnd.y);ctx.stroke();
  // Main line
  ctx.strokeStyle='rgba(201,168,76,0.62)';ctx.lineWidth=1.5;ctx.setLineDash([9,5]);
  ctx.beginPath();ctx.moveTo(cue.x,cue.y);ctx.lineTo(lineEnd.x,lineEnd.y);ctx.stroke();
  ctx.setLineDash([]);

  // Arrowhead when no ball hit
  if(!hitBall){
    const ax=lineEnd.x,ay=lineEnd.y,al=7,aa=0.4;
    ctx.fillStyle='rgba(201,168,76,0.38)';
    ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(ax-Math.cos(angle-aa)*al,ay-Math.sin(angle-aa)*al);ctx.lineTo(ax-Math.cos(angle+aa)*al,ay-Math.sin(angle+aa)*al);ctx.closePath();ctx.fill();
  }

  if(hitBall){
    const gx=hitBall.x-cosA*BALL_RADIUS*2,gy=hitBall.y-sinA*BALL_RADIUS*2;
    // Ghost ball at contact — glow
    ctx.shadowColor='rgba(255,220,100,0.4)';ctx.shadowBlur=10;
    ctx.strokeStyle='rgba(255,220,100,0.65)';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.arc(gx,gy,BALL_RADIUS,0,Math.PI*2);ctx.stroke();
    ctx.shadowBlur=0;
    // Contact dot
    ctx.fillStyle='rgba(255,220,100,0.75)';ctx.beginPath();ctx.arc(gx,gy,3,0,Math.PI*2);ctx.fill();

    // Object ball path
    const nx=hitBall.x-gx,ny=hitBall.y-gy,nl=Math.hypot(nx,ny);
    if(nl>0){
      const nnx=nx/nl,nny=ny/nl;
      const objEnd=rayCast(hitBall.x,hitBall.y,nnx,nny,240);
      ctx.strokeStyle='rgba(255,220,100,0.09)';ctx.lineWidth=6;ctx.setLineDash([]);
      ctx.beginPath();ctx.moveTo(hitBall.x,hitBall.y);ctx.lineTo(objEnd.x,objEnd.y);ctx.stroke();
      ctx.strokeStyle='rgba(255,220,100,0.34)';ctx.lineWidth=1.3;ctx.setLineDash([6,5]);
      ctx.beginPath();ctx.moveTo(hitBall.x,hitBall.y);ctx.lineTo(objEnd.x,objEnd.y);ctx.stroke();
      ctx.setLineDash([]);
      // Arrow mid-path
      const oa=Math.atan2(nny,nnx),omx=(hitBall.x+objEnd.x)/2,omy=(hitBall.y+objEnd.y)/2;
      ctx.fillStyle='rgba(255,220,100,0.32)';ctx.beginPath();ctx.moveTo(omx+Math.cos(oa)*6,omy+Math.sin(oa)*6);ctx.lineTo(omx+Math.cos(oa+2.4)*5,omy+Math.sin(oa+2.4)*5);ctx.lineTo(omx+Math.cos(oa-2.4)*5,omy+Math.sin(oa-2.4)*5);ctx.closePath();ctx.fill();

      // Pocket highlight
      let np=null,nd=Infinity;
      state.pockets.forEach(p=>{const dx=p.x-hitBall.x,dy=p.y-hitBall.y,pr=dx*nnx+dy*nny,pe=Math.abs(dy*nnx-dx*nny);if(pr>0&&pe<POCKET_RADIUS*2.2&&pr<nd){nd=pr;np=p;}});
      if(np&&nd<190){const al=Math.max(0,1-nd/190)*0.6;ctx.strokeStyle=`rgba(46,204,113,${al})`;ctx.lineWidth=2;ctx.beginPath();ctx.arc(np.x,np.y,POCKET_RADIUS+5,0,Math.PI*2);ctx.stroke();}
    }

    // Cue-ball deflection
    const dvx=nx/nl,dvy=ny/nl,imp=cosA*dvx+sinA*dvy;
    const cbvx=cosA-imp*dvx,cbvy=sinA-imp*dvy,cbl=Math.hypot(cbvx,cbvy);
    if(cbl>0.01){
      const cbEnd=rayCast(gx,gy,cbvx/cbl,cbvy/cbl,200);
      ctx.strokeStyle='rgba(120,180,255,0.1)';ctx.lineWidth=5;ctx.setLineDash([]);
      ctx.beginPath();ctx.moveTo(gx,gy);ctx.lineTo(cbEnd.x,cbEnd.y);ctx.stroke();
      ctx.strokeStyle='rgba(120,180,255,0.4)';ctx.lineWidth=1.2;ctx.setLineDash([4,6]);
      ctx.beginPath();ctx.moveTo(gx,gy);ctx.lineTo(cbEnd.x,cbEnd.y);ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // Cue stick
  if(state.isCharging){
    const eq=CUES.find(c=>c.id===profile.equippedCue)||CUES[0];
    const cueLen=165,pull=state.power*34;
    const cs={x:cue.x-cosA*(BALL_RADIUS+1+pull),y:cue.y-sinA*(BALL_RADIUS+1+pull)};
    const ce={x:cs.x-cosA*cueLen,y:cs.y-sinA*cueLen};
    // Shadow
    ctx.strokeStyle='rgba(0,0,0,0.55)';ctx.lineWidth=9;ctx.lineCap='round';ctx.setLineDash([]);
    ctx.beginPath();ctx.moveTo(cs.x+1,cs.y+2);ctx.lineTo(ce.x+1,ce.y+2);ctx.stroke();
    // Body gradient
    const cg=ctx.createLinearGradient(cs.x,cs.y,ce.x,ce.y);
    cg.addColorStop(0,eq.accent||'#c9a84c');cg.addColorStop(0.12,eq.color||'#8B5E1A');
    cg.addColorStop(0.55,'#7a5018');cg.addColorStop(1,'#3a1a08');
    ctx.strokeStyle=cg;ctx.lineWidth=7;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(cs.x,cs.y);ctx.lineTo(ce.x,ce.y);ctx.stroke();
    // Ferrule
    ctx.strokeStyle='rgba(255,255,255,0.28)';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(cs.x,cs.y);ctx.lineTo(cs.x-cosA*8,cs.y-sinA*8);ctx.stroke();
    // Wrap stripe
    const mx2=cs.x-cosA*(cueLen*.35),my2=cs.y-sinA*(cueLen*.35);
    ctx.strokeStyle=eq.accent||'#c9a84c';ctx.lineWidth=3;ctx.globalAlpha=.45;
    ctx.beginPath();ctx.moveTo(mx2,my2);ctx.lineTo(mx2-cosA*12,my2-sinA*12);ctx.stroke();
    ctx.globalAlpha=1;
  }
  ctx.restore();
}

function rayCast(x,y,dx,dy,maxDist){
  const minX=CUSHION+BALL_RADIUS,maxX=W-CUSHION-BALL_RADIUS,minY=CUSHION+BALL_RADIUS,maxY=H-CUSHION-BALL_RADIUS;
  let t=maxDist;
  if(dx>0&&(maxX-x)/dx<t)t=(maxX-x)/dx;if(dx<0&&(minX-x)/dx<t)t=(minX-x)/dx;
  if(dy>0&&(maxY-y)/dy<t)t=(maxY-y)/dy;if(dy<0&&(minY-y)/dy<t)t=(minY-y)/dy;
  return{x:x+dx*t,y:y+dy*t};
}

function drawPlacingIndicator(){
  if(!state.placingBall)return;
  const mx=state.mousePos.x,my=state.mousePos.y;
  ctx.save();ctx.strokeStyle='rgba(100,200,255,0.7)';ctx.lineWidth=2;ctx.setLineDash([4,3]);ctx.beginPath();ctx.arc(mx,my,BALL_RADIUS,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.restore();
}

// ── GAME LOOP ──
function gameLoop(){
  ctx.clearRect(0,0,W,H);drawTable();
  if(state.ballsMoving){
    const stillMoving=physicsStep();
    if(!stillMoving){const anyStillMoving=state.balls.some(b=>b.active&&!b.pocketed&&(Math.abs(b.vx)>0||Math.abs(b.vy)>0));if(!anyStillMoving){state.ballsMoving=false;if(!state.gameOver)processShotResult();}}
  }
  state.balls.forEach(b=>drawBall(b));drawAimLine();drawPlacingIndicator();
  if(state.isCharging)document.getElementById('powerFill').style.width=(state.power*100)+'%';
  state.animFrame=requestAnimationFrame(gameLoop);
}

// ── HUD UPDATES ──
function updateHUD(){
  const mode=state.mode,names=['Player 1',state.gameMode==='ai'?'AI':'Player 2'];
  document.getElementById('modeBadge').textContent=RULES_DB[mode]?.title||mode;
  document.getElementById('turnIndicator').textContent=names[state.currentPlayer]+"'s Turn";
  document.getElementById('p2Name').textContent=names[1];
  let scoreText='';
  if(mode==='straightpool')scoreText=`P1: ${state.straightPoolScores[0]}  ·  P2: ${state.straightPoolScores[1]}  (Target: ${state.straightPoolTarget})`;
  else if(mode==='onepocket')scoreText=`P1: ${state.onePocketScores[0]}/8  ·  P2: ${state.onePocketScores[1]}/8`;
  else if(mode==='snooker')scoreText=`P1: ${state.scores[0]}  ·  P2: ${state.scores[1]}`;
  else if(mode==='bankpool')scoreText=`P1: ${state.scores[0]}/5  ·  P2: ${state.scores[1]}/5`;
  document.getElementById('scoreDisplay').textContent=scoreText;
  const groups=state.playerGroups;
  document.getElementById('p1Type').textContent=groups[0]?(groups[0]==='solids'?'● Solids':'◑ Stripes'):'—';
  document.getElementById('p2Type').textContent=groups[1]?(groups[1]==='solids'?'● Solids':'◑ Stripes'):'—';
  document.getElementById('p1Panel').classList.toggle('active',state.currentPlayer===0);
  document.getElementById('p2Panel').classList.toggle('active',state.currentPlayer===1);
  document.getElementById('statusMsg').textContent=state.placingBall?'Click to place cue ball':state.ballsMoving?'Balls in motion...':'Aim and shoot!';
}

function updateBallRacks(){
  const p1Rack=document.getElementById('p1Balls'),p2Rack=document.getElementById('p2BallsRight');
  p1Rack.innerHTML='';p2Rack.innerHTML='';
  const mode=state.mode;
  if(mode==='eightball'||mode==='blackball'){
    const g1=state.playerGroups[0],g2=state.playerGroups[1];
    if(g1){state.balls.filter(b=>{if(g1==='solids')return b.num>=1&&b.num<=7&&b.active&&!b.pocketed;return b.num>=9&&b.num<=15&&b.active&&!b.pocketed;}).forEach(b=>{const el=document.createElement('div');el.className='mini-ball';el.style.background=b.color;p1Rack.appendChild(el);});}
    if(g2){state.balls.filter(b=>{if(g2==='solids')return b.num>=1&&b.num<=7&&b.active&&!b.pocketed;return b.num>=9&&b.num<=15&&b.active&&!b.pocketed;}).forEach(b=>{const el=document.createElement('div');el.className='mini-ball';el.style.background=b.color;p2Rack.appendChild(el);});}
  }
}

function showFoulMsg(msg){
  const el=document.getElementById('foulMsg');el.textContent=msg;
  setTimeout(()=>{if(el.textContent===msg)el.textContent='';},3000);
}

// ── GAME OVER + REWARDS ──
function endGame(winner){
  state.gameOver=true;
  if(state.animFrame){cancelAnimationFrame(state.animFrame);state.animFrame=null;}
  playSound('win');

  const names=['Player 1',state.gameMode==='ai'?'AI':'Player 2'];
  document.getElementById('winnerText').textContent=names[winner]+' Wins!';
  let sub='';
  if(state.mode==='eightball')sub='Pocketed the 8-ball correctly.';else if(state.mode==='nineball')sub='Pocketed the 9-ball legally.';else if(state.mode==='tenball')sub='Pocketed the 10-ball legally.';else if(state.mode==='sevenball')sub='Pocketed the 7-ball to win.';else if(state.mode==='blackball')sub='Pocketed the black ball to win.';else if(state.mode==='straightpool')sub=`Reached ${state.straightPoolTarget} points.`;else if(state.mode==='onepocket')sub='Pocketed 8 balls in their pocket.';else if(state.mode==='bankpool')sub='Banked 5 balls to win.';else if(state.mode==='snooker')sub=`Won the frame. ${state.scores[0]} – ${state.scores[1]}`;
  document.getElementById('gameOverSub').textContent=sub;
  let scoreText='';
  if(state.mode==='snooker')scoreText=`${state.scores[0]} – ${state.scores[1]}`;else if(state.mode==='straightpool')scoreText=`${state.straightPoolScores[0]} – ${state.straightPoolScores[1]}`;
  document.getElementById('gameOverScore').textContent=scoreText;

  // Update profile stats
  let coinsEarned=0,xpEarned=0;
  const isWinner=(winner===0)||(state.gameMode==='ai'&&winner===0);
  if(winner===0){
    profile.wins++;profile.currentStreak++;if(profile.currentStreak>profile.maxStreak)profile.maxStreak=profile.currentStreak;
    if(state.gameMode==='ai'){
      coinsEarned=state.aiDifficulty==='easy'?COIN_REWARDS.easy_ai:state.aiDifficulty==='medium'?COIN_REWARDS.medium_ai:COIN_REWARDS.hard_ai;
      xpEarned=state.aiDifficulty==='easy'?50:state.aiDifficulty==='medium'?100:200;
      if(state.aiDifficulty==='easy')profile.aiEasyWins++;else if(state.aiDifficulty==='medium')profile.aiMediumWins++;else{profile.aiHardWins++;}
      profile.aiWins++;
    }else{coinsEarned=COIN_REWARDS.multiplayer;xpEarned=100;}
    if(profile.currentStreak>=3)coinsEarned+=COIN_REWARDS.win_streak_3;
    if(profile.currentStreak>=5)coinsEarned+=COIN_REWARDS.win_streak_5;
  }else{
    profile.losses++;profile.currentStreak=0;coinsEarned=15;xpEarned=25;
  }
  coinsEarned+=state.sessionBallsPocketed*COIN_REWARDS.pocket_bonus;
  profile.coins+=coinsEarned;profile.totalCoinsEarned+=coinsEarned;
  profile.ballsPocketed+=state.sessionBallsPocketed;
  profile.bankShots+=state.sessionBankShots;
  profile.sessionCoins=(profile.sessionCoins||0)+coinsEarned;

  // XP & Level
  const prevLevel=profile.level;
  profile.xp+=xpEarned;
  while(profile.xp>=XP_PER_LEVEL(profile.level)){
    profile.xp-=XP_PER_LEVEL(profile.level);profile.level++;
    if(LEVEL_REWARDS[profile.level]){profile.coins+=LEVEL_REWARDS[profile.level];showToast(`🎉 Level ${profile.level}! +${LEVEL_REWARDS[profile.level]} coins`);}
  }
  if(profile.level>=17)profile.equippedTitle=TITLES[16];else profile.equippedTitle=TITLES[Math.min(profile.level-1,TITLES.length-1)];

  // Check achievements
  checkAllAchievements();
  checkChallengeProgress('wins',profile.wins);
  checkChallengeProgress('ballsPocketed',profile.ballsPocketed);
  checkChallengeProgress('bankShots',profile.bankShots);
  checkChallengeProgress('gamesPlayed',profile.gamesPlayed);
  if(winner===0){checkChallengeProgress('aiWins',profile.aiWins);}
  saveProfile();updateStartScreen();

  // Reward row
  const rr=document.getElementById('rewardRow');rr.innerHTML='';
  const cp=document.createElement('div');cp.className='reward-pill coins';cp.innerHTML=`🪙 +${coinsEarned}`;rr.appendChild(cp);
  const xp=document.createElement('div');xp.className='reward-pill xp';xp.style.animationDelay='0.15s';xp.innerHTML=`⭐ +${xpEarned} XP`;rr.appendChild(xp);

  // XP bar
  const xpBarWrap=document.getElementById('xpBarWrap');xpBarWrap.style.display='block';
  const xpFill=document.getElementById('xpBarFill');const xpPct=Math.min(100,(profile.xp/XP_PER_LEVEL(profile.level))*100);
  setTimeout(()=>{xpFill.style.width=xpPct+'%';},300);
  document.getElementById('xpBarLabel').textContent=`LV ${profile.level} · ${profile.xp} / ${XP_PER_LEVEL(profile.level)} XP`;

  showScreen('gameOverScreen');
}

// ── PROGRESSION SYSTEM ──
function checkAllAchievements(){
  let newUnlocks=[];
  ACHIEVEMENTS.forEach(ach=>{
    if(profile.achUnlocked.includes(ach.id))return;
    let val=0;
    if(ach.key==='wins')val=profile.wins;else if(ach.key==='ballsPocketed')val=profile.ballsPocketed;else if(ach.key==='maxStreak')val=profile.maxStreak;else if(ach.key==='totalCoinsEarned')val=profile.totalCoinsEarned;else if(ach.key==='bankShots')val=profile.bankShots;else if(ach.key==='cuesOwned')val=profile.cuesOwned.length;else if(ach.key==='gamesPlayed')val=profile.gamesPlayed;else if(ach.key==='aiEasyWins')val=profile.aiEasyWins;else if(ach.key==='aiMediumWins')val=profile.aiMediumWins;else if(ach.key==='aiHardWins')val=profile.aiHardWins;else if(ach.key==='level')val=profile.level;else if(ach.key==='dailyClaimed')val=profile.dailyClaimed;
    if(val>=ach.target){
      profile.achUnlocked.push(ach.id);profile.coins+=ach.coins;profile.totalCoinsEarned+=ach.coins;profile.xp+=ach.xp;newUnlocks.push(ach);
    }
  });
  if(newUnlocks.length>0){
    newUnlocks.forEach((ach,i)=>setTimeout(()=>showToast(`🏆 Achievement: ${ach.name} (+${ach.coins}🪙)`),i*800));
    const el=document.getElementById('rewardRow');
    const ap=document.createElement('div');ap.className='reward-pill ach';ap.style.animationDelay='0.3s';ap.innerHTML=`🏆 ${newUnlocks.length} Achievement${newUnlocks.length>1?'s':''}!`;el.appendChild(ap);
  }
}

function checkChallengeProgress(key,val){
  const today=new Date().toDateString();
  if(!profile.dailyChallenges||profile.dailyChallengesDate!==today)refreshDailyChallenges();
  profile.dailyChallenges.forEach(ch=>{
    if(ch.completed)return;const prog=profile.challengeProgress;
    if(ch.key===key){prog[ch.id]=(prog[ch.id]||0);if(val>=ch.target){ch.completed=true;profile.coins+=ch.coins;profile.totalCoinsEarned+=ch.coins;profile.xp+=ch.xp;showToast(`✅ Challenge done: ${ch.name} (+${ch.coins}🪙)`);}
    }
  });
  WEEKLY_CHALLENGES.forEach(ch=>{
    if(profile.weeklyProgress[ch.id+'_done'])return;
    if(ch.key===key&&val>=(profile.weeklyProgress[ch.id]||0)){
      profile.weeklyProgress[ch.id]=val;
      if(val>=ch.target){profile.weeklyProgress[ch.id+'_done']=true;profile.coins+=ch.coins;profile.totalCoinsEarned+=ch.coins;profile.xp+=ch.xp;showToast(`🗓️ Weekly Challenge: ${ch.name} (+${ch.coins}🪙)`);}
    }
  });
}

function refreshDailyChallenges(){
  const today=new Date().toDateString();if(profile.dailyChallengesDate===today)return;
  const shuffled=[...DAILY_CHALLENGE_POOL].sort(()=>Math.random()-0.5);
  profile.dailyChallenges=shuffled.slice(0,4).map(c=>({...c,completed:false}));
  profile.dailyChallengesDate=today;
}

// ── SCREEN MANAGEMENT ──
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');}
function openModal(id){document.getElementById(id).classList.add('active');}
function closeModal(id){document.getElementById(id).classList.remove('active');}

// ── RULES MODAL ──
let currentModalTab='rules';
function openRules(mode){
  const data=RULES_DB[mode]||RULES_DB.eightball;
  document.getElementById('modalTitle').textContent=data.title;document.getElementById('modalSub').textContent=data.sub;document.getElementById('modalTitleIcon').textContent=data.icon;
  currentModalTab='rules';renderModalTab(data,'rules');document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab==='rules'));
  openModal('rulesModal');
}
function renderModalTab(data,tab){
  const body=document.getElementById('modalBody');body.innerHTML='';
  if(tab==='rules')data.rules.forEach(r=>{const sec=document.createElement('div');sec.className='rules-section';sec.innerHTML=`<h3>${r.h}</h3><p>${r.p||r.text||''}</p>`;body.appendChild(sec);});
  else if(tab==='tips'){const tips=data.tips||[];if(!tips.length){body.innerHTML='<p style="color:var(--text-dim);font-size:12px;padding:12px">No specific tips for this mode.</p>';return;}tips.forEach(t=>{const el=document.createElement('div');el.className='tip-item';el.innerHTML=`<div class="tip-item-icon">${t.icon}</div><div class="tip-item-text"><strong>${t.title}</strong>${t.text}</div>`;body.appendChild(el);});}
  else if(tab==='fouls'){const fouls=data.fouls||[];if(!fouls.length){body.innerHTML='<p style="color:var(--text-dim);font-size:12px;padding:12px">No foul info.</p>';return;}fouls.forEach(f=>{const el=document.createElement('div');el.className='foul-item';el.innerHTML=`<strong>${f.title}</strong>${f.text}`;body.appendChild(el);});}
}

// ── PROFILE MODAL ──
function openProfileModal(){
  document.getElementById('profileAvatar').textContent=AVATARS.find(a=>a.id===profile.equippedAvatar)?.emoji||'🎱';
  document.getElementById('profileUsername').textContent=profile.username;
  document.getElementById('profileTitleDisplay').textContent=profile.equippedTitle;
  document.getElementById('profileLevel').textContent=`Lv ${profile.level}`;
  const xpPct=Math.min(100,(profile.xp/XP_PER_LEVEL(profile.level))*100);
  document.getElementById('profileXPBar').style.width=xpPct+'%';
  document.getElementById('profileXPLabel').textContent=`${profile.xp} / ${XP_PER_LEVEL(profile.level)} XP`;
  const cue=CUES.find(c=>c.id===profile.equippedCue)||CUES[0];
  document.getElementById('profileCueName').textContent=cue.name;document.getElementById('profileCueRarity').textContent=cue.rarity.charAt(0).toUpperCase()+cue.rarity.slice(1)+' Cue';document.getElementById('profileCueRarity').className=`equipped-type rarity-${cue.rarity}`;
  const stats=[{v:profile.wins,l:'Wins'},{v:profile.losses,l:'Losses'},{v:profile.gamesPlayed,l:'Games'},{v:profile.maxStreak,l:'Best Streak'},{v:profile.ballsPocketed,l:'Balls Potted'},{v:profile.coins,l:'🪙 Coins'}];
  document.getElementById('profileStatGrid').innerHTML=stats.map(s=>`<div class="stat-box"><div class="stat-val">${s.v}</div><div class="stat-lbl">${s.l}</div></div>`).join('');
  const stats2=[{v:profile.bankShots,l:'Bank Shots'},{v:profile.achUnlocked.length,l:'Achievements'},{v:profile.totalCoinsEarned,l:'Coins Earned'}];
  document.getElementById('profileStatGrid2').innerHTML=stats2.map(s=>`<div class="stat-box"><div class="stat-val">${s.v}</div><div class="stat-lbl">${s.l}</div></div>`).join('');
  openModal('profileModal');
}

// ── SHOP MODAL ──
let currentShopTab='cues';
function openShopModal(){
  document.getElementById('shopCoins').textContent=profile.coins.toLocaleString();
  renderShop('cues');
  openModal('shopModal');
}
function renderShop(tab){
  currentShopTab=tab;
  document.getElementById('shopCoins').textContent=profile.coins.toLocaleString();
  document.querySelectorAll('#shopTabs .tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.shop===tab));
  const grid=document.getElementById('shopGrid');grid.innerHTML='';
  const items=tab==='cues'?CUES:AVATARS;
  items.forEach(item=>{
    const owned=tab==='cues'?profile.cuesOwned.includes(item.id):profile.avatarsOwned.includes(item.id);
    const equipped=tab==='cues'?profile.equippedCue===item.id:profile.equippedAvatar===item.id;
    const div=document.createElement('div');div.className='shop-item'+(owned?' owned':'')+(equipped?' equipped-item':'');
    let previewHTML='';
    if(tab==='cues'){
      const cueData=CUES.find(c=>c.id===item.id);
      previewHTML=`<div class="item-cue-preview" style="background:linear-gradient(90deg,${cueData.accent||'#c9a84c'},${cueData.color},${cueData.color},#5a3010);border-radius:4px;height:10px;width:90%;border:1px solid ${cueData.accent||'#c9a84c'}33"></div>`;
    }else{previewHTML=`<div class="item-preview">${item.emoji}</div>`;}
    div.innerHTML=`${previewHTML}<div class="item-name">${item.name}</div><div class="item-rarity rarity-${item.rarity}">${item.rarity}</div>${!owned?`<div class="item-price">🪙 ${item.price}</div>`:''}<div class="item-action ${equipped?'equipped':owned?'equip':'buy'}">${equipped?'Equipped':owned?'Equip':item.price===0?'Free':'Buy'}</div>`;
    div.querySelector('.item-action').addEventListener('click',e=>{e.stopPropagation();
      if(equipped)return;
      if(owned){if(tab==='cues')profile.equippedCue=item.id;else profile.equippedAvatar=item.id;saveProfile();updateStartScreen();renderShop(tab);showToast(`✅ Equipped ${item.name}`);}
      else if(profile.coins>=item.price){profile.coins-=item.price;if(tab==='cues'){profile.cuesOwned.push(item.id);profile.equippedCue=item.id;checkAllAchievements();}else{profile.avatarsOwned.push(item.id);profile.equippedAvatar=item.id;}saveProfile();updateStartScreen();document.getElementById('shopCoins').textContent=profile.coins.toLocaleString();renderShop(tab);showToast(`🎉 Purchased ${item.name}!`);}
      else{showToast('❌ Not enough coins!');}
    });
    grid.appendChild(div);
  });
}

// ── ACHIEVEMENTS MODAL ──
const ACH_CATS=['All','Beginner','Skill','Win','Streak','Coin','Collection'];
let achCat='All';
function openAchModal(){
  renderAchFilterRow();renderAchList();
  document.getElementById('achCount').textContent=`${profile.achUnlocked.length} / ${ACHIEVEMENTS.length} Unlocked`;
  openModal('achModal');
}
function renderAchFilterRow(){
  const row=document.getElementById('achFilterRow');row.innerHTML='';
  ACH_CATS.forEach(cat=>{
    const btn=document.createElement('button');btn.className='ach-filter-btn'+(achCat===cat?' active':'');btn.textContent=cat;
    btn.addEventListener('click',()=>{achCat=cat;renderAchFilterRow();renderAchList();});row.appendChild(btn);
  });
}
function renderAchList(){
  const list=document.getElementById('achList');list.innerHTML='';
  const filtered=achCat==='All'?ACHIEVEMENTS:ACHIEVEMENTS.filter(a=>a.cat===achCat);
  filtered.forEach(ach=>{
    const unlocked=profile.achUnlocked.includes(ach.id);
    let progress=0;
    if(ach.key==='wins')progress=profile.wins;else if(ach.key==='ballsPocketed')progress=profile.ballsPocketed;else if(ach.key==='maxStreak')progress=profile.maxStreak;else if(ach.key==='totalCoinsEarned')progress=profile.totalCoinsEarned;else if(ach.key==='bankShots')progress=profile.bankShots;else if(ach.key==='cuesOwned')progress=profile.cuesOwned.length;else if(ach.key==='gamesPlayed')progress=profile.gamesPlayed;else if(ach.key==='level')progress=profile.level;else if(ach.key==='dailyClaimed')progress=profile.dailyClaimed;
    const pct=Math.min(100,(progress/ach.target)*100);
    const div=document.createElement('div');div.className='ach-item'+(unlocked?' unlocked':' locked');
    div.innerHTML=`<div class="ach-icon" style="opacity:${unlocked?1:0.4}">${ach.icon}</div><div class="ach-info"><div class="ach-name">${ach.name}</div><div class="ach-desc">${ach.desc}</div>${!unlocked?`<div class="ach-progress-bar"><div class="ach-progress-fill" style="width:${pct}%"></div></div>`:''}</div><div class="ach-reward"><div class="ach-reward-coins">🪙${ach.coins}</div><div class="ach-reward-xp">+${ach.xp}xp</div></div>`;
    list.appendChild(div);
  });
}

// ── CHALLENGES MODAL ──
function openChallengeModal(){
  refreshDailyChallenges();renderChallenges();openModal('challengeModal');
}
function renderChallenges(){
  const body=document.getElementById('challengeBody');body.innerHTML='';
  // Daily
  const dSec=document.createElement('div');dSec.className='challenge-section';
  const tomorrow=new Date();tomorrow.setHours(24,0,0,0);const msLeft=tomorrow-new Date();const h=Math.floor(msLeft/3600000),m=Math.floor((msLeft%3600000)/60000);
  dSec.innerHTML=`<div class="challenge-section-title">Daily Challenges<span class="challenge-timer">Resets in ${h}h ${m}m</span></div>`;
  (profile.dailyChallenges||[]).forEach(ch=>{
    const div=document.createElement('div');div.className='challenge-item'+(ch.completed?' completed':'');
    let prog=0;if(ch.key==='wins')prog=profile.wins;else if(ch.key==='ballsPocketed')prog=profile.ballsPocketed;else if(ch.key==='gamesPlayed')prog=profile.gamesPlayed;else if(ch.key==='bankShots')prog=profile.bankShots;else if(ch.key==='aiWins')prog=profile.aiWins;
    const pct=Math.min(100,(prog/ch.target)*100);
    div.innerHTML=`<div class="ch-icon">${ch.completed?'✅':ch.icon}</div><div class="ch-info"><div class="ch-name">${ch.name}</div><div class="ch-desc">${ch.desc}</div><div class="ch-progress-bar"><div class="ch-progress-fill" style="width:${pct}%"></div></div></div><div class="ch-reward">🪙${ch.coins}<br><span style="color:var(--neon-blue);font-size:9px">+${ch.xp}xp</span></div>`;
    dSec.appendChild(div);
  });
  body.appendChild(dSec);
  // Weekly
  const wSec=document.createElement('div');wSec.className='challenge-section';
  const dayEnd=new Date();const daysUntilSun=7-dayEnd.getDay();wSec.innerHTML=`<div class="challenge-section-title" style="margin-top:8px">Weekly Challenges<span class="challenge-timer">${daysUntilSun}d left</span></div>`;
  WEEKLY_CHALLENGES.forEach(ch=>{
    const done=profile.weeklyProgress[ch.id+'_done'];const prog=profile.weeklyProgress[ch.id]||0;const pct=Math.min(100,(prog/ch.target)*100);
    const div=document.createElement('div');div.className='challenge-item'+(done?' completed':'');
    div.innerHTML=`<div class="ch-icon">${done?'✅':ch.icon}</div><div class="ch-info"><div class="ch-name">${ch.name}</div><div class="ch-desc">${ch.desc}</div><div class="ch-progress-bar"><div class="ch-progress-fill" style="width:${pct}%"></div></div></div><div class="ch-reward">🪙${ch.coins}<br><span style="color:var(--neon-blue);font-size:9px">+${ch.xp}xp</span></div>`;
    wSec.appendChild(div);
  });
  body.appendChild(wSec);
}

// ── DAILY LOGIN REWARD ──
const DAILY_REWARDS=[50,75,100,125,150,200,300];
function openDailyModal(){renderDailyGrid();openModal('loginRewardModal');}
function renderDailyGrid(){
  const grid=document.getElementById('dailyGrid');grid.innerHTML='';
  const today=new Date().toDateString();const alreadyClaimed=profile.dailyLastClaim===today;
  for(let i=0;i<7;i++){
    const div=document.createElement('div');div.className='daily-day';
    const claimed=i<profile.dailyStreakDay||(i===profile.dailyStreakDay&&alreadyClaimed);
    const isToday=i===profile.dailyStreakDay&&!alreadyClaimed;
    if(claimed)div.classList.add('claimed');if(isToday)div.classList.add('today');
    div.innerHTML=`<div class="daily-day-num">Day ${i+1}</div><div class="daily-day-icon">${claimed?'✅':isToday?'🎁':'🔒'}</div><div class="daily-day-coins">🪙${DAILY_REWARDS[i]}</div>`;
    grid.appendChild(div);
  }
  const btn=document.getElementById('dailyClaimBtn');
  if(alreadyClaimed){btn.textContent='✅ Already Claimed Today';btn.style.opacity='0.5';btn.disabled=true;}
  else{btn.textContent=`Claim Day ${Math.min(profile.dailyStreakDay+1,7)} Reward (🪙${DAILY_REWARDS[Math.min(profile.dailyStreakDay,6)]})`;btn.style.opacity='1';btn.disabled=false;}
}
function claimDailyReward(){
  const today=new Date().toDateString();if(profile.dailyLastClaim===today)return;
  const reward=DAILY_REWARDS[Math.min(profile.dailyStreakDay,6)];
  profile.coins+=reward;profile.totalCoinsEarned+=reward;profile.dailyClaimed++;
  profile.dailyLastClaim=today;profile.dailyStreak++;profile.dailyStreakDay=(profile.dailyStreakDay+1)%7;
  checkAllAchievements();saveProfile();updateStartScreen();renderDailyGrid();
  showFloatReward(reward,25);showToast(`🎁 Daily Reward: +${reward} coins!`);
}

// ── FEEDBACK EFFECTS ──
function showShotFeedback(text,color){
  if(!document.getElementById('gameScreen').classList.contains('active'))return;
  const el=document.createElement('div');el.className='shot-feedback';el.style.color=color;el.style.left='50%';el.style.top='45%';el.textContent=text;document.body.appendChild(el);setTimeout(()=>el.remove(),1600);
}
function showFloatReward(coins,xp){
  const el=document.createElement('div');el.className='float-reward';el.innerHTML=`<div class="float-reward-title">🎉 Reward!</div><div class="float-reward-row"><div class="float-reward-item" style="color:#c9a84c">🪙 +${coins}</div>${xp?`<div class="float-reward-item" style="color:#00c8ff">⭐ +${xp} XP</div>`:''}</div>`;
  document.body.appendChild(el);setTimeout(()=>el.remove(),2900);
}
function showToast(msg){
  const el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),3100);
}

// ── TIP PANEL ──
let tipIndex=0;
function rotateTips(){
  if(state.tipRotateInterval)clearInterval(state.tipRotateInterval);
  const el=document.getElementById('tipText');
  state.tipRotateInterval=setInterval(()=>{el.classList.add('fade');setTimeout(()=>{tipIndex=(tipIndex+1)%GAME_TIPS.length;el.textContent=GAME_TIPS[tipIndex];el.classList.remove('fade');},500);},6000);
}

// ── INPUT ──
function getCanvasPos(e){
  const rect=canvas.getBoundingClientRect();
  const scaleX=canvas.width/rect.width,scaleY=canvas.height/rect.height;
  const clientX=e.changedTouches?e.changedTouches[0].clientX:e.touches?e.touches[0].clientX:e.clientX;
  const clientY=e.changedTouches?e.changedTouches[0].clientY:e.touches?e.touches[0].clientY:e.clientY;
  return{x:(clientX-rect.left)*scaleX,y:(clientY-rect.top)*scaleY};
}
function canShoot(){return!state.ballsMoving&&!state.gameOver&&!state.placingBall&&!(state.gameMode==='ai'&&state.currentPlayer===1);}
function isValidPlacement(pos){
  const minX=CUSHION+BALL_RADIUS+2,maxX=W-CUSHION-BALL_RADIUS-2,minY=CUSHION+BALL_RADIUS+2,maxY=H-CUSHION-BALL_RADIUS-2;
  if(pos.x<minX||pos.x>maxX||pos.y<minY||pos.y>maxY)return false;
  for(const b of state.balls){if(b===state.cueBall||!b.active||b.pocketed)continue;if(dist(pos,b)<BALL_RADIUS*2+2)return false;}
  return true;
}

// ── START SCREEN UPDATE ──
function updateStartScreen(){
  const cue=CUES.find(c=>c.id===profile.equippedCue)||CUES[0];
  const avatar=AVATARS.find(a=>a.id===profile.equippedAvatar)||AVATARS[0];
  document.getElementById('startAvatar').textContent=avatar.emoji;
  document.getElementById('startUsername').textContent=profile.username;
  document.getElementById('startTitle').textContent=profile.equippedTitle;
  document.getElementById('startWins').textContent=profile.wins;
  document.getElementById('startLosses').textContent=profile.losses;
  document.getElementById('startStreak').textContent=profile.currentStreak;
  document.getElementById('startCoins').textContent=profile.coins.toLocaleString();
  document.getElementById('startLevel').textContent=profile.level;
  document.getElementById('startXP').textContent=profile.xp;
  document.getElementById('equippedCueName').textContent=cue.name;
  document.getElementById('equippedCueRarity').textContent=cue.rarity.charAt(0).toUpperCase()+cue.rarity.slice(1);
  document.getElementById('equippedCueRarity').className=`equipped-rarity rarity-${cue.rarity}`;
  const _xpPct=Math.min(100,(profile.xp/XP_PER_LEVEL(profile.level))*100);
  const _xpBar=document.getElementById('startXPBar');if(_xpBar)_xpBar.style.width=_xpPct+'%';
  updateAcctUI();
}

// ── INIT ──

// ── AUTH / ACCOUNT SYSTEM ──
const AUTH_KEY='mb_auth_v1';const ACCS_KEY='mb_accounts_v1';
function loadAccs(){try{const d=localStorage.getItem(ACCS_KEY);return d?JSON.parse(d):{}}catch(e){return{}}}
function saveAccs(a){try{localStorage.setItem(ACCS_KEY,JSON.stringify(a));}catch(e){}}
function loadAuth(){try{const d=localStorage.getItem(AUTH_KEY);return d?JSON.parse(d):{in:false,user:null,guest:true}}catch(e){return{in:false,user:null,guest:true}}}
function saveAuth(s){try{localStorage.setItem(AUTH_KEY,JSON.stringify(s));}catch(e){}}
let authSt=loadAuth();

function updateAcctUI(){
  const dot=document.getElementById('acctDot'),txt=document.getElementById('acctTxt'),sob=document.getElementById('signOutBtn');
  const acctGameBtn=document.getElementById('btnAcctGame');
  if(!dot)return;
  if(authSt.in&&!authSt.guest){dot.className='acct-dot';txt.textContent=authSt.user||'Player';if(sob)sob.style.display='block';if(acctGameBtn)acctGameBtn.style.display='none';}
  else{dot.className='acct-dot guest';txt.textContent='Guest Mode';if(sob)sob.style.display='none';if(acctGameBtn)acctGameBtn.style.display='inline-block';}
}

function openAuthFromGuest(){switchTab('in');showScreen('authScreen');}

function goGuest(){
  authSt={in:true,user:profile.username,guest:true};saveAuth(authSt);
  showScreen('startScreen');updateStartScreen();updateAcctUI();
  const today=new Date().toDateString();if(profile.dailyLastClaim!==today)setTimeout(()=>openDailyModal(),600);
}

function switchTab(t){
  document.getElementById('afIn').style.display=t==='in'?'flex':'none';
  document.getElementById('afUp').style.display=t==='up'?'flex':'none';
  document.querySelectorAll('.auth-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===t));
  document.getElementById('authSub').textContent=t==='in'?'Welcome back':'Join the table';
  document.getElementById('siErr').textContent='';document.getElementById('suErr').textContent='';
}

// ── PASSWORD STRENGTH & SUGGESTION ──
function scorePassword(pw){
  if(!pw)return 0;
  let score=0;
  if(pw.length>=6)score++;
  if(pw.length>=10)score++;
  if(/[A-Z]/.test(pw)&&/[a-z]/.test(pw))score++;
  if(/[0-9]/.test(pw))score++;
  if(/[^A-Za-z0-9]/.test(pw))score++;
  if(pw.length>=14)score++;
  return Math.min(score,4);
}
function updatePwdStrength(){
  const pw=document.getElementById('suPass').value;
  const score=scorePassword(pw);
  const segs=[document.getElementById('pwSeg1'),document.getElementById('pwSeg2'),document.getElementById('pwSeg3'),document.getElementById('pwSeg4')];
  const label=document.getElementById('pwStrengthLabel');
  const tiers=['weak','weak','fair','good','strong'];
  const tier=pw?tiers[score]:null;
  segs.forEach((s,i)=>{s.className='pwd-bar-seg'+(tier&&i<score?' on-'+tier:'');});
  if(!pw){label.textContent='Enter a password';label.className='pwd-strength-label';}
  else{
    const txt={weak:'Weak',fair:'Fair',good:'Good',strong:'Strong'}[tier];
    label.textContent=txt+' password';label.className='pwd-strength-label '+tier;
  }
}
function generateStrongPassword(){
  const lower='abcdefghijkmnpqrstuvwxyz',upper='ABCDEFGHJKLMNPQRSTUVWXYZ',nums='23456789',syms='!@#$%^&*-_+=';
  const all=lower+upper+nums+syms;
  const pick=set=>set[Math.floor(Math.random()*set.length)];
  let pw=[pick(lower),pick(upper),pick(nums),pick(syms)];
  for(let i=0;i<10;i++)pw.push(pick(all));
  // shuffle
  for(let i=pw.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pw[i],pw[j]]=[pw[j],pw[i]];}
  return pw.join('');
}
function showPwdSuggestion(){
  const box=document.getElementById('pwSuggestBox');
  document.getElementById('pwSuggestText').textContent=generateStrongPassword();
  box.classList.add('show');
}

function doSignIn(){
  const user=document.getElementById('siUser').value.trim();
  const pass=document.getElementById('siPass').value;
  const err=document.getElementById('siErr');
  if(!user||!pass){err.textContent='Please fill in all fields.';return;}
  const accs=loadAccs();const k=user.toLowerCase();
  if(!accs[k]){err.textContent='Account not found.';return;}
  if(accs[k].pw!==btoa(pass)){err.textContent='Incorrect password.';return;}
  if(accs[k].prof)Object.assign(profile,accs[k].prof);
  authSt={in:true,user:accs[k].name,guest:false};saveAuth(authSt);saveProfile();
  showToast('🎱 Welcome back, '+authSt.user+'!');
  showScreen('startScreen');updateStartScreen();updateAcctUI();
  const today=new Date().toDateString();if(profile.dailyLastClaim!==today)setTimeout(()=>openDailyModal(),600);
}

function doSignUp(){
  const user=document.getElementById('suUser').value.trim();
  const pass=document.getElementById('suPass').value;
  const email=document.getElementById('suEmail').value.trim();
  const err=document.getElementById('suErr');
  if(!user||user.length<2){err.textContent='Name must be 2+ characters.';return;}
  if(!pass||pass.length<6){err.textContent='Password must be 6+ characters.';return;}
  const accs=loadAccs();const k=user.toLowerCase();
  if(accs[k]){err.textContent='Username taken. Try another.';return;}
  profile.username=user;
  accs[k]={name:user,email,pw:btoa(pass),prof:{...profile}};
  saveAccs(accs);authSt={in:true,user,guest:false};saveAuth(authSt);saveProfile();
  showToast('🎉 Welcome, '+user+'!');
  showScreen('startScreen');updateStartScreen();updateAcctUI();
  const today=new Date().toDateString();if(profile.dailyLastClaim!==today)setTimeout(()=>openDailyModal(),600);
}

function doSignOut(){
  if(!authSt.guest&&authSt.user){const accs=loadAccs();const k=authSt.user.toLowerCase();if(accs[k]){accs[k].prof={...profile};saveAccs(accs);}}
  authSt={in:false,user:null,guest:true};saveAuth(authSt);
  showToast('Signed out.');showScreen('landingScreen');
}

function initLanding(){
  // Particles
  const p=document.getElementById('landParts');
  if(p&&!p.children.length){for(let i=0;i<20;i++){const el=document.createElement('div');el.className='lp';el.style.cssText=`left:${Math.random()*100}%;top:${50+Math.random()*50}%;--d:${4+Math.random()*5}s;--dl:${Math.random()*4}s;width:${1+Math.random()*3}px;height:${1+Math.random()*3}px`;p.appendChild(el);}}
  document.getElementById('landSignIn').onclick=()=>{switchTab('in');showScreen('authScreen');};
  document.getElementById('landSignUp').onclick=()=>{switchTab('up');showScreen('authScreen');};
  document.getElementById('landGuest').onclick=goGuest;
}

function initAuth(){
  document.getElementById('authBack').onclick=()=>showScreen('landingScreen');
  document.getElementById('atIn').onclick=()=>switchTab('in');
  document.getElementById('atUp').onclick=()=>switchTab('up');
  document.getElementById('doSignIn').onclick=doSignIn;
  document.getElementById('doSignUp').onclick=doSignUp;
  document.getElementById('siGuest').onclick=goGuest;
  document.getElementById('suGuest').onclick=goGuest;
  document.getElementById('suPass').addEventListener('input',updatePwdStrength);
  document.getElementById('suSuggestBtn').onclick=showPwdSuggestion;
  document.getElementById('pwRefreshSuggest').onclick=showPwdSuggestion;
  document.getElementById('pwUseSuggest').onclick=()=>{
    const sugg=document.getElementById('pwSuggestText').textContent;
    const inp=document.getElementById('suPass');
    inp.type='text';inp.value=sugg;
    setTimeout(()=>{inp.type='password';},900);
    updatePwdStrength();
    document.getElementById('pwSuggestBox').classList.remove('show');
    showToast('🔑 Strong password applied');
  };
  document.getElementById('signOutBtn').onclick=doSignOut;
  ['siUser','siPass'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')doSignIn();});});
  ['suUser','suEmail','suPass'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')doSignUp();});});
}

// Auto-save to account on saveProfile
const _sp=saveProfile;
saveProfile=function(){_sp();if(authSt&&!authSt.guest&&authSt.user){const accs=loadAccs();const k=authSt.user.toLowerCase();if(accs[k]){accs[k].prof={...profile};saveAccs(accs);}}};

document.addEventListener('DOMContentLoaded',()=>{
  canvas=document.getElementById('poolCanvas');ctx=canvas.getContext('2d');

  // Canvas events
  canvas.addEventListener('mousemove',e=>{
    const pos=getCanvasPos(e);state.mousePos=pos;
    if(state.isCharging&&state.cueBall){const d=dist(pos,{x:state.cueBall.x,y:state.cueBall.y});state.power=clamp(d/180,0,1);document.getElementById('powerFill').style.width=(state.power*100)+'%';}
  });
  canvas.addEventListener('mousedown',e=>{
    const pos=getCanvasPos(e);state.mousePos=pos;
    if(state.placingBall){if(isValidPlacement(pos)){state.cueBall.x=pos.x;state.cueBall.y=pos.y;state.cueBall.vx=0;state.cueBall.vy=0;state.cueBall.active=true;state.cueBall.pocketed=false;state.placingBall=false;state.ballInHand=false;updateHUD();}return;}
    if(!canShoot())return;const cue=state.cueBall;if(!cue||!cue.active)return;state.isCharging=true;state.dragStart=pos;canvas.classList.add('aiming');
  });
  canvas.addEventListener('mouseup',e=>{
    const pos=getCanvasPos(e);if(state.placingBall)return;if(!state.isCharging)return;state.isCharging=false;canvas.classList.remove('aiming');if(!canShoot())return;const cue=state.cueBall;if(!cue||!cue.active)return;const angle=Math.atan2(pos.y-cue.y,pos.x-cue.x);const power=clamp(state.power,0.05,1);shoot(angle,power);state.power=0;document.getElementById('powerFill').style.width='0%';
  });
  canvas.addEventListener('touchstart',e=>{e.preventDefault();canvas.dispatchEvent(new MouseEvent('mousedown',{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}));},{passive:false});
  canvas.addEventListener('touchmove',e=>{e.preventDefault();canvas.dispatchEvent(new MouseEvent('mousemove',{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}));},{passive:false});
  canvas.addEventListener('touchend',e=>{e.preventDefault();canvas.dispatchEvent(new MouseEvent('mouseup',{clientX:e.changedTouches[0].clientX,clientY:e.changedTouches[0].clientY}));},{passive:false});

  // Mode buttons
  document.querySelectorAll('.mode-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');state.mode=btn.dataset.mode;});});

  // Start buttons
  document.getElementById('btn2Player').addEventListener('click',()=>initGame(state.mode,'2player'));
  document.getElementById('btnVsAI').addEventListener('click',()=>initGame(state.mode,'ai'));
  document.getElementById('btnRules').addEventListener('click',()=>openRules(state.mode));
  document.getElementById('btnRulesGame').addEventListener('click',()=>openRules(state.mode));
  document.getElementById('btnMenu').addEventListener('click',()=>{if(state.animFrame){cancelAnimationFrame(state.animFrame);state.animFrame=null;}if(state.tipRotateInterval)clearInterval(state.tipRotateInterval);showScreen('startScreen');updateStartScreen();});
  document.getElementById('btnPlayAgain').addEventListener('click',()=>initGame(state.mode,state.gameMode));
  document.getElementById('btnMainMenu').addEventListener('click',()=>{if(state.animFrame){cancelAnimationFrame(state.animFrame);state.animFrame=null;}showScreen('startScreen');updateStartScreen();});

  // Account access (guest -> sign in/up)
  document.getElementById('acctRowBtn').addEventListener('click',()=>{if(authSt.guest)openAuthFromGuest();});
  document.getElementById('btnAcctGame').addEventListener('click',()=>{if(state.animFrame){cancelAnimationFrame(state.animFrame);state.animFrame=null;}if(state.tipRotateInterval)clearInterval(state.tipRotateInterval);openAuthFromGuest();});

  // Rules modal
  document.getElementById('rulesClose').addEventListener('click',()=>closeModal('rulesModal'));
  document.getElementById('rulesModal').addEventListener('click',e=>{if(e.target===document.getElementById('rulesModal'))closeModal('rulesModal');});
  document.querySelectorAll('.tab-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const data=RULES_DB[state.mode]||RULES_DB.eightball;renderModalTab(data,btn.dataset.tab);});});

  // Nav buttons
  document.getElementById('profileBarBtn').addEventListener('click',openProfileModal);
  document.getElementById('navShop').addEventListener('click',openShopModal);
  document.getElementById('navAch').addEventListener('click',openAchModal);
  document.getElementById('navChallenges').addEventListener('click',openChallengeModal);
  document.getElementById('navDaily').addEventListener('click',openDailyModal);

  // Modal closes
  document.getElementById('profileClose').addEventListener('click',()=>closeModal('profileModal'));
  document.getElementById('shopClose').addEventListener('click',()=>closeModal('shopModal'));
  document.getElementById('achClose').addEventListener('click',()=>closeModal('achModal'));
  document.getElementById('challengeClose').addEventListener('click',()=>closeModal('challengeModal'));
  document.getElementById('dailyClose').addEventListener('click',()=>closeModal('loginRewardModal'));
  ['profileModal','shopModal','achModal','challengeModal','loginRewardModal'].forEach(id=>{document.getElementById(id).addEventListener('click',e=>{if(e.target===document.getElementById(id))closeModal(id);});});

  // Shop tabs
  document.querySelectorAll('#shopTabs .tab-btn').forEach(btn=>{btn.addEventListener('click',()=>renderShop(btn.dataset.shop));});

  // Daily claim
  document.getElementById('dailyClaimBtn').addEventListener('click',claimDailyReward);

  // Sound toggles
  const soundBtn=document.getElementById('soundToggle');
  soundBtn.addEventListener('click',()=>{state.soundOn=!state.soundOn;soundBtn.textContent=state.soundOn?'🔊 Sound ON':'🔇 Sound OFF';});
  const soundGameBtn=document.getElementById('btnSoundGame');
  soundGameBtn.addEventListener('click',()=>{state.soundOn=!state.soundOn;soundGameBtn.textContent=state.soundOn?'🔊':'🔇';});

  // Resize
  let resizeTimer=null;
  window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(document.getElementById('gameScreen').classList.contains('active')&&!state.gameOver){const oldW=W,oldH=H,savedBalls=state.balls.map(b=>({...b}));setupTable();const scaleX=W/oldW,scaleY=H/oldH;state.balls=savedBalls.map(b=>({...b,x:b.x*scaleX,y:b.y*scaleY}));state.cueBall=state.balls.find(b=>b.num===0);}},80);});

  // Landing + Auth init
  initLanding();initAuth();updateAcctUI();
  // Skip landing only if signed into a real account (guests still see Sign In/Sign Up/Guest choice)
  if(authSt&&authSt.in&&!authSt.guest){showScreen('startScreen');updateStartScreen();}

  // Initialize
  refreshDailyChallenges();checkAllAchievements();updateStartScreen();

  // Auto-show daily reward if not claimed today (only for a real signed-in account already past landing; guests get theirs via goGuest)
  const today=new Date().toDateString();
  if(authSt&&authSt.in&&!authSt.guest&&profile.dailyLastClaim!==today)setTimeout(()=>openDailyModal(),800);
});