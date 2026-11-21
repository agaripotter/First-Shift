import os
os.makedirs('shots',exist_ok=True)
import asyncio
from playwright.async_api import async_playwright
F='file://'+os.path.abspath(os.path.join(os.path.dirname(__file__),'..','index.html'))
VPS={'iphone':(390,844,3,True),'ipad_p':(820,1180,2,True),'ipad_l':(1180,820,2,True),'laptop':(1440,900,1,False)}
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(args=['--no-sandbox'], **({'executable_path':os.environ['CHROME']} if os.environ.get('CHROME') else {}))
    errs=[]
    for name,(w,h,dpr,touch) in VPS.items():
      ctx=await b.new_context(viewport={'width':w,'height':h},device_scale_factor=dpr,has_touch=touch,is_mobile=touch and w<700)
      pg=await ctx.new_page();pg.on('pageerror',lambda e:errs.append(name+': '+str(e)))
      await pg.add_init_script("try{if(!localStorage.getItem('firstshift.review.v1'))localStorage.setItem('firstshift.review.v1',JSON.stringify({name:'',items:[],intro:true}))}catch(e){}")
      await pg.goto(F);await pg.wait_for_timeout(900)
      await pg.screenshot(path=f'shots/r_{name}_home.png')
      # module 2 screen with ctas explorer
      await pg.evaluate("(()=>{const s={name:'',pos:{m02:1},ans:{},done:{}};localStorage.setItem('firstshift.cmc.v3',JSON.stringify(s));})()")
      await pg.goto(F);await pg.wait_for_timeout(500)
      await pg.click('.mod[data-m=m02]');await pg.wait_for_timeout(400)
      el=await pg.query_selector('.tool');await el.scroll_into_view_if_needed();await pg.wait_for_timeout(300)
      await pg.screenshot(path=f'shots/r_{name}_tool.png')
      # case screen: m02 screen 4 (waiting room case)
      await pg.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('firstshift.cmc.v3'));s.pos.m05=5;localStorage.setItem('firstshift.cmc.v3',JSON.stringify(s));})()")
      await pg.goto(F);await pg.wait_for_timeout(500)
      await pg.click('.mod[data-m=m05]');await pg.wait_for_timeout(300)
      await pg.click('.chs button >> nth=0');await pg.wait_for_timeout(400)
      await pg.evaluate("window.scrollTo(0,0)");await pg.wait_for_timeout(200)
      await pg.screenshot(path=f'shots/r_{name}_case.png')
      await ctx.close()
    print('ERRORS',errs);await b.close()
asyncio.run(main())
