"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const rippleEffect_hook_1 = require("~/hooks/rippleEffect.hook");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const NEWS_FEED = [
    {
        id: crypto.randomUUID(),
        title: "В АлтГУ состоялось пленарное заседание международного форума по проблемам устойчивости и безопасности регионов Центральной Азии и Большого Алтая",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores assumenda ea eligendi enim eos llum obcaecati, omnis optio quaerat quis recusandae sunt tempora totam unde! At debitis labore nisi!",
        createdAt: new Date("2023-09-23"),
    },
    {
        id: crypto.randomUUID(),
        title: "В АлтГУ состоялось пленарное заседание международного форума по проблемам устойчивости и безопасности регионов Центральной Азии и Большого Алтая",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores assumenda ea eligendi enim eos llum obcaecati, omnis optio quaerat quis recusandae sunt tempora totam unde! At debitis labore nisi!",
        createdAt: new Date("2023-09-22"),
    },
    {
        id: crypto.randomUUID(),
        title: "В АлтГУ состоялось пленарное заседание международного форума по проблемам устойчивости и безопасности регионов Центральной Азии и Большого Алтая",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores assumenda ea eligendi enim eos llum obcaecati, omnis optio quaerat quis recusandae sunt tempora totam unde! At debitis labore nisi!",
        createdAt: new Date("2023-09-21"),
    },
    {
        id: crypto.randomUUID(),
        title: "В АлтГУ состоялось пленарное заседание международного форума по проблемам устойчивости и безопасности регионов Центральной Азии и Большого Алтая",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores assumenda ea eligendi enim eos llum obcaecati, omnis optio quaerat quis recusandae sunt tempora totam unde! At debitis labore nisi!",
        createdAt: new Date("2023-09-20"),
    },
];
const NewsFeed = () => {
    const router = (0, router_1.useRouter)();
    const rippleEffectEvent = (0, rippleEffect_hook_1.useRippleEffect)();
    return (<div className={styles_module_sass_1.default.wrapper}>
      {NEWS_FEED.map((item) => (<link_1.default href="https://www.asu.ru/" className={styles_module_sass_1.default.item} key={item.id} target="_blank" onPointerDown={rippleEffectEvent}>
          <header className={styles_module_sass_1.default.header}>
            <p className={styles_module_sass_1.default.title} title={item.title}>
              {item.title}
            </p>
          </header>
          <div className={styles_module_sass_1.default.main}>
            <div className={styles_module_sass_1.default.image}>
              <image_1.default src="https://placehold.co/150x150" alt="" fill style={{ objectFit: "cover" }}/>
            </div>
            <div className={styles_module_sass_1.default.text}>
              <p className={styles_module_sass_1.default.description} title={item.description}>
                {item.description}
              </p>
              <footer className={styles_module_sass_1.default.footer}>
                <time dateTime={item.createdAt.toISOString()}>
                  {new Intl.DateTimeFormat(router.locales, {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            }).format(item.createdAt)}
                </time>
              </footer>
            </div>
          </div>
        </link_1.default>))}
    </div>);
};
exports.default = NewsFeed;
