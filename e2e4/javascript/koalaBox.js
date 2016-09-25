// Copyright (c) 2015 sSource.

var koalaReturn;
/**
 * @param title
 * @param width
 */
 function koalaBox(title, width) {
    try{
        this.config=koalaBox.config;
        this.classes=koalaBox.classes;
        this.setConfig(arguments.length,arguments);
        this.createBox();
        if(title!=""){this.createHeader();}
        this.createContent();
        this.resize();
        this.identity=new Array();
        this.config.BOX=true;
    }catch(err){
        this.log(err);
    }
};
koalaBox.config={
    TITLE:"",
    WIDTH:500,    
    MEASUREMENT:"px",
    ITEM_COUNT:0,
    CHECK_BOX_COUNT:0,
    BUTTON_COUNT:0,
    CHECK_BOX_MARGIN_DEFAULT:2,
    CHECK_BOX_MARGIN:30,
    DEV_MODE:false,
    BOX:false
};
koalaBox.classes={
    CONTAINER:"koalaBox",
    HEADER:"boxTitle",
    CONTENT:"boxContent",
    CLOSE_ICON:"boxClose",
    ICON:"boxIcon",
    CONTENT_ITEM:"contentItem",
    CHECK_BOX:"boxCheckBox",
    MID_CONTENT:"boxMidContent",
    BUTTON:"boxButton",
    RETURN:"koalaReturn",
    ERROR_CONTAINER:"koalaError",
};

koalaBox.prototype={
    /**
     * @param value
     */
     log: function(value){
        if(this.config.DEV_MODE==true){
            console.log(value);
        }
    },
    /**
     * @param length
     * @param arguments
     */
     setConfig: function(length,arguments){
        if(length>1){
            this.config.TITLE=arguments[0];
            this.config.WIDTH=arguments[1];
        }
    },
    /**
     * 
     */
     createBox: function(){
        try{
            document.getElementById(this.classes.CONTAINER).remove();
            document.getElementById(this.classes.RETURN).remove();
            configDefault();
        }catch(err){
            this.log(err);
        }
        this.container=document.createElement('div');
        this.container.id=this.classes.CONTAINER;
        this.container.style.width=this.config.WIDTH+this.config.MEASUREMENT;
        this.container.style.left=(window.innerWidth-this.config.WIDTH)/2+this.config.MEASUREMENT;
        setTimeout(function(){
            if((window.innerHeight-document.getElementById(koalaBox.classes.CONTAINER).offsetHeight)/2>0){
                document.getElementById(koalaBox.classes.CONTAINER).style.top=(window.innerHeight-document.getElementById(koalaBox.classes.CONTAINER).offsetHeight)/2+koalaBox.config.MEASUREMENT;
            }
        }, 1);
        document.body.appendChild(this.container);
    },
    /**
     * 
     */
     createHeader: function(){
        this.header=document.createElement('div');
        this.header.id=this.classes.HEADER;
        this.header.innerHTML=this.config.TITLE;
        document.getElementById(this.classes.CONTAINER).appendChild(this.header);

        this.closeIcon=document.createElement('div');
        this.closeIcon.id=this.classes.CLOSE_ICON;
        document.getElementById(this.classes.HEADER).appendChild(this.closeIcon);

        document.getElementById(this.classes.CLOSE_ICON).onclick= function () {
            document.getElementById(koalaBox.classes.CONTAINER).remove();
            configDefault();
        };
        document.onkeydown= function(e){
            //console.log(e.keyCode);
            if(e.keyCode==27){
                try{
                    document.getElementById(koalaBox.classes.CONTAINER).remove();
                    configDefault();
                }catch(err){

                }
            }
        }
    },
    /**
     * 
     */
     createContent: function(){
        this.content=document.createElement('div');
        this.content.id=this.classes.CONTENT;
        document.getElementById(this.classes.CONTAINER).appendChild(this.content);
    },
    /**
     * @param id
     * @param title
     * @param value
     * @param placeholder
     */
     input: function(id,title,value,placeholder){
        this.createItem(title);
        this.identity.push({id,value});
        this.input_=document.createElement('input');
        this.input_.type="text";
        this.input_.id=id;
        this.input_.value=value;
        this.input_.setAttribute("placeholder",placeholder);
        document.getElementById(this.classes.CONTENT_ITEM+"-"+this.itemCount).appendChild(this.input_);
        this.config.ITEM_COUNT++;
    },
    /**
     * @param id
     * @param title
     * @param value
     */
     colorPicker: function(id,title,value){
        this.createItem(title);
        this.identity.push({id,value});

        this.colorPicker_=document.createElement('input');
        this.colorPicker_.type="color";
        this.colorPicker_.id=id;
        this.colorPicker_.value=value;
        document.getElementById(this.classes.CONTENT_ITEM+"-"+this.itemCount).appendChild(this.colorPicker_);
        this.config.ITEM_COUNT++;
    },
    /**
     * @param id
     * @param title
     * @param value
     */
     checkbox: function(id,title,value){
        this.createItem(title);
        this.identity.push({id,value});

        this.checkbox_=document.createElement('div');
        this.checkbox_.id=id;
        this.checkbox_.className=this.classes.CHECK_BOX;
        this.checkbox_.setAttribute("value",value);
        document.getElementById(this.classes.CONTENT_ITEM+"-"+this.itemCount).appendChild(this.checkbox_);

        this.checkboxTick=document.createElement('div');
        if(value==true){
            this.checkboxTick.style.left=this.config.CHECK_BOX_MARGIN+this.config.MEASUREMENT;
        }
        document.getElementById(id).appendChild(this.checkboxTick);
        this.config.CHECK_BOX_COUNT++;
        this.config.ITEM_COUNT++;
        this.checked();
    },
    /**
     * @param id
     * @param title
     * @param path
     */
     import: function(id,title,path){
        this.createItem(title);

        this.content_=document.createElement('div');
        this.content_.id=id;
        this.content_.className=this.classes.MID_CONTENT;
        this.content_.style.width=-this.config.WIDTH-this.config.WIDTH%4+this.config.MEASUREMENT;
        this.content_.innerHTML=document.querySelector(path).innerHTML;
        document.getElementById(this.classes.CONTENT_ITEM+"-"+this.itemCount).appendChild(this.content_);
        this.config.ITEM_COUNT++;
    },
    /**
     * @param title
     */
     createItem: function(title){
        this.itemCount=this.config.ITEM_COUNT;
        this.item=document.createElement('div');
        this.item.id=this.classes.CONTENT_ITEM+"-"+this.itemCount;
        this.item.className=this.classes.CONTENT_ITEM;
        document.getElementById(this.classes.CONTENT).appendChild(this.item);

        this.title=document.createElement('span');
        this.title.innerHTML=title;
        document.getElementById(this.classes.CONTENT_ITEM+"-"+this.itemCount).appendChild(this.title);

    },
    /**
     * @param id
     * @param value
     * @param trigger
     */
     button: function(id,value,trigger){
        this.buttonCount=this.config.BUTTON_COUNT;

        if(this.buttonCount==0){
            this.buttonArea=document.createElement('div');
            this.buttonArea.id=this.classes.BUTTON;
            document.getElementById(this.classes.CONTENT).appendChild(this.buttonArea);
        }
        this.button_=document.createElement('input');
        this.button_.type="button";
        this.button_.id=id;
        this.button_.value=value;
        document.getElementById(this.classes.BUTTON).appendChild(this.button_);

        koalaReturn=this.identity;
        
        document.getElementById(id).onclick=function(){

            eval(trigger);
        }
        this.config.BUTTON_COUNT++;
    },
    errorBox: function(message,lineNumber,fileName,proto){
        this.createItem(message);

        this.errorContent=document.createElement('div');
        this.errorContent.id=this.classes.ERROR_CONTAINER;
        document.getElementById(this.classes.CONTENT_ITEM+"-"+this.itemCount).appendChild(this.errorContent);
        this.config.ITEM_COUNT++;

        this.errorLine=document.createElement('span');
        this.errorLine.innerHTML=lineNumber;
        document.getElementById(this.classes.ERROR_CONTAINER).appendChild(this.errorLine);

        this.errorFileName=document.createElement('h4');
        this.errorFileName.innerHTML=fileName;
        document.getElementById(this.classes.ERROR_CONTAINER).appendChild(this.errorFileName);

        this.errorProto=document.createElement('a');
        this.errorProto.innerHTML=proto;
        document.getElementById(this.classes.ERROR_CONTAINER).appendChild(this.errorProto);
    },
    /**
     *
     */
     resize: function(){
        window.onresize = function() {
           if(koalaBox.config.BOX==true){
            document.getElementById(koalaBox.classes.CONTAINER).style.left=(window.innerWidth-koalaBox.config.WIDTH)/2+koalaBox.config.MEASUREMENT;
            if((window.innerHeight-document.getElementById(koalaBox.classes.CONTAINER).offsetHeight)/2>0){
                document.getElementById(koalaBox.classes.CONTAINER).style.top=(window.innerHeight-document.getElementById(koalaBox.classes.CONTAINER).offsetHeight)/2+koalaBox.config.MEASUREMENT;
            }
        }
    }
    
},
    /**
     *
     */
     checked: function(){
       for(i=0;i<this.config.CHECK_BOX_COUNT;i++){
        document.getElementsByClassName(koalaBox.classes.CHECK_BOX)[i].onclick=function(){
         if(this.getAttribute("value")=="false"){
             document.querySelector("#"+this.id+" div").style.left = koalaBox.config.CHECK_BOX_MARGIN+koalaBox.config.MEASUREMENT;
             this.setAttribute("value",true);
         }
         else{
            document.querySelector("#"+this.id+" div").style.left = koalaBox.config.CHECK_BOX_MARGIN_DEFAULT+koalaBox.config.MEASUREMENT;
            this.setAttribute("value",false);
        }
    }}}
};
/**
 *
 */
 function koalaClose(){
    document.getElementById(koalaBox.classes.CONTAINER).remove();
    configDefault();
}
/**
 *
 */
 function configDefault(){
    koalaBox.config.ITEM_COUNT=0;
    koalaBox.config.CHECK_BOX_COUNT=0;
    koalaBox.config.BUTTON_COUNT=0;
    koalaBox.config.BOX=false;
};