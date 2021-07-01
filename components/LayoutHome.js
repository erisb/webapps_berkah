import React, {Component, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { initGA, logPageView } from '../components/frontend/analytics'

function LayoutHome  ({ children, status_user, id_status_user}) {
  let router = useRouter();
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true  //initial
    }
    logPageView() //pageview GA
  });
  if(status_user=='logout' || id_status_user==1){
      var render_header = <Link rel="import" href="/admin-donatur/login">
                          <a className="text-primary"><div><i className="si si-login mt-2 "></i>Masuk</div></a>
                        </Link>  
  }else{
        var render_header = <Link rel="import" href="/admin-donatur/dashboard">
                          <a className="text-primary"><div><i className="si si-login mt-2 "></i>{status_user}</div></a>
                        </Link>
  }
  
    return(
      <React.Fragment>
        <Head>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <meta name="author" content="Dana Syariah" />

        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,900|Caveat+Brush" rel="stylesheet" type="text/css" crossorigin="anonymous" defer/>
        <link rel="stylesheet" href="/assetsFE/css/bootstrap.css" type="text/css" as="style" crossorigin="anonymous" defer/>
        <link rel="stylesheet" href="/assetsFE/style.css" type="text/css"as="style" crossorigin="anonymous"  defer/>
        <link rel="stylesheet" href="/assetsFE/css/swiper.css" type="text/css" as="style" crossorigin="anonymous" defer/>
        <link rel="stylesheet" href="/assetsFE/css/dark.css" type="text/css" as="style" crossorigin="anonymous" defer/>
        <link rel="stylesheet" href="/assetsFE/css/font-icons.css" type="text/css"as="style" crossorigin="anonymous"  defer/>
        <link rel="stylesheet" href="/assetsFE/css/animate.css" type="text/css"as="style" crossorigin="anonymous"  defer/>
        {/* <link rel="stylesheet" href="/assetsFE/css/magnific-popup.css" type="text/css" async/> */}
        <link rel="stylesheet" href="/assetsFE/css/responsive.css" type="text/css" as="style" crossorigin="anonymous" defer/>
        {/* <link rel="stylesheet" href="/assetsFE/css/calendar.css" type="text/css" /> */}
        <link rel="stylesheet" href="/assetsFE/css/colors.php?color=C6C09C" type="text/css" as="style" crossorigin="anonymous" defer/> 
        <link rel="stylesheet" href="/assetsFE/demos/nonprofit/css/fonts.css" type="text/css" as="style" crossorigin="anonymous" defer/>
        <link rel="stylesheet" href="/assetsFE/demos/nonprofit/nonprofit.css" type="text/css" as="style" crossorigin="anonymous" defer/>
        {/* <!-- External JavaScripts ============================================= --> */}
        <script  src="/assetsFE/js/jquery.js" as="script" crossorigin="anonymous" ></script>        
        <script  src="/assetsFE/js/plugins.js" as="script" crossorigin="anonymous" async></script>
        <script  src="/assetsFE/js/jquery.calendario.js" as="script" crossorigin="anonymous" defer></script>
        <script  src="/assetsFE/demos/nonprofit/js/events.js" as="script" crossorigin="anonymous" defer></script>


        {/* <!-- Footer Scripts============================================= --> */}
        <script  src="/assetsFE/js/functions.js" as="script" crossorigin="anonymous" async></script>
        <script  src="/assetsFE/page.js" as="script" crossorigin="anonymous" async></script>

        <meta name="viewport" content="width=device-width,initial-scale=1"></meta>

        <title>#AyoCariBerkah | presented by: Danasyariah.id</title>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"></meta>
        </Head>
        <div className="stretched">         
            <div id="wrapper" className="clearfix">

                {/* Header
            ============================================= */}
                <div id="header" className="transparent-header full-header white" data-sticky-class="">
                          <div id="header-wrap">
                            <div className="container clearfix">
                              <div id="primary-menu-trigger"><i className="icon-reorder" /></div>
                              {/* Logo
                          ============================================= */}
                              <div id="logo">
                                <a href="/" className="standard-logo"  data-dark-logo="/logo.png"><img src="/logo.png"  alt="Dana Sosial Logo" /></a>
                                <a href="/" className="retina-logo"  data-dark-logo="/logo.png"><img src="/logo.png"  alt="Dana Sosial Logo" /></a>
                              </div>{/* #logo end */}
                              {/* Primary Navigation
                          ============================================= */}
                              <nav id="primary-menu" className="d-lg-flex d-xl-flex justify-content-xl-between justify-content-lg-between fnone with-arrows">
                                <ul className="align-self-end">
                                
                                </ul>
                                <ul className="not-dark align-self-end">
                                  <li><span className="menu-bg col-auto align-self-start d-flex" />
                                  </li>  
                                  <li className={router.pathname === '/' ? 'active' : 'notActive'}>
                                    <Link rel="import" href="/">
                                      <a ><div>Beranda</div></a>
                                    </Link>
                                  </li>                      
                                  <li className={router.pathname === '/all_pendanaan' ? 'active' : 'notActive'}>
                                    <Link rel="import" href="/all_pendanaan">
                                      <a ><div>Pendanaan Sosial</div></a>
                                    </Link>
                                  </li>
                                  <li className={router.pathname === '/ziswaf' ? 'active' : 'notActive'}>
                                    <Link href="/ziswaf">
                                      <a><div>Zakat</div></a>
                                    </Link>
                                  </li>
                                  <li className={router.pathname === '/panduan' ? 'active' : 'notActive'}>
                                    <Link rel="import" href="/panduan">
                                      <a ><div>Panduan</div></a>
                                    </Link>
                                  </li>
                                  <li>
                                  {render_header}
                                  </li>
                                </ul>
                              </nav>{/* #primary-menu end */}
                            </div>
                          </div>
                        </div>
                {/* #header end */}
              {/* Page Content */}
              {children}
            </div>{/* #wrapper end */}
          {/* Go To Top ============================================= */}
          <div id="gotoTop" className="icon-angle-up" style={{right: "110px"}} ></div>
        </div>
      </React.Fragment>
    )
}
export default LayoutHome;