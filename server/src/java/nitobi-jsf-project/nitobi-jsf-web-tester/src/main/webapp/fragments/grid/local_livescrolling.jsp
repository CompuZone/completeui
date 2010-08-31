<%--
    Document   : calendarTest
    Created on : Dec 22, 2007, 10:30:07 AM
    Author     : eric
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="f" uri="http://java.sun.com/jsf/core" %>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html" %>
<%@taglib prefix="n" uri="http://www.nitobi.com/jsf" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Local Live Scrolling</title>
		<link type="text/css" rel="stylesheet" href="../../style/layout-noframes.css"/>

</head>
<body>
<div id="maincontent">
<p>This is a sample of a grid in locallivescrolling mode. The data resides statically on the page.</p>
<f:view>
<n:grid id="SimpleGrid"
        autoInitialize="true"
        mode="locallivescrolling"
        width="300"
        dataSourceId="data"
        toolbarEnabled="true"
        theme="nitobi">
<n:dataSources>
<n:dataSource id="data">
<n:dataSourceStructure fieldNames="ContactName|ContactEmail|JobTitle" keys="ContactName"></n:dataSourceStructure>
<n:data>
<n:e data="{xi:'97382', a:'Tammara Farley', b:'tamfarley@halifax.com', c:'Media Director'}"></n:e>
<n:e data="{xi:'97383', a:'Dwana Barton', b:'dwabarton@ebadev.com', c:'Budget Analyst'}"></n:e>
<n:e data="{xi:'97384', a:'Mercedes Carpenter', b:'mcarpenter@purosync.net', c:'Finance Manager'}"></n:e>
<n:e data="{xi:'97385', a:'Lucas Blake', b:'lblak@freeinterweb.com', c:'Marketing Manager'}"></n:e>
<n:e data="{xi:'97386', a:'Lilli Bender', b:'lbender@sharesync.com', c:'Purchaser'}"></n:e>
<n:e data="{xi:'97387', a:'Jose Bishop', b:'josebishop@voxcom.ca', c:'Branch Manager'}"></n:e>
<n:e data="{xi:'97388', a:'Emilia Foster', b:'efoster@extreme.net', c:'Payroll Manager'}"></n:e>
<n:e data="{xi:'97389', a:'Vernice Young', b:'veyoung@glue.it.com', c:'Developer'}"></n:e>
<n:e data="{xi:'97390', a:'Cyrstal House', b:'chouse@universalweb.com', c:'Product Manager'}"></n:e>
<n:e data="{xi:'97391', a:'Lindsay Cohen', b:'lindsaycohen@jitterbug.org', c:'Developer'}"></n:e>
<n:e data="{xi:'97392', a:'Amalia Oneal', b:'amaoneal@flashpoint.org', c:'Business Development Manager'}"></n:e>
<n:e data="{xi:'97393', a:'Pasty Rosario', b:'prosario@sfx.ca', c:'Tax Director'}"></n:e>
<n:e data="{xi:'97394', a:'Milford Downs', b:'milfodowns@vancouver.com', c:'VP Marketing'}"></n:e>
<n:e data="{xi:'97395', a:'Josephina Cook', b:'joscook@superinternet.com', c:'Procurement Manager'}"></n:e>
<n:e data="{xi:'97887', a:'Mildred Macdonald', b:'mildrmacdon@megadecision.net', c:'Copywriter'}"></n:e>
<n:e data="{xi:'97888', a:'Yon Powell', b:'ypowel@calgary.net', c:'Web Architect'}"></n:e>
<n:e data="{xi:'97889', a:'Sheryl Villarreal', b:'sher_villarreal@extreme.net', c:'Associate'}"></n:e>
<n:e data="{xi:'97890', a:'Refugio Carson', b:'refugcarso@dotsterworld.net', c:'Advertising Manager'}"></n:e>
<n:e data="{xi:'97891', a:'Carolina Delgado', b:'c.delga@halifax.com', c:'Billing Supervisor'}"></n:e>
<n:e data="{xi:'97892', a:'Fredda Haley', b:'frehaley@intl.fr', c:'Advertising Clerk'}"></n:e>
<n:e data="{xi:'97893', a:'Francoise Horn', b:'franhorn@realnews.ca', c:'Tax Director'}"></n:e>
<n:e data="{xi:'97894', a:'Elly Herman', b:'ellherman@professional.com', c:'Payroll Manager'}"></n:e>
<n:e data="{xi:'97895', a:'Latosha Casey', b:'latocasey@zedtec.com', c:'HR Manager'}"></n:e>
<n:e data="{xi:'97896', a:'Nicky Baker', b:'nbaker@tjyworld.com', c:'Advertising Executive'}"></n:e>
<n:e data="{xi:'97897', a:'Darlena Shields', b:'darle.shields@scriptshq.ca', c:'Copywriter'}"></n:e>
<n:e data="{xi:'97898', a:'Dania Wilkerson', b:'dawilke@dotsterworld.net', c:'CEO'}"></n:e>
<n:e data="{xi:'97899', a:'Rhea Fry', b:'r-fry@superinternet.com', c:'President'}"></n:e>
<n:e data="{xi:'97901', a:'Thalia Hyde', b:'thalihyde@aeresources.com', c:'Budget Analyst'}"></n:e>
<n:e data="{xi:'97902', a:'Mikki Reed', b:'mireed@hotmail.com', c:'HR Manager'}"></n:e>
<n:e data="{xi:'97903', a:'Daphine Higgins', b:'daphhiggins@professional.com', c:'Branch Manager'}"></n:e>
<n:e data="{xi:'97904', a:'Tomi Osborn', b:'t-osborn@ebadev.com', c:'Billing Clerk'}"></n:e>
<n:e data="{xi:'97905', a:'Caryl Michael', b:'cary_micha@newyork.com', c:'Auditing Supervisor'}"></n:e>
<n:e data="{xi:'97906', a:'Raeann Savage', b:'r_savage@northvan.com', c:'Office Manager'}"></n:e>
<n:e data="{xi:'97907', a:'Leida Horne', b:'le.horne@caridonet.ca', c:'User Interface Architect'}"></n:e>
<n:e data="{xi:'97908', a:'Parker Lucas', b:'parker_lucas@sharesync.com', c:'C++ Developer'}"></n:e>
<n:e data="{xi:'97909', a:'Joy Randolph', b:'jrandolph@programmer.com', c:'Development Coordinator'}"></n:e>
<n:e data="{xi:'97910', a:'Tula Russo', b:'tularusso@cnn.com', c:'Media Buyer'}"></n:e>
<n:e data="{xi:'97911', a:'Roselle Cote', b:'r.cote@yerta.com', c:'Secretary'}"></n:e>
<n:e data="{xi:'97912', a:'Yan Martin', b:'ymartin@ebusinessapps.com', c:'Budget Analyst'}"></n:e>
<n:e data="{xi:'97913', a:'Vera Newton', b:'vera_newton@megadecision.net', c:'Web Designer'}"></n:e>
<n:e data="{xi:'97914', a:'Yolande Brennan', b:'yola_brennan@qbooks.com', c:'President'}"></n:e>
<n:e data="{xi:'97915', a:'Kimberly Holt', b:'kholt@mydomains.org', c:'Copywriter'}"></n:e>
<n:e data="{xi:'97916', a:'Lorriane Nash', b:'lonash@universalweb.com', c:'VP Purchasing'}"></n:e>
<n:e data="{xi:'97999', a:'Manual Mccoy', b:'mmccoy@fastserver.com', c:'VP Public Relations'}"></n:e>
<n:e data="{xi:'98000', a:'Gwendolyn Lang', b:'gwendolynlang@mie.com', c:'Development Coordinator'}"></n:e>
<n:e data="{xi:'98001', a:'Margaret Hawkins', b:'margarethawkins@election.com', c:'User Interface Architect'}"></n:e>
<n:e data="{xi:'98002', a:'Sandie Glass', b:'sandi.glass@freeinterweb.com', c:'Advertising Sales Director'}"></n:e>
<n:e data="{xi:'98003', a:'Tony Hart', b:'tonyhart@palod.ca', c:'Copywriter'}"></n:e>
<n:e data="{xi:'98004', a:'Ruthie Barry', b:'ruthie_barry@ottawa.ca', c:'Office Manager'}"></n:e>
<n:e data="{xi:'98005', a:'Kayla Fisher', b:'kaylafisher@mezzotop.com', c:'Advertising Sales Director'}"></n:e>
<n:e data="{xi:'98006', a:'Sunny Schneider', b:'suschneide@topreproducer.com', c:'Business Development Manager'}"></n:e>
<n:e data="{xi:'98007', a:'Angelica Pearson', b:'apearson@yerta.com', c:'Advertising Executive'}"></n:e>
<n:e data="{xi:'98008', a:'Ping Henson', b:'phenson@ucase.ca', c:'Sales Promotion Manager'}"></n:e>
<n:e data="{xi:'98009', a:'Jeannette Galloway', b:'jeannegalloway@intl.fr', c:'Advertising Manager'}"></n:e>
<n:e data="{xi:'98010', a:'Alix Burgess', b:'aliburges@ebusinessapps.com', c:'Office Manager'}"></n:e>
<n:e data="{xi:'98011', a:'Dawna Branch', b:'dawnbranch@ajito.net', c:'Advertising Sales Director'}"></n:e>
<n:e data="{xi:'98012', a:'Oralee Gomez', b:'ogomez@pilates.org', c:'Chief Software Architect'}"></n:e>
<n:e data="{xi:'98013', a:'Orval Parsons', b:'orvalparsons@kabama.it', c:'Account Manager'}"></n:e>
<n:e data="{xi:'98014', a:'Conchita Gregory', b:'cgregory@yukatan.net', c:'Marketing Research Executive'}"></n:e>
<n:e data="{xi:'98015', a:'Lindsay Joyner', b:'ljoyne@fastserver.com', c:'VP Finance'}"></n:e>
<n:e data="{xi:'98016', a:'Beula Roman', b:'broman@yayamailserv.net', c:'Bookkeeper'}"></n:e>
<n:e data="{xi:'98017', a:'Jose Lloyd', b:'joselloyd@mozilla.org', c:'Developer'}"></n:e>
<n:e data="{xi:'98018', a:'Kori Christensen', b:'kochristen@appsdom.com', c:'Developer'}"></n:e>
<n:e data="{xi:'98019', a:'Bennett Gilbert', b:'bgilbert@calgary.net', c:'Secretary'}"></n:e>
<n:e data="{xi:'98020', a:'Anabel Lawrence', b:'alawre@universalweb.com', c:'Advertising Sales Director'}"></n:e>
<n:e data="{xi:'98021', a:'Hui Byers', b:'hubyers@flashpoint.org', c:'Media Director'}"></n:e>
<n:e data="{xi:'98022', a:'Loree Hutchinson', b:'lhutchin@dotsterworld.net', c:'Office Manager'}"></n:e>
<n:e data="{xi:'98023', a:'Tomeka Figueroa', b:'t.figue@quickweb.ca', c:'Accountant'}"></n:e>
<n:e data="{xi:'98024', a:'Roy Rosario', b:'royrosario@toronto.com', c:'Tax Director'}"></n:e>
<n:e data="{xi:'98025', a:'Ozie Spencer', b:'ozispencer@professional.com', c:'Director of Development'}"></n:e>
<n:e data="{xi:'98026', a:'Margarito Ruiz', b:'margarruiz@mezzotop.com', c:'HR Manager'}"></n:e>
<n:e data="{xi:'98027', a:'Tamala Thompson', b:'tamathompson@applicationstop.com', c:'VP Business Development'}"></n:e>
<n:e data="{xi:'98028', a:'Tatiana Gallegos', b:'tgalle@ubc.ca', c:'VP Purchasing'}"></n:e>
<n:e data="{xi:'98197', a:'Loris Sandoval', b:'lsandoval@greatresources.net', c:'User Interface Architect'}"></n:e>
<n:e data="{xi:'98198', a:'Lavenia Mccoy', b:'l_mccoy@universalweb.com', c:'Marketing Research Executive'}"></n:e>
<n:e data="{xi:'98199', a:'Claudio Myers', b:'clmyers@aeresources.com', c:'Advertising Executive'}"></n:e>
<n:e data="{xi:'98200', a:'Sanjuanita Newton', b:'sanewton@yayamailserv.net', c:'Director of Innovation'}"></n:e>
<n:e data="{xi:'98201', a:'Myrtle Marks', b:'mmarks@ubc.ca', c:'Media Director'}"></n:e>
<n:e data="{xi:'98202', a:'Merissa Beasley', b:'merissabeasley@quickstyle.com', c:'Auditing Supervisor'}"></n:e>
<n:e data="{xi:'98203', a:'Candance Spence', b:'candaspence@mydomains.org', c:'VP Marketing'}"></n:e>
<n:e data="{xi:'98204', a:'Rosalee Russell', b:'r.russel@gmail.com', c:'Payroll Manager'}"></n:e>
<n:e data="{xi:'98205', a:'Gale Wynn', b:'g.wynn@megadecision.net', c:'Salesperson'}"></n:e>
<n:e data="{xi:'98206', a:'Deonna Sears', b:'deonnasears@sfu.ca', c:'Billing Supervisor'}"></n:e>
<n:e data="{xi:'98207', a:'Shirly Mercado', b:'shirmercado@interchange.ubc.ca', c:'Advertising Executive'}"></n:e>
<n:e data="{xi:'98208', a:'Cammie Martin', b:'cammiemartin@realnews.ca', c:'HR Manager'}"></n:e>
<n:e data="{xi:'98209', a:'Fatima Ochoa', b:'fochoa@newyork.com', c:'VP Research'}"></n:e>
<n:e data="{xi:'98210', a:'Ray Vazquez', b:'ray.vazquez@ebusinessapps.com', c:'VP Public Relationsrtrr'}"></n:e>
<n:e data="{xi:'98211', a:'Johnny Fleming', b:'johnnyfleming@freeinterweb.com', c:'Analyst'}"></n:e>
<n:e data="{xi:'98212', a:'Noma Green', b:'n.green@calgary.net', c:'Marketing Assistant'}"></n:e>
<n:e data="{xi:'98213', a:'Eura Barron', b:'eubarron@gov.sask.ca', c:'Chief Software Architect'}"></n:e>
<n:e data="{xi:'98214', a:'Dreama Moody', b:'dreamamoody@calgary.net', c:'VP Sales and Marketing'}"></n:e>
<n:e data="{xi:'98215', a:'Kimbery Cross', b:'kicross@palod.ca', c:'Director of Innovation'}"></n:e>
<n:e data="{xi:'98216', a:'Magnolia Rosario', b:'magn_rosar@purosync.net', c:'Payroll Manager'}"></n:e>
<n:e data="{xi:'98217', a:'Jame Daniel', b:'jdani@caridonet.ca', c:'Brand Manager'}"></n:e>
<n:e data="{xi:'98218', a:'Lonnie Reeves', b:'lonn.reeves@yayamailserv.net', c:'Marketing Research Executive'}"></n:e>
<n:e data="{xi:'98219', a:'Blossom Sharpe', b:'bsharpe@mydomains.org', c:'Bookkeeper'}"></n:e>
<n:e data="{xi:'98220', a:'Joel Hampton', b:'jhampt@kabama.it', c:'HR Manager'}"></n:e>
<n:e data="{xi:'98221', a:'Magda Roberts', b:'magrober@dbtestdata.com', c:'Purchaser'}"></n:e>
<n:e data="{xi:'98222', a:'Toby Phillips', b:'toby_phillips@flashpoint.org', c:'Associate'}"></n:e>
<n:e data="{xi:'98223', a:'Ahmed Ferrell', b:'ahmeferrell@glue.it.com', c:'Budget Analyst'}"></n:e>
<n:e data="{xi:'98224', a:'Lazaro Gutierrez', b:'lgutierre@cipdr.fr', c:'Analyst'}"></n:e>
<n:e data="{xi:'98225', a:'Cheryle Keith', b:'cher-keith@caridonet.ca', c:'Procurement Director'}"></n:e>
<n:e data="{xi:'98226', a:'Celena Elliott', b:'cel_elliott@ucase.ca', c:'Salesperson'}"></n:e>
</n:data>
</n:dataSource>
</n:dataSources>
</n:grid>


</f:view>
</div>
</body>
</html>