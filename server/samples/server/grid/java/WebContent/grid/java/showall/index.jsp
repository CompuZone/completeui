<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.nitobi.com" prefix="ntb" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link type="text/css" rel="stylesheet" href="../../../common/style/samples.css"></link>

<title>Nitobi Grid Demos - Show All</title>
</head>
<body>
<p class="intro">In ShowAll mode, grid will retrieve every row available to it up-front and 
	display it - irrespective of its size. This makes sense if you need all of the data available 
	on the client at once, for example if you needed to use it somewhere else on the page or 
	perform calculations. ShowAll mode works with both <code>static</code> (embedded in the 
	HTML) or <code>dynamic</code> data (via ajax requests).</p>
	<ul class="instructions">
		<li class="heading">Local Data:</li>
		<li>The data is embedded in the page.</li>
		<li>As the gird loads it renders every available row.</li>
	</ul>	  	  
	<ntb:grid id="ShowAllGrid1" 
	  width="630"
	  height="200"
	  mode="localnonpaging" 
	  datasourceid="data" 
	  toolbarenabled="true"
	  toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	  componentcssurl="../../../common/style/nitobi.grid.css"
	  componentjsurl="../../../common/script/nitobi.grid.js">
	 <ntb:datasources>
		<ntb:datasource id="data">
		<ntb:datasourcestructure fieldnames="ContactName|ContactEmail|JobTitle|CompanyName|PhoneNumber|Address"  keys="ContactName"></ntb:datasourcestructure>
			
	<ntb:data>
					
		<ntb:e data="{xi:'97382', a:'Tammara Farley', b:'tamfarley@halifax.com', c:'Media Director'}"></ntb:e>
		<ntb:e data="{xi:'97383', a:'Dwana Barton', b:'dwabarton@ebadev.com', c:'Budget Analyst'}"></ntb:e>
		<ntb:e data="{xi:'97384', a:'Mercedes Carpenter', b:'mcarpenter@purosync.net', c:'Finance Manager'}"></ntb:e>
		<ntb:e data="{xi:'97385', a:'Lucas Blake', b:'lblak@freeinterweb.com', c:'Marketing Manager'}"></ntb:e>
		<ntb:e data="{xi:'97386', a:'Lilli Bender', b:'lbender@sharesync.com', c:'Purchaser'}"></ntb:e>
		<ntb:e data="{xi:'97387', a:'Jose Bishop', b:'josebishop@voxcom.ca', c:'Branch Manager'}"></ntb:e>
		<ntb:e data="{xi:'97388', a:'Emilia Foster', b:'efoster@extreme.net', c:'Payroll Manager'}"></ntb:e>
		<ntb:e data="{xi:'97389', a:'Vernice Young', b:'veyoung@glue.it.com', c:'Developer'}"></ntb:e>
		<ntb:e data="{xi:'97390', a:'Cyrstal House', b:'chouse@universalweb.com', c:'Product Manager'}"></ntb:e>
		<ntb:e data="{xi:'97391', a:'Lindsay Cohen', b:'lindsaycohen@jitterbug.org', c:'Developer'}"></ntb:e>
		<ntb:e data="{xi:'97392', a:'Amalia Oneal', b:'amaoneal@flashpoint.org', c:'Business Development Manager'}"></ntb:e>
		<ntb:e data="{xi:'97393', a:'Pasty Rosario', b:'prosario@sfx.ca', c:'Tax Director'}"></ntb:e>
		<ntb:e data="{xi:'97394', a:'Milford Downs', b:'milfodowns@vancouver.com', c:'VP Marketing'}"></ntb:e>
		<ntb:e data="{xi:'97395', a:'Josephina Cook', b:'joscook@superinternet.com', c:'Procurement Manager'}"></ntb:e>
		<ntb:e data="{xi:'97887', a:'Mildred Macdonald', b:'mildrmacdon@megadecision.net', c:'Copywriter'}"></ntb:e>
		<ntb:e data="{xi:'97888', a:'Yon Powell', b:'ypowel@calgary.net', c:'Web Architect'}"></ntb:e>
		<ntb:e data="{xi:'97889', a:'Sheryl Villarreal', b:'sher_villarreal@extreme.net', c:'Associate'}"></ntb:e>
		<ntb:e data="{xi:'97890', a:'Refugio Carson', b:'refugcarso@dotsterworld.net', c:'Advertising Manager'}"></ntb:e>
		<ntb:e data="{xi:'97891', a:'Carolina Delgado', b:'c.delga@halifax.com', c:'Billing Supervisor'}"></ntb:e>
		<ntb:e data="{xi:'97892', a:'Fredda Haley', b:'frehaley@intl.fr', c:'Advertising Clerk'}"></ntb:e>
		<ntb:e data="{xi:'97893', a:'Francoise Horn', b:'franhorn@realnews.ca', c:'Tax Director'}"></ntb:e>
		<ntb:e data="{xi:'97894', a:'Elly Herman', b:'ellherman@professional.com', c:'Payroll Manager'}"></ntb:e>
		<ntb:e data="{xi:'97895', a:'Latosha Casey', b:'latocasey@zedtec.com', c:'HR Manager'}"></ntb:e>
		<ntb:e data="{xi:'97896', a:'Nicky Baker', b:'nbaker@tjyworld.com', c:'Advertising Executive'}"></ntb:e>
		<ntb:e data="{xi:'97897', a:'Darlena Shields', b:'darle.shields@scriptshq.ca', c:'Copywriter'}"></ntb:e>
		<ntb:e data="{xi:'97898', a:'Dania Wilkerson', b:'dawilke@dotsterworld.net', c:'CEO'}"></ntb:e>
		<ntb:e data="{xi:'97899', a:'Rhea Fry', b:'r-fry@superinternet.com', c:'President'}"></ntb:e>
		<ntb:e data="{xi:'97901', a:'Thalia Hyde', b:'thalihyde@aeresources.com', c:'Budget Analyst'}"></ntb:e>
		<ntb:e data="{xi:'97902', a:'Mikki Reed', b:'mireed@hotmail.com', c:'HR Manager'}"></ntb:e>
		<ntb:e data="{xi:'97903', a:'Daphine Higgins', b:'daphhiggins@professional.com', c:'Branch Manager'}"></ntb:e>
		<ntb:e data="{xi:'97904', a:'Tomi Osborn', b:'t-osborn@ebadev.com', c:'Billing Clerk'}"></ntb:e>
		<ntb:e data="{xi:'97905', a:'Caryl Michael', b:'cary_micha@newyork.com', c:'Auditing Supervisor'}"></ntb:e>
		<ntb:e data="{xi:'97906', a:'Raeann Savage', b:'r_savage@northvan.com', c:'Office Manager'}"></ntb:e>
		<ntb:e data="{xi:'97907', a:'Leida Horne', b:'le.horne@caridonet.ca', c:'User Interface Architect'}"></ntb:e>
		<ntb:e data="{xi:'97908', a:'Parker Lucas', b:'parker_lucas@sharesync.com', c:'C++ Developer'}"></ntb:e>
		<ntb:e data="{xi:'97909', a:'Joy Randolph', b:'jrandolph@programmer.com', c:'Development Coordinator'}"></ntb:e>
		<ntb:e data="{xi:'97910', a:'Tula Russo', b:'tularusso@cnn.com', c:'Media Buyer'}"></ntb:e>
		<ntb:e data="{xi:'97911', a:'Roselle Cote', b:'r.cote@yerta.com', c:'Secretary'}"></ntb:e>
		<ntb:e data="{xi:'97912', a:'Yan Martin', b:'ymartin@ebusinessapps.com', c:'Budget Analyst'}"></ntb:e>
		<ntb:e data="{xi:'97913', a:'Vera Newton', b:'vera_newton@megadecision.net', c:'Web Designer'}"></ntb:e>
		<ntb:e data="{xi:'97914', a:'Yolande Brennan', b:'yola_brennan@qbooks.com', c:'President'}"></ntb:e>
		<ntb:e data="{xi:'97915', a:'Kimberly Holt', b:'kholt@mydomains.org', c:'Copywriter'}"></ntb:e>
		<ntb:e data="{xi:'97916', a:'Lorriane Nash', b:'lonash@universalweb.com', c:'VP Purchasing'}"></ntb:e>
		<ntb:e data="{xi:'97999', a:'Manual Mccoy', b:'mmccoy@fastserver.com', c:'VP Public Relations'}"></ntb:e>
		<ntb:e data="{xi:'98000', a:'Gwendolyn Lang', b:'gwendolynlang@mie.com', c:'Development Coordinator'}"></ntb:e>
		<ntb:e data="{xi:'98001', a:'Margaret Hawkins', b:'margarethawkins@election.com', c:'User Interface Architect'}"></ntb:e>
		<ntb:e data="{xi:'98002', a:'Sandie Glass', b:'sandi.glass@freeinterweb.com', c:'Advertising Sales Director'}"></ntb:e>
		<ntb:e data="{xi:'98003', a:'Tony Hart', b:'tonyhart@palod.ca', c:'Copywriter'}"></ntb:e>
		<ntb:e data="{xi:'98004', a:'Ruthie Barry', b:'ruthie_barry@ottawa.ca', c:'Office Manager'}"></ntb:e>
		<ntb:e data="{xi:'98005', a:'Kayla Fisher', b:'kaylafisher@mezzotop.com', c:'Advertising Sales Director'}"></ntb:e>
		<ntb:e data="{xi:'98006', a:'Sunny Schneider', b:'suschneide@topreproducer.com', c:'Business Development Manager'}"></ntb:e>
		<ntb:e data="{xi:'98007', a:'Angelica Pearson', b:'apearson@yerta.com', c:'Advertising Executive'}"></ntb:e>
		<ntb:e data="{xi:'98008', a:'Ping Henson', b:'phenson@ucase.ca', c:'Sales Promotion Manager'}"></ntb:e>
		<ntb:e data="{xi:'98009', a:'Jeannette Galloway', b:'jeannegalloway@intl.fr', c:'Advertising Manager'}"></ntb:e>
		<ntb:e data="{xi:'98010', a:'Alix Burgess', b:'aliburges@ebusinessapps.com', c:'Office Manager'}"></ntb:e>
		<ntb:e data="{xi:'98011', a:'Dawna Branch', b:'dawnbranch@ajito.net', c:'Advertising Sales Director'}"></ntb:e>
		<ntb:e data="{xi:'98012', a:'Oralee Gomez', b:'ogomez@pilates.org', c:'Chief Software Architect'}"></ntb:e>
		<ntb:e data="{xi:'98013', a:'Orval Parsons', b:'orvalparsons@kabama.it', c:'Account Manager'}"></ntb:e>
		<ntb:e data="{xi:'98014', a:'Conchita Gregory', b:'cgregory@yukatan.net', c:'Marketing Research Executive'}"></ntb:e>
		<ntb:e data="{xi:'98015', a:'Lindsay Joyner', b:'ljoyne@fastserver.com', c:'VP Finance'}"></ntb:e>
		<ntb:e data="{xi:'98016', a:'Beula Roman', b:'broman@yayamailserv.net', c:'Bookkeeper'}"></ntb:e>
		<ntb:e data="{xi:'98017', a:'Jose Lloyd', b:'joselloyd@mozilla.org', c:'Developer'}"></ntb:e>
		<ntb:e data="{xi:'98018', a:'Kori Christensen', b:'kochristen@appsdom.com', c:'Developer'}"></ntb:e>
		<ntb:e data="{xi:'98019', a:'Bennett Gilbert', b:'bgilbert@calgary.net', c:'Secretary'}"></ntb:e>
		<ntb:e data="{xi:'98020', a:'Anabel Lawrence', b:'alawre@universalweb.com', c:'Advertising Sales Director'}"></ntb:e>
		<ntb:e data="{xi:'98021', a:'Hui Byers', b:'hubyers@flashpoint.org', c:'Media Director'}"></ntb:e>
		<ntb:e data="{xi:'98022', a:'Loree Hutchinson', b:'lhutchin@dotsterworld.net', c:'Office Manager'}"></ntb:e>
		<ntb:e data="{xi:'98023', a:'Tomeka Figueroa', b:'t.figue@quickweb.ca', c:'Accountant'}"></ntb:e>
		<ntb:e data="{xi:'98024', a:'Roy Rosario', b:'royrosario@toronto.com', c:'Tax Director'}"></ntb:e>
		<ntb:e data="{xi:'98025', a:'Ozie Spencer', b:'ozispencer@professional.com', c:'Director of Development'}"></ntb:e>
		<ntb:e data="{xi:'98026', a:'Margarito Ruiz', b:'margarruiz@mezzotop.com', c:'HR Manager'}"></ntb:e>
		<ntb:e data="{xi:'98027', a:'Tamala Thompson', b:'tamathompson@applicationstop.com', c:'VP Business Development'}"></ntb:e>
		<ntb:e data="{xi:'98028', a:'Tatiana Gallegos', b:'tgalle@ubc.ca', c:'VP Purchasing'}"></ntb:e>
		<ntb:e data="{xi:'98197', a:'Loris Sandoval', b:'lsandoval@greatresources.net', c:'User Interface Architect'}"></ntb:e>
		<ntb:e data="{xi:'98198', a:'Lavenia Mccoy', b:'l_mccoy@universalweb.com', c:'Marketing Research Executive'}"></ntb:e>
		<ntb:e data="{xi:'98199', a:'Claudio Myers', b:'clmyers@aeresources.com', c:'Advertising Executive'}"></ntb:e>
		<ntb:e data="{xi:'98200', a:'Sanjuanita Newton', b:'sanewton@yayamailserv.net', c:'Director of Innovation'}"></ntb:e>
		<ntb:e data="{xi:'98201', a:'Myrtle Marks', b:'mmarks@ubc.ca', c:'Media Director'}"></ntb:e>
		<ntb:e data="{xi:'98202', a:'Merissa Beasley', b:'merissabeasley@quickstyle.com', c:'Auditing Supervisor'}"></ntb:e>
		<ntb:e data="{xi:'98203', a:'Candance Spence', b:'candaspence@mydomains.org', c:'VP Marketing'}"></ntb:e>
		<ntb:e data="{xi:'98204', a:'Rosalee Russell', b:'r.russel@gmail.com', c:'Payroll Manager'}"></ntb:e>
		<ntb:e data="{xi:'98205', a:'Gale Wynn', b:'g.wynn@megadecision.net', c:'Salesperson'}"></ntb:e>
		<ntb:e data="{xi:'98206', a:'Deonna Sears', b:'deonnasears@sfu.ca', c:'Billing Supervisor'}"></ntb:e>
		<ntb:e data="{xi:'98207', a:'Shirly Mercado', b:'shirmercado@interchange.ubc.ca', c:'Advertising Executive'}"></ntb:e>
		<ntb:e data="{xi:'98208', a:'Cammie Martin', b:'cammiemartin@realnews.ca', c:'HR Manager'}"></ntb:e>
		<ntb:e data="{xi:'98209', a:'Fatima Ochoa', b:'fochoa@newyork.com', c:'VP Research'}"></ntb:e>
		<ntb:e data="{xi:'98210', a:'Ray Vazquez', b:'ray.vazquez@ebusinessapps.com', c:'VP Public Relationsrtrr'}"></ntb:e>
		<ntb:e data="{xi:'98211', a:'Johnny Fleming', b:'johnnyfleming@freeinterweb.com', c:'Analyst'}"></ntb:e>
		<ntb:e data="{xi:'98212', a:'Noma Green', b:'n.green@calgary.net', c:'Marketing Assistant'}"></ntb:e>
		<ntb:e data="{xi:'98213', a:'Eura Barron', b:'eubarron@gov.sask.ca', c:'Chief Software Architect'}"></ntb:e>
		<ntb:e data="{xi:'98214', a:'Dreama Moody', b:'dreamamoody@calgary.net', c:'VP Sales and Marketing'}"></ntb:e>
		<ntb:e data="{xi:'98215', a:'Kimbery Cross', b:'kicross@palod.ca', c:'Director of Innovation'}"></ntb:e>
		<ntb:e data="{xi:'98216', a:'Magnolia Rosario', b:'magn_rosar@purosync.net', c:'Payroll Manager'}"></ntb:e>
		<ntb:e data="{xi:'98217', a:'Jame Daniel', b:'jdani@caridonet.ca', c:'Brand Manager'}"></ntb:e>
		<ntb:e data="{xi:'98218', a:'Lonnie Reeves', b:'lonn.reeves@yayamailserv.net', c:'Marketing Research Executive'}"></ntb:e>
		<ntb:e data="{xi:'98219', a:'Blossom Sharpe', b:'bsharpe@mydomains.org', c:'Bookkeeper'}"></ntb:e>
		<ntb:e data="{xi:'98220', a:'Joel Hampton', b:'jhampt@kabama.it', c:'HR Manager'}"></ntb:e>
		<ntb:e data="{xi:'98221', a:'Magda Roberts', b:'magrober@dbtestdata.com', c:'Purchaser'}"></ntb:e>
		<ntb:e data="{xi:'98222', a:'Toby Phillips', b:'toby_phillips@flashpoint.org', c:'Associate'}"></ntb:e>
		<ntb:e data="{xi:'98223', a:'Ahmed Ferrell', b:'ahmeferrell@glue.it.com', c:'Budget Analyst'}"></ntb:e>
		<ntb:e data="{xi:'98224', a:'Lazaro Gutierrez', b:'lgutierre@cipdr.fr', c:'Analyst'}"></ntb:e>
		<ntb:e data="{xi:'98225', a:'Cheryle Keith', b:'cher-keith@caridonet.ca', c:'Procurement Director'}"></ntb:e>
		<ntb:e data="{xi:'98226', a:'Celena Elliott', b:'cel_elliott@ucase.ca', c:'Salesperson'}"></ntb:e>
	</ntb:data>
	</ntb:datasource>
	  </ntb:datasources>  
	  <ntb:columns>
		  <ntb:textcolumn   label="Contact Name"    xdatafld="ContactName"		width="200"></ntb:textcolumn>
		  <ntb:textcolumn 	label="Contact Email"  	xdatafld="ContactEmail"     width="200"></ntb:textcolumn>
		  <ntb:textcolumn 	label="Job Title"  		xdatafld="JobTitle"    		width="200"></ntb:textcolumn>
      </ntb:columns>
	</ntb:grid>
      <ul class="instructions">
        <li class="heading">Remote Data:</li>
        <li>The <code>getHandler</code> is invoked to provide all the data for this grid in one request.</li>
        <li>Upon receiving the data, the grid renders every row.</li>
      </ul>
    <ntb:grid id="ShowAllGrid2" 
	  width="630"
	  height="210"
	  mode="nonpaging"
	  gethandler="get"
	  toolbarenabled="true"
	  toolkitjsurl="../../../common/script/nitobi.toolkit.js"
	  componentcssurl="../../../common/style/nitobi.grid.css"
	  componentjsurl="../../../common/script/nitobi.grid.js">
	</ntb:grid>
</body>
</html>