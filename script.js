const TRIGRAMS = {
  0: { name: "坤", nature: "地", trait: "承载、稳定、顺势" },
  1: { name: "震", nature: "雷", trait: "启动、变化、惊动" },
  2: { name: "坎", nature: "水", trait: "风险、流动、压力" },
  3: { name: "兑", nature: "泽", trait: "沟通、喜悦、交易" },
  4: { name: "艮", nature: "山", trait: "停止、边界、蓄力" },
  5: { name: "离", nature: "火", trait: "曝光、表达、依附" },
  6: { name: "巽", nature: "风", trait: "渗透、传播、进入" },
  7: { name: "乾", nature: "天", trait: "主动、创造、强势" },
};

const HEXAGRAM_NAMES = {
  7: { 7: "乾为天", 0: "天地否", 1: "天雷无妄", 2: "天水讼", 4: "天山遁", 5: "天火同人", 6: "天风姤", 3: "天泽履" },
  0: { 7: "地天泰", 0: "坤为地", 1: "地雷复", 2: "地水师", 4: "地山谦", 5: "地火明夷", 6: "地风升", 3: "地泽临" },
  1: { 7: "雷天大壮", 0: "雷地豫", 1: "震为雷", 2: "雷水解", 4: "雷山小过", 5: "雷火丰", 6: "雷风恒", 3: "雷泽归妹" },
  2: { 7: "水天需", 0: "水地比", 1: "水雷屯", 2: "坎为水", 4: "水山蹇", 5: "水火既济", 6: "水风井", 3: "水泽节" },
  4: { 7: "山天大畜", 0: "山地剥", 1: "山雷颐", 2: "山水蒙", 4: "艮为山", 5: "山火贲", 6: "山风蛊", 3: "山泽损" },
  5: { 7: "火天大有", 0: "火地晋", 1: "火雷噬嗑", 2: "火水未济", 4: "火山旅", 5: "离为火", 6: "火风鼎", 3: "火泽睽" },
  6: { 7: "风天小畜", 0: "风地观", 1: "风雷益", 2: "风水涣", 4: "风山渐", 5: "风火家人", 6: "巽为风", 3: "风泽中孚" },
  3: { 7: "泽天夬", 0: "泽地萃", 1: "泽雷随", 2: "泽水困", 4: "泽山咸", 5: "泽火革", 6: "泽风大过", 3: "兑为泽" },
};

const LINE_LABEL = {
  6: "老阴（变爻）",
  7: "少阳",
  8: "少阴",
  9: "老阳（变爻）",
};

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const BRANCH_ELEMENT = {
  子: "水", 亥: "水",
  寅: "木", 卯: "木",
  巳: "火", 午: "火",
  申: "金", 酉: "金",
  辰: "土", 戌: "土", 丑: "土", 未: "土",
};

const ELEMENT_GENERATES = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
const ELEMENT_CONTROLS = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };
const BRANCH_OPPOSITE = {
  子: "午", 午: "子",
  丑: "未", 未: "丑",
  寅: "申", 申: "寅",
  卯: "酉", 酉: "卯",
  辰: "戌", 戌: "辰",
  巳: "亥", 亥: "巳",
};

const NAGAN_BRANCHES = {
  7: { inner: ["子", "寅", "辰"], outer: ["午", "申", "戌"] }, // 乾
  0: { inner: ["未", "巳", "卯"], outer: ["丑", "亥", "酉"] }, // 坤
  1: { inner: ["子", "寅", "辰"], outer: ["午", "申", "戌"] }, // 震
  6: { inner: ["丑", "亥", "酉"], outer: ["未", "巳", "卯"] }, // 巽
  2: { inner: ["寅", "辰", "午"], outer: ["申", "戌", "子"] }, // 坎
  5: { inner: ["卯", "丑", "亥"], outer: ["酉", "未", "巳"] }, // 离
  4: { inner: ["辰", "午", "申"], outer: ["戌", "子", "寅"] }, // 艮
  3: { inner: ["巳", "卯", "丑"], outer: ["亥", "酉", "未"] }, // 兑
};

const PALACES = [
  { palace: "乾宫", element: "金", names: ["乾为天", "天风姤", "天山遁", "天地否", "风地观", "山地剥", "火地晋", "火天大有"] },
  { palace: "兑宫", element: "金", names: ["兑为泽", "泽水困", "泽地萃", "泽山咸", "水山蹇", "地山谦", "雷山小过", "雷泽归妹"] },
  { palace: "离宫", element: "火", names: ["离为火", "火山旅", "火风鼎", "火水未济", "山水蒙", "风水涣", "天水讼", "天火同人"] },
  { palace: "震宫", element: "木", names: ["震为雷", "雷地豫", "雷水解", "雷风恒", "地风升", "水风井", "泽风大过", "泽雷随"] },
  { palace: "巽宫", element: "木", names: ["巽为风", "风天小畜", "风火家人", "风雷益", "天雷无妄", "火雷噬嗑", "山雷颐", "山风蛊"] },
  { palace: "坎宫", element: "水", names: ["坎为水", "水泽节", "水雷屯", "水火既济", "泽火革", "雷火丰", "地火明夷", "地水师"] },
  { palace: "艮宫", element: "土", names: ["艮为山", "山火贲", "山天大畜", "山泽损", "火泽睽", "天泽履", "风泽中孚", "风山渐"] },
  { palace: "坤宫", element: "土", names: ["坤为地", "地雷复", "地泽临", "地天泰", "雷天大壮", "泽天夬", "水天需", "水地比"] },
];

const PALACE_INDEX = (() => {
  const out = {};
  const shiByOrder = [6, 1, 2, 3, 4, 5, 4, 3];
  for (const group of PALACES) {
    group.names.forEach((name, order) => {
      const shi = shiByOrder[order];
      out[name] = {
        palace: group.palace,
        palaceElement: group.element,
        order,
        kind: order === 6 ? "游魂" : order === 7 ? "归魂" : order === 0 ? "本宫" : `${order}世卦`,
        shi,
        ying: ((shi + 2) % 6) + 1,
      };
    });
  }
  return out;
})();

const SIX_SPIRITS = ["青龙", "朱雀", "勾陈", "腾蛇", "白虎", "玄武"];
const SIX_SPIRIT_START = {
  甲: 0, 乙: 0,
  丙: 1, 丁: 1,
  戊: 2,
  己: 3,
  庚: 4, 辛: 4,
  壬: 5, 癸: 5,
};

const EMPTY_BY_XUN = [
  { start: "甲子", empty: ["戌", "亥"] },
  { start: "甲戌", empty: ["申", "酉"] },
  { start: "甲申", empty: ["午", "未"] },
  { start: "甲午", empty: ["辰", "巳"] },
  { start: "甲辰", empty: ["寅", "卯"] },
  { start: "甲寅", empty: ["子", "丑"] },
];

const TOPIC_TEXT = {
  general: {
    name: "综合判断",
    focus: "先看大趋势，再看当下是否适合推进。",
    go: "可以小步推进，但要保留回旋空间。",
    wait: "先稳住局面，不宜急着扩大动作。",
  },
  career: {
    name: "事业 / 创业 / 项目",
    focus: "重点看项目节奏、资源是否跟得上、是否适合扩张。",
    go: "适合做低成本试错，先拿反馈，不要一次投入太重。",
    wait: "先补流程、现金流和合作规则，不宜贸然加码。",
  },
  wealth: {
    name: "钱财 / 成交 / 收入",
    focus: "重点看现金流、成交阻力、价格和风险控制。",
    go: "可以试成交，但要控制成本、先收小单。",
    wait: "先算清成本和售后，不要为了成交而亏损。",
  },
  relationship: {
    name: "感情 / 合作 / 人际",
    focus: "重点看沟通、信任、边界和双方是否同频。",
    go: "可以主动沟通，但话要说清楚，避免误会。",
    wait: "先观察对方真实态度，不要急着绑定关系。",
  },
  health: {
    name: "身心状态 / 压力",
    focus: "重点看消耗、恢复、节奏和是否需要暂停。",
    go: "可以做轻量行动，但不要硬扛。",
    wait: "先休息、吃饭、睡眠，身体稳定后再判断。",
  },
  decision: {
    name: "选择 / 去留 / 是否行动",
    focus: "重点看当下是否适合动，以及动到什么程度。",
    go: "可试探性行动，先做可逆的小选择。",
    wait: "暂缓最终决定，先补信息和备选方案。",
  },
  lost: {
    name: "找失物",
    focus: "重点看物品是否还近、是否被移动、在哪类环境里。",
    go: "适合按线索分区寻找，先找近处和遮挡处。",
    wait: "先回忆最后出现地点，不要盲目扩大搜索范围。",
  },
};

const QUESTION_PATTERNS = [
  {
    key: "canDo",
    patterns: ["能不能", "可不可以", "可以吗", "适合吗", "要不要", "是否", "该不该"],
    intent: "判断是否适合行动",
    good: "适合先做低风险试探，不宜直接押大。",
    bad: "不适合马上硬做，先补信息或降低动作。",
  },
  {
    key: "sell",
    patterns: ["卖", "成交", "下单", "客户", "买", "价格", "定价", "订单"],
    intent: "判断成交与钱财",
    good: "重点看能不能产生真实询单和小额成交。",
    bad: "重点防止为了成交牺牲利润或售后失控。",
  },
  {
    key: "business",
    patterns: ["创业", "项目", "品牌", "账号", "小红书", "抖音", "选品", "供应链", "一件代发"],
    intent: "判断项目推进",
    good: "适合用内容和小样本测试推进。",
    bad: "不适合一口气做重资产或长期承诺。",
  },
  {
    key: "money",
    patterns: ["钱", "存款", "收入", "房租", "成本", "利润", "现金流", "亏"],
    intent: "判断现金压力",
    good: "可做小额现金流尝试，但要先算账。",
    bad: "先保现金，不要因为焦虑而花钱解决焦虑。",
  },
  {
    key: "emotion",
    patterns: ["焦虑", "崩溃", "害怕", "压力", "撑不住", "摆烂", "精神", "睡不着"],
    intent: "判断身心状态",
    good: "可以做一点轻动作恢复掌控感。",
    bad: "先暂停决策，恢复睡眠、饮食和基本节奏。",
  },
  {
    key: "relationship",
    patterns: ["合作", "朋友", "对象", "感情", "他", "她", "对方", "沟通"],
    intent: "判断关系互动",
    good: "可以沟通，但要明确边界和条件。",
    bad: "先观察对方行动，不要只听承诺。",
  },
  {
    key: "move",
    patterns: ["搬家", "租房", "去", "留下", "广州", "深圳", "换房", "出发", "回老家", "城市", "通勤"],
    intent: "判断去留行动",
    good: "适合先踩点或做可撤回的短行动。",
    bad: "暂缓最终决定，先确认成本、路线和后路。",
  },
  {
    key: "travel",
    patterns: ["出远门", "出行", "旅行", "旅游", "改期", "机票", "高铁", "酒店", "陌生城市", "安全吗"],
    intent: "判断出行安全与行程节奏",
    good: "可以准备出行，但要确认路线、天气、证件和备用方案。",
    bad: "先排除安全、交通、预算和临时变动风险，再决定是否出发。",
  },
  {
    key: "study",
    patterns: ["考研", "考公", "考试", "证书", "上岸", "复习", "学习", "成绩", "毕业"],
    intent: "判断学习考试与备考节奏",
    good: "重点看执行计划、复习反馈和时间分配。",
    bad: "先补复习清单和时间表，不要只问结果。",
  },
  {
    key: "shopping",
    patterns: ["分期", "相机", "手机", "电脑", "买一台", "会不会后悔", "消费", "医美", "很贵"],
    intent: "判断消费是否值得",
    good: "先看它是否是真需求、生产力工具，还是情绪消费。",
    bad: "先保现金流，延迟决定，避免用消费缓解焦虑。",
  },
  {
    key: "product",
    patterns: ["网站", "工具", "付费功能", "会员", "重做交互", "用户看不懂", "功能", "产品", "商业化", "转化"],
    intent: "判断产品功能与商业化方向",
    good: "适合先用小版本验证用户是否真的需要。",
    bad: "不要直接大改，先找出用户卡在哪一步。",
  },
  {
    key: "lost",
    patterns: ["丢", "丢了", "不见", "找不到", "失物", "遗失", "掉了", "落下", "钥匙", "钱包", "证件", "耳机"],
    intent: "寻找失物",
    good: "重点看东西是否还在附近、有没有被移动、该先找哪里。",
    bad: "不要只靠卦象，先回到最后一次出现地点复盘行动路线。",
  },
];

const ORAL_INTENT_LIBRARY = [
  {
    key: "relationship_possible",
    topic: "relationship",
    phrases: ["还有戏吗", "还有机会吗", "还有没有可能", "是不是没希望了", "还能继续吗", "有没有结果", "能不能成"],
    normalized: "判断这段关系或这件事是否还有继续发展的可能。",
    focus: "重点看对方是否还有实际回应，以及事情有没有继续推进的条件。",
    followups: ["你们现在是什么关系？", "最近一次真实互动是什么时候？", "你想主动推进，还是想判断要不要放下？"],
  },
  {
    key: "other_mind",
    topic: "relationship",
    phrases: ["他怎么想", "她怎么想", "对方怎么想", "到底咋想", "到底怎么想", "什么意思", "他是不是", "她是不是"],
    normalized: "判断对方态度是否明确，以及对方真实意愿偏向哪里。",
    focus: "重点看应爻、对方行动和世应关系，不只看对方说了什么。",
    followups: ["对方最近有没有主动行动？", "你们现在是暧昧、恋爱、冷战，还是分开？", "你最想知道对方态度还是下一步行动？"],
  },
  {
    key: "should_contact",
    topic: "relationship",
    phrases: ["该不该主动", "要不要联系", "要不要找他", "要不要找她", "要不要发消息", "该不该开口", "要不要表白"],
    normalized: "判断自己是否适合主动沟通，以及主动后可能带来的变化。",
    focus: "重点看世爻状态、应爻回应和动爻位置，判断主动是否有用。",
    followups: ["你们多久没联系了？", "主动联系的目的是什么？", "你能接受对方不回应吗？"],
  },
  {
    key: "should_quit",
    topic: "decision",
    phrases: ["该撤吗", "该撤了", "要不要撤", "是不是该放弃", "要不要放弃", "还要坚持吗", "继续耗着", "止损", "算了吧", "该放手吗"],
    normalized: "判断是否应该停止投入、暂缓推进或及时止损。",
    focus: "重点看当前消耗是否过大，以及继续投入有没有现实反馈。",
    followups: ["你已经投入了多少时间、钱或情绪？", "继续下去最坏结果是什么？", "有没有新的反馈支持你继续？"],
  },
  {
    key: "reliable",
    topic: "decision",
    phrases: ["靠谱吗", "稳不稳", "能信吗", "会不会被骗", "是不是坑", "有没有风险", "靠不靠谱"],
    normalized: "判断对方、机会或方案是否可靠，以及风险是否可控。",
    focus: "重点看应爻、官鬼、父母和兄弟，尤其要看证据、规则和现实承诺。",
    followups: ["对方给过什么证据或承诺？", "是否涉及钱、合同或隐私？", "如果判断错了，你会损失什么？"],
  },
  {
    key: "go_for_it",
    topic: "decision",
    phrases: ["要不要冲", "能不能冲", "可不可以上", "是不是机会", "该不该抓住", "现在能不能动"],
    normalized: "判断现在是否适合行动，以及行动力度应该多大。",
    focus: "重点看动爻、世爻承受力和外部条件是否配合。",
    followups: ["这个行动可撤回吗？", "你准备投入多少成本？", "最小一步可以先做什么？"],
  },
  {
    key: "regret",
    topic: "wealth",
    phrases: ["会不会后悔", "值不值", "划不划算", "要不要买", "买了会怎样", "亏不亏"],
    normalized: "判断这个选择是否值得，后续是否容易产生后悔或成本压力。",
    focus: "重点看财爻、兄弟和现实现金流，区分真需求和情绪消费。",
    followups: ["这笔钱占你月收入或存款多少？", "它是刚需、生产力工具，还是情绪消费？", "能否延迟24小时再决定？"],
  },
  {
    key: "payback",
    topic: "wealth",
    phrases: ["能不能回本", "能赚钱吗", "能不能赚", "有没有利润", "会不会亏", "赚不赚钱"],
    normalized: "判断这件事是否有回本或盈利可能，以及成本风险是否可控。",
    focus: "重点看财爻、子孙反馈和兄弟消耗，不只看有没有机会。",
    followups: ["成本、售价、运费、售后分别是多少？", "有没有真实用户愿意付费？", "最坏亏损你能不能承受？"],
  },
  {
    key: "lost_where",
    topic: "lost",
    phrases: ["在哪", "在哪里", "还能找回来吗", "是不是被拿了", "谁拿了", "丢哪了", "找得到吗"],
    normalized: "判断失物是否还能找回，以及优先寻找的方向和环境。",
    focus: "重点看财爻、世应、空亡、六神和方位，不只看能不能找回。",
    followups: ["最后一次看到在哪里？", "中间谁可能接触过？", "是否需要先挂失、报警或联系场所？"],
  },
  {
    key: "overthinking",
    topic: "health",
    phrases: ["是不是我想多了", "是不是我太敏感", "我是不是多虑了", "是不是焦虑", "心里没底", "很内耗"],
    normalized: "判断当前担心是现实信号，还是情绪放大后的消耗。",
    focus: "重点看世爻、子孙、官鬼和动爻，区分真实风险与心理压力。",
    followups: ["有没有现实证据支持你的担心？", "这个担心持续多久了？", "你现在最需要确认什么？"],
  },
  {
    key: "future_general",
    topic: "general",
    phrases: ["以后会怎样", "后面怎么样", "未来怎么样", "发展如何", "有没有长期帮助", "结果会好吗"],
    normalized: "判断后续趋势，但需要缩小时间范围和具体目标。",
    focus: "重点看本卦到变卦的趋势，不适合直接断一生或长期命运。",
    followups: ["你想看多久内？", "你最关心结果、过程，还是风险？", "这件事现在进展到哪一步？"],
  },
];

function matchOralIntent(question) {
  const normalized = (question || "").replace(/\s+/g, "");
  if (!normalized) return null;
  const matches = ORAL_INTENT_LIBRARY
    .map((item) => {
      const hits = item.phrases.filter((phrase) => normalized.includes(phrase)).length;
      return { ...item, score: hits };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.phrases.length - a.phrases.length);
  return matches[0] || null;
}

const LINE_POSITION_HINTS = {
  0: "初爻动：问题刚开始，先看基础条件，不要急着看结果。",
  1: "二爻动：适合从内部调整，比如流程、准备、价格、沟通方式。",
  2: "三爻动：容易卡在执行层，别一边焦虑一边硬推。",
  3: "四爻动：外部关系开始影响结果，要看合作、平台、客户反馈。",
  4: "五爻动：关键决策位动，适合定策略，但要避免一念之间押太重。",
  5: "上爻动：事情接近一个阶段的顶点，宜收束、复盘或换方式。",
};

const PLAIN_GLOSSARY = {
  世爻: "代表你自己、你这边的状态、主动权和承受力。",
  应爻: "代表对方、市场、外部环境、客户或这件事的另一端。",
  妻财: "问钱、订单、收入、商品价值时重点看它。",
  官鬼: "问事业、压力、规则、工作、项目阻力时重点看它。",
  子孙: "代表缓解、结果、用户反馈、自由度，也常用来看身心放松和产品体验。",
  父母: "代表资料、合同、证件、学习、规则、平台、房子、信息。",
  兄弟: "代表竞争、消耗、同类、朋友，也可能代表分走钱财的因素。",
  空亡: "不是说没有，而是暂时不实、还没落地、像悬在空中，需要等条件补上。",
  动爻: "正在变化的位置，说明这件事的关键不稳定点在哪里。",
  回头生: "变化后反过来支持原来的爻，通常代表有补力、有转机。",
  回头克: "变化后反过来压制原来的爻，通常代表后续压力、反复或代价。",
  月建: "这段时间的大环境，像天气和季节。",
  日辰: "起卦当天的力量，像当天的即时状态。",
};

const HEX_ACTIONS = {
  "乾为天": { score: 2, plain: "主动性强，但容易用力过猛。" },
  "坤为地": { score: 1, plain: "宜顺势、稳住基本盘。" },
  "水雷屯": { score: -1, plain: "刚开始会乱，先解决最小阻塞。" },
  "山水蒙": { score: -1, plain: "信息不足，先问清楚、学明白。" },
  "水天需": { score: 0, plain: "需要等待条件成熟，不是不能做。" },
  "天水讼": { score: -2, plain: "容易有争执或规则问题，先写清边界。" },
  "地水师": { score: 0, plain: "需要纪律和组织，别靠情绪推进。" },
  "水地比": { score: 1, plain: "适合找支持、找同伴或找靠谱资源。" },
  "风天小畜": { score: 0, plain: "有积累但还小，先蓄力。" },
  "天泽履": { score: -1, plain: "能走，但脚下有风险，要谨慎。" },
  "地天泰": { score: 2, plain: "上下通畅，适合稳步推进。" },
  "天地否": { score: -2, plain: "当下不通，先找堵点。" },
  "天火同人": { score: 1, plain: "适合找同频的人或用户。" },
  "火天大有": { score: 2, plain: "资源感较强，但要守住边界。" },
  "地山谦": { score: 1, plain: "低调务实反而有利。" },
  "雷地豫": { score: 1, plain: "有期待和动能，但别飘。" },
  "泽雷随": { score: 1, plain: "跟着反馈走，适合顺势调整。" },
  "山风蛊": { score: -1, plain: "有旧问题要修，不修会拖后腿。" },
  "地泽临": { score: 1, plain: "机会靠近，适合试探。" },
  "风地观": { score: 0, plain: "先观察市场或对方反应。" },
  "火雷噬嗑": { score: 0, plain: "有阻塞，但可通过规则解决。" },
  "山火贲": { score: 1, plain: "包装和呈现很重要，但不能只看表面。" },
  "山地剥": { score: -2, plain: "消耗偏大，先止损。" },
  "地雷复": { score: 1, plain: "有重新开始的机会，适合小步恢复。" },
  "天雷无妄": { score: 0, plain: "不要妄动，按真实条件做事。" },
  "山天大畜": { score: 1, plain: "先积累能力，不急着放大。" },
  "山雷颐": { score: 0, plain: "先养人、养内容、养基本盘。" },
  "泽风大过": { score: -2, plain: "压力过载，必须减重。" },
  "坎为水": { score: -2, plain: "风险和压力较多，先控风险。" },
  "离为火": { score: 1, plain: "利曝光表达，但容易焦躁。" },
  "泽山咸": { score: 1, plain: "有吸引和互动，适合测试反应。" },
  "雷风恒": { score: 1, plain: "贵在持续，不要频繁换方向。" },
  "天山遁": { score: -1, plain: "退一步保实力，不是失败。" },
  "雷天大壮": { score: 1, plain: "动能强，但忌莽撞。" },
  "火地晋": { score: 2, plain: "有被看见、上升的机会。" },
  "地火明夷": { score: -1, plain: "暂时不容易被看见，先保护自己。" },
  "风火家人": { score: 1, plain: "内部流程和日常秩序最关键。" },
  "火泽睽": { score: -1, plain: "认知分歧明显，先求小同。" },
  "水山蹇": { score: -2, plain: "路不顺，先避开最难的点。" },
  "雷水解": { score: 1, plain: "阻力有解，适合拆问题。" },
  "山泽损": { score: -1, plain: "要做减法，少做一点反而对。" },
  "风雷益": { score: 2, plain: "有增益，适合传播和借力。" },
  "泽天夬": { score: 0, plain: "需要决断，但别情绪化切断。" },
  "天风姤": { score: 0, plain: "有偶遇机会，也有不稳定因素。" },
  "泽地萃": { score: 1, plain: "适合集聚人气、资源和反馈。" },
  "地风升": { score: 2, plain: "慢慢上升，适合长期积累。" },
  "泽水困": { score: -2, plain: "受困，先保现金和精力。" },
  "水风井": { score: 1, plain: "有资源，但要用对方式。" },
  "泽火革": { score: 1, plain: "适合改变旧模式。" },
  "火风鼎": { score: 2, plain: "适合重组资源，做出新结构。" },
  "震为雷": { score: 0, plain: "变化突然，先稳住。" },
  "艮为山": { score: -1, plain: "该停就停，先设边界。" },
  "风山渐": { score: 1, plain: "渐进最有利，不要一步到位。" },
  "雷泽归妹": { score: -1, plain: "关系或合作不稳定，别急定局。" },
  "雷火丰": { score: 1, plain: "热度和信息多，防过热。" },
  "火山旅": { score: 0, plain: "不安定，适合轻装试行。" },
  "巽为风": { score: 1, plain: "适合传播、渗透、慢慢进入。" },
  "兑为泽": { score: 1, plain: "利沟通成交，但别承诺过度。" },
  "风水涣": { score: -1, plain: "散乱，需要重新聚焦。" },
  "水泽节": { score: 0, plain: "要节制、限额、定规则。" },
  "风泽中孚": { score: 1, plain: "重信任，真诚比技巧重要。" },
  "雷山小过": { score: 0, plain: "小事可行，大事谨慎。" },
  "水火既济": { score: 1, plain: "阶段可成，但别松懈。" },
  "火水未济": { score: 0, plain: "还没完成，继续调整。" },
};

const HEX_HINTS = {
  "乾为天": "气势强，适合主动开局，但忌硬冲硬撑。",
  "坤为地": "宜顺势承接，先稳基础，不宜急求结果。",
  "水雷屯": "初创多阻，先破混乱，适合小步开荒。",
  "山水蒙": "信息未明，先学习、问清、验证。",
  "水天需": "需要等待条件成熟，急反而乱。",
  "天水讼": "有争执或规则问题，先把边界写清楚。",
  "地水师": "需要组织和纪律，别散乱行动。",
  "水地比": "利于结伴、找支持，但要选对人。",
  "风天小畜": "有积累但未成势，适合蓄小力。",
  "天泽履": "踩在风险边缘，谨慎守礼可过。",
  "地天泰": "上下相通，整体较顺，可稳步推进。",
  "天地否": "闭塞不通，先停扩张，找堵点。",
  "天火同人": "适合连接同频者，靠共识推进。",
  "火天大有": "资源感增强，但要守住分寸。",
  "地山谦": "低调、收敛、务实，反而有利。",
  "雷地豫": "有动能和期待，但别被情绪带走。",
  "泽雷随": "顺势跟进，观察市场反馈。",
  "山风蛊": "旧问题要修，先清理漏洞。",
  "地泽临": "机会靠近，适合近距离试探。",
  "风地观": "先观察，不急表态。",
  "火雷噬嗑": "需要处理阻塞，规则要硬一点。",
  "山火贲": "重包装与外观，但别只重表面。",
  "山地剥": "消耗较重，先止损保底。",
  "地雷复": "低谷后有回转，适合重新开始。",
  "天雷无妄": "少妄动，按真实条件做事。",
  "山天大畜": "积蓄能力，暂不宜全力外放。",
  "山雷颐": "先养自己，也要注意输入质量。",
  "泽风大过": "压力过载，结构要减重。",
  "坎为水": "险象较多，先控风险。",
  "离为火": "利曝光表达，但容易焦躁。",
  "泽山咸": "有感应和吸引，适合试探互动。",
  "雷风恒": "贵在持续，少折腾方向。",
  "天山遁": "宜退一步，保留实力。",
  "雷天大壮": "力量上来，但忌莽撞。",
  "火地晋": "有上升机会，适合被看见。",
  "地火明夷": "光被遮住，先保护自己。",
  "风火家人": "内部秩序重要，先把日常流程理顺。",
  "火泽睽": "分歧明显，先求小同。",
  "水山蹇": "路难走，先避险再前进。",
  "雷水解": "阻力有解，适合拆问题。",
  "山泽损": "要减法，少做、做准。",
  "风雷益": "有增益，适合借力与传播。",
  "泽天夬": "需要决断，但别情绪化。",
  "天风姤": "偶遇机会，也有不稳定因素。",
  "泽地萃": "适合集聚资源和人气。",
  "地风升": "慢慢上升，贵在持续积累。",
  "泽水困": "受困，先保现金和精力。",
  "水风井": "有资源但要正确取用。",
  "泽火革": "适合改变旧模式。",
  "火风鼎": "可重组资源，形成新结构。",
  "震为雷": "变化突然，先稳住再行动。",
  "艮为山": "停止、边界、休整。",
  "风山渐": "渐进为宜，不要一步到位。",
  "雷泽归妹": "关系或合作不稳，别急定局。",
  "雷火丰": "信息多、声量大，防过热。",
  "火山旅": "不安定，适合轻装试行。",
  "巽为风": "适合传播、渗透、慢慢进入。",
  "兑为泽": "利沟通成交，但防口头承诺过度。",
  "风水涣": "散乱需整合，先聚焦。",
  "水泽节": "节制、限额、设规则。",
  "风泽中孚": "重信任，真诚比技巧重要。",
  "雷山小过": "小事可行，大事谨慎。",
  "水火既济": "阶段完成，但后续要防松懈。",
  "火水未济": "尚未完成，继续调整。",
};

const $ = (id) => document.getElementById(id);
let currentCast = null;

function randomInt(maxExclusive) {
  const array = new Uint32Array(1);
  const limit = Math.floor(0xffffffff / maxExclusive) * maxExclusive;
  let value;
  do {
    crypto.getRandomValues(array);
    value = array[0];
  } while (value >= limit);
  return value % maxExclusive;
}

function castCoinLine() {
  const coins = [0, 1, 2].map(() => (randomInt(2) === 1 ? 3 : 2));
  const value = coins.reduce((sum, v) => sum + v, 0);
  return { value, coins };
}

function castBalancedLine() {
  const values = [6, 7, 8, 9];
  return { value: values[randomInt(4)], coins: null };
}

function lineToYang(value) {
  return value === 7 || value === 9;
}

function changedLineToYang(value) {
  if (value === 6) return true;
  if (value === 9) return false;
  return lineToYang(value);
}

function trigramIndex(lines) {
  return lines.reduce((index, isYang, i) => index + (isYang ? 1 << i : 0), 0);
}

function hexagramName(lines) {
  const lower = trigramIndex(lines.slice(0, 3));
  const upper = trigramIndex(lines.slice(3, 6));
  return {
    name: HEXAGRAM_NAMES[upper][lower],
    upper,
    lower,
    upperText: `${TRIGRAMS[upper].name}（${TRIGRAMS[upper].nature}）`,
    lowerText: `${TRIGRAMS[lower].name}（${TRIGRAMS[lower].nature}）`,
  };
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function toDateTimeLocalValue(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}T${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function populateSelect(id, values, suffix = "") {
  const el = $(id);
  el.innerHTML = values.map((value) => `<option value="${value}">${value}${suffix}</option>`).join("");
}

function julianDayNumber(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
}

function sexagenaryDay(date) {
  // 常用校准：2000-01-01 为庚辰日。
  const anchor = new Date(2000, 0, 1);
  const diff = julianDayNumber(date) - julianDayNumber(anchor);
  const anchorIndex = 16; // 庚辰：16 mod 10 = 庚，16 mod 12 = 辰
  const index = ((anchorIndex + diff) % 60 + 60) % 60;
  return {
    index,
    stem: STEMS[index % 10],
    branch: BRANCHES[index % 12],
    ganzhi: `${STEMS[index % 10]}${BRANCHES[index % 12]}`,
  };
}

function approximateMonthBranch(date) {
  // 近似按节气换月：严肃商用建议后续换成精确节气算法。
  const md = (date.getMonth() + 1) * 100 + date.getDate();
  if (md >= 1207 || md < 106) return "子";
  if (md >= 106 && md < 204) return "丑";
  if (md >= 204 && md < 306) return "寅";
  if (md >= 306 && md < 405) return "卯";
  if (md >= 405 && md < 506) return "辰";
  if (md >= 506 && md < 606) return "巳";
  if (md >= 606 && md < 707) return "午";
  if (md >= 707 && md < 808) return "未";
  if (md >= 808 && md < 908) return "申";
  if (md >= 908 && md < 1008) return "酉";
  if (md >= 1008 && md < 1107) return "戌";
  return "亥";
}

function xunkong(dayIndex) {
  const xun = Math.floor(dayIndex / 10);
  return EMPTY_BY_XUN[xun] || EMPTY_BY_XUN[0];
}

function syncDateFieldsFromDate(date) {
  const day = sexagenaryDay(date);
  $("monthBranch").value = approximateMonthBranch(date);
  $("dayStem").value = day.stem;
  $("dayBranch").value = day.branch;
}

function relationToPalace(lineElement, palaceElement) {
  if (lineElement === palaceElement) return "兄弟";
  if (ELEMENT_GENERATES[lineElement] === palaceElement) return "父母";
  if (ELEMENT_GENERATES[palaceElement] === lineElement) return "子孙";
  if (ELEMENT_CONTROLS[lineElement] === palaceElement) return "官鬼";
  if (ELEMENT_CONTROLS[palaceElement] === lineElement) return "妻财";
  return "—";
}

function buildNajia(hex, lines, values, dayStem, monthBranch, dayBranch, emptyBranches = []) {
  const info = PALACE_INDEX[hex.name] || {
    palace: "未知宫",
    palaceElement: "土",
    kind: "未知",
    shi: 1,
    ying: 4,
  };
  const lowerTable = NAGAN_BRANCHES[hex.lower].inner;
  const upperTable = NAGAN_BRANCHES[hex.upper].outer;
  const start = SIX_SPIRIT_START[dayStem] ?? 0;

  const rows = lines.map((isYang, index) => {
    const branch = index < 3 ? lowerTable[index] : upperTable[index - 3];
    const element = BRANCH_ELEMENT[branch];
    const relation = relationToPalace(element, info.palaceElement);
    const spirit = SIX_SPIRITS[(start + index) % 6];
    const marks = [];
    if (index + 1 === info.shi) marks.push("世");
    if (index + 1 === info.ying) marks.push("应");
    if (values[index] === 6 || values[index] === 9) marks.push("动");
    if (emptyBranches.includes(branch)) marks.push("空");
    const monthEffects = [];
    const dayEffects = [];
    if (branch === monthBranch) monthEffects.push("临月");
    if (BRANCH_OPPOSITE[branch] === monthBranch) monthEffects.push("月冲");
    if (ELEMENT_GENERATES[BRANCH_ELEMENT[monthBranch]] === element) monthEffects.push("月生");
    if (ELEMENT_CONTROLS[BRANCH_ELEMENT[monthBranch]] === element) monthEffects.push("月克");
    if (branch === dayBranch) dayEffects.push("临日");
    if (BRANCH_OPPOSITE[branch] === dayBranch) dayEffects.push("日冲");
    if (ELEMENT_GENERATES[BRANCH_ELEMENT[dayBranch]] === element) dayEffects.push("日生");
    if (ELEMENT_CONTROLS[BRANCH_ELEMENT[dayBranch]] === element) dayEffects.push("日克");
    return {
      index,
      yao: isYang ? "阳爻" : "阴爻",
      lineLabel: LINE_LABEL[values[index]],
      branch,
      element,
      relation,
      spirit,
      marks,
      monthEffects,
      dayEffects,
      empty: emptyBranches.includes(branch),
    };
  });

  return { info, rows };
}

function relationFocusByTopic(topic, analysis) {
  if (topic === "lost" || analysis?.matchedKeys.includes("lost")) return "妻财";
  if (analysis?.matchedKeys.includes("lost_where")) return "妻财";
  if (analysis?.matchedKeys.includes("payback") || analysis?.matchedKeys.includes("regret")) return "妻财";
  if (analysis?.matchedKeys.includes("reliable") || analysis?.matchedKeys.includes("other_mind")) return "应爻";
  if (analysis?.matchedKeys.includes("overthinking")) return "子孙";
  if (analysis?.matchedKeys.includes("sell") || analysis?.matchedKeys.includes("money")) return "妻财";
  if (analysis?.matchedKeys.includes("business")) return "官鬼";
  if (analysis?.matchedKeys.includes("emotion")) return "子孙";
  if (analysis?.matchedKeys.includes("relationship")) return "应爻";
  return {
    wealth: "妻财",
    career: "官鬼",
    relationship: "应爻",
    health: "子孙",
    decision: "世爻",
    lost: "妻财",
    general: "世爻",
  }[topic] || "世爻";
}

function summarizeNajia(najia, topic, analysis) {
  const focus = relationFocusByTopic(topic, analysis);
  const shi = najia.rows.find((r) => r.marks.includes("世"));
  const ying = najia.rows.find((r) => r.marks.includes("应"));
  const movingRows = najia.rows.filter((r) => r.marks.includes("动"));
  const focusRows =
    focus === "世爻" ? [shi] :
    focus === "应爻" ? [ying] :
    najia.rows.filter((r) => r.relation === focus);
  const readableFocusRows = focusRows.filter(Boolean);

  const warnings = [];
  if (shi?.monthEffects.includes("月冲") || shi?.dayEffects.includes("日冲")) warnings.push("世爻受冲，自己这一边容易不稳。");
  if (ying?.monthEffects.includes("月冲") || ying?.dayEffects.includes("日冲")) warnings.push("应爻受冲，对方、市场或外部环境不稳定。");
  if (movingRows.length >= 4) warnings.push("动爻较多，变量多，不宜一次性做重大决定。");
  if (readableFocusRows.some((r) => r.empty)) warnings.push(`${focus}落空亡，代表相关事项暂时不实、不稳或还没落地。`);
  if (readableFocusRows.some((r) => r.monthEffects.includes("月克") || r.dayEffects.includes("日克"))) warnings.push(`${focus}受月日克制，相关事项阻力偏大。`);
  if (readableFocusRows.some((r) => r.monthEffects.includes("临月") || r.dayEffects.includes("临日") || r.monthEffects.includes("月生") || r.dayEffects.includes("日生"))) warnings.push(`${focus}得月日帮扶，相关事项有可用条件。`);

  return {
    focus,
    focusRows: readableFocusRows,
    text: warnings.length ? warnings.join(" ") : "月日对核心爻没有明显极端冲克，重点看现实条件和动爻变化。",
  };
}

function changeRelation(originalElement, changedElement) {
  if (originalElement === changedElement) return "化同类";
  if (ELEMENT_GENERATES[changedElement] === originalElement) return "回头生";
  if (ELEMENT_CONTROLS[changedElement] === originalElement) return "回头克";
  if (ELEMENT_GENERATES[originalElement] === changedElement) return "化泄";
  if (ELEMENT_CONTROLS[originalElement] === changedElement) return "化出所克";
  return "变化";
}

function buildChangeRelations(najia, changedNajia) {
  return najia.rows
    .filter((row) => row.marks.includes("动"))
    .map((row) => {
      const changed = changedNajia.rows[row.index];
      return {
        index: row.index,
        from: row,
        to: changed,
        relation: changeRelation(row.element, changed.element),
      };
    });
}

function renderHexagram(el, lines, movingValues = []) {
  el.innerHTML = "";
  lines
    .map((isYang, index) => ({ isYang, index }))
    .reverse()
    .forEach(({ isYang, index }) => {
      const yao = document.createElement("div");
      yao.className = `yao ${isYang ? "yang" : "yin"} ${[6, 9].includes(movingValues[index]) ? "moving" : ""}`;
      yao.title = `第 ${index + 1} 爻`;
      el.appendChild(yao);
    });
}

function movingSummary(values) {
  const moving = values
    .map((value, index) => ({ value, index }))
    .filter((line) => line.value === 6 || line.value === 9);

  if (moving.length === 0) {
    return {
      label: "静卦",
      text: "没有动爻，说明局面暂时稳定。重点看本卦，不宜急着改变方向。",
      actionBias: "wait",
    };
  }
  if (moving.length === 1) {
    return {
      label: "一爻动",
      text: `第 ${moving[0].index + 1} 爻动，变化点集中。先抓一个关键问题，不要同时改太多。`,
      actionBias: "go",
    };
  }
  if (moving.length <= 3) {
    return {
      label: `${moving.length} 爻动`,
      text: `有 ${moving.length} 个动爻，局面正在变化。适合边做边修正，避免一次性押重注。`,
      actionBias: "go",
    };
  }
  return {
    label: `${moving.length} 爻动`,
    text: `动爻较多，代表变量很多、情绪或外部环境不稳。先降复杂度，再做决定。`,
    actionBias: "wait",
  };
}

function analyzeQuestion(question, topic) {
  const normalized = question.trim();
  const oralIntent = matchOralIntent(normalized);
  const matches = QUESTION_PATTERNS.filter((item) =>
    item.patterns.some((pattern) => normalized.includes(pattern))
  );
  if (oralIntent && !matches.some((item) => item.key === oralIntent.key)) {
    matches.unshift({
      key: oralIntent.key,
      patterns: oralIntent.phrases,
      intent: oralIntent.normalized,
      good: oralIntent.focus,
      bad: oralIntent.focus,
    });
  }
  const primary = matches[0];
  const hasQuestion = normalized.length > 0;
  return {
    hasQuestion,
    original: normalized,
    intent: primary ? primary.intent : TOPIC_TEXT[topic].focus,
    matchedKeys: matches.map((item) => item.key),
    primaryPattern: primary,
    oralIntent,
  };
}

function readUserContext() {
  return {
    situation: $("contextSituation")?.value.trim() || "",
    fear: $("contextFear")?.value.trim() || "",
    goal: $("contextGoal")?.value.trim() || "",
    timeframe: $("contextTimeframe")?.value || "7天内",
    lost: {
      item: $("lostItem")?.value.trim() || "",
      lastSeen: $("lostLastSeen")?.value.trim() || "",
      time: $("lostTime")?.value.trim() || "",
      scene: $("lostScene")?.value || "",
      material: $("lostMaterial")?.value || "",
      touched: $("lostTouched")?.value || "",
    },
  };
}

function contextCompleteness(context) {
  const lostCount = context.lost ? [context.lost.item, context.lost.lastSeen, context.lost.time].filter(Boolean).length : 0;
  return [context.situation, context.fear, context.goal].filter(Boolean).length + lostCount;
}

const CONTEXT_LIBRARY = [
  {
    key: "cashPressure",
    words: ["没存款", "存款不多", "现金流", "房租", "生活费", "亏钱", "成本", "没钱", "资金", "负债", "还款", "信用卡", "花呗", "借呗", "贷款", "工资不够"],
    title: "现金压力",
    meaning: "这类问题不能只看机会，还要看现实承受力。卦象如果出现空亡、受克或多动，更要先保底。",
    risk: "最怕用情绪做消费或投资决定，短期想翻盘，反而让现金流更紧。",
    action: "先算清一个月最低支出、必须还的钱、能承受的最坏结果。超过承受线的动作先暂停。",
    metric: "复盘时看：支出有没有下降、收入有没有增加、债务有没有继续扩大。",
  },
  {
    key: "newAccount",
    words: ["新号", "小红书", "抖音", "视频号", "公众号", "没粉丝", "没人买", "没有成交", "没流量", "没人看", "互动", "评论", "私信", "涨粉", "播放量"],
    title: "账号与表达",
    meaning: "账号类问题重点不是一开始就爆，而是内容有没有稳定输出、有没有被目标人群理解。",
    risk: "最怕把一次低数据理解成失败，频繁换方向，导致平台和用户都不知道账号在讲什么。",
    action: "先连续发同一方向的3到5条内容，每条只测试一个变量：标题、封面、话题、风格或价格。",
    metric: "复盘时看：浏览、收藏、评论、私信，有没有人问价格或尺码。",
  },
  {
    key: "productTest",
    words: ["副业", "创业", "选品", "测款", "一件代发", "供应链", "1688", "样衣", "定价", "包邮", "退换货", "发货", "摆摊", "开店", "项目"],
    title: "副业 / 创业 / 项目",
    meaning: "项目类问题要看资源是否真实、风险是否可控。即使卦象可试，也适合先做最小版本。",
    risk: "最怕一上来就投入设备、库存、课程、广告费，结果还没验证需求就被成本拖住。",
    action: "先做一个不超过承受范围的小测试：问10个人、发3条内容、卖1单、做1个样品。",
    metric: "复盘时看：有没有真实反馈、有没有人愿意付费、成本和售后是否可控。",
  },
  {
    key: "mentalLoad",
    words: ["焦虑", "崩溃", "撑不住", "摆烂", "精神", "压力", "睡不着", "害怕", "迷茫", "痛苦"],
    title: "身心消耗",
    meaning: "如果你问事时已经处在高压状态，卦象要先当作节奏提醒，而不是逼自己立刻做重大决定。",
    risk: "最怕把焦虑误认为直觉，把短期低谷误认为命运结论。",
    action: "今天只保留一个最小动作，其他决策延后。先吃饭、睡觉、恢复身体，再看卦。",
    metric: "复盘时看：睡眠、饮食、情绪稳定度、是否能完成一个小动作。",
  },
  {
    key: "relationshipBusiness",
    words: ["合作", "商家", "客户", "对方", "朋友", "同事", "领导", "室友", "家人", "沟通", "谈", "关系", "人际", "吵架", "冷战"],
    title: "人际 / 合作 / 沟通",
    meaning: "关系类问题要重点看应爻。应爻稳定，代表外部关系可沟通；应爻空、冲、克，则说明对方态度或环境不稳。",
    risk: "最怕只凭自己的猜测行动，或者把一时情绪当成对方真实态度。",
    action: "先用低冲突方式确认事实：对方到底说了什么、做了什么、有没有明确承诺。",
    metric: "复盘时看：沟通后关系是否更清楚，边界是否更明确，误会是否减少。",
  },
  {
    key: "decision",
    words: ["要不要", "该不该", "适不适合", "能不能", "是否", "继续", "放弃", "换方向", "选择"],
    title: "选择与去留",
    meaning: "选择题不要只看吉凶，要看是否可逆。卦象如果提示可小试，意思不是押上全部，而是先做可撤回的验证。",
    risk: "最怕把卦当成最终命令，而不是把它当成帮助你拆问题的工具。",
    action: "把选择拆成A/B两个小测试，各做一个最低成本版本，再比较真实反馈。",
    metric: "复盘时看：哪个选择带来更低成本、更明确反馈、更少焦虑。",
  },
  {
    key: "timeShort",
    words: ["今天", "明天", "3天", "三天", "7天", "一周", "短期"],
    title: "短期判断",
    meaning: "短期卦主要看当下能不能动、动到什么程度，不适合推导长期成败。",
    risk: "最怕用三天的结果否定三个月的方向。",
    action: "只设一个短期验证目标，比如发一篇、问一个人、测一个价格。",
    metric: "复盘时看短期反馈，不看最终成败。",
  },
  {
    key: "longTerm",
    words: ["长期", "未来", "三个月", "半年", "一年", "品牌", "人生", "方向"],
    title: "长期方向",
    meaning: "长期问题更要看趋势和结构，不要期待一卦给出全部答案。适合用来确定节奏，而不是替代规划。",
    risk: "最怕目标太大，导致第一步无法开始。",
    action: "把长期目标拆成最近7天、30天、90天三个层级。",
    metric: "复盘时看：这周有没有动作，30天有没有数据，90天有没有稳定模型。",
  },
  {
    key: "careerJob",
    words: ["工作", "上班", "跳槽", "辞职", "裸辞", "面试", "offer", "领导", "同事", "转行", "升职", "加薪", "简历"],
    title: "工作 / 跳槽 / 职业选择",
    meaning: "工作类问题不要只看想不想走，还要看手上有没有筹码、下家是否明确、现金流能不能撑住。",
    risk: "最怕在情绪最重的时候做不可逆决定，比如没准备就裸辞，或者为了逃离当前环境随便接一个更差的机会。",
    action: "先做三件事：更新简历、投递或沟通3个机会、算清离职后能撑几个月。",
    metric: "复盘时看：有没有面试反馈、薪资是否更好、压力是否下降、风险是否可控。",
  },
  {
    key: "love",
    words: ["喜欢", "暧昧", "恋爱", "分手", "复合", "前任", "对象", "男朋友", "女朋友", "婚姻", "结婚", "脱单", "桃花"],
    title: "感情 / 暧昧 / 复合",
    meaning: "感情类问题要看双方是否有真实互动，不要只看想象里的可能性。应爻和世应关系很重要。",
    risk: "最怕把对方偶尔的回应理解成承诺，或者在低自尊状态下反复消耗自己。",
    action: "先观察对方是否持续投入：主动联系、明确表达、实际行动，而不是只看聊天情绪。",
    metric: "复盘时看：关系是否更清楚，自己是否更稳定，对方是否有实际行动。",
  },
  {
    key: "studyExam",
    words: ["考试", "考研", "考公", "考证", "学习", "成绩", "学校", "论文", "毕业", "上岸", "复习"],
    title: "学习 / 考试 / 上岸",
    meaning: "考试类问题重点不是单纯问能不能过，而是看复习节奏、执行力和短板是否能补上。",
    risk: "最怕用占卜替代复习，或者因为焦虑频繁换计划。",
    action: "先确定最近7天的复习清单：每天学什么、做多少题、错题怎么复盘。",
    metric: "复盘时看：完成率、错题减少、模拟分数变化、睡眠是否稳定。",
  },
  {
    key: "housing",
    words: ["租房", "搬家", "房东", "合租", "室友", "房租", "押金", "通勤", "小区", "公寓"],
    title: "租房 / 搬家 / 居住",
    meaning: "居住类问题重点看现实条件：钱、通勤、安全、合同、室友、宠物和生活便利。",
    risk: "最怕只看便宜或照片好看，忽略押金、水电、噪音、霉味、通勤和退租规则。",
    action: "看房时拍视频，问清水电、管理费、押金、合同、是否可养宠、退租规则。",
    metric: "复盘时看：总费用是否可控，通勤是否能接受，居住风险是否排除。",
  },
  {
    key: "healthBody",
    words: ["身体", "生病", "不舒服", "医院", "体检", "失眠", "焦虑", "抑郁", "头痛", "胃痛", "心慌"],
    title: "身体 / 健康 / 睡眠",
    meaning: "健康类问题必须优先看现实身体信号。卦象只能做提醒，不能替代医生。",
    risk: "最怕把明显身体问题拖成玄学问题，或者用占卜替代检查和治疗。",
    action: "如果症状明显或持续，先去医院/咨询专业人士；同时记录睡眠、饮食、症状时间。",
    metric: "复盘时看：症状是否减轻，睡眠是否恢复，是否完成检查或咨询。",
  },
  {
    key: "family",
    words: ["父母", "妈妈", "爸爸", "家里", "家庭", "亲戚", "催婚", "催工作", "回家", "原生家庭", "吵架", "不理解"],
    title: "家庭 / 父母 / 原生家庭",
    meaning: "家庭类问题常常不是单纯谁对谁错，而是边界、期待和沟通方式的问题。卦中世应关系可以看自己和家庭压力之间的状态。",
    risk: "最怕为了证明自己或逃避冲突，做出过激决定；也怕长期压抑自己，表面顺从、内心消耗。",
    action: "先把问题拆成事实和情绪：对方具体要求是什么，你能接受到哪里，哪些边界必须说清。",
    metric: "复盘时看：沟通后压力是否降低，边界是否更清楚，自己是否少一点内耗。",
  },
  {
    key: "cityChoice",
    words: ["城市", "深圳", "广州", "上海", "北京", "杭州", "回老家", "留在", "去外地", "发展", "机会", "通勤"],
    title: "城市 / 去留 / 发展地点",
    meaning: "城市选择要同时看机会、成本、人脉和身心承受力。不是大城市一定好，也不是回老家一定退步。",
    risk: "最怕只看机会不看生活成本，或者只看便宜忽略长期发展。",
    action: "列出三个数字：月最低生活费、可获得收入、三个月内能建立的资源。数字不清楚前不要冲动搬迁。",
    metric: "复盘时看：成本是否下降，机会是否增加，状态是否稳定，通勤是否可承受。",
  },
  {
    key: "burnout",
    words: ["不想上班", "厌班", "倦怠", "内耗", "提不起劲", "没动力", "想躺平", "摆烂", "疲惫", "麻木"],
    title: "职业倦怠 / 内耗",
    meaning: "倦怠类问题先看能量，不要一上来就问人生方向。有时候不是方向错了，而是人已经透支。",
    risk: "最怕在极度疲惫时做重大决定，或者用更大的目标继续压迫自己。",
    action: "先做三天恢复实验：固定睡眠、减少信息摄入、只完成一个必要任务，再判断要不要换方向。",
    metric: "复盘时看：睡眠、食欲、情绪、行动力有没有恢复一点。",
  },
  {
    key: "shopping",
    words: ["买不买", "要不要买", "购物", "手机", "电脑", "相机", "车", "二手", "消费", "冲动消费", "分期"],
    title: "购物 / 大额消费",
    meaning: "消费类问题要看这个东西是生产力工具、生活刚需，还是情绪补偿。卦象可以提醒是否适合马上下手。",
    risk: "最怕用购物缓解焦虑，买完短暂开心，现金流继续变差。",
    action: "先延迟24小时，写下购买理由、替代方案、是否会带来收入或明确效率提升。",
    metric: "复盘时看：买了是否真的使用，没买是否影响核心目标，现金压力是否变大。",
  },
  {
    key: "investment",
    words: ["股票", "基金", "币", "比特币", "投资", "理财", "涨跌", "梭哈", "回本", "亏损", "合约", "杠杆"],
    title: "投资 / 理财 / 高风险决策",
    meaning: "投资类问题必须把风险放在第一位。卦象只能做情绪提醒，不能替代专业金融判断。",
    risk: "最怕想靠一次判断翻身，特别是借钱、杠杆、合约、重仓单一资产。",
    action: "先设止损线和仓位上限。不了解的东西不碰，亏损后不靠加仓证明自己。",
    metric: "复盘时看：是否遵守仓位纪律，是否避免情绪交易，亏损是否在承受范围内。",
  },
  {
    key: "interview",
    words: ["面试", "offer", "入职", "试用期", "HR", "薪资", "谈薪", "简历", "背调", "岗位"],
    title: "面试 / Offer / 入职",
    meaning: "求职类问题要看对方是否稳定、岗位是否真实、薪资是否能兑现，也要看自己准备是否充分。",
    risk: "最怕只看薪资忽略公司稳定性，或因为焦虑接受明显不合适的岗位。",
    action: "问清岗位职责、试用期、薪资结构、社保、公积金、加班、直属领导和团队情况。",
    metric: "复盘时看：面试反馈是否明确，薪资是否书面确认，岗位是否符合长期方向。",
  },
  {
    key: "friendship",
    words: ["朋友", "闺蜜", "兄弟", "社交", "孤独", "被冷落", "不回消息", "拉黑", "聚会", "圈子"],
    title: "朋友 / 社交 / 圈子",
    meaning: "社交类问题常常不是单点事件，而是关系能量是否平衡。要看双方投入是否对等。",
    risk: "最怕用反复猜测代替沟通，也怕为了不孤独而维持消耗型关系。",
    action: "先观察对方是否持续回应、是否尊重边界。必要时直接表达一次，不要无限内耗。",
    metric: "复盘时看：沟通后关系是否更轻松，自己是否不再反复猜。",
  },
  {
    key: "pet",
    words: ["猫", "狗", "宠物", "猫粮", "猫砂", "宠物医院", "生病", "绝育", "搬家带猫", "养猫", "养狗"],
    title: "宠物 / 陪伴动物",
    meaning: "宠物类问题要先看现实照顾条件：钱、时间、空间、医疗、搬家是否允许。",
    risk: "最怕只凭情绪决定，忽略长期照顾成本和突发医疗支出。",
    action: "先确认预算、居住环境、医院距离、应急费用，以及家人/房东是否接受。",
    metric: "复盘时看：宠物状态是否稳定，你的照顾压力是否可承受。",
  },
  {
    key: "contractLegal",
    words: ["合同", "协议", "签约", "赔偿", "违约", "押金", "仲裁", "劳动合同", "租房合同", "法律", "纠纷", "投诉"],
    title: "合同 / 法律 / 纠纷",
    meaning: "合同纠纷类问题不能只看卦，要回到证据和条款。父母爻、官鬼爻常与文书规则相关。",
    risk: "最怕没有证据就口头争，或签字前没看清关键条款。",
    action: "保存聊天记录、付款记录、合同、发票。重要事项咨询专业律师或相关平台客服。",
    metric: "复盘时看：证据是否完整，诉求是否明确，是否找到正规处理渠道。",
  },
  {
    key: "travel",
    words: ["旅行", "出行", "机票", "高铁", "酒店", "旅游", "签证", "护照", "行程", "安全", "天气"],
    title: "旅行 / 出行 / 行程",
    meaning: "出行类问题重点看安全、预算、天气、交通和可撤回性。卦象提示不稳时更要留备选方案。",
    risk: "最怕预算不足、临时变动、证件遗漏、天气和交通风险。",
    action: "确认票务、住宿、证件、天气、备用路线和紧急联系人。",
    metric: "复盘时看：行程是否可控，预算是否超支，是否有备用方案。",
  },
  {
    key: "aiInternet",
    words: ["AI", "人工智能", "剪辑", "设计", "接单", "自由职业", "远程", "外包", "课程", "知识付费", "互联网"],
    title: "AI / 互联网 / 自由职业",
    meaning: "互联网副业类问题要看交付能力和获客能力，不是会工具就一定能赚钱。",
    risk: "最怕沉迷学工具、买课程，却没有作品、报价和客户渠道。",
    action: "先做一个可展示案例，明确服务内容、价格、交付时间，再去找10个潜在客户。",
    metric: "复盘时看：是否有人询价，是否有人愿意付费，交付是否顺利。",
  },
  {
    key: "discipline",
    words: ["自律", "拖延", "坚持", "计划", "习惯", "早睡", "减肥", "运动", "学习计划", "执行力"],
    title: "自律 / 习惯 / 执行力",
    meaning: "执行力问题通常不是意志力不够，而是目标太大、反馈太远、环境阻力太多。",
    risk: "最怕制定完美计划，然后因为一天没做到就全盘放弃。",
    action: "把目标缩到小到不能失败：每天10分钟、1个动作、连续3天。",
    metric: "复盘时看：有没有连续完成，而不是完成得漂不漂亮。",
  },
  {
    key: "appearance",
    words: ["变美", "颜值", "穿搭", "发型", "护肤", "医美", "减肥", "身材", "拍照", "形象"],
    title: "形象 / 变美 / 穿搭",
    meaning: "形象类问题要区分自我提升和焦虑消费。适度调整有帮助，但不要把价值感完全交给外貌。",
    risk: "最怕被焦虑营销带走，花很多钱却没有解决真正的不安。",
    action: "先做低成本改善：发型、基础穿搭、睡眠、运动、拍照姿态，再考虑大额项目。",
    metric: "复盘时看：自信是否提升，花费是否可控，是否形成稳定习惯。",
  },
  {
    key: "contentCreation",
    words: ["写作", "拍视频", "直播", "剪视频", "内容", "选题", "爆款", "文案", "封面", "账号定位"],
    title: "内容创作 / 自媒体",
    meaning: "内容问题要看持续输出和用户反馈。一次爆不爆不是核心，能否形成稳定主题才关键。",
    risk: "最怕每天研究爆款，却迟迟不发布；或者一条数据差就否定整个方向。",
    action: "先做7天内容实验：每天一个选题，同一主题，不同标题和封面。",
    metric: "复盘时看：哪类标题点击高，哪类内容收藏高，哪类评论更具体。",
  },
  {
    key: "marriageCommitment",
    words: ["结婚", "婚姻", "领证", "订婚", "婚礼", "彩礼", "婚房", "见父母", "婆媳", "岳父母", "孩子", "适合结婚", "合适结婚"],
    title: "结婚 / 长期承诺",
    meaning: "结婚类问题不是“试一试”的问题，它更像长期共同生活的现实评估。卦象只能提醒关系节奏、阻力和风险点，不能替代双方认真沟通。",
    risk: "最怕只凭一时情绪、催促、年龄压力或家人意见就定下来，忽略钱、家庭边界、居住、孩子、职业规划和冲突处理方式。",
    action: "先和对方认真谈清楚五件事：钱如何安排、父母边界、住哪里、要不要孩子、吵架时怎么解决。谈不清楚时不急着领证。",
    metric: "复盘时看：沟通后关系是否更清楚，对方是否愿意承担责任，现实阻力是否有解决方案，而不是只看甜不甜。",
  },
  {
    key: "importantDecision",
    words: ["重大决定", "人生", "结婚", "离婚", "买房", "卖房", "借钱", "合伙", "辞职", "创业", "移民"],
    title: "重大决策",
    meaning: "重大决策不能只看卦象，要看证据、法律、财务、身体和后路。卦象最多提醒节奏和风险点。",
    risk: "最怕把卦当成唯一答案，忽略现实代价。",
    action: "做决策前至少准备三个方案：继续、暂停、最小试错。每个方案写出最坏结果。",
    metric: "复盘时看：是否保留后路，是否有专业意见，是否能承担最坏结果。",
  },
];

function matchedContextItems(context) {
  const fields = [
    { key: "goal", text: context.goal, weight: 4 },
    { key: "fear", text: context.fear, weight: 3 },
    { key: "situation", text: context.situation, weight: 2 },
    { key: "timeframe", text: context.timeframe, weight: 1 },
  ];
  return CONTEXT_LIBRARY
    .map((item) => {
      const score = fields.reduce((sum, field) => {
        if (!field.text) return sum;
        const hits = item.words.filter((word) => field.text.includes(word)).length;
        return sum + hits * field.weight;
      }, 0);
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((entry) => entry.item);
}

function topicSpecificGuidance(topic, context, verdict, scenario) {
  if (scenario?.key === "marriage") {
    return {
      title: "结婚/长期关系口径",
      content: "这类问题不能按“可逆测试”处理。重点不是今天甜不甜，而是双方是否愿意长期承担责任，钱、父母边界、居住、孩子、职业规划和冲突处理是否能谈清楚。",
      verdictText: verdict.level.includes("认真评估")
        ? "当前可以进入认真评估和沟通阶段，但不要跳过现实确认。"
        : verdict.level.includes("观察")
          ? "当前更适合先观察与沟通，不急着领证或定婚期。"
          : "当前不适合急着定终身，先把现实矛盾和双方态度看清楚。",
    };
  }
  if (scenario?.highCommitment) {
    return {
      title: `${scenario.label}口径`,
      content: "这属于高代价问题，卦象只能提醒节奏和风险点，不能替代现实证据、专业意见和你自己的承受能力。",
      verdictText: verdict.level.includes("推进") || verdict.level.includes("评估")
        ? "可以继续了解，但必须设置边界和后路。"
        : "当前更适合补信息、降风险，不建议凭一卦直接定结果。",
    };
  }
  const base = {
    career: {
      title: "事业/项目口径",
      content: "看项目不要只问“能不能成”，而要问“下一步该不该推进”。如果结论是可小试，就适合做内容、问供应商、测价格；如果是先缓一缓，就先补流程和现金流。",
    },
    wealth: {
      title: "钱财/成交口径",
      content: "问钱财时，重点不是流量多不多，而是成交是否不亏、售后是否可控、用户是否愿意为你的筛选付费。",
    },
    relationship: {
      title: "关系/合作口径",
      content: "问关系时，别只看对方说什么，要看应爻和现实行动。承诺、授权、价格、售后都要留下文字证据。",
    },
    health: {
      title: "身心状态口径",
      content: "问身心时，卦象优先用于提醒节奏。如果你已经很累，最好的行动可能不是推进，而是先恢复基本能量。",
    },
    decision: {
      title: "选择题口径",
      content: "选择题最适合用“可逆测试”处理。不要让卦替你承担最终决定，而是用卦帮你判断先试哪一步。",
    },
    general: {
      title: "综合判断口径",
      content: "综合问题要先缩小范围。问题越具体，断卦越能落到行动上。",
    },
  }[topic];
  return {
    ...base,
    verdictText: verdict.level.includes("推进")
      ? "当前更偏向可以推进，但要控制投入。"
      : verdict.level.includes("小试")
        ? "当前更适合小范围试，不适合直接放大。"
        : "当前更适合补信息、降风险，再看下一步。",
  };
}

function buildContextInsightHtml(topic, context, verdict, scenario) {
  const matched = matchedContextItems(context);
  const topicGuide = topicSpecificGuidance(topic, context, verdict, scenario);
  const hasContext = contextCompleteness(context) > 0;
  if (!hasContext) {
    return `
      <div class="reading-block">
        <strong>补充信息建议</strong>
        <p>如果你想让解读更准，建议补充三件事：你现在的处境、你最担心什么、你想在什么时间范围内判断什么结果。</p>
      </div>
    `;
  }

  return `
    <div class="reading-block">
      <strong>结合补充信息的重点</strong>
      <p><b>${topicGuide.title}</b>：${topicGuide.content} ${topicGuide.verdictText}</p>
      ${
        matched.length
          ? `<ul>${matched.map((item) => `<li><b>${item.title}</b>：${item.meaning}</li>`).join("")}</ul>`
          : `<p>你补充的信息还比较宽泛，目前只能按问题类型做判断。可以继续写得更具体，比如价格、成本、时间、对方反馈。</p>`
      }
    </div>
    <div class="reading-block">
      <strong>可能的坑</strong>
      <ul>
        ${
          matched.length
            ? matched.map((item) => `<li>${item.risk}</li>`).join("")
            : `<li>信息不够具体时，最容易把卦象读成泛泛的“好/不好”，这会降低参考价值。</li>`
        }
      </ul>
    </div>
    <div class="reading-block">
      <strong>更具体的验证动作</strong>
      <ol>
        ${
          matched.length
            ? matched.map((item) => `<li>${item.action}</li>`).join("")
            : `<li>先补充可量化信息：成本、时间、目标、现有反馈、你能承受的最坏结果。</li>`
        }
      </ol>
    </div>
    <div class="reading-block">
      <strong>复盘标准</strong>
      <ul>
        ${
          matched.length
            ? matched.map((item) => `<li>${item.metric}</li>`).join("")
            : `<li>到你设定的时间范围结束时，记录真实反馈，而不是只记录情绪感受。</li>`
        }
      </ul>
    </div>
  `;
}

const TRIGRAM_DIRECTIONS = {
  7: "西北",
  0: "西南",
  1: "正东",
  6: "东南",
  2: "正北",
  5: "正南",
  4: "东北",
  3: "正西",
};

const SPIRIT_LOST_HINTS = {
  青龙: ["衣物、装饰物附近", "干净明亮的位置", "包、礼盒、漂亮物件旁"],
  朱雀: ["桌面、书本、文件、电脑旁", "说话/办公/学习的位置", "手机、充电器、纸张附近"],
  勾陈: ["角落、地面、杂物堆", "柜子、箱子、旧物旁", "被压住或被收起来的位置"],
  腾蛇: ["袋子、线材、缠绕物附近", "夹层、缝隙、复杂隐蔽处", "容易看漏的位置"],
  白虎: ["金属物、工具、车、硬物旁", "门口、钥匙、刀具、运动用品附近", "容易磕碰的位置"],
  玄武: ["暗处、床下、卫生间、水边", "黑色包、抽屉深处", "被遮挡、不显眼的位置"],
};

const ELEMENT_LOST_HINTS = {
  木: ["木柜、书架、衣架、植物旁", "纸箱、书本、木质家具附近"],
  火: ["电器、灯、厨房、热源附近", "电脑、充电器、插座、亮处"],
  土: ["地面、墙角、箱子、杂物堆", "柜子底部、收纳盒、包裹旁"],
  金: ["抽屉、金属物、钥匙、工具、车内", "白色/金属色物品附近"],
  水: ["卫生间、洗手台、水杯、冰箱旁", "潮湿处、黑暗处、低处"],
};

function lostMaterialHints(material) {
  if (!material || material === "不确定") return [];
  if (material.includes("金属")) return ["按物品材质，优先找钥匙盘、抽屉、包侧袋、车内、金属物附近。"];
  if (material.includes("证件")) return ["按物品类型，优先找文件袋、桌面、书本夹层、包内夹层、复印/办事地点。"];
  if (material.includes("电子")) return ["按物品类型，优先找充电处、床边、桌面、沙发缝、包里、外套口袋。"];
  if (material.includes("衣物")) return ["按物品类型，优先找衣柜、洗衣篮、床边、包里、换衣服的位置。"];
  if (material.includes("钱财")) return ["按物品类型，优先找钱包、卡包、裤袋、外套口袋、付款地点、包夹层。"];
  if (material.includes("宠物")) return ["如果是宠物，先查门口、楼道、阳台、床下、柜底、安静暗处，并及时询问邻居和物业。"];
  return [];
}

function buildLostItemReading({ main, najia, najiaSummary, changeRelations, userContext }) {
  const lost = userContext.lost || {};
  const caiRows = najia.rows.filter((r) => r.relation === "妻财");
  const primary = caiRows.find((r) => r.marks.includes("动")) || caiRows.find((r) => r.marks.includes("世")) || caiRows[0];
  if (!primary) return "";

  let score = 2;
  if (primary.empty) score -= 1;
  if (primary.monthEffects.includes("月克") || primary.dayEffects.includes("日克")) score -= 1;
  if (primary.monthEffects.includes("月冲") || primary.dayEffects.includes("日冲")) score -= 1;
  if (primary.monthEffects.includes("月生") || primary.dayEffects.includes("日生") || primary.monthEffects.includes("临月") || primary.dayEffects.includes("临日")) score += 1;
  if (primary.marks.includes("世")) score += 1;
  if (primary.marks.includes("应")) score -= 0.5;
  const probability = score >= 3 ? "较高" : score >= 1.5 ? "中等" : "偏低，需要扩大搜索或问人";

  const distance = primary.marks.includes("世")
    ? "更像还在自己身边、家里、包里、衣物口袋或自己常活动的位置"
    : primary.marks.includes("应")
      ? "更像在外部环境、别人手边、公共区域或最后接触地点附近"
      : primary.empty
        ? "暂时看不见，可能被遮挡、夹住、收纳起来，或要等一等才显现"
        : "不算特别远，先从最后出现地点向外扩散寻找";

  const direction = TRIGRAM_DIRECTIONS[primary.index < 3 ? main.lower : main.upper] || "不明";
  const spiritHints = SPIRIT_LOST_HINTS[primary.spirit] || [];
  const elementHints = ELEMENT_LOST_HINTS[primary.element] || [];
  const materialHints = lostMaterialHints(lost.material);
  const change = changeRelations.find((item) => item.index === primary.index);
  const changeHint = change
    ? `财爻发动，物品有被移动的象。动变为「${change.relation}」，${change.relation === "回头克" ? "后续找回阻力增加，建议尽快查最后接触点。" : change.relation === "回头生" ? "后续有转机，可以沿着线索继续找。" : "说明位置或状态发生变化。"}`
    : "财爻不动，更像东西没有走远，先找固定位置、收纳处和最后出现地点。";

  const sceneHint = lost.scene && lost.scene !== "不确定" ? `你填写的场景是「${lost.scene}」，先不要跳出这个范围太远。` : "你没有明确场景，建议先从最后一次见到的地点开始。";
  const touchedHint = lost.touched && lost.touched.includes("别人")
    ? "你提到可能有人接触过，建议询问同住人、同事、店员、司机或最近接触的人。"
    : "暂时先按自己遗落或收纳忘记处理。";

  const searchSteps = [
    lost.lastSeen ? `第一轮：回到「${lost.lastSeen}」附近，按顺时针找桌面、地面、柜边、包里、口袋。` : "第一轮：回到最后出现地点，先找桌面、地面、包里、口袋和角落。",
    `第二轮：看${direction}方向，尤其是${[...spiritHints, ...elementHints].slice(0, 3).join("、")}。`,
    materialHints[0] || "第三轮：按物品类型找同类物附近，比如证件找文件，电子产品找充电处，钥匙找门口和包。",
    touchedHint,
  ];

  return `
    <div class="reading-block lost-reading">
      <strong>失物线索</strong>
      <p>你要找的是：<b>${lost.item || "未填写物品"}</b>。找回倾向：<b>${probability}</b>。</p>
      <p><b>远近判断：</b>${distance}。${sceneHint}</p>
      <p><b>方向提示：</b>${direction}方向可重点看，但不要机械理解成只找一个方向，它更像提醒你优先排查的区域。</p>
      <p><b>环境提示：</b>${[...spiritHints, ...elementHints, ...materialHints].slice(0, 6).join("；") || "先从最后出现地点和常用收纳处找起。"}。</p>
      <p><b>动变提示：</b>${changeHint}</p>
      <p><b>建议寻找顺序：</b></p>
      <ol>${searchSteps.map((s) => `<li>${s}</li>`).join("")}</ol>
    </div>
  `;
}

function getMovingLines(values) {
  return values
    .map((value, index) => ({ value, index }))
    .filter((line) => line.value === 6 || line.value === 9);
}

function detectScenario(topic, question, context = {}) {
  const text = [
    topic,
    question,
    context.situation,
    context.fear,
    context.goal,
    context.timeframe,
  ].filter(Boolean).join(" ");
  const hasAny = (words) => words.some((word) => text.includes(word));

  if (topic === "lost" || hasAny(["丢了", "不见了", "找不到", "失物", "遗失"])) {
    return { key: "lost", label: "找失物", highCommitment: false };
  }
  if (hasAny(["结婚", "婚姻", "领证", "订婚", "婚礼", "彩礼", "婚房", "见父母", "适合结婚", "合适结婚"])) {
    return { key: "marriage", label: "结婚/长期关系", highCommitment: true };
  }
  if (hasAny(["离婚", "分手", "复合", "出轨", "冷战", "前任"])) {
    return { key: "relationshipBreak", label: "感情重大选择", highCommitment: true };
  }
  if (hasAny(["买房", "卖房", "房贷", "首付", "贷款买房", "签购房"])) {
    return { key: "house", label: "房产/贷款", highCommitment: true };
  }
  if (hasAny(["辞职", "裸辞", "跳槽", "转行", "入职", "offer", "签劳动合同"])) {
    return { key: "job", label: "职业去留", highCommitment: true };
  }
  if (hasAny(["投资", "股票", "基金", "比特币", "币圈", "杠杆", "合约", "借钱", "贷款", "负债", "信用卡"])) {
    return { key: "investment", label: "钱财风险", highCommitment: true };
  }
  if (hasAny(["手术", "治疗", "医院", "体检", "怀孕", "生病", "抑郁", "自杀", "轻生"])) {
    return { key: "medical", label: "健康/医疗", highCommitment: true, caution: "健康问题请优先咨询医生或专业机构。" };
  }
  if (hasAny(["合同", "协议", "签约", "起诉", "仲裁", "律师", "赔偿", "违约", "纠纷"])) {
    return { key: "legal", label: "合同/法律", highCommitment: true, caution: "合同法律问题请保留证据并咨询专业人士。" };
  }
  if (hasAny(["出远门", "出行", "旅行", "旅游", "改期", "机票", "高铁", "酒店", "陌生城市", "安全吗"])) {
    return { key: "travel", label: "出行/安全", highCommitment: false };
  }
  if (hasAny(["考研", "考公", "考试", "证书", "上岸", "复习", "学习", "成绩", "毕业"])) {
    return { key: "study", label: "学习/考试", highCommitment: false };
  }
  if (hasAny(["分期", "相机", "手机", "电脑", "买一台", "会不会后悔", "消费"])) {
    return { key: "shopping", label: "消费/现金流", highCommitment: false };
  }
  if (hasAny(["医美", "整形", "美容项目", "注射", "手术项目"])) {
    return { key: "beautyMedical", label: "医美/消费健康", highCommitment: true, caution: "医美同时涉及健康和消费，请优先确认资质、风险、恢复期和真实必要性。" };
  }
  if (hasAny(["回老家", "城市", "去外地", "留下", "留在", "发展", "通勤"])) {
    return { key: "city", label: "城市/去留", highCommitment: true };
  }
  if (hasAny(["网站", "工具", "付费功能", "会员", "重做交互", "用户看不懂", "功能", "产品", "商业化", "转化"])) {
    return { key: "product", label: "产品/商业化", highCommitment: false };
  }
  return { key: "normal", label: "普通问题", highCommitment: false };
}

function adaptVerdictForScenario(base, scenario, adjusted) {
  if (scenario?.key === "marriage") {
    if (adjusted >= 3) return { level: "可以认真评估", tone: "关系有继续深入的空间，但结婚要看长期责任，不建议只凭感觉或一时冲动定下来。" };
    if (adjusted >= 1) return { level: "先观察与沟通", tone: "不是说不合适，而是还需要把现实问题谈清楚：钱、家庭边界、居住、孩子、职业规划和冲突处理。" };
    if (adjusted >= -1) return { level: "暂缓定论", tone: "当前信息或关系稳定度还不够，不适合急着领证、订婚或给出终身承诺。" };
    return { level: "不宜急着定", tone: "卦象提示阻力或消耗偏高，先看清现实矛盾与双方责任感，再决定是否继续推进。" };
  }

  if (scenario?.key === "lost") {
    if (adjusted >= 3) return { level: "找回希望较高", tone: "优先从最后出现地点、常用收纳处和身边范围开始找。" };
    if (adjusted >= 1) return { level: "可以继续找", tone: "线索还没断，先按方向、环境和物品类型逐步排查。" };
    if (adjusted >= -1) return { level: "需要扩大范围", tone: "可能被遮挡、移动或暂时不显，建议问人并回看最后接触点。" };
    return { level: "找回阻力偏大", tone: "先保留证据、询问相关人员，必要时联系场所、物业或平台客服。" };
  }

  if (scenario?.key === "travel") {
    if (adjusted >= 3) return { level: "可以出行", tone: "但要提前确认交通、天气、证件、住宿和备用方案。" };
    if (adjusted >= 1) return { level: "谨慎出行", tone: "不是不能去，而是要先排除安全、路线和临时变动风险。" };
    if (adjusted >= -1) return { level: "先查清再定", tone: "当前信息不足，建议先确认行程必要性、交通和应急方案。" };
    return { level: "考虑改期", tone: "卦象提示阻力偏高，若不是必须出行，优先保安全与稳定。" };
  }

  if (scenario?.key === "study") {
    if (adjusted >= 3) return { level: "可以冲刺", tone: "重点不是只看能不能上岸，而是把复习计划、错题反馈和执行节奏落下来。" };
    if (adjusted >= 1) return { level: "稳步准备", tone: "有推进空间，但需要用具体学习量和阶段反馈验证。" };
    if (adjusted >= -1) return { level: "先补短板", tone: "当前不适合只问结果，先找出薄弱科目和每天可执行的复习量。" };
    return { level: "先稳节奏", tone: "消耗或阻力偏高，先恢复作息、重排计划，再谈冲刺。" };
  }

  if (scenario?.key === "shopping") {
    if (adjusted >= 3) return { level: "可以考虑", tone: "但先确认它是真需求或生产力工具，而不是情绪消费。" };
    if (adjusted >= 1) return { level: "延迟确认", tone: "建议至少等24小时，算清分期、现金流和替代方案。" };
    if (adjusted >= -1) return { level: "先别急买", tone: "当前更适合保现金流，先确认买完是否影响生活费、房租或还款。" };
    return { level: "不宜冲动消费", tone: "卦象提示消耗偏高，容易买完短暂开心、后续压力变大。" };
  }

  if (scenario?.key === "product") {
    if (adjusted >= 3) return { level: "可以做小版本", tone: "先验证一个明确目标：理解率、留存、转化或付费意愿，不要一次大改。" };
    if (adjusted >= 1) return { level: "先小改测试", tone: "方向有可试空间，但要先找出用户到底卡在哪一步。" };
    if (adjusted >= -1) return { level: "先访谈再改", tone: "当前信息还不够，建议先收集真实用户反馈，再决定功能优先级。" };
    return { level: "暂缓大改", tone: "不要用大改版掩盖问题不清，先收敛目标和用户路径。" };
  }

  if (scenario?.highCommitment) {
    const caution = scenario.caution ? ` ${scenario.caution}` : "";
    if (adjusted >= 3) return { level: "可以继续评估", tone: `但这是${scenario.label}问题，不能只凭卦象拍板，要同时看现实证据、成本、后路和专业意见。${caution}` };
    if (adjusted >= 1) return { level: "谨慎推进", tone: `有继续了解的空间，但不要一次性做不可撤回决定；先补齐信息、确认风险边界。${caution}` };
    if (adjusted >= -1) return { level: "先补信息", tone: `当前不适合直接定结果，先把关键证据、成本、责任和最坏情况写清楚。${caution}` };
    return { level: "暂缓重大决定", tone: `当前风险或消耗偏高，不建议立刻做高代价动作。${caution}` };
  }

  return base;
}

function scenarioPlainAdvice(scenario) {
  const map = {
    marriage: "看婚姻不要只看感情浓度，要看长期责任、现实条件和冲突处理。",
    relationshipBreak: "感情重大选择先看对方行动和你的稳定感，不要只看一时回应。",
    house: "房产问题先看现金流、贷款压力、合同和最坏情况。",
    job: "职业去留先看后路、现金流、下家确定性和身心承受力。",
    investment: "钱财风险先看本金安全、杠杆、退出机制和你能不能承受亏损。",
    medical: "健康问题优先现实检查，卦象只能提醒节奏，不能替代医生。",
    legal: "合同法律问题优先证据、条款和专业意见，卦象不能替代法律判断。",
    travel: "出行问题先看安全、天气、证件、交通和备用方案。",
    study: "考试问题不只看结果，更看复习节奏、错题反馈和时间分配。",
    shopping: "消费问题先分清刚需、生产力工具和情绪补偿。",
    beautyMedical: "医美问题同时看健康风险和消费压力，资质与恢复期优先。",
    city: "城市去留要同时看机会、成本、通勤、人脉和身心状态。",
    product: "产品问题先看用户卡点和最小验证，不要一上来大改。",
    lost: "找失物先看最后出现地点，再按方位、环境、材质和是否被人接触过排查。",
    normal: "问题越具体，断卦越能落到行动上。",
  };
  return map[scenario?.key] || map.normal;
}

function followupQuestions(scenario, topic, oralIntent) {
  if (oralIntent?.followups?.length) return oralIntent.followups;
  const map = {
    marriage: ["你们在一起多久了？", "当前最大矛盾是钱、父母、居住、孩子，还是信任？", "你想看三个月内推进，还是长期婚姻质量？"],
    relationshipBreak: ["你们现在是否还联系？", "对方有没有持续行动，而不是偶尔回应？", "你最想判断复合、放下，还是主动联系？"],
    house: ["首付后还剩几个月生活费？", "贷款月供占收入多少？", "合同、产权、地段和退出方案是否确认？"],
    job: ["你是否已有下家或现金缓冲？", "辞职是为了机会，还是为了逃离消耗？", "最坏几个月没收入能否承受？"],
    investment: ["投入金额占你存款多少？", "是否借钱或加杠杆？", "亏到多少你会停止？"],
    medical: ["症状持续多久了？", "是否已经做过检查或咨询医生？", "有没有胸痛、呼吸困难、严重失眠等需要立即处理的信号？"],
    legal: ["有没有合同、聊天记录、付款记录？", "你的诉求是退款、赔偿、解约还是维权？", "是否咨询过律师或平台客服？"],
    travel: ["出行目的是否必须？", "天气、证件、交通、住宿是否确认？", "有没有备用路线和紧急联系人？"],
    study: ["离考试还有多久？", "当前完成率和薄弱科目是什么？", "每天能稳定学习几小时？"],
    shopping: ["这是刚需、生产力工具，还是情绪消费？", "买完是否影响房租/生活费/还款？", "能否延迟24小时再决定？"],
    beautyMedical: ["机构和医生资质是否确认？", "恢复期和风险你是否能接受？", "这笔钱是否会影响现金流？"],
    city: ["新城市/老家的收入机会是什么？", "生活成本和通勤成本是多少？", "三个月后不适合能否撤回？"],
    product: ["用户具体在哪一步看不懂？", "你要验证的是留存、转化、付费，还是理解成本？", "能否先改一个最小版本测试？"],
    lost: ["最后一次看到在哪里？", "期间谁可能接触过？", "是否需要先挂失、报警或联系场所？"],
    normal: ["这件事的时间范围是多久？", "你最担心的结果是什么？", "你现在已经掌握哪些现实信息？"],
  };
  return map[scenario?.key] || map[topic] || map.normal;
}

function buildFollowupHtml(scenario, context, oralIntent) {
  const enough = contextCompleteness(context) >= 3;
  const questions = followupQuestions(scenario, undefined, oralIntent);
  return `
    <div class="reading-block followup-block">
      <strong>想让结果更准，可以补充这些</strong>
      <p>${enough ? "你已经补充了一些背景，下面这些问题可用于继续精细化判断。" : "你目前只写了主问题，系统可以先断大方向；如果要更贴题，建议补充下面几项。"}</p>
      <ul>${questions.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function buildGlossaryHtml() {
  const items = [
    ["世爻", PLAIN_GLOSSARY.世爻],
    ["应爻", PLAIN_GLOSSARY.应爻],
    ["用神", "这次问题最该看的核心点，不同问题用神不同。"],
    ["动爻", "正在变化的位置，代表事情哪里开始动、哪里容易出变量。"],
    ["空亡", PLAIN_GLOSSARY.空亡],
    ["月建", PLAIN_GLOSSARY.月建],
    ["日辰", PLAIN_GLOSSARY.日辰],
    ["回头生", "变化后反过来帮助原来的用神，通常代表后续有补力。"],
    ["回头克", "变化后反过来压制原来的用神，通常代表后续有压力。"],
  ];
  return `
    <details class="reading-block glossary-block">
      <summary>看不懂术语？点这里看注释</summary>
      <ul>${items.map(([k, v]) => `<li><b>${k}</b>：${v}</li>`).join("")}</ul>
    </details>
  `;
}

function verdictFromScore(score, movingCount, topic, analysis, scenario) {
  let adjusted = score;
  if (movingCount >= 4) adjusted -= 1;
  if (analysis.matchedKeys.includes("emotion")) adjusted -= 1;
  if (analysis.matchedKeys.includes("money") && score < 1) adjusted -= 1;

  let base;
  if (adjusted >= 3) base = { level: "可推进", tone: "但仍建议小步验证，不要一次性加码。" };
  else if (adjusted >= 1) base = { level: "可小试", tone: "适合做低成本、可撤回的小动作。" };
  else if (adjusted >= -1) base = { level: "先试探", tone: "信息还不够，先确认条件，不急着定生死。" };
  else base = { level: "先缓一缓", tone: "当前风险或消耗偏高，先稳住基本盘。" };

  return adaptVerdictForScenario(base, scenario, adjusted);
}

function actionList(topic, analysis, verdict, context = {}, scenario) {
  const list = [];
  if (scenario?.key === "marriage") {
    list.push("先别问“能不能结”，先问“能不能一起承担长期生活”：钱、家人边界、住哪里、孩子、职业规划是否谈得下去。");
    list.push("安排一次认真沟通，不要只聊感情浓度，要聊具体责任：谁出钱、谁照顾家庭、遇到冲突怎么解决。");
    list.push("如果对方回避现实问题、只催你表态，先暂缓；愿意一起解决问题，才进入下一步评估。");
    if (context.fear) list.push(`把你最担心的点「${context.fear}」直接转成沟通问题，不要只在心里反复猜。`);
    list.push("复盘标准：沟通后你是更安心、更清楚，还是更混乱、更委屈。后者不适合急着定。");
    return list;
  }
  if (scenario?.highCommitment) {
    list.push(`这是${scenario.label}问题，先列出最坏结果、可承受范围和撤回方案。`);
    list.push("把关键证据写下来：钱、合同、对方承诺、时间节点、责任边界，不要只凭感觉判断。");
    if (scenario.caution) list.push(scenario.caution);
  }
  if (scenario?.key === "travel") {
    list.push("先确认四件事：天气、交通、证件、住宿；任何一项不确定，都准备备用方案。");
    list.push("如果不是必须出行，遇到身体不适、天气异常或路线不稳，可以优先改期。");
  }
  if (scenario?.key === "study") {
    list.push("把目标拆成复习清单：每天学什么、做多少题、错题怎么复盘。");
    list.push("不要只问能不能上岸，先用7天完成率判断计划是否真实可执行。");
  }
  if (scenario?.key === "shopping") {
    list.push("先延迟24小时，再写下购买理由、替代方案、分期总成本和是否影响现金流。");
    list.push("如果它不能提升收入、效率或真实生活质量，就先不要用消费缓解焦虑。");
  }
  if (scenario?.key === "product") {
    list.push("先问3个真实用户：哪一步看不懂、哪里想退出、他们最想要什么结果。");
    list.push("只改一个最小版本，用理解率、停留时间、转化或付费意愿来复盘。");
  }
  if (analysis.matchedKeys.includes("business")) {
    list.push("把目标缩小成一个动作：发一篇、问一个供应商、测一个价格，不要同时做完整品牌。");
  }
  if (analysis.matchedKeys.includes("sell")) {
    list.push("如果涉及成交，先确认成本、运费、退换货，再报价；不要为了第一单大幅亏损。");
  }
  if (analysis.matchedKeys.includes("money")) {
    list.push("先写出最低生活费和可承受亏损线，超过这条线的动作全部暂停。");
  }
  if (analysis.matchedKeys.includes("emotion") || topic === "health") {
    list.push("如果状态已经很差，今天不要做重大决定，只做能恢复掌控感的小事。");
  }
  if (analysis.matchedKeys.includes("relationship")) {
    list.push("先看对方有没有实际行动，不要只根据口头承诺推进。");
  }
  if (analysis.matchedKeys.includes("move")) {
    list.push("先算时间、路费、住宿、回撤成本，能当天撤回的方案优先。");
  }
  if (list.length === 0) {
    list.push(verdict.level === "可推进" ? "可以推进，但先定一个最小版本。" : "先补信息，再做决定。");
  }
  if (context.goal && !scenario?.highCommitment) {
    list.push(`围绕你最想判断的结果「${context.goal}」，先拆成一个可执行测试，不要直接跳到最终结论。`);
  }
  if (context.goal && scenario?.highCommitment) {
    list.push(`围绕你想判断的结果「${context.goal}」，先确认现实条件是否支持，而不是直接跳到最终答案。`);
  }
  if (context.fear) {
    list.push(`把你最担心的点「${context.fear}」写成检查清单，先排除最容易出事的一项。`);
  }
  list.push(scenario?.highCommitment ? "给这件事设一个复盘时间：3天或7天后再看现实信息有没有变清楚，不要靠反复起卦替代沟通和证据。" : "给这件事设一个复盘时间：24小时或3天后再看结果，不要反复无限想。");
  return list;
}

function generateReading({ topic, question, main, changed, values, najia, changedNajia, changeRelations, emptyBranches, userContext = {} }) {
  const firstAnalysis = analyzeQuestion(question, topic);
  const effectiveTopic = topic === "general" && firstAnalysis.oralIntent?.topic
    ? firstAnalysis.oralIntent.topic
    : topic;
  const topicInfo = TOPIC_TEXT[effectiveTopic] || TOPIC_TEXT[topic];
  const moving = movingSummary(values);
  const analysis = effectiveTopic === topic ? firstAnalysis : analyzeQuestion(question, effectiveTopic);
  const movingLines = getMovingLines(values);
  const mainAction = HEX_ACTIONS[main.name] || { score: 0, plain: HEX_HINTS[main.name] || "局面中性，重在结合现实条件。" };
  const changedAction = HEX_ACTIONS[changed.name] || { score: 0, plain: HEX_HINTS[changed.name] || "后续趋势还需要观察。" };
  const upper = TRIGRAMS[main.upper];
  const lower = TRIGRAMS[main.lower];
  const score = mainAction.score + Math.round(changedAction.score * 0.6);
  const scenario = detectScenario(effectiveTopic, question, userContext);
  const verdict = verdictFromScore(score, movingLines.length, effectiveTopic, analysis, scenario);
  const actions = actionList(effectiveTopic, analysis, verdict, userContext, scenario);
  const najiaSummary = summarizeNajia(najia, effectiveTopic, analysis);
  const changeText = changeRelations.length
    ? changeRelations.map((item) => `第${item.index + 1}爻${item.relation}：${item.from.relation}${item.from.branch}${item.from.element} → ${item.to.relation}${item.to.branch}${item.to.element}`).join("；")
    : "无动爻，本卦不变，重点看当前状态是否稳定。";

  const movingDetails = movingLines.length
    ? movingLines.map((line) => LINE_POSITION_HINTS[line.index]).join(" ")
    : "没有动爻，说明这件事短期更像稳定观察局，不适合频繁改策略。";

  const questionText = analysis.hasQuestion
    ? `你问的是：「${analysis.original}」。${analysis.oralIntent ? `我先把这句口语理解为：${analysis.oralIntent.normalized}` : `我先把它理解为：${analysis.intent}。`}`
    : `你没有填写具体问题，所以只能按「${topicInfo.name}」做粗读。想让解读更贴合，最好写成“我想做X，担心Y，接下来Z天该不该行动？”`;
  const contextCount = contextCompleteness(userContext);
  const contextText = contextCount
    ? `你补充的背景是：${userContext.situation || "未写处境"}；你担心：${userContext.fear || "未写担心"}；你想判断：${userContext.goal || "未写目标"}；时间范围：${userContext.timeframe || "7天内"}。`
    : "你还没有补充具体背景，所以这次解读只能按问题文字和卦象来判断。";
  const useRowsText = (najiaSummary.focusRows || []).length
    ? najiaSummary.focusRows.map((r) => `第${r.index + 1}爻 ${r.spirit}${r.relation}${r.branch}${r.element}${r.empty ? "（空亡）" : ""}`).join("；")
    : "本卦中用神不明显，后续应结合伏神/飞神进一步看。";
  const simpleUseMeaning = PLAIN_GLOSSARY[najiaSummary.focus] || "这是本次问题最重要的观察点。";
  const shi = najia.rows.find((r) => r.marks.includes("世"));
  const ying = najia.rows.find((r) => r.marks.includes("应"));
  const userSide = shi ? `你这边是第${shi.index + 1}爻，${shi.relation}${shi.branch}${shi.element}${shi.empty ? "，而且落空，说明你现在的状态还不够实、容易没底" : ""}` : "世爻未明";
  const outsideSide = ying ? `外部/对方是第${ying.index + 1}爻，${ying.relation}${ying.branch}${ying.element}${ying.empty ? "，落空，说明外部反馈暂时不稳定" : ""}` : "应爻未明";
  const riskText = [
    movingLines.length >= 4 ? "动爻多，变量多，说明这件事不适合一下子定死。" : "",
    (najiaSummary.focusRows || []).some((r) => r.empty) ? "用神落空，说明你问的结果暂时还不实，可能要等条件出现。" : "",
    (najiaSummary.focusRows || []).some((r) => r.monthEffects.includes("月克") || r.dayEffects.includes("日克")) ? "用神受克，现实阻力偏强，不能只靠意愿推进。" : "",
    (najiaSummary.focusRows || []).some((r) => r.monthEffects.includes("月生") || r.dayEffects.includes("日生") || r.monthEffects.includes("临月") || r.dayEffects.includes("临日")) ? "用神得生扶，说明并非完全没机会，关键是方式要轻。" : "",
  ].filter(Boolean);
  const scenarioNotice = scenario.highCommitment
    ? `<div class="reading-block scenario-notice">
        <strong>${scenario.label}要多看一层</strong>
        <p>${scenarioPlainAdvice(scenario)} 这一卦更适合看当前节奏和风险，不适合替你直接定结果。真正落到现实里，还要看沟通、证据、条件和后路是否站得住。</p>
      </div>`
    : "";
  const contextInsightHtml = buildContextInsightHtml(effectiveTopic, userContext, verdict, scenario);
  const oralIntentHtml = analysis.oralIntent
    ? `<div class="reading-block oral-intent-block">
        <strong>我先按这个意思来断</strong>
        <p>${analysis.oralIntent.focus}</p>
      </div>`
    : "";
  const followupHtml = buildFollowupHtml(scenario, userContext, analysis.oralIntent);
  const glossaryHtml = buildGlossaryHtml();
  const lostHtml = effectiveTopic === "lost"
    ? buildLostItemReading({ main, najia, najiaSummary, changeRelations, userContext })
    : "";
  const plainFrameText = effectiveTopic === "lost"
    ? "找失物时，重点不是问玄不玄，而是把卦象转成寻找路线。"
    : scenario.highCommitment
      ? "这次不是让你马上做终身或高代价决定，而是提醒你先看清责任、证据、风险和后路。"
      : scenario.key === "product"
        ? "这次不是让你一次性大改，而是提醒你先找出用户卡点，再做最小版本验证。"
        : "这次不是让你马上押注，而是提醒你：先看清当前局面，再用可承受的动作验证。";
  const bothSideText = effectiveTopic === "lost"
    ? "物品更像在自己控制范围内，还是已经进入外部环境。"
    : scenario.highCommitment
      ? "你能不能承担后果，外部条件是否真实支持。"
      : "你有没有承受力，外部有没有真实反馈。";

  return {
    tag: `${topicInfo.name}｜${verdict.level}｜${moving.label}`,
    html: `
      <div class="reading-block">
        <strong>先把问题翻译成人话</strong>
        <p>${questionText}</p>
        <p>${contextText}</p>
      </div>
      ${oralIntentHtml}
      <div class="reading-block">
        <strong>结论先说</strong>
        <p>这卦给出的倾向是：<b>${verdict.level}</b>。${verdict.tone}</p>
        <p>如果只看卦象：本卦「${main.name}」表示当前局面——${mainAction.plain}；变卦「${changed.name}」表示后续变化——${changedAction.plain}</p>
      </div>
      ${scenarioNotice}
      ${followupHtml}
      <div class="reading-block">
        <strong>这卦到底在说什么</strong>
        <p>用普通话讲，本卦看“现在是什么状态”，变卦看“接下来会往哪里变”。${plainFrameText}</p>
        <p>${userSide}；${outsideSide}。所以这件事要同时看两边：${bothSideText}</p>
      </div>
      ${lostHtml}
      <div class="reading-block">
        <strong>为什么这样看</strong>
        <p>上卦为${upper.name}，偏向「${upper.trait}」；下卦为${lower.name}，偏向「${lower.trait}」。${movingDetails}</p>
      </div>
      <div class="reading-block">
        <strong>用神和现实焦点</strong>
        <p>系统按你的问题自动取用神为「${najiaSummary.focus}」。简单说，${simpleUseMeaning}</p>
        <p>对应爻：${useRowsText}。</p>
        <p>${najiaSummary.text}</p>
      </div>
      <div class="reading-block">
        <strong>动变关系</strong>
        <p>${changeText}</p>
        <p>你可以把动爻理解成“事情正在变化的地方”。如果出现回头生，代表后续有补力；如果出现回头克，代表后续会反过来形成压力。</p>
      </div>
      ${glossaryHtml}
      <div class="reading-block">
        <strong>风险点 / 有利点</strong>
        ${
          riskText.length
            ? `<ul>${riskText.map((item) => `<li>${item}</li>`).join("")}</ul>`
            : `<p>没有看到特别极端的空亡、冲克或多动信号。这不代表一定顺利，只代表卦面没有强烈提示“立刻停手”。</p>`
        }
      </div>
      ${contextInsightHtml}
      <div class="reading-block">
        <strong>对应这个问题，建议这样做</strong>
        <ol>
          ${actions.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      </div>
      <div class="reading-block">
        <strong>${userContext.timeframe || "7天内"}的判断口径</strong>
        <p>${scenario.highCommitment ? "这次适合看当前关系/局势的风险和节奏，不适合直接替你决定终身或高代价结果。到时间后重点复盘：现实问题是否更清楚、对方是否承担责任、风险是否下降、你是否更稳定。" : "这次更适合看短期趋势，不适合直接推导长期命运。你可以按上面的建议做一次可承受的验证，到时间后用真实反馈复盘：结果有没有更清楚、成本有没有失控、你的状态有没有更稳。"}</p>
      </div>
    `,
  };
}

function renderNajia(najia, monthBranch, dayStem, dayBranch, emptyBranches, najiaSummary, changeRelations) {
  $("najiaMeta").innerHTML = [
    `<div class="pill">卦宫：<strong>${najia.info.palace}</strong>｜五行 ${najia.info.palaceElement}｜${najia.info.kind}</div>`,
    `<div class="pill">世应：<strong>世在第${najia.info.shi}爻</strong>｜应在第${najia.info.ying}爻</div>`,
    `<div class="pill">用神：<strong>${najiaSummary.focus}</strong>｜系统按问题类型自动选择</div>`,
    `<div class="pill">月建：<strong>${monthBranch}</strong>（${BRANCH_ELEMENT[monthBranch]}）｜代表本月大环境</div>`,
    `<div class="pill">日辰：<strong>${dayStem}${dayBranch}</strong>｜代表当天力量，六神从 ${SIX_SPIRITS[SIX_SPIRIT_START[dayStem]]} 起</div>`,
    `<div class="pill">空亡：<strong>${emptyBranches.join("、")}</strong>｜相关爻落空，多主暂时不实、未落地或要等填实</div>`,
  ].join("");

  $("najiaTable").innerHTML = `
    <div class="najia-head">
      <span>爻位</span><span>爻象</span><span>六神</span><span>地支</span><span>六亲</span><span>标记</span><span>动变</span><span>月日关系</span>
    </div>
    ${najia.rows
      .map((row) => {
        const relation = [...row.monthEffects, ...row.dayEffects];
        const change = changeRelations.find((item) => item.index === row.index);
        return `
          <div class="najia-row">
            <strong>第${row.index + 1}爻</strong>
            <span>${row.lineLabel}</span>
            <span>${row.spirit}</span>
            <span>${row.branch}${row.element}</span>
            <span>${row.relation}</span>
            <span>${row.marks.map((m) => `<em class="mark">${m}</em>`).join("") || "—"}</span>
            <span>${change ? `<em class="mark">${change.relation}</em> ${change.to.branch}${change.to.element}` : "—"}</span>
            <span>${relation.map((m) => `<em class="mark">${m}</em>`).join("") || "—"}</span>
          </div>
        `;
      })
      .reverse()
      .join("")}
  `;
}

function renderProJudgement({ najia, najiaSummary, changeRelations, emptyBranches, monthBranch, dayStem, dayBranch }) {
  const shi = najia.rows.find((r) => r.marks.includes("世"));
  const ying = najia.rows.find((r) => r.marks.includes("应"));
  const useRows = najiaSummary.focusRows || [];
  const useText = useRows.length
    ? useRows.map((r) => `第${r.index + 1}爻 ${r.spirit} ${r.relation}${r.branch}${r.element}${r.empty ? "（空）" : ""}`).join("；")
    : "本卦中用神不显，后续应加伏神/飞神规则再判断。";
  const changeText = changeRelations.length
    ? changeRelations.map((c) => `第${c.index + 1}爻动，${c.from.branch}${c.from.element}化${c.to.branch}${c.to.element}，为「${c.relation}」。`).join("")
    : "无动爻，局面短期偏静，重点看本卦与月日。";

  $("proJudgement").innerHTML = [
    `<div class="pro-item"><strong>月建 / 日辰是什么意思：</strong>月建是这段时间的大环境，日辰是起卦当天的力量。当前按 ${dayStem}${dayBranch} 日、${monthBranch} 月排盘。普通用户不用手动改，除非你有更准确的万年历结果。</div>`,
    `<div class="pro-item"><strong>自动用神：</strong>${najiaSummary.focus}。对应爻：${useText}</div>`,
    `<div class="pro-item"><strong>世应：</strong>世爻代表自己/我方：第${shi?.index + 1}爻 ${shi?.branch}${shi?.element}；应爻代表对方/市场/外界：第${ying?.index + 1}爻 ${ying?.branch}${ying?.element}。</div>`,
    `<div class="pro-item"><strong>空亡：</strong>${emptyBranches.join("、")}为空。爻落空亡，不等于一定失败，更像“暂时不实、没落地、要等条件填实”。</div>`,
    `<div class="pro-item"><strong>动变：</strong>${changeText}</div>`,
  ].join("");
}

function renderReadingFromCurrentCast(options = {}) {
  if (!currentCast) return;
  const withReading = $("withReading").checked;
  $("readingPanel").classList.toggle("hidden", !withReading);
  if (!withReading) return;
  const reading = generateReading({
    topic: currentCast.topic,
    question: currentCast.question,
    main: currentCast.main,
    changed: currentCast.changed,
    values: currentCast.values,
    najia: currentCast.najia,
    changedNajia: currentCast.changedNajia,
    changeRelations: currentCast.changeRelations,
    emptyBranches: currentCast.emptyBranches,
    userContext: readUserContext(),
  });
  $("readingTag").textContent = reading.tag;
  $("readingText").innerHTML = reading.html;
  if (options.showNotice) {
    $("readingNotice").classList.remove("hidden");
    $("readingPanel").scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      $("readingNotice").classList.add("hidden");
    }, 3500);
  } else {
    $("readingNotice").classList.add("hidden");
  }
}

function updateTopicUI() {
  const isLost = $("topic").value === "lost";
  $("lostFields").classList.toggle("hidden", !isLost);
  if (isLost && !$("question").value.trim()) {
    $("question").placeholder = "例如：我的钥匙不见了，想知道大概在哪里、还能不能找回？";
  } else if (!isLost) {
    $("question").placeholder = "例如：我最近很纠结要不要换方向，担心选错，想看接下来一个月该不该行动。";
  }
}

function cast() {
  const mode = $("mode").value;
  const topic = $("topic").value;
  const question = $("question").value.trim();
  const castDate = $("castDateTime").value ? new Date($("castDateTime").value) : new Date();
  if (!$("castDateTime").value) {
    $("castDateTime").value = toDateTimeLocalValue(castDate);
    syncDateFieldsFromDate(castDate);
  }
  const monthBranch = $("monthBranch").value;
  const dayStem = $("dayStem").value;
  const dayBranch = $("dayBranch").value;
  const dayInfo = sexagenaryDay(castDate);
  const empty = xunkong(dayInfo.index);
  const emptyBranches = empty.empty;
  const raw = [];

  for (let i = 0; i < 6; i += 1) {
    raw.push(mode === "coin" ? castCoinLine() : castBalancedLine());
  }

  const values = raw.map((line) => line.value);
  const mainLines = values.map(lineToYang);
  const changedLines = values.map(changedLineToYang);
  const main = hexagramName(mainLines);
  const changed = hexagramName(changedLines);
  const changedValues = values.map((value) => (value === 6 ? 7 : value === 9 ? 8 : value));
  const najia = buildNajia(main, mainLines, values, dayStem, monthBranch, dayBranch, emptyBranches);
  const changedNajia = buildNajia(changed, changedLines, changedValues, dayStem, monthBranch, dayBranch, emptyBranches);
  const analysis = analyzeQuestion(question, topic);
  const najiaSummary = summarizeNajia(najia, topic, analysis);
  const changeRelations = buildChangeRelations(najia, changedNajia);
  const moving = values
    .map((value, index) => ({ value, index }))
    .filter((line) => line.value === 6 || line.value === 9)
    .map((line) => `第${line.index + 1}爻`);

  $("result").classList.remove("hidden");
  $("mainName").textContent = main.name;
  $("changedName").textContent = changed.name;
  renderHexagram($("mainHex"), mainLines, values);
  renderHexagram($("changedHex"), changedLines, []);

  currentCast = {
    topic,
    question,
    main,
    changed,
    values,
    najia,
    changedNajia,
    changeRelations,
    emptyBranches,
  };
  renderReadingFromCurrentCast();
  renderNajia(najia, monthBranch, dayStem, dayBranch, emptyBranches, najiaSummary, changeRelations);
  renderProJudgement({ najia, najiaSummary, changeRelations, emptyBranches, monthBranch, dayStem, dayBranch });

  const now = new Date();
  $("meta").innerHTML = [
    `<div class="pill">时间：<strong>${now.toLocaleString("zh-CN", { hour12: false })}</strong></div>`,
    `<div class="pill">问题：<strong>${question || "未填写"}</strong></div>`,
    `<div class="pill">类型：<strong>${TOPIC_TEXT[topic].name}</strong></div>`,
    `<div class="pill">干支：<strong>${dayStem}${dayBranch}</strong>｜旬空 ${emptyBranches.join("、")}</div>`,
    `<div class="pill">本卦：<strong>${main.name}</strong>｜上卦 ${main.upperText}，下卦 ${main.lowerText}</div>`,
    `<div class="pill">变卦：<strong>${changed.name}</strong>｜变爻 ${moving.length ? moving.join("、") : "无"}</div>`,
  ].join("");

  $("lines").innerHTML = values
    .map((value, index) => {
      const coinText = raw[index].coins ? `铜钱：${raw[index].coins.join(" + ")} = ${value}` : "均衡随机";
      return `
        <div class="line-row">
          <strong>第${index + 1}爻</strong>
          <span>${LINE_LABEL[value]}</span>
          <span>${coinText}</span>
        </div>
      `;
    })
    .reverse()
    .join("");

  $("probabilityText").textContent =
    mode === "coin"
      ? "当前为传统三枚铜钱法：每一枚铜钱正反概率各 1/2，因此老阴 1/8、少阳 3/8、少阴 3/8、老阳 1/8；阴阳总体各 1/2，所以本卦 64 卦概率均衡。"
      : "当前为四象均衡法：老阴、少阳、少阴、老阳每种爻象各 1/4。它更符合“四种结果概率持平”，但不是传统铜钱法概率。";
}

$("castBtn").addEventListener("click", cast);
$("clearBtn").addEventListener("click", () => {
  $("question").value = "";
  $("contextSituation").value = "";
  $("contextFear").value = "";
  $("contextGoal").value = "";
  currentCast = null;
  $("result").classList.add("hidden");
});

function init() {
  populateSelect("monthBranch", BRANCHES, "月");
  populateSelect("dayStem", STEMS, "");
  populateSelect("dayBranch", BRANCHES, "日");
  const now = new Date();
  $("castDateTime").value = toDateTimeLocalValue(now);
  syncDateFieldsFromDate(now);
  $("castDateTime").addEventListener("change", () => {
    if ($("castDateTime").value) syncDateFieldsFromDate(new Date($("castDateTime").value));
  });
  $("topic").addEventListener("change", updateTopicUI);
  $("reinterpretBtn").addEventListener("click", () => renderReadingFromCurrentCast({ showNotice: true }));
  document.querySelectorAll(".example-chip").forEach((button) => {
    button.addEventListener("click", () => {
      $("topic").value = button.dataset.topic || "general";
      $("question").value = button.dataset.question || "";
      updateTopicUI();
      $("question").focus();
    });
  });
  updateTopicUI();
}

init();
