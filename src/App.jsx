import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  Search, 
  User, 
  ChevronRight, 
  ChevronDown,
  Flame, 
  CheckCircle2, 
  PlayCircle,
  Trophy,
  Target,
  BarChart2,
  Menu,
  X,
  LifeBuoy,
  Settings,
  FileText,
  Video,
  Download,
  HelpCircle
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

// --- Mock Data ---

const USER_PROFILE = {
  name: "김현우",
  level: 3,
  characterState: "Hatching", // Egg -> Hatching -> Rookie -> Pro
  title: "데이터로 설득하는 PM 지망생",
  streak: 12,
  jdMatch: 82,
  points: 1250
};

const RADAR_DATA = [
  { subject: '학습 성실도', A: 120, fullMark: 150 },
  { subject: '프로젝트', A: 98, fullMark: 150 },
  { subject: '기술 스택', A: 86, fullMark: 150 },
  { subject: '문제 해결', A: 99, fullMark: 150 },
  { subject: '커뮤니케이션', A: 85, fullMark: 150 },
  { subject: '과제 수행', A: 65, fullMark: 150 },
];

const DAILY_QUESTS = [
  { id: 1, title: "Ch 4. React Hooks 강의 수강하기", xp: 50, completed: false },
  { id: 2, title: "기술 블로그에 TIL 작성하기", xp: 100, completed: true },
  { id: 3, title: "주간 퀴즈 풀기", xp: 30, completed: false },
];

const CURRICULUM = [
  { id: 1, title: "01. 오리엔테이션 & 환경설정", duration: "10:00", completed: true },
  { id: 2, title: "02. React의 동작 원리 (Virtual DOM)", duration: "45:00", completed: true },
  { id: 3, title: "03. JSX 문법 정복하기", duration: "32:00", completed: true },
  { id: 4, title: "04. Props와 State의 이해", duration: "50:00", completed: false, current: true },
  { id: 5, title: "05. LifeCycle Method", duration: "40:00", completed: false },
];

// --- Menu Structure Definition ---
const MENU_STRUCTURE = [
  {
    id: 'dashboard',
    label: '홈 (대시보드)',
    icon: LayoutDashboard,
    subItems: [
      '현재 학습 현황',
      '연속 학습 캘린더',
      'Success Vision 보드',
      'JD 기반 KPI 매칭',
      '역량 데이터 (레이더 차트)',
      '오늘의 할일'
    ]
  },
  {
    id: 'classroom',
    label: '나의 강의실',
    icon: BookOpen,
    subItems: [
      '수강 중인 강좌',
      '수강 예정',
      '수강 완료',
      '온라인 강의실 (Player)',
      '추천 강의',
      '마이페이지 (출결현황)'
    ]
  },
  {
    id: 'portfolio',
    label: '포트폴리오',
    icon: Trophy,
    subItems: [
      '진단 평가 (사전/사후)',
      '과제/프로젝트',
      '피드백 아카이브',
      '디지털 리포트 (PDF)'
    ]
  },
  {
    id: 'jobmatching',
    label: '취업 매칭 & 로드맵',
    icon: Briefcase,
    subItems: [
      '로드맵 설정',
      'JD 기반 기업 추천',
      '커리어 DNA 진척도'
    ]
  },
  {
    id: 'support',
    label: '지원 센터',
    icon: LifeBuoy,
    subItems: [
      '취업 소식',
      '취업 지원',
      '공지사항',
      'FAQ / 1:1 문의',
      '커뮤니티'
    ]
  }
];

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  // State to manage expanded menus. Default all open for visibility as requested.
  const [expandedMenus, setExpandedMenus] = useState(['dashboard', 'classroom', 'portfolio', 'jobmatching', 'support']);

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId) 
        : [...prev, menuId]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Content */}
      <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        <div className="h-20 flex-none flex items-center px-6 border-b border-gray-100">
           {/* Logo Area */}
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <img src="image_474c5f.jpg" alt="Kernel Academy" className="h-8 object-contain" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}}/>
              <span className="hidden text-xl font-bold text-gray-900 tracking-tight"><span className="text-rose-500">Kernel</span> Academy</span>
           </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-200">
          {MENU_STRUCTURE.map((item) => {
            const isExpanded = expandedMenus.includes(item.id);
            const isActive = activeTab === item.id;
            
            return (
              <div key={item.id} className="mb-2">
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    toggleMenu(item.id);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors font-bold ${
                    isActive 
                      ? 'bg-rose-50 text-rose-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={isActive ? 'text-rose-500' : 'text-gray-400'} />
                    <span>{item.label}</span>
                  </div>
                  {isExpanded ? <ChevronDown size={16} className="text-gray-400"/> : <ChevronRight size={16} className="text-gray-400"/>}
                </button>
                
                {/* Sub Menu Items */}
                <div className={`pl-11 pr-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                  {item.subItems.map((subItem, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left text-sm py-2 px-3 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50/50 transition-colors flex items-center gap-2"
                    >
                      <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                      {subItem}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex-none p-4 border-t border-gray-100">
          <div className="bg-gray-900 rounded-xl p-4 text-white">
            <p className="text-xs text-gray-400 mb-1">PRO UPGRADE</p>
            <p className="text-sm font-bold mb-3">1:1 커리어 멘토링<br/>지금 시작하세요</p>
            <button className="w-full bg-rose-500 hover:bg-rose-600 text-xs font-bold py-2 rounded-lg transition-colors">
              자세히 보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Header = ({ title, onMenuClick }) => (
  <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-10">
    <div className="flex items-center gap-4">
      <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 text-gray-500">
        <Menu size={24} />
      </button>
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
    </div>
    
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64 mr-2">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="강의, 공지, 문의 검색..." 
          className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full"
        />
      </div>
      
      {/* 알림 센터 */}
      <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full group">
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">알림</span>
      </button>
      
      {/* 설정 */}
      <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full group">
        <Settings size={20} />
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">설정</span>
      </button>

      {/* 프로필 */}
      <div className="flex items-center gap-2 pl-2 border-l border-gray-200 ml-1">
        <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-none">{USER_PROFILE.name}</p>
            <p className="text-xs text-rose-500 font-medium leading-none mt-1">Lv.{USER_PROFILE.level} {USER_PROFILE.characterState}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-rose-100 transition-all">
            <User size={20} className="text-gray-500" />
        </div>
      </div>
    </div>
  </header>
);

// ... existing code for CharacterCard, SuccessVisionBoard, StatsCard ...

const CharacterCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform"></div>
    
    <div className="flex items-start justify-between relative z-10">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-1 rounded-md">Lv.{USER_PROFILE.level}</span>
          <span className="text-gray-500 text-sm font-medium">부화 진행중 (65%)</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">커널 도전자 {USER_PROFILE.name}</h2>
        <p className="text-sm text-gray-500">{USER_PROFILE.title}</p>
      </div>
      <div className="bg-white p-2 rounded-full shadow-sm border border-gray-100">
        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-2xl">
          🥚
        </div>
      </div>
    </div>

    <div className="mt-6">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>다음 레벨까지 250 XP</span>
        <span>75%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className="bg-rose-500 h-2 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
      </div>
    </div>
  </div>
);

const SuccessVisionBoard = () => (
  <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
    <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-3 text-rose-400">
        <Target size={18} />
        <span className="text-xs font-bold uppercase tracking-wider">Success Vision</span>
      </div>
      <h3 className="text-xl font-bold leading-relaxed mb-4">
        "복잡한 데이터를 명쾌하게 해석하여<br/>
        팀을 올바른 방향으로 이끄는 PM이 되겠다"
      </h3>
      <div className="flex items-center gap-4 text-sm text-gray-300">
        <span>목표 D-Day</span>
        <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-white">D-42</span>
      </div>
    </div>
  </div>
);

const StatsCard = ({ icon: Icon, label, value, subValue, trend }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
        <Icon size={20} />
      </div>
      {trend && (
        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${trend > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-xs text-gray-500">{label}</span>
        {subValue && <span className="text-xs font-medium text-rose-500">{subValue}</span>}
      </div>
    </div>
  </div>
);

const DashboardView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Section: Character & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CharacterCard />
        <div className="lg:col-span-2">
          <SuccessVisionBoard />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Flame} label="연속 스트릭" value={`${USER_PROFILE.streak}일`} subValue="Hot!" trend={15} />
        <StatsCard icon={Briefcase} label="JD 매칭 적합도" value={`${USER_PROFILE.jdMatch}%`} subValue="Ready" trend={5} />
        <StatsCard icon={CheckCircle2} label="과제 달성률" value="92%" />
        <StatsCard icon={Trophy} label="전체 랭킹" value="상위 12%" />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Learning Activity & Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Course */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg">현재 수강 중인 강의</h3>
              <button className="text-rose-500 text-sm font-medium hover:underline">강의실 바로가기</button>
            </div>
            <div className="flex items-center gap-4 mb-4">
               <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                 <PlayCircle className="text-gray-400" />
               </div>
               <div className="flex-1">
                 <h4 className="font-bold text-gray-800">프론트엔드 초격차 패키지 Online</h4>
                 <p className="text-sm text-gray-500 mt-1">Ch 4. React Context & State</p>
               </div>
               <button className="bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-rose-600 transition-colors">
                 이어보기
               </button>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
              <div className="bg-rose-500 h-2 rounded-full" style={{ width: '74%' }}></div>
            </div>
            <p className="text-right text-xs text-gray-500 mt-1">진도율 74%</p>
          </div>

          {/* Streak Calendar (Simplified Visual) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 text-lg">연속 학습 캘린더</h3>
                <span className="text-xs text-gray-500">최근 3개월</span>
             </div>
             <div className="flex flex-wrap gap-1.5">
               {Array.from({ length: 90 }).map((_, i) => (
                 <div 
                   key={i} 
                   className={`w-3 h-3 rounded-sm ${
                     Math.random() > 0.4 ? 'bg-rose-500' : Math.random() > 0.7 ? 'bg-rose-200' : 'bg-gray-100'
                   }`} 
                   title={`${i}일 전`}
                 />
               ))}
             </div>
             <p className="text-xs text-gray-400 mt-2 text-right">* 과제 제출 및 강의 수강 시 스트릭이 채워집니다.</p>
          </div>
          
           {/* Radar Chart Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg mb-2">나의 역량 데이터 (Career Genome)</h3>
            <p className="text-sm text-gray-500 mb-6">프로젝트와 피드백을 통해 축적된 실무 역량입니다.</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar
                    name="My Skill"
                    dataKey="A"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    fill="#f43f5e"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Quests & Nudges */}
        <div className="space-y-6">
          {/* Daily Quests */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">오늘의 퀘스트</h3>
              <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded font-bold">D-14 to Level Up</span>
            </div>
            <div className="space-y-3">
              {DAILY_QUESTS.map((quest) => (
                <div key={quest.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${quest.completed ? 'bg-rose-500 border-rose-500' : 'border-gray-300'}`}>
                    {quest.completed && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${quest.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{quest.title}</p>
                    <span className="text-xs text-rose-500 font-bold">+{quest.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              모든 퀘스트 보기
            </button>
          </div>

          {/* Action Nudge (AI Recommendation) */}
          <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-white p-1.5 rounded-lg shadow-sm">
                <span className="text-lg">🤖</span>
              </div>
              <span className="text-sm font-bold text-rose-800">AI 학습 코치</span>
            </div>
            <p className="text-sm text-rose-900 leading-relaxed mb-4">
              "현우님, <span className="font-bold">React State</span> 부분의 퀴즈 정답률이 60%로 다소 낮습니다. 이 부분을 보완하면 JD 적합도가 <span className="font-bold text-rose-600">+5%</span> 상승해요!"
            </p>
            <button className="w-full bg-white text-rose-600 border border-rose-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-rose-100 transition-colors">
              추천 강의 바로가기
            </button>
          </div>

           {/* Community Hot Topic */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h3 className="font-bold text-gray-900 mb-4">🔥 지금 뜨는 이야기</h3>
             <ul className="space-y-3">
               <li className="text-sm text-gray-600 truncate cursor-pointer hover:text-rose-500"> • 3년차 개발자 취업 현실 후기 공유합니다.</li>
               <li className="text-sm text-gray-600 truncate cursor-pointer hover:text-rose-500"> • 99클럽 스터디원 모집 (2/4)</li>
               <li className="text-sm text-gray-600 truncate cursor-pointer hover:text-rose-500"> • 리액트 19 버전 변경점 요약</li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

// ... existing code for ClassroomView, JobMatchingView ...
const ClassroomView = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            {/* Left: Video Player */}
            <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="bg-black rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden group">
                    <img src="/api/placeholder/800/450" alt="Video Placeholder" className="w-full h-full object-cover opacity-60" />
                    <button className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </button>
                    {/* In-video Quiz Overlay Mockup */}
                    <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-white/10 hidden">
                        <p className="text-white font-medium mb-2">Q. State가 변경되면 컴포넌트는 어떻게 되나요?</p>
                        <div className="flex gap-2">
                             <button className="flex-1 bg-gray-700 hover:bg-rose-600 text-white text-xs py-2 rounded">재렌더링 된다</button>
                             <button className="flex-1 bg-gray-700 hover:bg-rose-600 text-white text-xs py-2 rounded">삭제된다</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Ch 4. Props와 State의 이해</h2>
                    <p className="text-gray-500 text-sm mb-4">React의 핵심 데이터 흐름인 Props와 State의 차이점을 명확히 이해하고 실습합니다.</p>
                    <div className="flex gap-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">React</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Frontend</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Basic</span>
                    </div>
                </div>
            </div>

            {/* Right: Curriculum & AI Tutor */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                <div className="flex border-b border-gray-100">
                    <button className="flex-1 py-4 text-sm font-bold text-rose-500 border-b-2 border-rose-500">커리큘럼</button>
                    <button className="flex-1 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">AI 튜터</button>
                    <button className="flex-1 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">노트</button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {CURRICULUM.map((item) => (
                        <div key={item.id} className={`p-3 rounded-xl flex items-center justify-between group cursor-pointer ${item.current ? 'bg-rose-50 border border-rose-100' : 'hover:bg-gray-50'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${item.completed ? 'bg-rose-500 text-white' : item.current ? 'border-2 border-rose-500 text-rose-500' : 'bg-gray-200 text-gray-500'}`}>
                                    {item.completed ? <CheckCircle2 size={14} /> : item.id}
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-sm ${item.current ? 'font-bold text-gray-900' : 'text-gray-600'}`}>{item.title}</span>
                                    <span className="text-xs text-gray-400">{item.duration}</span>
                                </div>
                            </div>
                            {item.current && <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>}
                        </div>
                    ))}
                </div>

                {/* AI Tutor Prompt Area (Sticky Bottom) */}
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🤖</span>
                        <span className="text-xs font-bold text-gray-700">AI 튜터에게 질문하기</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-1 scrollbar-hide">
                        <button className="whitespace-nowrap bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs text-gray-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-colors">이 강의 요약해줘</button>
                        <button className="whitespace-nowrap bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs text-gray-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-colors">관련 퀴즈 만들어줘</button>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="궁금한 내용을 입력하세요..." className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-rose-500" />
                        <button className="absolute right-2 top-2 p-1 bg-rose-500 rounded-lg text-white hover:bg-rose-600">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const JobMatchingView = () => (
    <div className="flex items-center justify-center h-full text-center p-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="max-w-md">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                💼
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">JD 매칭 엔진</h2>
            <p className="text-gray-500 mb-8">
                현재 수강생님의 역량 데이터(프로젝트, 과제, 피드백)를 분석하여<br/>
                가장 적합한 기업의 채용 공고와 매칭 중입니다.
            </p>
            <div className="p-6 bg-gray-50 rounded-xl text-left mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-700">목표 기업: 당근마켓 (Frontend)</span>
                    <span className="text-rose-500 font-bold">적합도 82%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-rose-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <p className="text-xs text-gray-500">
                    👉 <span className="font-bold text-gray-700">TypeScript</span> 역량을 보완하면 적합도가 90% 이상으로 상승합니다.
                </p>
            </div>
            <button className="px-6 py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-colors">
                상세 분석 리포트 보기
            </button>
        </div>
    </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine Title based on Tab
  const getTitle = () => {
      switch(activeTab) {
          case 'dashboard': return '홈 (대시보드)';
          case 'classroom': return '나의 강의실';
          case 'portfolio': return '포트폴리오';
          case 'jobmatching': return '취업 매칭 분석';
          case 'support': return '지원 센터';
          default: return 'Kernel Academy';
      }
  }

  return (
    <div className="flex h-screen bg-[#F8F9FC] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header 
            title={getTitle()} 
            onMenuClick={() => setSidebarOpen(true)} 
        />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'classroom' && <ClassroomView />}
            {(activeTab === 'jobmatching' || activeTab === 'portfolio' || activeTab === 'support') && <JobMatchingView />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
