import type { TimelineEvent } from '../types';

export type TimelineTheme = {
  id: string;
  name: string;
  description: string;
  events: TimelineEvent[];
};

const aiHistory: TimelineEvent[] = [
  { id: 'ai-1', year: 1950, title: 'チューリングテスト提唱', description: 'アラン・チューリングが「Computing Machinery and Intelligence」を発表し、機械の知能を判定するテストを提案した。', categories: ['AI'] },
  { id: 'ai-2', year: 1956, title: 'ダートマス会議', description: 'ジョン・マッカーシーらが「人工知能」という用語を初めて使用し、AI研究の出発点となった。', categories: ['AI'] },
  { id: 'ai-3', year: 1966, title: 'ELIZA開発', description: 'ジョセフ・ワイゼンバウムがMITで対話プログラムELIZAを開発し、自然言語処理の先駆けとなった。', categories: ['AI'] },
  { id: 'ai-4', year: 1969, title: 'Shakey the Robot', description: 'SRIインターナショナルが世界初の汎用移動ロボットShakeyを開発した。', categories: ['AI'] },
  { id: 'ai-5', year: 1979, title: 'スタンフォードカート', description: 'スタンフォード大学が自律走行車の実験に成功し、コンピュータビジョンの発展に貢献した。', categories: ['AI'] },
  { id: 'ai-6', year: 1997, month: 5, title: 'ディープ・ブルーがカスパロフに勝利', description: 'IBMのチェスコンピュータ「ディープ・ブルー」が世界チャンピオンのガルリ・カスパロフに勝利した。', categories: ['AI'] },
  { id: 'ai-7', year: 2011, month: 2, title: 'Watson がJeopardy!で優勝', description: 'IBMのAIシステムWatsonがクイズ番組Jeopardy!で人間チャンピオンに勝利した。', categories: ['AI'] },
  { id: 'ai-8', year: 2012, title: 'ディープラーニング革命', description: 'AlexNetがImageNetコンペティションで圧勝し、ディープラーニングブームの火付け役となった。', categories: ['AI'] },
  { id: 'ai-9', year: 2016, month: 3, title: 'AlphaGoが李世ドルに勝利', description: 'Google DeepMindのAlphaGoが囲碁の世界トップ棋士・李世ドルに4勝1敗で勝利した。', categories: ['AI'] },
  { id: 'ai-10', year: 2017, title: 'Transformer論文発表', description: 'Googleが「Attention Is All You Need」を発表し、Transformerアーキテクチャが自然言語処理を革新した。', categories: ['AI'] },
  { id: 'ai-11', year: 2020, month: 6, title: 'GPT-3公開', description: 'OpenAIが1750億パラメータの大規模言語モデルGPT-3を公開し、生成AIの可能性を示した。', categories: ['AI'] },
  { id: 'ai-12', year: 2022, month: 11, title: 'ChatGPT公開', description: 'OpenAIがChatGPTを一般公開し、2ヶ月で1億ユーザーを獲得。生成AIブームが世界的に拡大した。', categories: ['AI'] },
];

const internetHistory: TimelineEvent[] = [
  { id: 'net-1', year: 1969, month: 10, title: 'ARPANET開始', description: '米国防総省のARPANETが初のノード間通信に成功し、インターネットの原型が誕生した。', categories: ['インターネット'] },
  { id: 'net-2', year: 1971, title: '電子メールの発明', description: 'レイ・トムリンソンがARPANET上で最初の電子メールを送信し、@記号を使ったアドレス形式を考案した。', categories: ['インターネット'] },
  { id: 'net-3', year: 1983, month: 1, title: 'TCP/IPプロトコル採用', description: 'ARPANETがTCP/IPプロトコルに移行し、現在のインターネットの基盤が確立された。', categories: ['インターネット'] },
  { id: 'net-4', year: 1989, month: 3, title: 'World Wide Web提案', description: 'ティム・バーナーズ＝リーがCERNでWorld Wide Webの構想を提案した。', categories: ['インターネット'] },
  { id: 'net-5', year: 1991, month: 8, title: 'WWW一般公開', description: 'ティム・バーナーズ＝リーがWorld Wide Webを一般に公開し、ウェブ時代が幕を開けた。', categories: ['インターネット'] },
  { id: 'net-6', year: 1993, title: 'Mosaicブラウザ公開', description: 'NCSAが画像表示可能なWebブラウザMosaicを公開し、WWWの普及を加速させた。', categories: ['インターネット'] },
  { id: 'net-7', year: 1995, title: 'Amazon・eBay設立', description: 'Amazonとe Bayが相次いで設立され、電子商取引の時代が始まった。', categories: ['インターネット'] },
  { id: 'net-8', year: 1998, month: 9, title: 'Google設立', description: 'ラリー・ペイジとセルゲイ・ブリンがGoogleを設立し、検索エンジンの標準となった。', categories: ['インターネット'] },
  { id: 'net-9', year: 2004, month: 2, title: 'Facebook公開', description: 'マーク・ザッカーバーグがFacebookを立ち上げ、ソーシャルネットワーキングの時代を切り開いた。', categories: ['インターネット'] },
  { id: 'net-10', year: 2005, month: 2, title: 'YouTube設立', description: 'チャド・ハーリーらがYouTubeを設立し、動画共有プラットフォームの先駆けとなった。', categories: ['インターネット'] },
  { id: 'net-11', year: 2006, month: 3, title: 'Twitter公開', description: 'ジャック・ドーシーらがTwitterを公開し、マイクロブログの概念を普及させた。', categories: ['インターネット'] },
  { id: 'net-12', year: 2007, month: 1, title: 'iPhone発表', description: 'Appleが初代iPhoneを発表し、モバイルインターネットの新時代を開いた。', categories: ['インターネット'] },
];

const spaceHistory: TimelineEvent[] = [
  { id: 'space-1', year: 1957, month: 10, title: 'スプートニク1号打ち上げ', description: 'ソビエト連邦が世界初の人工衛星スプートニク1号の打ち上げに成功し、宇宙時代が始まった。', categories: ['宇宙開発'] },
  { id: 'space-2', year: 1961, month: 4, title: 'ガガーリン有人宇宙飛行', description: 'ユーリ・ガガーリンがボストーク1号で人類初の有人宇宙飛行を達成した。', categories: ['宇宙開発'] },
  { id: 'space-3', year: 1962, month: 2, title: 'ジョン・グレン地球周回', description: 'ジョン・グレンがアメリカ人として初めて地球周回軌道飛行に成功した。', categories: ['宇宙開発'] },
  { id: 'space-4', year: 1969, month: 7, title: 'アポロ11号月面着陸', description: 'ニール・アームストロングとバズ・オルドリンが人類初の月面着陸を果たした。', categories: ['宇宙開発'] },
  { id: 'space-5', year: 1971, month: 4, title: 'サリュート1号打ち上げ', description: 'ソ連が世界初の宇宙ステーション「サリュート1号」を打ち上げた。', categories: ['宇宙開発'] },
  { id: 'space-6', year: 1981, month: 4, title: 'スペースシャトル初飛行', description: 'NASAのスペースシャトル「コロンビア」が初の軌道飛行に成功した。', categories: ['宇宙開発'] },
  { id: 'space-7', year: 1990, month: 4, title: 'ハッブル宇宙望遠鏡打ち上げ', description: 'NASAがハッブル宇宙望遠鏡を打ち上げ、宇宙観測に革命をもたらした。', categories: ['宇宙開発'] },
  { id: 'space-8', year: 1998, month: 11, title: '国際宇宙ステーション建設開始', description: 'ISSの最初のモジュール「ザーリャ」が打ち上げられ、国際協力による宇宙ステーション建設が始まった。', categories: ['宇宙開発'] },
  { id: 'space-9', year: 2004, month: 1, title: '火星探査車スピリット着陸', description: 'NASAの火星探査車スピリットが火星表面に着陸し、火星の地質調査を開始した。', categories: ['宇宙開発'] },
  { id: 'space-10', year: 2012, month: 8, title: 'キュリオシティ火星着陸', description: 'NASAの探査車キュリオシティが火星のゲールクレーターに着陸した。', categories: ['宇宙開発'] },
  { id: 'space-11', year: 2020, month: 5, title: 'SpaceX有人飛行成功', description: 'SpaceXのクルードラゴンが民間企業として初めてISSへの有人飛行に成功した。', categories: ['宇宙開発'] },
  { id: 'space-12', year: 2021, month: 12, title: 'ジェイムズ・ウェッブ宇宙望遠鏡打ち上げ', description: 'NASAがジェイムズ・ウェッブ宇宙望遠鏡を打ち上げ、宇宙観測の新時代が始まった。', categories: ['宇宙開発'] },
];

const japanPostwarHistory: TimelineEvent[] = [
  { id: 'jp-1', year: 1945, month: 8, title: '終戦', description: '日本がポツダム宣言を受諾し、第二次世界大戦が終結した。', categories: ['日本史'] },
  { id: 'jp-2', year: 1947, month: 5, title: '日本国憲法施行', description: '現行の日本国憲法が施行され、主権在民・平和主義・基本的人権の尊重が定められた。', categories: ['日本史'] },
  { id: 'jp-3', year: 1951, month: 9, title: 'サンフランシスコ講和条約', description: 'サンフランシスコ講和条約が調印され、日本の主権が回復した。', categories: ['日本史'] },
  { id: 'jp-4', year: 1964, month: 10, title: '東京オリンピック開催', description: 'アジア初のオリンピックが東京で開催され、戦後日本の復興を世界に示した。', categories: ['日本史'] },
  { id: 'jp-5', year: 1964, month: 10, title: '東海道新幹線開業', description: '世界初の高速鉄道である東海道新幹線が東京−新大阪間で開業した。', categories: ['日本史'] },
  { id: 'jp-6', year: 1972, month: 5, title: '沖縄返還', description: '沖縄がアメリカから日本に返還され、27年ぶりに日本の施政権下に復帰した。', categories: ['日本史'] },
  { id: 'jp-7', year: 1989, month: 1, title: '平成時代の始まり', description: '昭和天皇が崩御し、元号が平成に改まった。', categories: ['日本史'] },
  { id: 'jp-8', year: 1995, month: 1, title: '阪神・淡路大震災', description: 'マグニチュード7.3の地震が阪神地域を襲い、6,434人が犠牲となった。', categories: ['日本史'] },
  { id: 'jp-9', year: 2011, month: 3, title: '東日本大震災', description: 'マグニチュード9.0の地震と津波が東日本を襲い、福島第一原発事故も発生した。', categories: ['日本史'] },
  { id: 'jp-10', year: 2019, month: 5, title: '令和時代の始まり', description: '天皇の退位と即位により元号が令和に改まった。', categories: ['日本史'] },
  { id: 'jp-11', year: 2021, month: 7, title: '東京オリンピック2020開催', description: 'コロナ禍で1年延期された東京オリンピック2020が無観客で開催された。', categories: ['日本史'] },
];

const worldEconomyHistory: TimelineEvent[] = [
  { id: 'econ-1', year: 1944, month: 7, title: 'ブレトンウッズ協定', description: '連合国44カ国が集まり、IMFと世界銀行の設立、固定為替相場制の導入を決定した。', categories: ['経済'] },
  { id: 'econ-2', year: 1971, month: 8, title: 'ニクソン・ショック', description: 'ニクソン大統領がドルと金の兌換停止を発表し、ブレトンウッズ体制が崩壊した。', categories: ['経済'] },
  { id: 'econ-3', year: 1973, month: 10, title: '第一次オイルショック', description: '第四次中東戦争を契機にOPECが原油価格を大幅に引き上げ、世界経済に深刻な影響を与えた。', categories: ['経済'] },
  { id: 'econ-4', year: 1985, month: 9, title: 'プラザ合意', description: 'G5がドル高是正のために協調介入することで合意し、急激な円高が進んだ。', categories: ['経済'] },
  { id: 'econ-5', year: 1987, month: 10, title: 'ブラックマンデー', description: 'ニューヨーク株式市場でダウ平均が1日で22.6%下落する史上最大の暴落が発生した。', categories: ['経済'] },
  { id: 'econ-6', year: 1991, title: 'バブル経済崩壊', description: '日本のバブル経済が崩壊し、「失われた10年」と呼ばれる長期不況が始まった。', categories: ['経済'] },
  { id: 'econ-7', year: 1997, month: 7, title: 'アジア通貨危機', description: 'タイバーツの暴落を契機にアジア各国で通貨危機が連鎖的に発生した。', categories: ['経済'] },
  { id: 'econ-8', year: 1999, month: 1, title: 'ユーロ導入', description: '欧州連合の単一通貨ユーロが導入され、11カ国で使用が開始された。', categories: ['経済'] },
  { id: 'econ-9', year: 2001, month: 12, title: '中国WTO加盟', description: '中国が世界貿易機関に正式加盟し、世界経済における存在感を急速に高めた。', categories: ['経済'] },
  { id: 'econ-10', year: 2008, month: 9, title: 'リーマン・ショック', description: 'リーマン・ブラザーズが経営破綻し、世界金融危機が発生した。', categories: ['経済'] },
  { id: 'econ-11', year: 2009, month: 1, title: 'ビットコイン誕生', description: 'サトシ・ナカモトがビットコインの最初のブロックを生成し、暗号通貨の時代が始まった。', categories: ['経済'] },
  { id: 'econ-12', year: 2020, month: 3, title: 'コロナ・ショック', description: 'COVID-19パンデミックにより世界の株式市場が暴落し、各国が大規模な経済対策を実施した。', categories: ['経済'] },
];

const programmingLanguageHistory: TimelineEvent[] = [
  { id: 'pl-1', year: 1957, title: 'FORTRAN登場', description: 'IBMのジョン・バッカスらが世界初の高水準プログラミング言語FORTRANを開発した。', categories: ['プログラミング'] },
  { id: 'pl-2', year: 1958, title: 'LISP登場', description: 'ジョン・マッカーシーがLISPを開発し、関数型プログラミングの基礎を築いた。', categories: ['プログラミング'] },
  { id: 'pl-3', year: 1964, title: 'BASIC登場', description: 'ダートマス大学でBASICが開発され、プログラミング教育の普及に貢献した。', categories: ['プログラミング'] },
  { id: 'pl-4', year: 1972, title: 'C言語登場', description: 'デニス・リッチーがベル研究所でC言語を開発し、システムプログラミングの標準となった。', categories: ['プログラミング'] },
  { id: 'pl-5', year: 1983, title: 'C++登場', description: 'ビャーネ・ストロヴストルップがC言語にオブジェクト指向を追加したC++を発表した。', categories: ['プログラミング'] },
  { id: 'pl-6', year: 1991, title: 'Python登場', description: 'グイド・ヴァンロッサムがPythonをリリースし、読みやすさを重視した言語設計で人気を博した。', categories: ['プログラミング'] },
  { id: 'pl-7', year: 1995, month: 5, title: 'Java登場', description: 'サン・マイクロシステムズがJavaを公開し、「Write Once, Run Anywhere」の理念で普及した。', categories: ['プログラミング'] },
  { id: 'pl-8', year: 1995, month: 12, title: 'JavaScript登場', description: 'ブレンダン・アイクがNetscape社でJavaScriptを開発し、Web開発の標準言語となった。', categories: ['プログラミング'] },
  { id: 'pl-9', year: 2000, title: 'C#登場', description: 'MicrosoftがC#を発表し、.NETプラットフォームの中核言語となった。', categories: ['プログラミング'] },
  { id: 'pl-10', year: 2009, title: 'Go言語登場', description: 'GoogleがGo言語を公開し、並行処理とシンプルさを重視した設計で注目を集めた。', categories: ['プログラミング'] },
  { id: 'pl-11', year: 2010, title: 'Rust登場', description: 'Mozillaが安全性と高性能を両立するRust言語を公開した。', categories: ['プログラミング'] },
  { id: 'pl-12', year: 2012, title: 'TypeScript登場', description: 'MicrosoftがJavaScriptに型システムを追加したTypeScriptを公開した。', categories: ['プログラミング'] },
];

const medicalHistory: TimelineEvent[] = [
  { id: 'med-1', year: 1928, title: 'ペニシリン発見', description: 'アレクサンダー・フレミングがペニシリンを発見し、抗生物質時代の幕開けとなった。', categories: ['医学'] },
  { id: 'med-2', year: 1953, month: 4, title: 'DNA二重らせん構造解明', description: 'ワトソンとクリックがDNAの二重らせん構造を発表し、分子生物学の基礎を確立した。', categories: ['医学'] },
  { id: 'med-3', year: 1954, month: 12, title: '世界初の臓器移植', description: 'ジョセフ・マレーが世界初の成功した腎臓移植手術を行った。', categories: ['医学'] },
  { id: 'med-4', year: 1967, month: 12, title: '世界初の心臓移植', description: 'クリスチャン・バーナードが南アフリカで世界初の人間の心臓移植手術に成功した。', categories: ['医学'] },
  { id: 'med-5', year: 1978, month: 7, title: '世界初の体外受精児誕生', description: 'ルイーズ・ブラウンが世界初の体外受精児として誕生した。', categories: ['医学'] },
  { id: 'med-6', year: 1980, month: 5, title: '天然痘根絶宣言', description: 'WHOが天然痘の世界的根絶を宣言し、人類が初めて感染症を撲滅した。', categories: ['医学'] },
  { id: 'med-7', year: 1983, title: 'HIV発見', description: 'リュック・モンタニエらがエイズの原因ウイルスHIVを発見した。', categories: ['医学'] },
  { id: 'med-8', year: 1990, month: 9, title: 'ヒトゲノム計画開始', description: 'ヒトゲノムの全塩基配列を解読する国際プロジェクトが正式に開始された。', categories: ['医学'] },
  { id: 'med-9', year: 2003, month: 4, title: 'ヒトゲノム解読完了', description: 'ヒトゲノム計画が完了し、約30億塩基対の配列が解読された。', categories: ['医学'] },
  { id: 'med-10', year: 2006, title: 'iPS細胞作製', description: '山中伸弥がマウスのiPS細胞の作製に成功し、再生医療に革命をもたらした。', categories: ['医学'] },
  { id: 'med-11', year: 2012, title: 'CRISPR-Cas9発表', description: 'ジェニファー・ダウドナとエマニュエル・シャルパンティエがゲノム編集技術CRISPR-Cas9を発表した。', categories: ['医学'] },
  { id: 'med-12', year: 2020, month: 12, title: 'mRNAワクチン実用化', description: 'ファイザー/BioNTechとモデルナのmRNAワクチンがCOVID-19向けに初めて実用化された。', categories: ['医学'] },
];

const environmentHistory: TimelineEvent[] = [
  { id: 'env-1', year: 1962, title: '「沈黙の春」出版', description: 'レイチェル・カーソンが農薬DDTの危険性を訴える「沈黙の春」を出版し、環境運動の端緒となった。', categories: ['環境'] },
  { id: 'env-2', year: 1970, month: 4, title: '最初のアースデイ', description: '2000万人のアメリカ人が参加した最初のアースデイが開催され、環境保護運動が本格化した。', categories: ['環境'] },
  { id: 'env-3', year: 1972, month: 6, title: '国連人間環境会議', description: 'ストックホルムで初の国際環境会議が開催され、UNEP設立につながった。', categories: ['環境'] },
  { id: 'env-4', year: 1979, title: '第1回世界気候会議', description: 'ジュネーブで第1回世界気候会議が開催され、気候変動の科学的研究の必要性が認識された。', categories: ['環境'] },
  { id: 'env-5', year: 1985, title: 'オゾンホール発見', description: '英国南極観測隊が南極上空のオゾンホールを発見し、世界に衝撃を与えた。', categories: ['環境'] },
  { id: 'env-6', year: 1987, month: 9, title: 'モントリオール議定書', description: 'オゾン層破壊物質の規制に関するモントリオール議定書が採択された。', categories: ['環境'] },
  { id: 'env-7', year: 1992, month: 6, title: '地球サミット', description: 'リオデジャネイロで国連環境開発会議が開催され、気候変動枠組条約などが採択された。', categories: ['環境'] },
  { id: 'env-8', year: 1997, month: 12, title: '京都議定書採択', description: '温室効果ガス削減の数値目標を定めた京都議定書がCOP3で採択された。', categories: ['環境'] },
  { id: 'env-9', year: 2006, title: '「不都合な真実」公開', description: 'アル・ゴアのドキュメンタリー映画「不都合な真実」が公開され、気候変動への意識が高まった。', categories: ['環境'] },
  { id: 'env-10', year: 2011, month: 3, title: '福島第一原発事故', description: '東日本大震災に伴い福島第一原子力発電所で事故が発生し、世界のエネルギー政策に影響を与えた。', categories: ['環境'] },
  { id: 'env-11', year: 2015, month: 12, title: 'パリ協定採択', description: 'COP21でパリ協定が採択され、産業革命前比2℃未満の気温上昇抑制が目標とされた。', categories: ['環境'] },
  { id: 'env-12', year: 2018, title: 'グレタ・トゥーンベリの学校ストライキ', description: 'スウェーデンの少女グレタ・トゥーンベリが気候変動対策を求める学校ストライキを開始し、世界的ムーブメントとなった。', categories: ['環境'] },
];

const nobelHistory: TimelineEvent[] = [
  { id: 'nobel-1', year: 1895, title: 'X線の発見', description: 'ヴィルヘルム・レントゲンがX線を発見し、1901年に第1回ノーベル物理学賞を受賞した。', categories: ['ノーベル賞'] },
  { id: 'nobel-2', year: 1903, title: '放射能の研究', description: 'マリー・キュリーとピエール・キュリーが放射能の研究でノーベル物理学賞を受賞した。', categories: ['ノーベル賞'] },
  { id: 'nobel-3', year: 1905, title: '特殊相対性理論', description: 'アルベルト・アインシュタインが特殊相対性理論を発表。1921年に光電効果の理論でノーベル賞を受賞した。', categories: ['ノーベル賞'] },
  { id: 'nobel-4', year: 1928, title: 'ペニシリン発見', description: 'アレクサンダー・フレミングがペニシリンを発見。1945年にノーベル生理学・医学賞を受賞した。', categories: ['ノーベル賞'] },
  { id: 'nobel-5', year: 1953, title: 'DNA構造解明', description: 'ワトソンとクリックがDNAの二重らせん構造を解明。1962年にノーベル生理学・医学賞を受賞した。', categories: ['ノーベル賞'] },
  { id: 'nobel-6', year: 1964, title: 'ヒッグス機構の提唱', description: 'ピーター・ヒッグスらがヒッグス粒子の存在を予言。2013年にノーベル物理学賞を受賞した。', categories: ['ノーベル賞'] },
  { id: 'nobel-7', year: 1973, title: '江崎玲於奈のトンネル効果', description: '江崎玲於奈がトンネルダイオードの研究でノーベル物理学賞を受賞した。', categories: ['ノーベル賞'] },
  { id: 'nobel-8', year: 2000, title: '白川英樹の導電性ポリマー', description: '白川英樹が導電性高分子の発見と開発でノーベル化学賞を受賞した。', categories: ['ノーベル賞'] },
  { id: 'nobel-9', year: 2008, title: '南部陽一郎の対称性の自発的破れ', description: '南部陽一郎が素粒子物理学における対称性の自発的破れの理論でノーベル物理学賞を受賞した。', categories: ['ノーベル賞'] },
  { id: 'nobel-10', year: 2012, title: '山中伸弥のiPS細胞', description: '山中伸弥が成熟細胞を多能性幹細胞に初期化する技術の発見でノーベル生理学・医学賞を受賞した。', categories: ['ノーベル賞'] },
  { id: 'nobel-11', year: 2015, title: '梶田隆章のニュートリノ振動', description: '梶田隆章がニュートリノ振動の発見でノーベル物理学賞を受賞した。', categories: ['ノーベル賞'] },
  { id: 'nobel-12', year: 2020, title: 'CRISPR-Cas9のゲノム編集', description: 'シャルパンティエとダウドナがCRISPR-Cas9ゲノム編集技術の開発でノーベル化学賞を受賞した。', categories: ['ノーベル賞'] },
];

const quantumComputingHistory: TimelineEvent[] = [
  { id: 'qc-1', year: 1935, title: 'EPRパラドックス', description: 'アインシュタイン、ポドルスキー、ローゼンが量子力学の不完全性を指摘するEPRパラドックスを提唱した。', categories: ['量子コンピューティング'] },
  { id: 'qc-2', year: 1964, title: 'ベルの不等式', description: 'ジョン・ベルがベルの不等式を提唱し、量子もつれの非局所性を理論的に証明した。', categories: ['量子コンピューティング'] },
  { id: 'qc-3', year: 1980, title: '量子コンピュータの概念提唱', description: 'ユーリ・マーニンが量子コンピュータの概念を初めて提唱した。', categories: ['量子コンピューティング'] },
  { id: 'qc-4', year: 1981, title: 'ファインマンの量子シミュレーション提案', description: 'リチャード・ファインマンが物理系のシミュレーションに量子コンピュータの必要性を提唱した。', categories: ['量子コンピューティング'] },
  { id: 'qc-5', year: 1985, title: '量子チューリングマシン', description: 'デイビッド・ドイチュが量子チューリングマシンの概念を提唱し、量子計算理論の基礎を築いた。', categories: ['量子コンピューティング'] },
  { id: 'qc-6', year: 1994, title: 'ショアのアルゴリズム', description: 'ピーター・ショアが素因数分解を効率的に解く量子アルゴリズムを発表し、暗号学に衝撃を与えた。', categories: ['量子コンピューティング'] },
  { id: 'qc-7', year: 1996, title: 'グローバーのアルゴリズム', description: 'ロブ・グローバーが未整理データベースの探索を高速化する量子アルゴリズムを発表した。', categories: ['量子コンピューティング'] },
  { id: 'qc-8', year: 1998, title: '初の量子コンピュータ実現', description: '2量子ビットの量子コンピュータがNMR技術を用いて実現された。', categories: ['量子コンピューティング'] },
  { id: 'qc-9', year: 2001, title: 'ショアのアルゴリズム実行', description: 'IBMが7量子ビットのNMR量子コンピュータで15の素因数分解に成功した。', categories: ['量子コンピューティング'] },
  { id: 'qc-10', year: 2011, title: 'D-Wave One発売', description: 'カナダのD-Wave Systemsが世界初の商用量子コンピュータD-Wave Oneを発売した。', categories: ['量子コンピューティング'] },
  { id: 'qc-11', year: 2019, month: 10, title: '量子超越性の達成', description: 'GoogleのSycamoreプロセッサが53量子ビットで量子超越性を実証したと発表した。', categories: ['量子コンピューティング'] },
  { id: 'qc-12', year: 2023, title: '量子エラー訂正の進歩', description: 'Googleが量子エラー訂正のスケーリングにおける重要な進歩を達成し、実用的な量子コンピュータへの道を示した。', categories: ['量子コンピューティング'] },
];

const aiFutureHistory: TimelineEvent[] = [
  ...aiHistory,
  // 2023年の実際の出来事
  { id: 'aif-2023a', year: 2023, month: 3, title: 'GPT-4リリース', description: 'OpenAIがマルチモーダル対応の大規模言語モデルGPT-4を公開。テキストと画像を入力として処理可能になり、推論能力が大幅に向上した。', categories: ['AI'] },
  { id: 'aif-2023b', year: 2023, month: 7, title: 'Meta Llama 2公開', description: 'Metaが700億パラメータのオープンソースLLM「Llama 2」を無償公開。オープンソースAIの発展を加速させた。', categories: ['AI'] },
  { id: 'aif-2023c', year: 2023, month: 11, title: 'OpenAI経営危機', description: 'OpenAI取締役会がCEOサム・アルトマンを突然解任。従業員のほぼ全員が辞職の意向を示し、5日後にアルトマンが復帰。AI企業ガバナンスの課題が浮き彫りに。', categories: ['AI'] },
  { id: 'aif-2023d', year: 2023, month: 11, title: 'AI安全サミット開催', description: '英国ブレッチリー・パークで世界初のAI安全サミットが開催。28カ国がAIリスクへの国際協力に合意する「ブレッチリー宣言」に署名した。', categories: ['AI', 'AI規制'] },
  { id: 'aif-2023e', year: 2023, month: 12, title: 'Google Gemini発表', description: 'GoogleがGPT-4対抗のマルチモーダルAIモデル「Gemini」をUltra/Pro/Nanoの3サイズで発表。Google DeepMind統合後初の主要モデルとなった。', categories: ['AI'] },
  // 2024年の実際の出来事
  { id: 'aif-2024a', year: 2024, month: 2, title: 'OpenAI Sora発表', description: 'OpenAIがテキストから高品質動画を生成するAIモデル「Sora」のデモ映像を公開。動画生成AIの新時代の到来を示した。', categories: ['AI'] },
  { id: 'aif-2024b', year: 2024, month: 3, title: 'Claude 3ファミリーリリース', description: 'AnthropicがClaude 3をOpus/Sonnet/Haikuの3モデルで公開。最上位Opusは複数のベンチマークでGPT-4を上回った。', categories: ['AI'] },
  { id: 'aif-2024c', year: 2024, month: 5, title: 'GPT-4o（Omni）リリース', description: 'OpenAIがテキスト・画像・音声を統合処理するGPT-4oを公開。音声応答320ミリ秒と人間並みの速度を実現した。', categories: ['AI'] },
  { id: 'aif-2024d', year: 2024, month: 8, title: 'EU AI法発効', description: '世界初の包括的AI規制法であるEU AI法が発効。リスクベースのアプローチでAIの開発と利用を規制する枠組みが確立された。', categories: ['AI', 'AI規制'] },
  { id: 'aif-2024e', year: 2024, month: 9, title: 'OpenAI o1発表', description: 'OpenAIが「推論」に特化した新モデルo1を公開。回答前に「思考」するプロセスにより、数学・科学の複雑な問題で大幅な性能向上を達成した。', categories: ['AI'] },
  { id: 'aif-2024f', year: 2024, month: 10, title: 'AI研究者がノーベル賞受賞', description: 'ジェフリー・ヒントンがニューラルネットワーク研究でノーベル物理学賞を、デミス・ハサビスらがAlphaFold2でノーベル化学賞を受賞。AIの科学的貢献が最高の栄誉で認められた。', categories: ['AI'] },
  // 2025年の実際の出来事
  { id: 'aif-2025a', year: 2025, month: 1, title: 'DeepSeek-R1公開', description: '中国のDeepSeekが開発費600万ドル未満で推論特化オープンソースモデルを公開。OpenAI o1に匹敵する性能を低コストで達成し、AI業界に衝撃を与えた。', categories: ['AI'] },
  { id: 'aif-2025b', year: 2025, month: 2, title: 'パリAIアクションサミット', description: 'フランスとインドの共催で100カ国以上から参加者が集まるAIサミットをパリで開催。AI安全から「AIアクション」へと議論が発展した。', categories: ['AI', 'AI規制'] },
  { id: 'aif-2025c', year: 2025, month: 5, title: 'Claude Opus 4 / Sonnet 4リリース', description: 'Anthropicが次世代モデルを公開。コーディングや高度な推論タスクで大幅な性能向上を達成した。', categories: ['AI'] },
  // 未来予想
  { id: 'aif-f1', year: 2025, title: 'AIエージェントの普及', description: '自律的にタスクを遂行するAIエージェントが実用化され、ソフトウェア開発や業務自動化に広く活用され始めた。', categories: ['AI', '未来予想'] },
  { id: 'aif-f2', year: 2026, title: 'AIエージェント導入率の急増', description: 'Gartnerの予測によると、タスク特化型AIエージェントの企業導入率が5%未満から40%に急増する。', categories: ['AI', '未来予想'] },
  { id: 'aif-f3', year: 2027, title: 'AI科学者の登場', description: 'AIが独自に仮説を立て実験を設計する「AI科学者」が登場し、創薬や材料科学の研究を加速させると予測される（Anthropic、OpenAI）。', categories: ['AI', '未来予想'] },
  { id: 'aif-f4', year: 2029, title: 'AGI（汎用人工知能）の初期形態', description: '特定タスクを超えた汎用的な推論能力を持つAGIの初期形態が実現されると予測される。', categories: ['AI', '未来予想'] },
  { id: 'aif-f5', year: 2030, title: '日本AI・半導体産業基盤強化', description: '日本政府が掲げる10兆円規模のAI・半導体産業基盤強化計画の目標年。「世界で最もAIフレンドリーな国」を目指す。', categories: ['AI', '未来予想'] },
  { id: 'aif-f6', year: 2035, title: 'AIと人間の協働社会', description: 'AIが多くの知的労働を担い、人間とAIが役割分担する新しい社会構造が確立されると予測される。', categories: ['AI', '未来予想'] },
  { id: 'aif-f7', year: 2040, title: 'ASI（超知能）への道', description: '人間の知能を全領域で超える人工超知能（ASI）の実現に向けた研究が本格化すると予測される。', categories: ['AI', '未来予想'] },
  { id: 'aif-f8', year: 2045, title: 'シンギュラリティ', description: 'レイ・カーツワイルが予測した技術的特異点。AIが自己改良を繰り返し、人類の文明が根本的に変容すると予測される。', categories: ['AI', '未来予想'] },
];

const itHistory: TimelineEvent[] = [
  ...aiHistory,
  ...internetHistory,
  ...programmingLanguageHistory,
];

export const defaultTimelines: TimelineTheme[] = [
  {
    id: 'ai-history',
    name: 'AIの歴史',
    description: 'チューリングテストからChatGPTまで、人工知能の発展を辿る年表',
    events: aiHistory,
  },
  {
    id: 'internet-history',
    name: 'インターネットの歴史',
    description: 'ARPANETからソーシャルメディアまで、ネットワーク革命の軌跡',
    events: internetHistory,
  },
  {
    id: 'space-history',
    name: '宇宙開発史',
    description: 'スプートニクから民間宇宙旅行まで、人類の宇宙への挑戦',
    events: spaceHistory,
  },
  {
    id: 'japan-postwar',
    name: '日本の戦後史',
    description: '終戦から令和まで、戦後日本の歩み',
    events: japanPostwarHistory,
  },
  {
    id: 'world-economy',
    name: '世界経済史',
    description: 'ブレトンウッズ体制からコロナ・ショックまで、世界経済の転換点',
    events: worldEconomyHistory,
  },
  {
    id: 'programming-languages',
    name: 'プログラミング言語の歴史',
    description: 'FORTRANからTypeScriptまで、プログラミング言語の進化',
    events: programmingLanguageHistory,
  },
  {
    id: 'medical-history',
    name: '医学の進歩',
    description: 'ペニシリンからmRNAワクチンまで、医学の画期的な発展',
    events: medicalHistory,
  },
  {
    id: 'environment-history',
    name: '環境問題の歴史',
    description: '「沈黙の春」からパリ協定まで、環境問題への取り組み',
    events: environmentHistory,
  },
  {
    id: 'nobel-discoveries',
    name: 'ノーベル賞主要発見',
    description: 'X線からゲノム編集まで、ノーベル賞に輝いた画期的な発見',
    events: nobelHistory,
  },
  {
    id: 'quantum-computing',
    name: '量子コンピューティングの歴史',
    description: 'EPRパラドックスから量子超越性まで、量子計算の進化',
    events: quantumComputingHistory,
  },
  {
    id: 'it-history',
    name: 'IT史',
    description: 'AI・インターネット・プログラミング言語を統合したIT技術の歴史',
    events: itHistory,
  },
  {
    id: 'ai-future',
    name: 'AIと未来予想',
    description: 'AIの歴史からAGI・シンギュラリティまで、人工知能の過去と未来',
    events: aiFutureHistory,
  },
];
