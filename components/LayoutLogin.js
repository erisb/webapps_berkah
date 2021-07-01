import React, {Component} from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
const LayoutLogin  = (props) => {
    const router = useRouter();

    return(
    <React.Fragment>
        <Head>
            <title>#AyoCariBerkah | presented by: Danasyariah.id</title>
            {/* <!-- Fonts and Codebase framework --> */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,600,700" />
            <link rel="stylesheet" id="css-main" href="/assetsBE/css/codebase.min.css" />
            {/* <!-- slick --> */}
            <link rel="stylesheet" href="/assetsBE/js/plugins/slick/slick.css" />
            <link rel="stylesheet" href="/assetsBE/js/plugins/slick/slick.css" />
            <link rel="stylesheet" href="/assetsBE/js/plugins/slick/slick-theme.css" />
            {/* <!-- end slick --> */}
            {/* <!-- You can include a specific file from css/themes/ folder to alter the default color theme of the template. eg: --> */}
            <link rel="stylesheet" id="css-theme" href="/assetsBE/css/themes/flat.css"></link>
            {/* JS */}
            <script src="/assetsBE/js/codebase.core.min.js"></script>
            <script src="/assetsBE/js/codebase.app.min.js"></script>
            <link rel="stylesheet" href="/assetsBE/js/plugins/datatables/dataTables.bootstrap4.css"></link>
            {/* <!-- pie chart --> */}
            <script src="/assetsBE/js/plugins/sparkline/jquery.sparkline.min.js"></script>
            <script src="/assetsBE/js/plugins/easy-pie-chart/jquery.easypiechart.min.js"></script>
            {/* <!-- slide --> */}
            <script src="/assetsBE/js/plugins/slick/slick.min.js"></script>
            {/* datatables */}
            <script src="/assetsBE/js/plugins/datatables/jquery.dataTables.min.js"></script>
            <script src="/assetsBE/js/plugins/datatables/dataTables.bootstrap4.min.js"></script>

            {/* <!-- Page JS Code --> */}
            <script src="/assetsBE/js/plugins/bootstrap-wizard/jquery.bootstrap.wizard.js"></script>
            <script src="/assetsBE/js/plugins/jquery-validation/jquery.validate.min.js"></script>
            <script src="/assetsBE/js/plugins/jquery-validation/additional-methods.js"></script>
            <script src="/assetsBE/js/pages/be_forms_wizard.min.js"></script>
            <script src="/assetsBE/js/pages/be_tables_datatables.min.js"></script>
            <script src="/assetsBE/js/page.js"></script>
        </Head>
        <div id="page-container" className="main-content-boxed">
            <main id="main-container">
                {/* Page Content */}
                <div className="bg-image" style={{backgroundImage: 'url("/assetsFE/images/bg-header.jpg")'}}>
                    <div className="row mx-0 bg-black-op">
                        <div className="hero-static col-md-6 col-xl-8 d-none d-md-flex align-items-md-end">
                            <div className="p-30 invisible" data-toggle="appear">
                            <p className="font-size-h3 font-w600 text-white">
                                Ayo Hijrah Finansial
                            </p>
                            <p className="font-italic text-white-op">
                                Copyright © 
                            </p>
                            </div>
                        </div>
                        <div className="hero-static col-md-6 col-xl-4 d-flex align-items-center bg-white " data-toggle="appear" data-class="animated fadeInRight">
                            <div className="content content-full" style={{paddingLeft: '5px'}}>
                                {/* Header */}
                                <div className="px-30 py-10">
                                    <a className="font-w700" href="/">
                                        <img src="/logo@2x.png" height={80} alt="" />
                                    </a>
                                    <h1 className="h3 font-w700 mt-30 mb-10">{router.query.title}</h1>
                                    <h2 className="h5 font-w400 text-muted mb-0">{router.query.subTitle}</h2>
                                    
                                </div>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>      
    </React.Fragment>
    )
}
export default LayoutLogin;