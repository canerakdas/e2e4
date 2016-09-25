document.addEventListener('DOMContentLoaded', function(){
	//
	// __________E2:E4__________
	// |π_|Ω_|λ_|ε_|ĉ_|λ_|Ω_|π_| 8
	// |x_|x_|x_|x_|x_|x_|x_|x_| 7
	// |__|__|__|__|__|__|__|__| 6
	// |__|__|__|__|__|__|__|__| 5
	// |__|__|__|__|_x|__|__|__| 4
	// |__|__|__|__|__|__|__|__| 3
	// |_x|_x|_x|_x|__|_x|_x|_x| 2
	// |_π|_Ω|_λ|_ε|_ĉ|_λ|_Ω|_π| 1
	//   A  B  C  D  E  F  G  H
	//
	// Caner Akdaş
	// 
	//@line:939
	/**
	 * E2:E4 Constructor
	 * @param  {method} config 
	 * @return {bool}        
	 */
	 function e2e4(config){
	 	try{
	 		this.config=config||e2e4.config;
	 		this.lang=e2e4.lang;
	 		this.classes=e2e4.classes;
	 		this.ids=e2e4.ids;
	 		this.keycodes=e2e4.keycodes;
	 		this.attribute=e2e4.attribute;
	 		this.object=new Array();
	 		this.top=document.getElementById(this.ids.CONTAINER).offsetTop;
	 		this.left=document.getElementById(this.ids.CONTAINER).offsetLeft;
	 		if('Promise' in window){
	 			this.resize().then(function(){this.resize}).catch(function(){alert("hi")});
	 		}
	 		else{
	 			this.resize();
	 		}
	 		
	 	}
	 	catch(error){
	 		this.log(error.message,error.lineNumber,error.fileName,error.__proto__);
	 	}
	 };

	 e2e4.config={
	 	ID:0,
	 	NAME:"",
	 	DEV_MODE:true,
	 	WIDTH:0,
	 	HEIGHT:0,
	 	MEASUREMENT:"px",
	 	BACKGROUND_COLOR:"#ffffff"
	 };

	 e2e4.lang={
	 	NODE:"Düğüm",
	 	LINE:"Kenar",
	 	ARC:"Çoklu Kenar",
	 	DEFAULT_FILE_NAME:"Başlıksız Çizge 1",
	 	WIDTH:"Genişlik",
	 	HEIGHT:"Yükseklik",
	 	OK:"Tamam",
	 	KOALA_RESIZE_TITLE:"Çizgeyi Boyutlandır",
	 	NODE_COLOR:"Düğüm Rengi",
	 	NODE_TOLERANCE:"Düğüm Toleransı",
	 	NODE_SIZE:"Düğüm Yarıçapı",
	 	LAYER_TITLE:"Katmanlar",
	 	LINE_SIZE:"Kenar Kalınlığı",
	 	LINE_TOLERANCE:"Düğüm Toleransı",
	 	LINE_COLOR:"Kenar Rengi",
	 	RULER_SIZE:"Çizgi Kalınlığı",
	 	RULER_X_LINE_SPACE:"Yatay Çizgi Boşluğu",
	 	RULER_Y_LINE_SPACE:"Dikey Çizgi Boşluğu",
	 	RULER_X_LINE_COLOR:"Yatay Çizgi Rengi",
	 	RULER_Y_LINE_COLOR:"Dikey Çizgi Rengi",
	 	RULLER_OPTIONS:"Cetvel Ayarları",
	 	ARC_LINE_SIZE:"Eğri Kalınlığı",
	 	ARC_LINE_COLOR:"Eğri Rengi",
	 	ARC_CPX1:'Eğri Kontrol Noktası X1',
	 	ARC_CPY1:'Eğri Kontrol Noktası Y1',
	 	ARC_CPX2:'Eğri Kontrol Noktası X2',
	 	ARC_CPY2:'Eğri Kontrol Noktası Y2',
	 };

	 e2e4.keycodes={
	 	LEFT_CLICK:1,
	 	RIGHT_CLICK:3,
	 	MIDDLE_CLICK:2,
	 	SHIFT:16,
	 	CTRL:17,
	 	ALTGR:225,
	 	ALT:18,
	 };

	 e2e4.classes={
	 };

	 e2e4.ids={
	 	HEADER:'header',
	 	CONTAINER:'canvas-container',
	 	KOALA_INPUT_WIDTH:'koala-input-width',
	 	KOALA_INPUT_HEIGHT:'koala-input-height',
	 	KOALA_BUTTON_RESIZE:'koala-button-resize',
	 };

	 e2e4.attribute={
	 	CANVAS_ID:'canvas-id',
	 	LAYER_LINK:'layer-link',
	 	SELECTED:'selected',
	 	MOUSE_DOWN:'onmousedown',
	 	MOUSE_UP:'onmouseup',
	 };

	 e2e4.prototype={
		/**
		 * Log error
		 * @param  {string} message    
		 * @param  {number} lineNumber 
		 * @param  {string} fileName   
		 * @param  {string} proto      
		 * @return {bool}            
		 */
		 log: function(message,lineNumber,fileName,proto){
		 	if(this.config.DEV_MODE===true){
		 		this.log_= new koalaBox("message",500);
		 		this.log_.errorBox(message,lineNumber,fileName,proto);
		 		return false;
		 	}
		 },
	/**
	 * Scaling workspace :toolbox :layer :guide constructor
	 * @return {bool} 
	 */
	 resize:function(){
	 	try{
	 		this.window= new koalaBox(this.lang.KOALA_RESIZE_TITLE,500);
	 		this.window.input(this.ids.KOALA_INPUT_WIDTH,this.lang.WIDTH,window.innerWidth-5);
	 		this.window.input(this.ids.KOALA_INPUT_HEIGHT,this.lang.HEIGHT,window.innerHeight-70);
	 		this.window.button(this.ids.KOALA_BUTTON_RESIZE,this.lang.OK);
	 		document.getElementById(this.ids.KOALA_BUTTON_RESIZE).onclick=function(){
	 			for(index in koalaReturn){
	 				if(!document.getElementById(koalaReturn[index].id).getAttribute("value")){
	 					koalaReturn[index].value=document.getElementById(koalaReturn[index].id).value;
	 				}
	 				else{
	 					koalaReturn[index].value=document.getElementById(koalaReturn[index].id).getAttribute("value");
	 				}
	 			}
	 			e2e4.config.WIDTH=koalaReturn[0].value;
	 			e2e4.config.HEIGHT=koalaReturn[1].value;
	 			e2e4.guide=new guide();
	 			e2e4.guide.resize(e2e4.config.WIDTH,e2e4.config.HEIGHT);
	 			koalaClose();
	 			e2e4.initialize();
	 		}
	 		return Promise.resolve();
	 	}
	 	catch(error){
	 		return Promise.reject();
	 	}
	 },
	 /**
	  * Initialize E2:E4
	  * @return {bool} 
	  */
	  initialize: function(){
	  	try{
	  		e2e4.toolbox=new toolbox();
	  		e2e4.layer=new layer();
	  		e2e4.ruler=new ruler();
	  		e2e4.select=new select();
	  		return true;
	  	}
	  	catch(error){
	  		this.log(error.message,error.lineNumber,error.fileName,error.__proto__);
	  	}
	  }
	};

	var e2e4= new e2e4(e2e4.config);

	function toolbox(){
		try{
			this.config=toolbox.config;
			this.ids=toolbox.ids;
			this.classes=toolbox.classes;
			this.lang=e2e4.lang;
			this.create();
		}
		catch(error){
			this.log(error.message,error.lineNumber,error.fileName,error.__proto__);
		}
	};

	toolbox.ids={
		TOOLBOX:'ui-toolbox',
		TOOLBOX_AREA_1:'toolbox-list-1',
		TOOLBOX_AREA_2:'toolbox-list-2',
		TOOLBOX_AREA_3:'toolbox-list-3',
		TOOLBOX_MOVE:'toolbox-movable',
		TOOLBOX_SELECT:'toolbox-select',
		TOOLBOX_LINE:'toolbox-linenode',
		TOOLBOX_NODE:'toolbox-node',
		TOOLBOX_ARC:'toolbox-arc',
		TOOLBOX_NODE_NUMBER:'toolbox-nodeNumber',
		TOOLBOX_RULER:'toolbox-ruler',
		TOOLBOX_BACKGROUND:'toolbox-background',
		TOOLBOX_INPUT:'toolbox-input-',
		TOOLBOX_NODE_COLOR:'',
		TOOLBOX_NODE_SIZE:'',
		TOOLBOX_NODE_TOLERANCE:'',
		TOOLBOX_LINE_SIZE:'',
		TOOLBOX_LINE_COLOR:'',
		TOOLBOX_LINE_TOLERANCE:'',
		TOOLBOX_RULER_SIZE:'',
		TOOLBOX_RULER_X_LINE_COLOR:'',
		TOOLBOX_RULER_Y_LINE_COLOR:'',
		TOOLBOX_RULER_X_LINE_SPACE:'',
		TOOLBOX_RULER_Y_LINE_SPACE:'',
		TOOLBOX_ARC_LINE_SIZE:'',
		TOOLBOX_ARC_LINE_COLOR:'',
		TOOLBOX_ARC_CPX1:'',
		TOOLBOX_ARC_CPY1:'',
		TOOLBOX_ARC_CPX2:'',
		TOOLBOX_ARC_CPY2:'',
	};

	toolbox.classes={
		TOOLBOX_ACTIVE:'active',
		TOOLBOX_STICK:'stick',
		TOOLBOX_FOCUS:'focus',
		TOOLBOX_CONTAINER:'toolbox-container',
		TOOLBOX_ITEM:'toolbox-item',
		TOOLBOX_RECT:'toolbox-rect',
		ITEM:'toolbox-item-'
	};

	toolbox.config={
		MARGIN_LEFT:7,
		MARGIN_TOP:90,
		TOOLBOX_SELECT:1,
		TOOLBOX_LINE:2,
		TOOLBOX_NODE:2,
		TOOLBOX_ARC:2,
		TOOLBOX_NODE_NUMBER:3,
		TOOLBOX_RULER:3,
		TOOLBOX_BACKGROUND:3
	};

	toolbox.prototype={
		/**
		 * Creating toolbox
		 * @return {bool} 
		 */
		 create: function(){
		 	try{
		 		this.toolbox_=document.createElement('div');
		 		this.toolbox_.id=this.ids.TOOLBOX;
		 		this.toolbox_.style.left=this.config.MARGIN_LEFT+this.config.MEASUREMENT;
		 		this.toolbox_.style.top=this.config.MARGIN_TOP+this.config.MEASUREMENT;
		 		document.body.appendChild(this.toolbox_);

		 		this.movable_=document.createElement('div');
		 		this.movable_.id=this.ids.TOOLBOX_MOVE;
		 		document.getElementById(this.ids.TOOLBOX).appendChild(this.movable_);
		 		document.getElementById(this.ids.TOOLBOX_MOVE).addEventListener('mousedown', mouseDown, false);
		 		window.addEventListener('mouseup', mouseUp, false);

		 		this.list_1=document.createElement('ul');
		 		this.list_1.id=this.ids.TOOLBOX_AREA_1;
		 		document.getElementById(this.ids.TOOLBOX).appendChild(this.list_1);

		 		this.list_2=document.createElement('ul');
		 		this.list_2.id=this.ids.TOOLBOX_AREA_2;
		 		document.getElementById(this.ids.TOOLBOX).appendChild(this.list_2);

		 		this.list_3=document.createElement('ul');
		 		this.list_3.id=this.ids.TOOLBOX_AREA_3;
		 		document.getElementById(this.ids.TOOLBOX).appendChild(this.list_3);

		 		this.id=0;
		 		this.memory=new Array();


		 		this.addTool(this.ids.TOOLBOX_SELECT,this.config.TOOLBOX_SELECT,this.classes.TOOLBOX_ACTIVE,select.config.SELECT);

		 		this.addTool(this.ids.TOOLBOX_NODE,this.config.TOOLBOX_NODE,this.classes.TOOLBOX_ACTIVE,node.config.NODE);
		 		this.addTool(this.ids.TOOLBOX_LINE,this.config.TOOLBOX_LINE,this.classes.TOOLBOX_ACTIVE,line.config.LINE);
		 		this.addTool(this.ids.TOOLBOX_ARC,this.config.TOOLBOX_ARC,this.classes.TOOLBOX_ACTIVE,arc.config.ARC);

		 		this.addTool(this.ids.TOOLBOX_RULER,this.config.TOOLBOX_RULER,this.classes.TOOLBOX_STICK,ruler.config.RULER);

		 		return true;
		 	}
		 	catch(error){
		 		e2e4.log(error.message,error.lineNumber,error.fileName,error.__proto__);
		 	}
		 },
	/**
	 * @param {string} tool    
	 * @param {bool} tab    
	 * @param {string} type    
	 * @param {bool} trigger
	 * @return {bool} 
	 */
	 addTool: function(tool,tab,type,trigger){
	 	try{
			/*
			* Set the tool place
			*/
			if(tab===1){
				this.item=document.createElement('li');
				this.item.id=tool;
				document.getElementById(this.ids.TOOLBOX_AREA_1).appendChild(this.item);
			}
			else if(tab===2){
				this.item=document.createElement('li');
				this.item.id=tool;
				document.getElementById(this.ids.TOOLBOX_AREA_2).appendChild(this.item);
			}
			else if(tab===3){
				this.item=document.createElement('li');
				this.item.id=tool;
				document.getElementById(this.ids.TOOLBOX_AREA_3).appendChild(this.item);
			}
			/*
			* Tool settings
			*/
			if(tool===toolbox.ids.TOOLBOX_SELECT){
			}
			else if(tool===toolbox.ids.TOOLBOX_NODE){
				this.content(tool,node.config.TOOLBOX_ID);

				this.ids.TOOLBOX_NODE_SIZE=this.ids.TOOLBOX_INPUT+this.id;
				this.addInput(this.classes.TOOLBOX_CONTAINER+node.config.TOOLBOX_ID,this.ids.TOOLBOX_NODE_SIZE,this.lang.NODE_SIZE,node.config.NODE_SIZE,'text');

				//this.ids.TOOLBOX_NODE_TOLERANCE=this.ids.TOOLBOX_INPUT+this.id;
				//this.addInput(this.classes.TOOLBOX_CONTAINER+node.config.TOOLBOX_ID,this.ids.TOOLBOX_NODE_TOLERANCE,this.lang.NODE_TOLERANCE,node.config.NODE_TOLERANCE,'text');

				this.ids.TOOLBOX_NODE_COLOR=this.ids.TOOLBOX_INPUT+this.id;
				this.addInput(this.classes.TOOLBOX_CONTAINER+node.config.TOOLBOX_ID,this.ids.TOOLBOX_NODE_COLOR,this.lang.NODE_COLOR,node.config.NODE_COLOR,'color');
			}
			else if(tool===toolbox.ids.TOOLBOX_LINE){
				this.content(tool,line.config.TOOLBOX_ID);

				this.ids.TOOLBOX_LINE_SIZE=this.ids.TOOLBOX_INPUT+this.id;
				this.addInput(this.classes.TOOLBOX_CONTAINER+line.config.TOOLBOX_ID,this.ids.TOOLBOX_LINE_SIZE,this.lang.LINE_SIZE,line.config.LINE_SIZE,'text');

				this.ids.TOOLBOX_LINE_TOLERANCE=this.ids.TOOLBOX_INPUT+this.id;
				this.addInput(this.classes.TOOLBOX_CONTAINER+line.config.TOOLBOX_ID,this.ids.TOOLBOX_LINE_TOLERANCE,this.lang.LINE_TOLERANCE,line.config.LINE_TOLERANCE,'text');

				this.ids.TOOLBOX_LINE_COLOR=this.ids.TOOLBOX_INPUT+this.id;
				this.addInput(this.classes.TOOLBOX_CONTAINER+line.config.TOOLBOX_ID,this.ids.TOOLBOX_LINE_COLOR,this.lang.LINE_COLOR,line.config.LINE_COLOR,'color');
			}
			else if(tool===toolbox.ids.TOOLBOX_ARC){
				this.content(tool,arc.config.TOOLBOX_ID);

				this.ids.TOOLBOX_ARC_LINE_SIZE=this.ids.TOOLBOX_INPUT+this.id;
				this.addInput(this.classes.TOOLBOX_CONTAINER+arc.config.TOOLBOX_ID,this.ids.TOOLBOX_ARC_LINE_SIZE,this.lang.ARC_LINE_SIZE,arc.config.ARC_SIZE,'text');

				this.ids.TOOLBOX_ARC_LINE_COLOR=this.ids.TOOLBOX_INPUT+this.id;
				this.addInput(this.classes.TOOLBOX_CONTAINER+arc.config.TOOLBOX_ID,this.ids.TOOLBOX_ARC_LINE_COLOR,this.lang.ARC_LINE_COLOR,arc.config.ARC_COLOR,'color');

				this.ids.TOOLBOX_ARC_CPX1=this.ids.TOOLBOX_INPUT+this.id;
				this.addInput(this.classes.TOOLBOX_CONTAINER+arc.config.TOOLBOX_ID,this.ids.TOOLBOX_ARC_CPX1,this.lang.ARC_CPX1,arc.config.ARC_CPX1,'text');

				this.ids.TOOLBOX_ARC_CPY1=this.ids.TOOLBOX_INPUT+this.id;
				this.addInput(this.classes.TOOLBOX_CONTAINER+arc.config.TOOLBOX_ID,this.ids.TOOLBOX_ARC_CPY1,this.lang.ARC_CPY1,arc.config.ARC_CPY1,'text');

				this.ids.TOOLBOX_ARC_CPX2=this.ids.TOOLBOX_INPUT+this.id;
				this.addInput(this.classes.TOOLBOX_CONTAINER+arc.config.TOOLBOX_ID,this.ids.TOOLBOX_ARC_CPX2,this.lang.ARC_CPX2,arc.config.ARC_CPX2,'text');

				this.ids.TOOLBOX_ARC_CPY2=this.ids.TOOLBOX_INPUT+this.id;
				this.addInput(this.classes.TOOLBOX_CONTAINER+arc.config.TOOLBOX_ID,this.ids.TOOLBOX_ARC_CPY2,this.lang.ARC_CPY2,arc.config.ARC_CPY2,'text');

			}
			/*
			* Event control
			*/
			this.control(tool,type,trigger);
			return true;
		}
		catch(error){

		}
	},
	/**
	 * Creating tool settings
	 * @param  {string} tool   
	 * @param  {number} toolId 
	 * @return {bool}        
	 */
	 content: function(tool,toolId){
	 	try{
	 		this.toolboxRect_=document.createElement('div');
	 		this.toolboxRect_.className=this.classes.TOOLBOX_RECT;
	 		document.getElementById(tool).appendChild(this.toolboxRect_);

	 		this.container=document.createElement('div');
	 		this.container.id=this.classes.TOOLBOX_CONTAINER+toolId;
	 		this.container.className=this.classes.TOOLBOX_CONTAINER;
	 		document.getElementById(tool).appendChild(this.container);
	 		return true;
	 	}
	 	catch(error){

	 	}
	 },
	/**
	 * Add input for tool settings
	 * @param {string} refId 
	 * @param {number} id    
	 * @param {string} title 
	 * @param {string} value 
	 * @param {string} type  color,text options
	 */
	 addInput: function(refId,id,title,value,type){
	 	try{
	 		this.item_=document.createElement('div');
	 		this.item_.id=this.classes.ITEM+this.id;
	 		this.item_.className=this.classes.TOOLBOX_ITEM;
	 		document.getElementById(refId).appendChild(this.item_);

	 		this.title_=document.createElement('h3');
	 		this.title_.innerHTML=title;
	 		document.getElementById(this.classes.ITEM+this.id).appendChild(this.title_);

	 		this.input_=document.createElement('input');
	 		this.input_.type=type;
	 		this.input_.id=id;
	 		this.input_.value=value;
	 		document.getElementById(this.classes.ITEM+this.id).appendChild(this.input_);
	 		this.id++;
	 		return true;
	 	}
	 	catch(error){

	 	}
	 },
		/*
		* @{string} id
		* @{string} type
		* @{boolean} trigger
		* Event control options
		*/
		control: function(id,type,trigger){
			try{
				document.getElementById(id).onmousedown = function(e) {

					if(e.which===e2e4.keycodes.LEFT_CLICK){

						if(type===toolbox.classes.TOOLBOX_ACTIVE){
						/*
						* Deactivate all tools
						*/
						for(i=0;i<document.getElementsByClassName(toolbox.classes.TOOLBOX_ACTIVE).length;i++){
							document.getElementsByClassName(toolbox.classes.TOOLBOX_ACTIVE)[i].classList.remove(toolbox.classes.TOOLBOX_ACTIVE);
							node.config.NODE=false;
							line.config.LINE=false;
							guide.config.GUIDE=false;
							arc.config.ARC=false;
							select.config.SELECT=false;
						}
						/*
						* Active selected tool
						*/
						if(id===toolbox.ids.TOOLBOX_SELECT){
							select.config.SELECT=true;
						}
						else if(id===toolbox.ids.TOOLBOX_NODE){
							node.config.NODE=true;
						}
						else if(id===toolbox.ids.TOOLBOX_LINE){
							line.config.LINE=true;
						}
						else if(id===toolbox.ids.TOOLBOX_ARC){
							arc.config.ARC=true;
						}
						document.getElementById(id).classList.add(type);
					}
					else{
						if(trigger===true){
							document.getElementById(id).classList.remove(type);
							trigger=false;
							if(id===toolbox.ids.TOOLBOX_RULER){
								e2e4.ruler.clearRect();
							}
						}
						else{
							document.getElementById(id).classList.add(type);
							trigger=true;
							if(id===toolbox.ids.TOOLBOX_RULER){
								e2e4.ruler.draw();
							}
						}
					}
				}
				else if(e.which===e2e4.keycodes.RIGHT_CLICK){
					/*
					* Ruller settings create
					*/
					if(id===toolbox.ids.TOOLBOX_RULER){
						this.rulerBox=new koalaBox(e2e4.lang.RULLER_OPTIONS,300);
						this.rulerBox.input(ruler.ids.KOALA_RULER_SIZE,e2e4.lang.RULER_SIZE,ruler.config.RULER_SIZE);
						this.rulerBox.input(ruler.ids.KOALA_RULER_X_LINE_SPACE,e2e4.lang.RULER_X_LINE_SPACE,ruler.config.X_LINE_SPACE);
						this.rulerBox.input(ruler.ids.KOALA_RULER_Y_LINE_SPACE,e2e4.lang.RULER_Y_LINE_SPACE,ruler.config.Y_LINE_SPACE);
						this.rulerBox.colorPicker(ruler.ids.KOALA_RULER_X_LINE_COLOR,e2e4.lang.RULER_X_LINE_COLOR,ruler.config.X_LINE_COLOR);
						this.rulerBox.colorPicker(ruler.ids.KOALA_RULER_Y_LINE_COLOR,e2e4.lang.RULER_Y_LINE_COLOR,ruler.config.Y_LINE_COLOR);
						this.rulerBox.button(ruler.ids.KOALA_RULER_BUTTON,e2e4.lang.OK);
						document.getElementById(ruler.ids.KOALA_RULER_BUTTON).onclick=function(){
							for(index in koalaReturn){
								if(document.getElementById(koalaReturn[index].id).getAttribute("value")===null){
									koalaReturn[index].value=document.getElementById(koalaReturn[index].id).value;
								}
								else{
									koalaReturn[index].value=document.getElementById(koalaReturn[index].id).getAttribute("value");
								}
							}
							ruler.config.RULER_SIZE=koalaReturn[0].value;
							ruler.config.X_LINE_SPACE=koalaReturn[1].value;
							ruler.config.Y_LINE_SPACE=koalaReturn[2].value;
							ruler.config.X_LINE_COLOR=koalaReturn[3].value;
							ruler.config.Y_LINE_COLOR=koalaReturn[4].value;
							if(trigger===true){
								e2e4.ruler.clearRect();
								e2e4.ruler.draw();
							}
							koalaClose();
						};
					}
					/*
					* Show tool settings
					*/
					else{
						e2e4.toolbox.close(id);
						//document.getElementById(id).getElementsByClassName(toolbox.classes.TOOLBOX_RECT)[0].style.display="block";
						if(document.getElementById(id).getElementsByClassName(toolbox.classes.TOOLBOX_CONTAINER).length>0){					
							document.getElementById(id).getElementsByClassName(toolbox.classes.TOOLBOX_CONTAINER)[0].style.display="block";
						}
						if(e2e4.toolbox.memory.indexOf(id)<0){
							e2e4.toolbox.memory.push(id);
						}
					}
				}
			}
			return true;
		}
		catch(error){

		}
	},
	/**
	 * Close tool settings
	 * @param  {string} id 
	 * @return {bool}    
	 */
	 close: function(id){
	 	try{
	 		for(i=0;i<document.getElementById(toolbox.ids.TOOLBOX).querySelectorAll('ul').length;i++){
	 			for(j=0;j<document.getElementById(toolbox.ids.TOOLBOX).querySelectorAll('ul')[i].querySelectorAll('li').length;j++){
	 				try{
	 					document.getElementById(toolbox.ids.TOOLBOX).querySelectorAll('ul')[i].querySelectorAll('li')[j].getElementsByClassName(toolbox.classes.TOOLBOX_CONTAINER)[0].style.display="none";
	 					document.getElementById(toolbox.ids.TOOLBOX).querySelectorAll('ul')[i].querySelectorAll('li')[j].getElementsByClassName(toolbox.classes.TOOLBOX_RECT)[0].style.display="none";
	 				}
	 				catch(error){
	 				}
	 			}
	 		}
	 		return true;
	 	}
	 	catch(error){

	 	}
	 },
	};

	function layer(){
		try{
			this.config=layer.config;
			this.ids=layer.ids;
			this.classes=layer.classes;
			this.lang=e2e4.lang;
			this.create();
			this.memory=new Array();
			this.xRect=new Array();
			this.yRect=new Array();
			return true;
		}
		catch(error){

		}
	};

	layer.ids={
		LAYER:'ui-layer',
		LAYER_HEAD:'layer-head',
		LAYER_MOVE:'layer-movable',
		LAYER_LIST:'layer-list',
		LAYER_LABEL:'layer-label',
		LAYER_GUIDE:'layer-guide',
	};

	layer.classes={
		LAYER:'layer',
		LAYER_LINE:'layer-line',
		LAYER_NODE:'layer-node',
		LAYER_ARC:'layer-arc',
		ICON_VISIBLE:'icon-visible',
	};

	layer.config={
		MARGIN_TOP:0,
		MARGIN_LEFT:0,
		LAYER_SEPARATOR:" ",
		LAYER_MEMORY:0,
		LAYER_GUIDE_COLOR:"rgba(76, 76, 76, 0.2)",
		ACTIVE_NODE_COLOR:"rgba(76, 158, 217, 1)",
	};

	layer.prototype={
		/**
		 * Creating Layer
		 * @return {bool} 
		 */
		 create: function(){
		 	try{
		 		this.layer_=document.createElement('div');
		 		this.layer_.id=this.ids.LAYER;
		 		this.layer_.style.left=this.config.MARGIN_LEFT+this.config.MEASUREMENT;
		 		this.layer_.style.top=this.config.MARGIN_TOP+this.config.MEASUREMENT;
		 		document.body.appendChild(this.layer_);

		 		this.head_=document.createElement('h3');
		 		this.head_.id=this.ids.LAYER_HEAD;
		 		this.head_.innerHTML=this.lang.LAYER_TITLE;
		 		document.getElementById(this.ids.LAYER).appendChild(this.head_);

		 		this.movable_=document.createElement('div');
		 		this.movable_.id=this.ids.LAYER_MOVE;
		 		document.getElementById(this.ids.LAYER_HEAD).appendChild(this.movable_);

		 		this.layerList=document.createElement('ul');
		 		this.layerList.id=layer.ids.LAYER_LIST;
		 		document.getElementById(this.ids.LAYER).appendChild(this.layerList);

		 		this.canvas=document.createElement('canvas');
		 		this.canvas.id=this.ids.LAYER_GUIDE;
		 		this.canvas.width=e2e4.config.WIDTH;
		 		this.canvas.height=e2e4.config.HEIGHT;
		 		this.canvas.className=this.classes.LAYER;
		 		document.getElementById(e2e4.ids.CONTAINER).appendChild(this.canvas);
		 		this.canvasCtx = this.canvas.getContext('2d');
		 		return true;
		 	}
		 	catch(error){

		 	}
		 },
	/**
	 * Add layer
	 * @param {string} type      
	 * @param {number} typeCount 
	 * @param {string} name      
	 * @param {string} classes 
	 * @return {bool}  
	 */
	 add: function(type,typeCount,name,classes){
	 	try{
	 		this.layer=document.createElement('li');
	 		this.layer.setAttribute(e2e4.attribute.CANVAS_ID,e2e4.config.ID);
	 		this.layer.setAttribute(e2e4.attribute.LAYER_LINK,layer.classes.LAYER+e2e4.config.ID);
	 		this.layer.setAttribute(e2e4.attribute.SELECTED,'false');
	 		this.layer.className=classes;
	 		this.layer.id=this.ids.LAYER_LABEL+e2e4.config.ID;
	 		this.layer.innerHTML=name+layer.config.LAYER_SEPARATOR+typeCount;
	 		document.getElementById(layer.ids.LAYER_LIST).appendChild(this.layer);
	 		if(type==="node"){
	 			this.charSet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

	 			if(node.config.NODE_ID>this.charSet.length){
	 				this.inputValue=this.charSet[(node.config.NODE_ID-1)%this.charSet.length]+Math.floor(node.config.NODE_ID/this.charSet.length);
	 			}
	 			else{
	 				this.inputValue=this.charSet[node.config.NODE_ID-1];
	 			}
	 			this.input=document.createElement('input');
	 			this.input.type='text';
	 			this.input.value=this.inputValue;
	 			document.getElementById(this.ids.LAYER_LABEL+e2e4.config.ID).appendChild(this.input);
	 		}
	 		this.visible=document.createElement('span');
	 		this.visible.className=layer.classes.ICON_VISIBLE;
	 		document.getElementById(this.ids.LAYER_LABEL+e2e4.config.ID).appendChild(this.visible);

	 		document.getElementById(this.ids.LAYER_LABEL+e2e4.config.ID).onclick = function(e){
	 			if(e2e4.layer.memory.length){
	 				if(e.shiftKey){
	 					if(this.getAttribute(e2e4.attribute.SELECTED)==='false'||false){
	 						this.setAttribute(e2e4.attribute.SELECTED,'true');
	 						e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].reDraw(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].x,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].y,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].size,e2e4.layer.config.ACTIVE_NODE_COLOR);
	 						if(e2e4.layer.memory.indexOf(e2e4.attribute.CANVAS_ID)<0){
	 							e2e4.layer.memory.push(this.getAttribute(e2e4.attribute.CANVAS_ID));
	 							e2e4.layer.xRect.push(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].x);
	 							e2e4.layer.yRect.push(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].y);
	 							//e2e4.layer.drawRect();
	 						};

	 					}
	 					else{
	 						this.setAttribute(e2e4.attribute.SELECTED,'false');
	 						e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].reDraw(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].x,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].y,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].size,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].color);
	 						e2e4.layer.memory.splice(e2e4.layer.memory.indexOf(e2e4.attribute.CANVAS_ID),1);
	 						e2e4.layer.xRect.splice(e2e4.layer.xRect.indexOf(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].x),1);
	 						e2e4.layer.yRect.splice(e2e4.layer.yRect.indexOf(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].y),1);
	 						//e2e4.layer.drawRect();
	 					}
	 				}
	 				else{
	 					this.defaultValue=this.getAttribute(e2e4.attribute.SELECTED);
	 					for(i=0;i<e2e4.layer.memory.length;i++){
	 						document.getElementById(layer.ids.LAYER_LABEL+e2e4.layer.memory[i]).setAttribute(e2e4.attribute.SELECTED,'false');
	 						e2e4.object[e2e4.layer.memory[i]-1].reDraw(e2e4.object[e2e4.layer.memory[i]-1].x,e2e4.object[e2e4.layer.memory[i]-1].y,e2e4.object[e2e4.layer.memory[i]-1].size,e2e4.object[e2e4.layer.memory[i]-1].color);
	 					}
	 					e2e4.layer.memory.length=0;
	 					e2e4.layer.xRect.length=0;
	 					e2e4.layer.yRect.length=0;
	 					e2e4.layer.clearRect();

	 					if(this.defaultValue==='false'||false){
	 						this.setAttribute(e2e4.attribute.SELECTED,'true');
	 						e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].reDraw(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].x,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].y,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].size,e2e4.layer.config.ACTIVE_NODE_COLOR);
	 						if(e2e4.layer.memory.indexOf(e2e4.attribute.CANVAS_ID)<0){
	 							e2e4.layer.memory.push(this.getAttribute(e2e4.attribute.CANVAS_ID));
	 							e2e4.layer.xRect.push(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].x);
	 							e2e4.layer.yRect.push(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].y);
	 						};
	 					}
	 					else{
	 						this.setAttribute(e2e4.attribute.SELECTED,'false');
	 						e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].reDraw(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].x,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].y,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].size,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].color);
	 						e2e4.layer.memory.splice(e2e4.layer.memory.indexOf(e2e4.attribute.CANVAS_ID),1);
	 					}
	 				}
	 			}
	 			else{
	 				if(type="node"){
	 					this.setAttribute(e2e4.attribute.SELECTED,'true');
	 					e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].reDraw(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].x,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].y,e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].size,e2e4.layer.config.ACTIVE_NODE_COLOR);
	 					e2e4.layer.memory.push(this.getAttribute(e2e4.attribute.CANVAS_ID));

	 					e2e4.layer.xRect.push(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].x);
	 					e2e4.layer.yRect.push(e2e4.object[this.getAttribute(e2e4.attribute.CANVAS_ID)-1].y);
	 				}
	 			}
	 		}
	 		return true;
	 	}
	 	catch(error){

	 	}
	 },
	 /**
	  * Draw Rect for selected node
	  * @return {bool} 
	  */
	  drawRect: function(){
	  	try{
	  		for(i=0;i<this.xRect.length;i++){
	  			if(i===0){
	  				this.maxX=this.xRect[i];
	  				this.minX=this.xRect[i];
	  			}
	  			else if(this.xRect[i]>this.maxX){
	  				this.maxX=this.xRect[i];
	  			}
	  			else if(this.xRect[i]<this.minX){
	  				this.minX=this.xRect[i];
	  			}
	  		}
	  		for(i=0;i<this.yRect.length;i++){
	  			if(i===0){
	  				this.maxY=this.yRect[i];
	  				this.minY=this.yRect[i];
	  			}
	  			else if(this.yRect[i]>this.maxY){
	  				this.maxY=this.yRect[i];
	  			}
	  			else if(this.yRect[i]<this.minY){
	  				this.minY=this.yRect[i];
	  			}
	  		}
	  		this.canvasCtx.beginPath();
	  		this.canvasCtx.clearRect(0,0,e2e4.config.WIDTH,e2e4.config.HEIGHT);
	  		this.canvasCtx.fillStyle=this.config.LAYER_GUIDE_COLOR;
	  		this.canvasCtx.fillRect(this.maxX,this.maxY,-this.maxX+this.minX,-this.maxY+this.minY);
	  		this.canvasCtx.closePath();
	  		this.canvasCtx.stroke();
	  		return true;
	  	}
	  	catch(error){

	  	}
	  },
	  /**
	   * Clear Rect
	   * @return {bool} 
	   */
	   clearRect:function(){
	   	try{
	   		this.canvasCtx.beginPath();
	   		this.canvasCtx.clearRect(0,0,e2e4.config.WIDTH,e2e4.config.HEIGHT);
	   		this.canvasCtx.closePath();
	   		this.canvasCtx.stroke();
	   	}
	   	catch(error){

	   	}
	   }
	 };
	 /**
	  * Creating node
	  * @param  {number} x 
	  * @param  {number} y 
	  * @return {bool}   
	  */
	  function node(x,y){
	  	try{
	  		this.x=x;
	  		this.y=y;
	  		this.config=node.config;
	  		this.classes=node.classes;
	  		this.color=this.config.NODE_COLOR;
	  		this.size=this.config.NODE_SIZE;
	  		this.nodeId=this.config.NODE_ID++;
	  		this.canvas(e2e4.config.ID++);
	  		this.draw();
	  		this.type=this.config.TYPE;
	  		this.connection=new Array();
	  		this.arcList= new Array();
	  		return true;
	  	}
	  	catch(error){

	  	}
	  };

	  node.config={
	  	NODE_ID:0,
	  	NODE:false,
	  	NODE_COLOR:"#333333",
	  	NODE_SIZE:6,
	  	NODE_TOLERANCE:20,
	  	TOOLBOX_ID:1,
	  	TYPE:"node"
	  };
	  node.classes={
	  	CANVAS_NODE:"canvasNode",
	  }

	  node.prototype = {
	  	/**
	  	 * Creating Canvas
	  	 * @return {bool} 
	  	 */
	  	 canvas: function(){
	  	 	try{
	  	 		this.canvas=document.createElement('canvas');
	  	 		this.canvas.id=layer.classes.LAYER+e2e4.config.ID;
	  	 		this.canvas.width=e2e4.config.WIDTH;
	  	 		this.canvas.height=e2e4.config.HEIGHT;
	  	 		this.canvas.className=layer.classes.LAYER;
	  	 		this.canvas.classList.add(this.classes.CANVAS_NODE);
	  	 		document.getElementById(e2e4.ids.CONTAINER).appendChild(this.canvas);
	  	 		this.canvasCtx = this.canvas.getContext('2d');
	  	 		e2e4.layer.add("node",this.config.NODE_ID,e2e4.lang.NODE,layer.classes.LAYER_NODE);
	  	 		return true;
	  	 	}
	  	 	catch(error){

	  	 	}
	  	 },
	  	 /**
	  	  * Draw Node
	  	  * @return {bool} 
	  	  */
	  	  draw: function(){
	  	  	try{
	  	  		this.canvasCtx.clearRect(0,0,e2e4.config.WIDTH,e2e4.config.HEIGHT);
	  	  		this.canvasCtx.beginPath();
	  	  		this.canvasCtx.fillStyle=this.color;
	  	  		this.canvasCtx.arc(this.x, this.y, this.size, 0, Math.PI*2, true); 
	  	  		this.canvasCtx.closePath();
	  	  		this.canvasCtx.fill();
	  	  		this.config.NODE_COUNT++;
	  	  		return true;
	  	  	}
	  	  	catch(error){

	  	  	}
	  	  },
	  	  /**
	  	   * re Draw Node
	  	   * @param  {number} x     
	  	   * @param  {number} y     
	  	   * @param  {number} size  
	  	   * @param  {string} color 
	  	   * @return {bool}       
	  	   */
	  	   reDraw: function(x,y,size,color){
	  	   	try{
	  	   		this.canvasCtx.clearRect(0,0,e2e4.config.WIDTH,e2e4.config.HEIGHT);
	  	   		this.canvasCtx.beginPath();
	  	   		this.canvasCtx.fillStyle=color;
	  	   		this.canvasCtx.arc(x,y,parseInt(size)+4, 0, Math.PI*2,true);
	  	   		this.canvasCtx.fill();
	  	   		this.canvasCtx.beginPath();
	  	   		this.canvasCtx.fillStyle=this.color;
	  	   		this.canvasCtx.arc(x,y,size, 0, Math.PI*2,true);
	  	   		this.canvasCtx.closePath();
	  	   		this.canvasCtx.fill();
	  	   		return true;
	  	   	}
	  	   	catch(error){

	  	   	}
	  	   }
	  	 };
	  	/**
	  	 * Creating edge
	  	 * @param  {number} x 
	  	 * @param  {number} y 
	  	 * @return {bool}   
	  	 */
	  	 function line(x,y){
	  	 	try{
	  	 		this.x=x;
	  	 		this.y=y;
	  	 		this.config=line.config;
	  	 		this.id=e2e4.config.ID;
	  	 		this.nodeList=new Array();
	  	 		this.type=this.config.TYPE;
	  	 		this.config.LINE_POINTER ? this.draw() : this.pointer();
	  	 		return true;
	  	 	}
	  	 	catch(error){

	  	 	}
	  	 };

	  	 line.config={
	  	 	LINE_ID:1,
	  	 	LINE:false,
	  	 	LINE_COLOR:"#555555",
	  	 	LINE_SIZE:2,
	  	 	LINE_POINTER:false,
	  	 	LINE_POINT_X:0,
	  	 	LINE_POINT_Y:0,
	  	 	LINE_TOLERANCE:20,
	  	 	NODE_POINT:0,
	  	 	MULTI_LINE:true,
	  	 	TOOLBOX_ID:2,
	  	 	TYPE:"line",
	  	 };

	  	 line.prototype={
	  	 	/**
	  	 	 * Creating Canvas
	  	 	 * @return {bool} 
	  	 	 */
	  	 	 canvas: function(){
	  	 	 	try{
	  	 	 		this.canvas=document.createElement('canvas');
	  	 	 		this.canvas.id=layer.classes.LAYER+e2e4.config.ID;
	  	 	 		this.canvas.width=e2e4.config.WIDTH;
	  	 	 		this.canvas.height=e2e4.config.HEIGHT;
	  	 	 		this.canvas.className=layer.classes.LAYER;
	  	 	 		document.getElementById(e2e4.ids.CONTAINER).appendChild(this.canvas);
	  	 	 		this.canvasCtx = this.canvas.getContext('2d');
	  	 	 	}
	  	 	 	catch(error){

	  	 	 	}
	  	 	 },
	  	 	 draw: function(){
	  	 	 	for(i=0;i<e2e4.object.length;i++){
	  	 	 		if(e2e4.object[i].type==="node"){
	  	 	 			if(e2e4.object[i].x-this.x>this.config.LINE_TOLERANCE||e2e4.object[i].x-this.x<this.config.LINE_TOLERANCE){
	  	 	 				if(Math.abs(e2e4.object[i].x-this.x)<this.config.LINE_TOLERANCE&& Math.abs(e2e4.object[i].y-this.y)<this.config.LINE_TOLERANCE){
	  	 	 					this.nodeList.push(i);
	  	 	 					this.nodeList.push(this.config.NODE_POINT);
	  	 	 					for(j=0;j<e2e4.object.length;j++){
	  	 	 						if(e2e4.object[j].type==="line"){
	  	 	 							if(e2e4.object[j].nodeList[0]===i&&e2e4.object[j].nodeList[1]===this.config.NODE_POINT){
	  	 	 								this.config.MULTI_LINE=true;
	  	 	 								e2e4.guide.config.GUIDE=false;
	  	 	 								this.config.LINE_POINTER=false;
	  	 	 								e2e4.guide.clear();
	  	 	 								break;
	  	 	 							}
	  	 	 							else if(e2e4.object[j].nodeList[0]===this.config.NODE_POINT&&e2e4.object[j].nodeList[1]===i){
	  	 	 								this.config.MULTI_LINE=true;
	  	 	 								e2e4.guide.config.GUIDE=false;
	  	 	 								this.config.LINE_POINTER=false;
	  	 	 								e2e4.guide.clear();
	  	 	 								break;
	  	 	 							}
	  	 	 							else{
	  	 	 								this.config.MULTI_LINE=false;
	  	 	 							}
	  	 	 						}
	  	 	 					}
	  	 	 					if(!this.config.MULTI_LINE){
	  	 	 						if(e2e4.object[i].connection.indexOf(this.config.LINE_ID)<0){
	  	 	 							this.canvas(e2e4.config.ID++);
	  	 	 							e2e4.layer.add("line",this.config.LINE_ID,e2e4.lang.LINE,layer.classes.LAYER_LINE);
	  	 	 							e2e4.object[i].connection.push(this.config.LINE_ID);
	  	 	 							this.config.LINE_ID++;
	  	 	 							this.canvasCtx.beginPath();
	  	 	 							this.canvasCtx.moveTo(this.config.LINE_POINT_X,this.config.LINE_POINT_Y);
	  	 	 							this.canvasCtx.lineTo(e2e4.object[i].x,e2e4.object[i].y);
	  	 	 							this.canvasCtx.strokeStyle=this.config.LINE_COLOR;
	  	 	 							this.canvasCtx.lineWidth=this.config.LINE_SIZE;
	  	 	 							this.canvasCtx.stroke();
	  	 	 							e2e4.guide.config.GUIDE=false;
	  	 	 							this.config.LINE_POINTER=false;
	  	 	 							e2e4.guide.clear();
	  	 	 							break;
	  	 	 						}
	  	 	 						else{
	  	 	 							this.config.LINE_ID++;
	  	 	 							e2e4.guide.config.GUIDE=false;
	  	 	 							this.config.LINE_POINTER=false;
	  	 	 							e2e4.guide.clear();
	  	 	 						}
	  	 	 					}
	  	 	 				}
	  	 	 			}
	  	 	 		}
	  	 	 	}

	  	 	 },
	  	 	 pointer: function(){
	  	 	 	if(node.config.NODE_ID>1){
	  	 	 		for(i=0;i<e2e4.object.length;i++){
	  	 	 			if(e2e4.object[i].type==="node"){
	  	 	 				if(e2e4.object[i].x-this.x>this.config.LINE_TOLERANCE||e2e4.object[i].x-this.x<this.config.LINE_TOLERANCE){
	  	 	 					if(Math.abs(e2e4.object[i].x-this.x)<this.config.LINE_TOLERANCE&& Math.abs(e2e4.object[i].y-this.y)<this.config.LINE_TOLERANCE){
	  	 	 						if(e2e4.object[i].connection.indexOf(this.config.LINE_ID)<0){
	  	 	 							this.config.LINE_POINT_X=e2e4.object[i].x;
	  	 	 							this.config.LINE_POINT_Y=e2e4.object[i].y;
	  	 	 							this.config.LINE_POINTER=true;
	  	 	 							e2e4.object[i].connection.push(this.config.LINE_ID);
	  	 	 							e2e4.guide.config.GUIDE=true;
	  	 	 							e2e4.guide.config.TYPE=this.type;
	  	 	 							e2e4.guide.config.X1=e2e4.object[i].x;
	  	 	 							e2e4.guide.config.Y1=e2e4.object[i].y;
	  	 	 							this.config.NODE_POINT=i;
	  	 	 							break;
	  	 	 						}
	  	 	 						else{
	  	 	 							e2e4.object[i].connection.length=e2e4.object[i].connection.length-1;
	  	 	 						}
	  	 	 					}
	  	 	 					else{
								//Where is the party?
							}
						}
					}
				}
			}
		}
	};

	function arc(x,y) {
		this.x=x;
		this.y=y;
		this.config=arc.config;
		this.type="arc";
		if(this.config.ARC_POINTER===true){
			this.draw();
		}
		else{
			this.pointer();
		}
	};

	arc.config={
		ARC:false,
		ARC_ID:1,
		ARC_COLOR:"#555555",
		ARC_SIZE:2,
		ARC_TOLERANCE:20,
		TOOLBOX_ID:4,
		ARC_POINTER:false,
		ARC_POINT_X:0,
		ARC_POINT_Y:0,
		ARC_POINTER:false,
		NODE_POINT:0,
		ARC_TRANSLATIONAL:10,
	};

	arc.prototype={
		canvas: function(){
			this.canvas=document.createElement('canvas');
			this.canvas.id=layer.classes.LAYER+e2e4.config.ID;
			this.canvas.width=e2e4.config.WIDTH;
			this.canvas.height=e2e4.config.HEIGHT;
			this.canvas.className=layer.classes.LAYER;
			document.getElementById(e2e4.ids.CONTAINER).appendChild(this.canvas);
			this.canvasCtx = this.canvas.getContext('2d');
			e2e4.layer.add("arc",this.config.ARC_ID,e2e4.lang.ARC,layer.classes.LAYER_ARC);
		},
		draw: function(){
			for(i=0;i<e2e4.object.length;i++){
				if(e2e4.object[i].type==="node"){
					if(e2e4.object[i].x-this.x>this.config.ARC_TOLERANCE||e2e4.object[i].x-this.x<this.config.ARC_TOLERANCE){
						if(Math.abs(e2e4.object[i].x-this.x)<this.config.ARC_TOLERANCE&& Math.abs(e2e4.object[i].y-this.y)<this.config.ARC_TOLERANCE){
							this.canvas(e2e4.config.ID++);
							this.canvasCtx.beginPath();
							this.canvasCtx.moveTo(e2e4.object[i].x,e2e4.object[i].y);
							this.arcCount=1;

							if(i>this.config.NODE_POINT){
								e2e4.object[i].arcList.push([i,this.config.NODE_POINT]);
								e2e4.object[this.config.NODE_POINT].arcList.push([i,this.config.NODE_POINT]);
								for(j=0;j<e2e4.object[i].arcList.length;j++){
									if(e2e4.object[i].arcList[j][0]==i&&e2e4.object[i].arcList[j][1]==this.config.NODE_POINT){
										this.arcCount++;
									}
									else{
										//
									}
								}
							}
							else{
								e2e4.object[i].arcList.push([this.config.NODE_POINT,i]);
								e2e4.object[this.config.NODE_POINT].arcList.push([this.config.NODE_POINT,i]);
								for(j=0;j<e2e4.object[i].arcList.length;j++){
									if(e2e4.object[i].arcList[j][1]==i&&e2e4.object[i].arcList[j][0]==this.config.NODE_POINT){
										this.arcCount++;
									}
									else{
										//
									}
								}
							};

							if(this.arcCount%2==0){
								this.canvasCtx.bezierCurveTo(e2e4.object[i].x+(this.config.ARC_TRANSLATIONAL*this.arcCount),e2e4.object[i].y+((this.config.ARC_TRANSLATIONAL/2)*this.arcCount),this.config.ARC_POINT_X+(this.config.ARC_TRANSLATIONAL*this.arcCount),this.config.ARC_POINT_Y+((this.config.ARC_TRANSLATIONAL/2)*this.arcCount),this.config.ARC_POINT_X,this.config.ARC_POINT_Y);
							}
							else{
								this.canvasCtx.bezierCurveTo(e2e4.object[i].x-(this.config.ARC_TRANSLATIONAL*this.arcCount),e2e4.object[i].y-((this.config.ARC_TRANSLATIONAL/2)*this.arcCount),this.config.ARC_POINT_X-(this.config.ARC_TRANSLATIONAL*this.arcCount),this.config.ARC_POINT_Y-((this.config.ARC_TRANSLATIONAL/2)*this.arcCount),this.config.ARC_POINT_X,this.config.ARC_POINT_Y);	
							}
							//this.canvasCtx.moveto(startPoint,startPoint);
							//this.canvasCtx.bezierCurveTo(cp1,cp1,cp2,cp2,endPoint,endPoint);
							this.canvasCtx.strokeStyle=this.config.ARC_COLOR;
							this.canvasCtx.lineWidth=this.config.ARC_SIZE;
							this.canvasCtx.stroke();
							this.config.ARC_POINTER=false;
							e2e4.guide.config.GUIDE=false;
							e2e4.guide.clear();
							this.config.ARC_ID++;
							break;
						}
					}
				}
			}
		},
		pointer: function(){
			if(node.config.NODE_ID>1){
				for(i=0;i<e2e4.object.length;i++){
					if(e2e4.object[i].type==="node"){
						if(e2e4.object[i].x-this.x>this.config.ARC_TOLERANCE||e2e4.object[i].x-this.x<this.config.ARC_TOLERANCE){
							if(Math.abs(e2e4.object[i].x-this.x)<this.config.ARC_TOLERANCE&& Math.abs(e2e4.object[i].y-this.y)<this.config.ARC_TOLERANCE){
								this.config.ARC_POINT_X=e2e4.object[i].x;
								this.config.ARC_POINT_Y=e2e4.object[i].y;
								this.config.ARC_POINTER=true;
								e2e4.object[i].connection.push(this.config.LINE_ID);
								e2e4.guide.config.GUIDE=true;
								e2e4.guide.config.X1=e2e4.object[i].x;
								e2e4.guide.config.Y1=e2e4.object[i].y;
								this.config.NODE_POINT=i;
								break;
							}
						}
					}
				}
			}
		}
	};

	function select(){
		this.config=select.config;
		this.RECT_X=0;
		this.RECT_Y=0;
		this.canvas();
	};
	select.prototype={
		draw:function(x1,y1,evt){
			if(this.config.SELECT_POINTER===true){
				this.clear();
				this.canvasCtx.beginPath();
				this.canvasCtx.fillStyle=this.config.GUIDE_COLOR;
				this.canvasCtx.fillRect(this.RECT_X,this.RECT_Y,x1-this.RECT_X,y1-this.RECT_Y);
				this.canvasCtx.stroke();
				e2e4.layer.memory.length=0;
				if(evt===true){
					this.clear();
					this.config.SELECT_POINTER=false;
					for(i=0;i<e2e4.object.length;i++){
						if(e2e4.object[i].type==='node'){
							//   _________
							//  |\        |
							//  |         |  
							//  |         |
							//  |________\|
							//
							//  Sol üst ve sağ alta duyarlı sadece sağ üst ve sol alt düzeltilmeli.
							if(e2e4.object[i].x>this.RECT_X&&e2e4.object[i].x<x1&&e2e4.object[i].y>this.RECT_Y&&e2e4.object[i].y<y1){
								e2e4.layer.memory.push(i+1);
								document.getElementById(layer.ids.LAYER_LABEL+(i+1)).setAttribute(e2e4.attribute.SELECTED,'true');
								e2e4.object[i].reDraw(e2e4.object[i].x,e2e4.object[i].y,e2e4.object[i].size,e2e4.layer.config.ACTIVE_NODE_COLOR);
							}
							else if(e2e4.object[i].x<this.RECT_X&&e2e4.object[i].x>x1&&e2e4.object[i].y<this.RECT_Y&&e2e4.object[i].y>y1){
								e2e4.layer.memory.push(i+1);
								document.getElementById(layer.ids.LAYER_LABEL+(i+1)).setAttribute(e2e4.attribute.SELECTED,'true');
								e2e4.object[i].reDraw(e2e4.object[i].x,e2e4.object[i].y,e2e4.object[i].size,e2e4.layer.config.ACTIVE_NODE_COLOR);
							}
							else{
								document.getElementById(layer.ids.LAYER_LABEL+(i+1)).setAttribute(e2e4.attribute.SELECTED,'false');
								e2e4.object[i].draw();
							}
						}
					};
				}
			}
		},
		pointer:function(x,y){
			this.RECT_X=x;
			this.RECT_Y=y;
			this.config.SELECT_POINTER=true;
		},
		clear: function(){
			this.canvasCtx.beginPath();
			this.canvasCtx.clearRect(0,0,e2e4.config.WIDTH,e2e4.config.HEIGHT);
			this.canvasCtx.stroke();
		},
		canvas: function(){
			this.canvasCtx= e2e4.layer.canvas.getContext('2d');
		}
	}
	select.config={
		SELECT:false,
		TOOLBOX_ID:0,
		TYPE:'select',
		SELECT_POINTER:false,
		GUIDE_COLOR:layer.config.LAYER_GUIDE_COLOR,
	};

	function guide(){
		this.config=guide.config;
		this.ids=guide.ids;
		this.canvas();
	};

	guide.ids={
		GUIDE_DIVISION:'canvas-guide',
	};

	guide.prototype={
		/*
		* @{number} x
		* @{number} y
		* @{number} x1
		* @{number} y1
		*/
		draw: function(x,y){
			this.x=x;
			this.y=y;
			this.canvasCtx.beginPath();
			this.canvasCtx.moveTo(this.config.X1,this.config.Y1);
			this.canvasCtx.lineTo(this.x,this.y);
			this.canvasCtx.strokeStyle=this.config.GUIDE_COLOR;
			this.canvasCtx.lineWidth=this.config.GUIDE_SIZE;
			this.canvasCtx.lineCap = 'butt';
			this.canvasCtx.clearRect(0,0,e2e4.config.WIDTH,e2e4.config.HEIGHT);
			this.canvasCtx.stroke();
		},
		clear: function(){
			this.canvasCtx.beginPath();
			this.canvasCtx.clearRect(0,0,e2e4.config.WIDTH,e2e4.config.HEIGHT);
			this.canvasCtx.stroke();
		},
		canvas: function(){
			this.canvas=document.createElement('canvas');
			this.canvas.id=this.ids.GUIDE_DIVISION;
			this.canvas.width=e2e4.config.WIDTH;//Default 0
			this.canvas.height=e2e4.config.HEIGHT;//Default 0
			this.canvas.style.backgroundColor=e2e4.config.BACKGROUND_COLOR;
			document.getElementById(e2e4.ids.CONTAINER).appendChild(this.canvas);
			this.canvasCtx = this.canvas.getContext('2d');
		},
		resize: function(WIDTH,HEIGHT){
			document.getElementById(this.ids.GUIDE_DIVISION).setAttribute('width',WIDTH+e2e4.config.MEASUREMENT);
			document.getElementById(this.ids.GUIDE_DIVISION).setAttribute('height',HEIGHT+e2e4.config.MEASUREMENT);
		}
	};

	guide.config={
		GUIDE:false,
		GUIDE_COLOR:"#cf0101",
		GUIDE_SIZE:2,
		X1:0,
		Y1:0,
	};

	function ruler(){
		this.config=ruler.config;
		this.ids=ruler.ids;
		this.canvas();
	};

	ruler.ids={
		RULER_DIVISION:'canvas-ruler',
		KOALA_RULER_DIVISION:'koala-ruler',
		KOALA_RULER_SIZE:'koala-input-size',
		KOALA_RULER_X_LINE_COLOR:'koala-input-x-line-color',
		KOALA_RULER_Y_LINE_COLOR:'koala-input-y-line-color',
		KOALA_RULER_X_LINE_SPACE:'koala-input-x-line-space',
		KOALA_RULER_Y_LINE_SPACE:'koala-input-y-line-space',
		KOALA_RULER_BUTTON:'koala-ruller-button'
	};

	ruler.prototype={
		canvas:function(){
			this.canvas=document.createElement('canvas');
			this.canvas.id=this.ids.RULER_DIVISION;
			this.canvas.width=e2e4.config.WIDTH;
			this.canvas.height=e2e4.config.HEIGHT;
			this.canvas.className=e2e4.layer.classes.LAYER;
			this.canvas.style.backgroundColor=e2e4.config.BACKGROUND_COLOR;
			document.getElementById(e2e4.ids.CONTAINER).appendChild(this.canvas)
			this.canvasCtx=this.canvas.getContext('2d');
		},
		draw: function(){
			document.getElementById(e2e4.guide.ids.GUIDE_DIVISION).style.backgroundColor="transparent";
			
			for(i=1;i<e2e4.config.HEIGHT/this.config.X_LINE_SPACE;i++){
				this.canvasCtx.beginPath();
				this.canvasCtx.moveTo(0,i*this.config.X_LINE_SPACE);
				this.canvasCtx.lineTo(e2e4.config.WIDTH,i*this.config.X_LINE_SPACE);
				this.canvasCtx.strokeStyle=this.config.X_LINE_COLOR;
				this.canvasCtx.lineWidth=this.config.RULER_SIZE;
				this.canvasCtx.stroke();
				this.canvasCtx.closePath();
			}
			for(i=1;i<e2e4.config.WIDTH/this.config.Y_LINE_SPACE;i++){
				this.canvasCtx.beginPath();
				this.canvasCtx.moveTo(i*this.config.Y_LINE_SPACE,0);
				this.canvasCtx.lineTo(i*this.config.Y_LINE_SPACE,e2e4.config.HEIGHT);
				this.canvasCtx.strokeStyle=this.config.Y_LINE_COLOR;
				this.canvasCtx.lineWidth=this.config.RULER_SIZE;
				this.canvasCtx.stroke();
				this.canvasCtx.closePath();
			}
		},
		clearRect:function(){
			this.canvasCtx.beginPath();
			this.canvasCtx.clearRect(0,0,e2e4.config.WIDTH,e2e4.config.HEIGHT);
			this.canvasCtx.closePath();
			this.canvasCtx.stroke();
		}
	};

	ruler.config={
		RULER:false,
		X_LINE_COLOR:"#f3f3f3",
		Y_LINE_COLOR:"#f3f3f3",
		X_LINE_SPACE:40,
		Y_LINE_SPACE:40,
		RULER_SIZE:1,
		TOOLBOX_ID:3,
	};

	document.getElementById(e2e4.ids.CONTAINER).onmousemove=function(e){
		if(guide.config.GUIDE===true){
			e2e4.guide.draw(e.pageX - e2e4.left,e.pageY - e2e4.top); 
		}
		else if(select.config.SELECT===true){
			e2e4.select.draw(e.pageX - e2e4.left,e.pageY - e2e4.top,false);
		}
	};

	document.getElementById(e2e4.ids.CONTAINER).onmouseup=function(e){
		if(e.which===e2e4.keycodes.LEFT_CLICK){
			
			for(i=0;i<e2e4.toolbox.memory.length;i++){
				if(e2e4.toolbox.memory[i]===e2e4.ids.TOOLBOX_SELECT){
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_NODE);
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_LINE);
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_ARC);
				}
				else if(e2e4.toolbox.memory[i]===toolbox.ids.TOOLBOX_NODE){
					node.config.NODE_SIZE=document.getElementById(toolbox.ids.TOOLBOX_NODE_SIZE).value;
					node.config.NODE_COLOR=document.getElementById(toolbox.ids.TOOLBOX_NODE_COLOR).value;
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_NODE);
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_LINE);
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_ARC);
				}
				else if(e2e4.toolbox.memory[i]===toolbox.ids.TOOLBOX_LINE){
					line.config.LINE_SIZE=document.getElementById(toolbox.ids.TOOLBOX_LINE_SIZE).value;
					line.config.LINE_TOLERANCE=document.getElementById(toolbox.ids.TOOLBOX_LINE_TOLERANCE).value;
					line.config.LINE_COLOR=document.getElementById(toolbox.ids.TOOLBOX_LINE_COLOR).value;
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_NODE);
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_LINE);
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_ARC);
				}
				else if(e2e4.toolbox.memory[i]===toolbox.ids.TOOLBOX_ARC){
					arc.config.ARC_SIZE=document.getElementById(toolbox.ids.TOOLBOX_ARC_LINE_SIZE).value;
					arc.config.ARC_COLOR=document.getElementById(toolbox.ids.TOOLBOX_ARC_LINE_COLOR).value;
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_NODE);
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_LINE);
					e2e4.toolbox.close(toolbox.ids.TOOLBOX_ARC);
				}
			}
			if(node.config.NODE===true){
				e2e4.toolbox.memory.length=0;
				e2e4.object[e2e4.config.ID]=new node(e.pageX - e2e4.left,e.pageY - e2e4.top);
			}
			else if(line.config.LINE===true){
				e2e4.toolbox.memory.length=0;
				e2e4.object[e2e4.config.ID]=new line(e.pageX-e2e4.left,e.pageY-e2e4.top);
			}
			else if(arc.config.ARC===true){
				e2e4.toolbox.memory.length=0;
				e2e4.object[e2e4.config.ID]=new arc(e.pageX-e2e4.left,e.pageY-e2e4.top);
			}
			else if(e2e4.select.config.SELECT===true){
				e2e4.toolbox.memory.length=0;
				e2e4.select.draw(e.pageX-e2e4.left,e.pageY-e2e4.top,true);
			}
		}
		else if(e.which===e2e4.keycodes.RIGHT_CLICK){
			if(e2e4.guide.config.TYPE===line.config.TYPE){
				e2e4.toolbox.close(toolbox.ids.TOOLBOX_NODE);
				e2e4.toolbox.close(toolbox.ids.TOOLBOX_LINE);
				line.config.LINE_POINTER=false;
				e2e4.object[line.config.NODE_POINT].connection.length=e2e4.object[line.config.NODE_POINT].connection.length-1;
				e2e4.guide.config.GUIDE=false;
				e2e4.guide.config.TYPE='';
				e2e4.guide.clear();
			}
		}
	};

	setInterval(function(){
		if(e2e4.layer.memory.length>0){
			for(i=0;i<e2e4.toolbox.memory.length;i++){
				if(e2e4.toolbox.memory[i]===e2e4.toolbox.ids.TOOLBOX_NODE){
					for(j=0;j<e2e4.layer.memory.length;j++){
						e2e4.object[e2e4.layer.memory[j]-1].color =document.getElementById(toolbox.ids.TOOLBOX_NODE_COLOR).value;
						e2e4.object[e2e4.layer.memory[j]-1].size =document.getElementById(toolbox.ids.TOOLBOX_NODE_SIZE).value;
						e2e4.object[e2e4.layer.memory[j]-1].reDraw(e2e4.object[e2e4.layer.memory[j]-1].x,e2e4.object[e2e4.layer.memory[j]-1].y,e2e4.object[e2e4.layer.memory[j]-1].size,e2e4.layer.config.ACTIVE_NODE_COLOR);

						//e2e4.object[e2e4.layer.memory[j]-1].reDraw(e2e4.object[e2e4.layer.memory[j]-1].x,e2e4.object[e2e4.layer.memory[j]-1].y,e2e4.object[e2e4.layer.memory[j]-1].NODE_SIZE,node.config.NODE_COLOR);
					}
				}
			}
		}
		
	},500);

	document.getElementById(e2e4.ids.CONTAINER).onmousedown=function(e){
		if(e.which===e2e4.keycodes.LEFT_CLICK){
			if(e2e4.select.config.SELECT===true){
				e2e4.select.pointer(e.pageX-e2e4.left,e.pageY-e2e4.top);
			}
		}
	};

});

function mouseUp()
{
	window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e){
	window.addEventListener('mousemove', divMove, true);
}

function divMove(e){
	var div = document.getElementById('ui-toolbox');
	div.style.top = e.clientY-10+ 'px';
	div.style.left = e.clientX - div.offsetWidth+20+'px';
}
var start = new Date().getTime();
var end = new Date().getTime();
var time = end - start;



/*
,
		move: function(id,xpos,ypos){
			document.getElementById(this.id).style.left= this.xpos+this.config.MEASUREMENT;
			document.getElementById(this.id).style.top= this.ypos+this.config.MEASUREMENT;
		},
		startMoving: function(id,container,evt){
			this.evt= evt||window.event;
			this.posX=evt.clientX;
			this.posY=evt.clientY;
			this.divTop=document.getElementById(id).style.top;
			this.divLeft=document.getElementById(id).style.left;
			this.eWi= parseInt(document.getElementById(id).style.width);
			this.eHe= parseInt(document.getElementById(id).style.height);
			this.cWi= parseInt(document.getElementById(container).style.width);
			this.cHe= parseInt(document.getElementById(container).style.height);
			this.divTop= this.divTop.replace(this.config.MEASUREMENT,'');
			this.divLeft= this.divLeft.replace(this.config.MEASUREMENT,'');
			var diffX= this.posX - this.divLeft;
			var diffY= this.posY - this.divTop;
			document.onmousemove = function(evt,diffX,diffY){
				evt = evt || window.event;
				var posX = evt.clientX,
				posY = evt.clientY,
				aX = posX - diffX,
				aY = posY - diffY;
				if (aX < 0) aX = 0;
				if (aY < 0) aY = 0;
				if (aX + eWi > cWi) aX = cWi - eWi;
				if (aY + eHe > cHe) aY = cHe -eHe;
				draggable.move(divid,aX,aY);
			}
		},
		stopMoving: function(container){
			var a = document.createElement('script');
			document.getElementById(container).style.cursor='default';
			document.onmousemove = function(){}
		}
*/