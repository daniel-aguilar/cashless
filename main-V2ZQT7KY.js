import{a as Ct}from"./chunk-B3XYQ5MX.js";import{a as Nt}from"./chunk-JPYSGGPN.js";import{a as ft}from"./chunk-CYHG5MHN.js";import{a as ee,b as te,d as oe,e as ie,f as re,h as ne,i as ae,k as se,l as le,m as mt,n as ct,o as dt,p as me,q as ce,r as de,s as ut,w as pe,x as ue,y as _e,z as ge}from"./chunk-5OWQLGQ7.js";import{a as v,d as _t,e as gt,f as N,g as ht,h as Mt}from"./chunk-3A3BFX3M.js";import"./chunk-OX2WDQ4X.js";import"./chunk-UAYDFRWO.js";import{U as R,b as ot,c as it,d as rt,f as nt,g as at,h as O,i as Z,j as st,k as lt,l as f,n as pt}from"./chunk-OP4FD64M.js";import{$ as x,$b as Ye,A as w,Bb as M,Cb as Ue,Da as F,Db as Xe,Eb as We,Ec as et,Fa as Fe,Fb as n,Fc as tt,Gb as a,Hb as u,I as we,Kb as W,Lb as V,Ob as d,Pb as A,Rb as y,Sb as Ve,Tb as ye,Ub as Je,Va as l,Vb as He,W as Ge,Wb as J,Xa as Be,Xb as H,Y as T,Z as G,Za as je,ac as _,bc as Y,ca as s,cc as Qe,d as Ie,da as xe,gc as Q,hb as c,hc as Oe,ia as L,ib as B,ic as qe,ja as k,jb as j,k as Re,ka as Se,kc as Ke,la as Le,lb as z,ma as $,mc as Ze,nb as ze,oa as ke,ob as g,qa as $e,qc as q,ta as De,vb as E,wb as C,xa as D,xb as S,yb as U,yc as K,zb as X}from"./chunk-3TYQJQ5H.js";var Rt="@",wt=(()=>{class i{doc;delegate;zone;animationType;moduleImpl;_rendererFactoryPromise=null;scheduler=null;injector=s(ke);loadingSchedulerFn=s(Gt,{optional:!0});_engine;constructor(e,o,r,m,p){this.doc=e,this.delegate=o,this.zone=r,this.animationType=m,this.moduleImpl=p;}ngOnDestroy(){this._engine?.flush();}loadImpl(){let e=()=>this.moduleImpl??import("./chunk-Q7JC77UA.js").then(r=>r),o;return this.loadingSchedulerFn?o=this.loadingSchedulerFn(e):o=e(),o.catch(r=>{throw new Ge(5300,!1);}).then(({ɵcreateEngine:r,ɵAnimationRendererFactory:m})=>{this._engine=r(this.animationType,this.doc);let p=new m(this.delegate,this._engine,this.zone);return this.delegate=p,p;});}createRenderer(e,o){let r=this.delegate.createRenderer(e,o);if(r.ɵtype===0)return r;typeof r.throwOnSyntheticProps=="boolean"&&(r.throwOnSyntheticProps=!1);let m=new Pe(r);return o?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(p=>{let It=p.createRenderer(e,o);m.use(It),this.scheduler??=this.injector.get($e,null,{optional:!0}),this.scheduler?.notify(11);}).catch(p=>{m.use(r);}),m;}begin(){this.delegate.begin?.();}end(){this.delegate.end?.();}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve();}static ɵfac=function(o){Be();};static ɵprov=T({token:i,factory:i.ɵfac});}return i;})(),Pe=class{delegate;replay=[];ɵtype=1;constructor(t){this.delegate=t;}use(t){if(this.delegate=t,this.replay!==null){for(let e of this.replay)e(t);this.replay=null;}}get data(){return this.delegate.data;}destroy(){this.replay=null,this.delegate.destroy();}createElement(t,e){return this.delegate.createElement(t,e);}createComment(t){return this.delegate.createComment(t);}createText(t){return this.delegate.createText(t);}get destroyNode(){return this.delegate.destroyNode;}appendChild(t,e){this.delegate.appendChild(t,e);}insertBefore(t,e,o,r){this.delegate.insertBefore(t,e,o,r);}removeChild(t,e,o){this.delegate.removeChild(t,e,o);}selectRootElement(t,e){return this.delegate.selectRootElement(t,e);}parentNode(t){return this.delegate.parentNode(t);}nextSibling(t){return this.delegate.nextSibling(t);}setAttribute(t,e,o,r){this.delegate.setAttribute(t,e,o,r);}removeAttribute(t,e,o){this.delegate.removeAttribute(t,e,o);}addClass(t,e){this.delegate.addClass(t,e);}removeClass(t,e){this.delegate.removeClass(t,e);}setStyle(t,e,o,r){this.delegate.setStyle(t,e,o,r);}removeStyle(t,e,o){this.delegate.removeStyle(t,e,o);}setProperty(t,e,o){this.shouldReplay(e)&&this.replay.push(r=>r.setProperty(t,e,o)),this.delegate.setProperty(t,e,o);}setValue(t,e){this.delegate.setValue(t,e);}listen(t,e,o){return this.shouldReplay(e)&&this.replay.push(r=>r.listen(t,e,o)),this.delegate.listen(t,e,o);}shouldReplay(t){return this.replay!==null&&t.startsWith(Rt);}},Gt=new x("");function bt(i="animations"){return Fe("NgAsyncAnimations"),xe([{provide:je,useFactory:(t,e,o)=>new wt(t,e,o,i),deps:[K,it,De]},{provide:F,useValue:i==="noop"?"NoopAnimations":"BrowserAnimations"}]);}var b=class i{loading=new Re(!1);get isLoading(){return this.loading.asObservable();}show(){this.loading.next(!0),document.body.classList.add("loading-backdrop");}hide(){this.loading.next(!1),document.body.classList.remove("loading-backdrop");}static ɵfac=function(e){return new(e||i)();};static ɵprov=T({token:i,factory:i.ɵfac,providedIn:"root"});};var P=class i{router=s(O);game=s(ce);loading=s(b);auth=s(f);enterGame(t){return this.loading.show(),this.game.joinGame(t).pipe(we(()=>{this.loading.hide(),this.auth.getLoggedAccount().isBanker?this.router.navigateByUrl("/banker"):this.router.navigateByUrl("/player");}));}static ɵfac=function(e){return new(e||i)();};static ɵdir=j({type:i});};function $t(i,t){i&1&&(n(0,"p",7),d(1,1),a());}var fe=class i extends P{form;error=!1;ngOnInit(){this.form=new re({pin:new ne("",{validators:te.required})});}joinGame(){let t=this.form.value.pin;this.enterGame(t).subscribe({error:()=>this.displayError()});}displayError(){this.error=!0,setTimeout(()=>this.error=!1,3e3);}static ɵfac=(()=>{let t;return function(o){return(t||(t=$(i)))(o||i);};})();static ɵcmp=c({type:i,selectors:[["app-join-game"]],features:[z],decls:10,vars:3,consts:()=>{let t;t="Ej. 1234";let e;e="PIN";let o;return o="Cuenta no encontrada",[e,o,[1,"flex","justify-center","px-1"],[1,"w-full","md:w-1/3",3,"ngSubmit","formGroup"],[1,"flex","flex-col"],["matInput","","placeholder",t,"autocomplete","off","formControlName","pin","minlength","4","maxlength","4","pattern","[0-9]{4}"],["mat-flat-button","",3,"disabled"],[1,"error","mt-2","text-center"]];},template:function(e,o){e&1&&(n(0,"div",2)(1,"form",3),A("ngSubmit",function(){return o.joinGame();}),n(2,"div",4)(3,"mat-form-field")(4,"mat-label"),d(5,0),a(),u(6,"input",5),a(),n(7,"button",6),_(8,"OK"),a(),g(9,$t,2,0,"p",7),a()()()),e&2&&(l(),C("formGroup",o.form),l(6),C("disabled",o.form.invalid),l(2),M(o.error?9:-1));},dependencies:[me,ae,ee,oe,ie,mt,ct,dt,se,le,ue,pe,de,ge,_e,N,v],encapsulation:2});};var Me=class i{auth=s(f);canActivate(){return this.auth.getLoggedAccount().isBanker;}static ɵfac=function(e){return new(e||i)();};static ɵprov=T({token:i,factory:i.ɵfac,providedIn:"root"});};function Dt(i,t){if(i&1){let e=V();n(0,"button",2),A("click",function(){L(e);let r=y();return k(r.continueGame());}),d(1,0),a();}}var Ce=class i extends P{canContinueGame=!1;pin;ngOnInit(){this.pin=this.auth.savedPin,this.canContinueGame=!!this.pin;}continueGame(){return Ie(this,null,function*(){this.enterGame(this.pin).subscribe({error:()=>{this.canContinueGame=!1,this.auth.logout();}});});}static ɵfac=(()=>{let t;return function(o){return(t||(t=$(i)))(o||i);};})();static ɵcmp=c({type:i,selectors:[["app-continue-game"]],features:[z],decls:1,vars:1,consts:()=>{let t;return t="Continuar Juego",[t,["mat-flat-button","",1,"w-full"],["mat-flat-button","",1,"w-full",3,"click"]];},template:function(e,o){e&1&&g(0,Dt,2,0,"button",1),e&2&&M(o.canContinueGame?0:-1);},dependencies:[N,v],encapsulation:2});};var Ne=class i{static ɵfac=function(e){return new(e||i)();};static ɵcmp=c({type:i,selectors:[["app-main-menu"]],decls:7,vars:0,consts:()=>{let t;t="Nuevo Juego";let e;return e="Unirse a un Juego",[t,e,[1,"flex","justify-center","px-1"],[1,"flex","w-full","flex-col","md:w-1/3"],["mat-stroked-button","","routerLink","/new",1,"mb-1"],["mat-stroked-button","","routerLink","/join",1,"mb-1"]];},template:function(e,o){e&1&&(n(0,"div",2)(1,"div",3)(2,"button",4),d(3,0),a(),n(4,"button",5),d(5,1),a(),u(6,"app-continue-game"),a()());},dependencies:[N,v,Z,Ce],encapsulation:2});};function Ft(i,t){i&1&&(n(0,"mat-error"),d(1,1),a());}var be=class i{form=new re({name:new ne("",{validators:[te.required,Bt]})});get name(){return this.form.get("name");}game=s(ce);auth=s(f);router=s(O);loading=s(b);createGame(){let t=this.form.value.name;this.loading.show(),this.game.newGame(t).subscribe(e=>{this.loading.hide(),this.auth.login(e),this.router.navigateByUrl("/banker");});}static ɵfac=function(e){return new(e||i)();};static ɵcmp=c({type:i,selectors:[["app-new-game"]],decls:10,vars:3,consts:()=>{let t;t="Ej. Isabel";let e;e="Nombre del Jugador";let o;return o="Ese nombre est\xE1 reservado",[e,o,[1,"flex","justify-center","px-1"],[1,"w-full","md:w-1/3",3,"ngSubmit","formGroup"],[1,"flex","flex-col"],["matInput","","placeholder",t,"autocomplete","off","formControlName","name"],["mat-flat-button","",3,"disabled"]];},template:function(e,o){e&1&&(n(0,"div",2)(1,"form",3),A("ngSubmit",function(){return o.createGame();}),n(2,"div",4)(3,"mat-form-field")(4,"mat-label"),d(5,0),a(),u(6,"input",5),g(7,Ft,2,0,"mat-error"),a(),n(8,"button",6),_(9,"OK"),a()()()()),e&2&&(l(),C("formGroup",o.form),l(6),M(o.name.errors!=null&&o.name.errors.noBankName?7:-1),l(),C("disabled",o.form.invalid));},dependencies:[me,ae,ee,oe,ie,se,le,ue,pe,de,ut,ge,_e,N,v],encapsulation:2});};function Bt(i){return i.value.toLowerCase()==="bank"?{noBankName:!0}:null;}function jt(i,t){if(i&1&&(n(0,"tr")(1,"td"),_(2),Q(3,"date"),a(),n(4,"td"),_(5),Q(6,"localizeName"),a(),n(7,"td"),_(8),Q(9,"localizeName"),a(),n(10,"td"),_(11),a()()),i&2){let e=t.$implicit;l(2),Y(qe(3,4,e.date,"h:mm a")),l(3),Y(Oe(6,7,e.sender.name)),l(3),Y(Oe(9,9,e.recipient.name)),l(3),Qe("$",e.amount,"");}}var Ae=class i{transactions=[];gameId=0;txSub;auth=s(f);bank=s(ft);loading=s(b);ngOnInit(){this.gameId=this.auth.getLoggedAccount().gameId,this.loading.show(),this.bank.getTransactionLog(this.gameId).subscribe(t=>{this.transactions=t,this.listenToTransactions(),this.loading.hide();});}ngOnDestroy(){this.txSub.unsubscribe();}listenToTransactions(){this.txSub=this.bank.transactions.pipe(w(t=>this.isFromThisGame(t))).subscribe(t=>this.transactions.unshift(t));}isFromThisGame(t){let e=t.sender.gameId===t.recipient.gameId,o=t.sender.gameId===this.gameId;return e&&o;}static ɵfac=function(e){return new(e||i)();};static ɵcmp=c({type:i,selectors:[["app-transaction-log"]],decls:17,vars:0,consts:()=>{let t;t="Bit\xE1cora de Transacciones";let e;e="Hora";let o;o="Origen";let r;r="Destino";let m;return m="Monto",[t,e,o,r,m,[1,"px-1","pb-1"],[1,"mat-headline-medium","text-center"],[1,"monopoly-table","mx-auto","w-full","md:w-2/3"]];},template:function(e,o){e&1&&(n(0,"div",5)(1,"h2",6),d(2,0),a(),n(3,"table",7)(4,"thead")(5,"tr")(6,"th"),d(7,1),a(),n(8,"th"),d(9,2),a(),n(10,"th"),d(11,3),a(),n(12,"th"),d(13,4),a()()(),n(14,"tbody"),Xe(15,jt,12,11,"tr",null,Ue),a()()()),e&2&&(l(15),We(o.transactions));},dependencies:[tt,Ct],encapsulation:2});};var ve=()=>s(f).canActivate(),At=()=>s(Me).canActivate(),vt=[{path:"",pathMatch:"full",component:Ne},{path:"new",component:be},{path:"join",component:fe},{path:"player",component:Nt,canActivate:[ve]},{path:"transactions",component:Ae,canActivate:[ve]},{path:"banker",loadComponent:()=>import("./chunk-MCYOCEKY.js").then(i=>i.BankerComponent),canActivate:[ve,At]},{path:"banker/players",loadComponent:()=>import("./chunk-N4NVBDSD.js").then(i=>i.PlayerListComponent),canActivate:[ve,At]},{path:"**",redirectTo:""}];var Tt={providers:[Ze({eventCoalescing:!0}),st(vt,lt()),ot(),bt()]};var zt=["*",[["mat-toolbar-row"]]],Ut=["*","mat-toolbar-row"],Xt=(()=>{class i{static ɵfac=function(o){return new(o||i)();};static ɵdir=j({type:i,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]});}return i;})(),Et=(()=>{class i{_elementRef=s(D);_platform=s(pt);_document=s(K);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()));}_checkToolbarMixedModes(){this._toolbarRows.length;}static ɵfac=function(o){return new(o||i)();};static ɵcmp=c({type:i,selectors:[["mat-toolbar"]],contentQueries:function(o,r,m){if(o&1&&Je(m,Xt,5),o&2){let p;J(p=H())&&(r._toolbarRows=p);}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(o,r){o&2&&(X(r.color?"mat-"+r.color:""),U("mat-toolbar-multiple-rows",r._toolbarRows.length>0)("mat-toolbar-single-row",r._toolbarRows.length===0));},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:Ut,decls:2,vars:0,template:function(o,r){o&1&&(Ve(zt),ye(0),ye(1,1));},styles:[".mat-toolbar{background:var(--mat-toolbar-container-background-color, var(--mat-sys-surface));color:var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));font-size:var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));line-height:var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));font-weight:var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));letter-spacing:var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));margin:0}@media(forced-colors: active){.mat-toolbar{outline:solid 1px}}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color:var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));--mdc-outlined-button-label-text-color:var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height, 56px)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height, 56px)}}"],encapsulation:2,changeDetection:0});}return i;})();var St=(()=>{class i{static ɵfac=function(o){return new(o||i)();};static ɵmod=B({type:i});static ɵinj=G({imports:[R,R]});}return i;})();var Vt=["determinateSpinner"];function Jt(i,t){if(i&1&&(Se(),n(0,"svg",11),u(1,"circle",12),a()),i&2){let e=y();E("viewBox",e._viewBox()),l(),S("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),E("r",e._circleRadius());}}var Ht=new x("mat-progress-spinner-default-options",{providedIn:"root",factory:Yt});function Yt(){return{diameter:yt};}var yt=100,Qt=10,Ot=(()=>{class i{_elementRef=s(D);_noopAnimations;get color(){return this._color||this._defaultColor;}set color(e){this._color=e;}_color;_defaultColor="primary";_determinateCircle;constructor(){let e=s(F,{optional:!0}),o=s(Ht);this._noopAnimations=e==="NoopAnimations"&&!!o&&!o._forceAnimations,this.mode=this._elementRef.nativeElement.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",o&&(o.color&&(this.color=this._defaultColor=o.color),o.diameter&&(this.diameter=o.diameter),o.strokeWidth&&(this.strokeWidth=o.strokeWidth));}mode;get value(){return this.mode==="determinate"?this._value:0;}set value(e){this._value=Math.max(0,Math.min(100,e||0));}_value=0;get diameter(){return this._diameter;}set diameter(e){this._diameter=e||0;}_diameter=yt;get strokeWidth(){return this._strokeWidth??this.diameter/10;}set strokeWidth(e){this._strokeWidth=e||0;}_strokeWidth;_circleRadius(){return(this.diameter-Qt)/2;}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return`0 0 ${e} ${e}`;}_strokeCircumference(){return 2*Math.PI*this._circleRadius();}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null;}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100;}static ɵfac=function(o){return new(o||i)();};static ɵcmp=c({type:i,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(o,r){if(o&1&&He(Vt,5),o&2){let m;J(m=H())&&(r._determinateCircle=m.first);}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(o,r){o&2&&(E("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",r.mode==="determinate"?r.value:null)("mode",r.mode),X("mat-"+r.color),S("width",r.diameter,"px")("height",r.diameter,"px")("--mdc-circular-progress-size",r.diameter+"px")("--mdc-circular-progress-active-indicator-width",r.diameter+"px"),U("_mat-animation-noopable",r._noopAnimations)("mdc-circular-progress--indeterminate",r.mode==="indeterminate"));},inputs:{color:"color",mode:"mode",value:[2,"value","value",q],diameter:[2,"diameter","diameter",q],strokeWidth:[2,"strokeWidth","strokeWidth",q]},exportAs:["matProgressSpinner"],features:[ze],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(o,r){if(o&1&&(g(0,Jt,2,8,"ng-template",null,0,Ke),n(2,"div",2,1),Se(),n(4,"svg",3),u(5,"circle",4),a()(),Le(),n(6,"div",5)(7,"div",6)(8,"div",7),W(9,8),a(),n(10,"div",9),W(11,8),a(),n(12,"div",10),W(13,8),a()()()),o&2){let m=Ye(1);l(4),E("viewBox",r._viewBox()),l(),S("stroke-dasharray",r._strokeCircumference(),"px")("stroke-dashoffset",r._strokeDashOffset(),"px")("stroke-width",r._circleStrokeWidth(),"%"),E("r",r._circleRadius()),l(4),C("ngTemplateOutlet",m),l(2),C("ngTemplateOutlet",m),l(2),C("ngTemplateOutlet",m);}},dependencies:[et],styles:[".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width, 4px)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-sys-primary))}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}"],encapsulation:2,changeDetection:0});}return i;})();var Pt=(()=>{class i{static ɵfac=function(o){return new(o||i)();};static ɵmod=B({type:i});static ɵinj=G({imports:[R]});}return i;})();function Kt(i,t){i&1&&(n(0,"div"),u(1,"mat-progress-spinner",0),a());}var Te=class i{isLoading=!1;loading=s(b);ngOnInit(){this.loading.isLoading.subscribe(t=>this.isLoading=t);}static ɵfac=function(e){return new(e||i)();};static ɵcmp=c({type:i,selectors:[["app-loading"]],decls:1,vars:1,consts:[["mode","indeterminate"]],template:function(e,o){e&1&&g(0,Kt,2,0,"div"),e&2&&M(o.isLoading?0:-1);},dependencies:[Pt,Ot],styles:["div[_ngcontent-%COMP%]{position:fixed;width:100vw;height:100vh;opacity:.7;z-index:10;display:flex;flex-direction:column;justify-content:center;align-items:center}"]});};function Zt(i,t){i&1&&(n(0,"a",2)(1,"mat-icon"),_(2,"manage_accounts"),a()());}function eo(i,t){if(i&1){let e=V();n(0,"button",4),A("click",function(){L(e);let r=y();return k(r.leaveGame());}),n(1,"mat-icon"),_(2,"logout"),a()();}}var Ee=class i{account;addMargin=!0;auth=s(f);router=s(O);ngOnInit(){this.auth.getLoginStatus().subscribe(t=>{t?this.account=this.auth.getLoggedAccount():delete this.account;}),this.listenForBankerRoute();}leaveGame(){this.auth.logout(),this.router.navigateByUrl("/");}listenForBankerRoute(){this.router.events.pipe(w(t=>t instanceof nt)).subscribe(t=>{let e=t;this.addMargin=e.url!=="/banker";});}static ɵfac=function(e){return new(e||i)();};static ɵcmp=c({type:i,selectors:[["app-root"]],decls:8,vars:4,consts:()=>{let t;t="Gestionar Jugadores";let e;return e="Salir",[[1,"app-toolbar"],[1,"ms-auto"],["title",t,"mat-icon-button","","routerLink","/banker/players"],["title",e,"mat-icon-button",""],["title",e,"mat-icon-button","",3,"click"]];},template:function(e,o){e&1&&(u(0,"app-loading"),n(1,"mat-toolbar",0)(2,"h1"),_(3,"CASHLESS"),a(),n(4,"div",1),g(5,Zt,3,0,"a",2)(6,eo,3,0,"button",3),a()(),u(7,"router-outlet")),e&2&&(l(),S("margin-bottom",o.addMargin?"1em":""),l(4),M(o.account!=null&&o.account.isBanker?5:-1),l(),M(o.account?6:-1));},dependencies:[Te,St,Et,N,gt,_t,Mt,ht,Z,at],encapsulation:2});};rt(Ee,Tt).catch(i=>console.error(i));/**i18n:b43e89926e09dd63ffe7aeaa32506b2509c60f4ee32420959a417b82d22832e7*/