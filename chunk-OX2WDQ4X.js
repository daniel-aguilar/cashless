import{A as c,P as d,T as l,Y as a,ca as u,g as b,j as n,ta as v}from"./chunk-3TYQJQ5H.js";var i=class{_box;_destroyed=new n;_resizeSubject=new n;_resizeObserver;_elementObservables=new Map;constructor(r){this._box=r,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(r){return this._elementObservables.has(r)||this._elementObservables.set(r,new b(e=>{let s=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(r,{box:this._box}),()=>{this._resizeObserver?.unobserve(r),s.unsubscribe(),this._elementObservables.delete(r)}}).pipe(c(e=>e.some(s=>s.target===r)),d({bufferSize:1,refCount:!0}),l(this._destroyed))),this._elementObservables.get(r)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},O=(()=>{class t{_cleanupErrorListener;_observers=new Map;_ngZone=u(v);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,s){let o=s?.box||"content-box";return this._observers.has(o)||this._observers.set(o,new i(o)),this._observers.get(o).observe(e)}static \u0275fac=function(s){return new(s||t)};static \u0275prov=a({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();export{O as a};
/**i18n:b43e89926e09dd63ffe7aeaa32506b2509c60f4ee32420959a417b82d22832e7*/