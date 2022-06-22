"use strict";(self.webpackChunkcrm_dashboard_plugin_react=self.webpackChunkcrm_dashboard_plugin_react||[]).push([[631],{5853:function(e,n,i){i.r(n),i.d(n,{default:function(){return M}});var a=i(885),s=i(7313),r=i(1413),o=i(8129),t=i(2594),l=i(402),c=i(7171),d=i(7019),m=i(8120),u=i(525),g=i(9928),p=i(7331),h=i(8964),x=i(3930),f=i(2068),w=i(7397),b=i.n(w),j=b().object({username:b().string().required().messages({"string.empty":"User name is required","any.required":"User name is required"}),password:b().string().required().messages({"string.empty":"Password is required","any.required":"Password is required"})}),y=i(4942),L=i.p+"static/media/fondoLogin.a6a77f8fa1cced52b7e5.jpg",v=(0,i(3010).k)((function(e,n,i){var a;return{containerLogin:(a={margin:"auto",height:"auto"},(0,y.Z)(a,"@media (max-width: 1000px)",{width:"80%"}),(0,y.Z)(a,"@media (min-width: 1001px) and (max-width: 1500px)",{width:"65%"}),(0,y.Z)(a,"@media (min-width: 1501px)",{width:"50%"}),a),contentLogin:(0,y.Z)({display:"grid",gridTemplateColumns:"repeat(1, minmax(0, 1fr))"},"@media (min-width: ".concat(e.breakpoints.md,"px)"),{gridTemplateColumns:"repeat(2, minmax(0, 1fr))"}),contentFom:(0,y.Z)({display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:e.other.spacing.p8,padding:e.other.spacing.p12,marginTop:e.other.spacing.p5,marginBottom:e.other.spacing.p5},"@media (max-width: ".concat(e.breakpoints.lg,"px)"),{padding:e.other.spacing.p8}),titleForm:{textAlign:"center",fontWeight:"bold",fontSize:"40px"},containerSocialMedia:{display:"flex",justifyContent:"center",flexGrow:1,gridGap:"1rem",marginTop:"0.70rem",marginBottom:"0.70rem"},InputForm:{ref:i("InputForm")},containerForm:{width:"100%",display:"flex",flexDirection:"column",gap:e.other.spacing.p5,padding:0},formLogin:{width:"100%",display:"flex",flexDirection:"column",gap:e.other.spacing.p5},buttonForgot:(0,y.Z)({color:"black"},"&:hover",{color:e.colors.primary[2]}),imageLogin:{position:"relative",width:"100%"},ParallaxCroma:{position:"absolute",height:"100%",width:"100%",backgroundColor:"black",zIndex:1,opacity:.1},ParallaxContain:{height:"100%",width:"100%",background:"url(".concat(L,")"),backgroundSize:"cover",backgroundPosition:"center",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},buttonLogin:{width:"100%",fontSize:"20px",lineHeight:"1.7em",borderWidth:"1px",padding:"0.3em 1em"}}})),k=i(8206),I=i(9455),Z=i(6417),N=function(e){var n=v().classes,i=(0,f.rZ)(),w=(0,s.useState)(!1),b=(0,a.Z)(w,2),y=b[0],L=b[1],N=e.onSuccessLogin,F=(0,h.c)({schema:(0,x.L)(j),initialValues:{password:"",username:""}}),S=(0,I.m)({name:"login-with-jwt",gql:k.M,config:{onError:function(){L(!0)},onSuccess:function(e){e&&N&&(F.setFieldValue("password",""),F.setFieldValue("username",""),N(e))}}}),_=S.isLoading,T=S.mutate;return(0,Z.jsxs)(o.x,{className:n.containerForm,children:[y&&(0,Z.jsx)(t.b,{icon:(0,Z.jsx)(u.Z,{size:20}),color:"error",children:(0,Z.jsx)(l.x,{style:{color:i.colors.dark[0]},children:"Network error, please try again later"})}),(0,Z.jsx)("form",{onSubmit:F.onSubmit((function(e){return function(e){L(!1);var n=e.username,i=e.password;T({variables:{input:{username:n,password:i}}})}(e)})),children:(0,Z.jsxs)(o.x,{className:n.formLogin,children:[(0,Z.jsx)(c.o,(0,r.Z)({disabled:_,className:n.InputForm,icon:(0,Z.jsx)(g.Z,{}),placeholder:"User name",radius:"sm"},F.getInputProps("username"))),(0,Z.jsx)(c.o,(0,r.Z)({disabled:_,type:"password",className:n.InputForm,icon:(0,Z.jsx)(p.Z,{}),placeholder:"Password",radius:"sm"},F.getInputProps("password"))),(0,Z.jsx)(d.z,{type:"submit",radius:"sm",size:"xl",compact:!0,color:"primary",loading:_,className:n.buttonLogin,children:"Login"})]})}),(0,Z.jsx)(m.k,{component:"a",href:"/wp-login.php?action=lostpassword",className:n.buttonForgot,variant:"subtle",children:"Forgot your password?"})]})},F=i(2655),S=(i(2599),i(1794)),_=i.p+"static/media/fondoLogin2.dad0ca763772d867f2c7.jpg",T=i.p+"static/media/fondoLogin3.a7f33951f220e44e2a19.jpg",C=function(){var e=(0,S.a)("(min-width: 768px)");return(0,Z.jsx)(o.x,{className:"containCarousel",children:e&&(0,Z.jsxs)(F.lr,{showStatus:!1,autoPlay:!0,interval:1e4,showIndicators:!1,showArrows:!1,showThumbs:!1,transitionTime:1e3,infiniteLoop:!0,className:"CarouselLogin_wp",children:[(0,Z.jsx)("img",{src:L,className:"Interinvestments_img",alt:"InterinvestmentsLogin1"}),(0,Z.jsx)("img",{src:_,className:"Interinvestments_img",alt:"InterinvestmentsLogin2"}),(0,Z.jsx)("img",{src:T,className:"Interinvestments_img",alt:"InterinvestmentsLogin3"})]})})},q=i(3577),H=i(7159);var P=i.p+"static/media/Logo.b85318fd0e3c654db00223b015493ad8.svg",V=function(e){var n=(0,S.a)("(min-width: 1022px)"),i=v().classes,a=e.onSuccessLogin,s=void 0===a?null:a;return(0,Z.jsx)(o.x,{className:i.containerLogin,children:(0,Z.jsx)(q.Z,{style:{padding:0},shadow:"md",children:(0,Z.jsxs)(o.x,{className:i.contentLogin,children:[(0,Z.jsxs)(o.x,{className:i.contentFom,children:[(0,Z.jsx)(H.E,{className:i.logo,height:n?22:18,src:P,alt:"ImageLogo"}),(0,Z.jsx)(N,{onSuccessLogin:s})]}),(0,Z.jsx)(C,{})]})})})},U=i(2757),z=i(7957),E=i(5554),O=i(924),Q=i(6008),A=i(9706),G=i.n(A),D=i(5522),R=i.n(D),M=function(e){e.isModal;var n=(0,E.v9)((function(e){return e.user})).route,i=(0,E.I0)(),s=(0,U._)({key:z.H.USER,defaultValue:null}),r=(0,a.Z)(s,2)[1],o=(0,U._)({key:z.H.ROUTE,defaultValue:Q.QO}),t=(0,a.Z)(o,2)[1],l=(0,U._)({key:z.H.TOKEN,defaultValue:null}),c=(0,a.Z)(l,2)[1],d=(0,U._)({key:z.H.REFRESH,defaultValue:null}),m=(0,a.Z)(d,2)[1];return(0,Z.jsx)(V,{onSuccessLogin:function(e){var a=G()(e,["login","authToken"]),s=G()(e,["login","refreshToken"]),o=G()(e,["login","user"]);(function(e){var n=!R()(G()(e,["login","user","roles"])),i=G()(e,["login","user","username"]),a=G()(e,["login","user","id"]);return n&&i&&a})(e)&&a?(m(s),c(a),r(o.id),n===Q.GQ.AUTH&&(t(Q.QO),i((0,O.pV)(Q.QO))),i((0,O.aO)(o))):(m(null),c(null),t(Q.GQ.AUTH),r(null),i((0,O.aO)(null)),i((0,O.pV)(Q.GQ.AUTH)))}})}}}]);