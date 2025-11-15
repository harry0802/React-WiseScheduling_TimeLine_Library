// 靜態笑話資料庫
export const STATIC_JOKES = [
  {
    id: 1,
    setup: "瞎子最喜歡遇到什麼人？",
    punchline: "流氓，因為他們喜歡說「給他們一點顏色瞧瞧」",
    type: "joke"
  },
  {
    id: 2,
    setup: "如何把飲料變大？",
    punchline: "唸大悲咒",
    type: "joke"
  },
  {
    id: 3,
    setup: "有一天Y跟X走在路上，突然看到U哭得很傷心，Y就走過去問U說：",
    punchline: "uniqlo",
    type: "joke"
  },
  {
    id: 4,
    setup: "泰國神明的坐騎是什麼？",
    punchline: "傑克，因為太（泰）神奇了傑克",
    type: "joke"
  },
  {
    id: 5,
    setup: "青春痘長在那裡最不用擔心？",
    punchline: "別人的臉上",
    type: "joke"
  },
  {
    id: 6,
    setup: "警察對出車禍的機車騎士說：「請問你叫什麼名字，我通知你家裡的人。」",
    punchline: "騎士忍著痛說：「不用了……我的家人……知道我的名字。」警察：「…………」",
    type: "joke"
  },
  {
    id: 7,
    setup: "什麼水果最膽小？",
    punchline: "木瓜，因為怕怕呀(papaya)～",
    type: "joke"
  },
  {
    id: 8,
    setup: "佛陀開的店是什麼？",
    punchline: "photoshop",
    type: "joke"
  },
  {
    id: 9,
    setup: "披薩為什麼是最誠實的食物？",
    punchline: "因為他只有四片、六片、八片，沒有七片（欺騙）喔！",
    type: "joke"
  },
  {
    id: 10,
    setup: "牛牽到北京會變成什麼品牌？",
    punchline: "New Balance，牛被冷死",
    type: "joke"
  },
  {
    id: 11,
    setup: "氧氣和二氧化碳誰比較美？",
    punchline: "氧氣，因為氧氣會助燃，助燃（自然）就是美",
    type: "joke"
  },
  {
    id: 12,
    setup: "有五隻魚，突然有五隻飛鏢射過去，請問有幾隻魚沒事？",
    punchline: "三隻。因為三隻魚閃鏢（三隻雨傘標）",
    type: "joke"
  },
  {
    id: 13,
    setup: "肚子餓打什麼針？",
    punchline: "田馥甄（填腹針）",
    type: "joke"
  },
  {
    id: 14,
    setup: "李白怎麼死的？",
    punchline: "失血（詩寫）過多",
    type: "joke"
  },
  {
    id: 15,
    setup: "武士怎麼死的？",
    punchline: "餓死，因為5*4=20",
    type: "joke"
  },
  {
    id: 16,
    setup: "卓別林死後會變成什麼？",
    punchline: "草莓，因為死卓別林(strawberry)",
    type: "joke"
  },
  {
    id: 17,
    setup: "什麼昆蟲最有遠見？",
    punchline: "螞蟻，因為他們總為蟻后（以後）著想。",
    type: "joke"
  },
  {
    id: 18,
    setup: "為什麼饒舌歌手都買不到葡萄？",
    punchline: "因為他們都跟老闆說，我要一串葡萄yo～我要一串葡萄yo～",
    type: "joke"
  },
  {
    id: 19,
    setup: "地瓜是哪國人？",
    punchline: "韓國人，因為他是韓籍（台語）",
    type: "joke"
  },
  {
    id: 20,
    setup: "什麼動物最容易醉？",
    punchline: "猴子，因為茫起（monkey）",
    type: "joke"
  },
  {
    id: 21,
    setup: "周武王被砍掉舌頭後會變什麼？",
    punchline: "羅志祥（亞洲舞王／啞周武王）",
    type: "joke"
  },
  {
    id: 22,
    setup: "為什麼科學園區裡面常常跌倒？",
    punchline: "因為那裡很多半導體",
    type: "joke"
  },
  {
    id: 23,
    setup: "為什麼螃蟹明明沒有感冒卻一直咳嗽？",
    punchline: "因為牠是甲殼(假咳)類動物",
    type: "joke"
  },
  {
    id: 24,
    setup: "有次去聽演唱會，原唱一直唱錯，我就糾正原唱，然後鄭元暢（正原唱）就來了。",
    punchline: "鄭元暢就來了",
    type: "joke"
  },
  {
    id: 25,
    setup: "十二生肖哪隻動物不會感冒？",
    punchline: "雞，因為雞掃化痰",
    type: "joke"
  },
  {
    id: 26,
    setup: "為什麼馬克杯跟玻璃杯打招呼，玻璃杯不理他？",
    punchline: "因為玻璃杯沒耳朵",
    type: "joke"
  },
  {
    id: 27,
    setup: "大便跟小便兩個是好朋友，有天大便死了，小便就很難過的說",
    punchline: "我想大便～",
    type: "joke"
  },
  {
    id: 28,
    setup: "有一天小明說：「老師，小安他人身攻擊我」",
    punchline: "老師：「那你可以用當歸反擊啊！」",
    type: "joke"
  }
];

/**
 * 獲取隨機笑話（從靜態資料庫）
 * @returns {Promise<Object>} 笑話物件 { setup, punchline, id, type }
 */
export const fetchRandomJoke = async () => {
  // 從靜態笑話陣列中隨機選取一個
  const randomIndex = Math.floor(Math.random() * STATIC_JOKES.length);

  // 使用 Promise 包裝以保持 API 介面一致性
  return Promise.resolve(STATIC_JOKES[randomIndex]);
};
