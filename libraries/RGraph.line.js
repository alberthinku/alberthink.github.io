// version: 2019-08-01
    /**
    * o--------------------------------------------------------------------------------o
    * | This file is part of the RGraph package - you can learn more at:               |
    * |                                                                                |
    * |                         https://www.rgraph.net                                 |
    * |                                                                                |
    * | RGraph is licensed under the Open Source MIT license. That means that it's     |
    * | totally free to use and there are no restrictions on what you can do with it!  |
    * o--------------------------------------------------------------------------------o
    */

    RGraph = window.RGraph || {isRGraph: true};

    /**
    * The line chart constructor
    * 
    * @param object canvas The canvas object
    * @param array  ...    The lines to plot
    */
    RGraph.Line = function (conf)
    {
        /**
        * Allow for object config style
        */
        if (   typeof conf === 'object'
            && typeof conf.data === 'object'
            && typeof conf.id === 'string') {

            var id                        = conf.id;
            var canvas                    = document.getElementById(id);
            var data                      = conf.data;
            var parseConfObjectForOptions = true; // Set this so the config is parsed (at the end of the constructor)
        
        } else {
        
            var id     = conf;
            var canvas = document.getElementById(id);
            var data   = arguments[1];
        }




        this.id                 = id;
        this.canvas             = canvas;
        this.context            = this.canvas.getContext('2d');
        this.canvas.__object__  = this;
        this.type               = 'line';
        this.max                = 0;
        this.coords             = [];
        this.coords2            = [];
        this.coords.key         = [];
        this.coordsText         = [];
        this.coordsSpline       = [];
        this.coordsAxes         = {xaxis: [], yaxis: []};
        this.hasnegativevalues  = false;
        this.isRGraph           = true;
        this.uid                = RGraph.CreateUID();
        this.canvas.uid         = this.canvas.uid ? this.canvas.uid : RGraph.CreateUID();
        this.colorsParsed       = false;
        this.original_colors    = [];
        this.firstDraw          = true; // After the first draw this will be false





        // This is a list of new property names that are used now in place of
        // the old names.
        //
        // *** When adding this list to a new chart library don't forget ***
        // *** the bit of code that also goes in the .set() function     ***
        this.propertyNameAliases = {
            /*'chart.background.bars.count':        'chart.background.barcount',
            'chart.background.bars.color1':       'chart.background.barcolor1',
            'chart.background.bars.color2':       'chart.background.barcolor2',
            'chart.background.grid.linewidth':    'chart.background.grid.width',
            'chart.background.grid.hlines.count': 'chart.background.grid.autofit.numhlines',
            'chart.background.grid.vlines.count': 'chart.background.grid.autofit.numvlines',
            'chart.background.grid.align':        'chart.background.grid.autofit.align',
            'chart.xaxis.labels':                 'chart.labels',
            'chart.xaxis.labels.offsetx':         'chart.labels.offsetx',
            'chart.xaxis.labels.offsety':         'chart.labels.offsety',
            'chart.xaxis.labels.bold':            'chart.labels.bold',
            'chart.xaxis.labels.color':           'chart.labels.color',
            'chart.xaxis.labels.font':            'chart.labels.font',
            'chart.xaxis.labels.size':            'chart.labels.size',
            'chart.xaxis.labels.italic':          'chart.labels.italic',
            'chart.yaxis.labels':                 'chart.ylabels',
            'chart.yaxis.labels.count':           'chart.ylabels.count',
            'chart.yaxis.labels.inside':          'chart.ylabels.inside',
            'chart.yaxis.labels.inside.color':    'chart.ylabels.inside.color',
            'chart.yaxis.labels.specific':        'chart.ylabels.specific',
            'chart.yaxis.labels.offsetx':         'chart.ylabels.offsetx',
            'chart.yaxis.labels.offsety':         'chart.ylabels.offsety',
            'chart.xaxis.labels.inside':          'chart.xlabels.inside',
            'chart.xaxis.labels.inside.color':    'chart.xlabels.inside.color',
            'chart.margin.left':                  'chart.gutter.left',
            'chart.margin.right':                 'chart.gutter.right',
            'chart.margin.top':                   'chart.gutter.top',
            'chart.margin.bottom':                'chart.gutter.bottom',
            'chart.filled.colors':                'chart.fillstyle',
            'chart.annotatable.color':            'chart.annotate.color',
            'chart.annotatable.linewidth':        'chart.annotate.linewidth',
            'chart.resizable.handle.background':  'chart.resize.handle.background',
            'chart.xaxis.title':                  'chart.title.xaxis',
            'chart.xaxis.title.font':             'chart.title.xaxis.font',
            'chart.xaxis.title.size':             'chart.title.xaxis.size',
            'chart.xaxis.title.bold':             'chart.title.xaxis.bold',
            'chart.xaxis.title.color':            'chart.title.xaxis.color',
            'chart.xaxis.title.italic':           'chart.title.xaxis.italic',
            'chart.xaxis.title.x':                'chart.title.xaxis.x',
            'chart.xaxis.title.y':                'chart.title.xaxis.y',
            'chart.yaxis.title':                  'chart.title.yaxis',
            'chart.yaxis.title.font':             'chart.title.yaxis.font',
            'chart.yaxis.title.size':             'chart.title.yaxis.size',
            'chart.yaxis.title.bold':             'chart.title.yaxis.bold',
            'chart.yaxis.title.color':            'chart.title.yaxis.color',
            'chart.yaxis.title.italic':           'chart.title.yaxis.italic',
            'chart.xaxis.title.pos':              'chart.title.xaxis.pos',
            'chart.yaxis.title.pos':              'chart.title.yaxis.pos',
            'chart.yaxis.title.x':                'chart.title.yaxis.x',
            'chart.yaxis.title.y':                'chart.title.yaxis.y',
            'chart.yaxis.scale.formatter':        'chart.scale.formatter',
            'chart.yaxis.scale.units.pre':        'chart.units.pre',
            'chart.yaxis.scale.units.post':       'chart.units.post',
            'chart.yaxis.scale.decimals':         'chart.scale.decimals',
            'chart.yaxis.scale.point':            'chart.scale.point',
            'chart.yaxis.scale.thousand':         'chart.scale.thousand',
            'chart.yaxis.scale.round':            'chart.scale.round',
            'chart.yaxis.scale.invert':           'chart.scale.invert',
            'chart.yaxis.scale.zerostart':        'chart.scale.zerostart',
            'chart.yaxis.scale.min':              'chart.ymin',
            'chart.yaxis.scale.max':              'chart.ymax',
            'chart.xaxis.tickmarks.count':        'chart.numxticks',
            'chart.yaxis.tickmarks.count':        'chart.numyticks',
            'chart.xaxis.tickmarks.direction':    'chart.tickdirection',
            'chart.axes.color':                   'chart.axis.color',
            'chart.axes.linewidth':               'chart.axis.linewidth',
            'chart.xaxis.position':               'chart.xaxispos',
            'chart.yaxis.position':               'chart.yaxispos',
            'chart.axes':                         function (opt) {return {name:'chart.noaxes',value:!opt.value}},
            'chart.xaxis':                        function (opt) {return {name:'chart.noxaxis',value:!opt.value}},
            'chart.yaxis':                        function (opt) {return {name:'chart.noyaxis',value:!opt.value}},
            'chart.axes.above':                    'chart.axesontop',
            'chart.xaxis.tickmarks.last':         function (opt) {return {name:'chart.noendxtick',value:!opt.value}},
            'chart.yaxis.tickmarks.last':         function (opt) {return {name:'chart.noendytick',value:!opt.value}},
            'chart.tickmarks.style':              'chart.tickmarks',
            'chart.tickmarks.size':               'chart.ticksize',
            'chart.tickmarks.style.dot.stroke':   'chart.tickmarks.dot.stroke',
            'chart.tickmarks.style.dot.fill':     'chart.tickmarks.dot.fill',
            'chart.tickmarks.style.dot.linewidth':'chart.tickmarks.dot.linewidth',
            'chart.combined.effect':              'chart.combinedchart.effect',
            'chart.combined.effect.options':      'chart.combinedchart.effect.options',
            'chart.combined.effect.callback':     'chart.combinedchart.effect.callback',
            'chart.colors.background':            'chart.background.color',
            'chart.key.position.margin.boxed':   'chart.key.position.gutter.boxed'*/
            /* [NEW]:[OLD] */
        };







        /**
        * Compatibility with older browsers
        */
        //RGraph.OldBrowserCompat(this.context);


        // Various config type stuff
        this.properties =
        {
            'chart.background.bars.count':    null,
            'chart.background.bars.color1':   'rgba(0,0,0,0)',
            'chart.background.bars.color2':   'rgba(0,0,0,0)',
            'chart.background.grid':        1,
            'chart.background.grid.linewidth':  1,
            'chart.background.grid.hsize':  25,
            'chart.background.grid.vsize':  25,
            'chart.background.grid.color':  '#ddd',
            'chart.background.grid.vlines': true,
            'chart.background.grid.hlines': true,
            'chart.background.grid.border': true,
            'chart.background.grid.autofit':           true,
            'chart.background.grid.autofit.align':     true,
            'chart.background.grid.hlines.count': 5,
            'chart.background.grid.vlines.count': null,
            'chart.background.grid.dashed': false,
            'chart.background.grid.dotted': false,
            'chart.background.hbars':       null,
            'chart.background.image':       null,
            'chart.background.image.stretch': true,
            'chart.background.image.x':     null,
            'chart.background.image.y':     null,
            'chart.background.image.w':     null,
            'chart.background.image.h':     null,
            'chart.background.image.align': null,
            'chart.background.color':       null,

            'chart.xaxis':                  true,
            'chart.xaxis.title':            '',
            'chart.xaxis.title.bold':       null,
            'chart.xaxis.title.size':       null,
            'chart.xaxis.title.font':       null,
            'chart.xaxis.title.color':      null,
            'chart.xaxis.title.italic':     null,
            'chart.xaxis.title.pos':        null,
            'chart.xaxis.title.x':          null,
            'chart.xaxis.title.y':          null,
            'chart.xaxis.position':         'bottom',
            'chart.xaxis.position.value':   0,
            'chart.xaxis.tickmarks':        null,
            'chart.xaxis.labels':                 null,
            'chart.xaxis.labels.bold':            null,
            'chart.xaxis.labels.italic':           null,
            'chart.xaxis.labels.color':           null,
            'chart.xaxis.labels.size':           null,
            'chart.xaxis.labels.font':           null,
            'chart.xaxis.labels.ingraph':         null,
            'chart.xaxis.labels.offsetx':         0,
            'chart.xaxis.labels.offsety':         0,
            'chart.xaxis.labels.inside':         false,
            'chart.xaxis.labels.inside.color':   'rgba(255,255,255,0.5)',
            'chart.xaxis.labels.inside.border':   false,
            'chart.xaxis.labels.angle':           0,
            'chart.xaxis.tickmarks.last':   true,
            'chart.xaxis.tickmarks.direction': -1,
            'chart.xaxis.tickmarks.count':  (   data && typeof data[0] === 'number' ? data.length - 1 : (typeof data[0] === 'object' && data[0] && typeof data[0][0] === 'number' ? data[0].length - 1 : 20)     ),

            'chart.yaxis':                  true,
            'chart.yaxis.tickmarks.count':  5,
            'chart.yaxis.position':         'left',
            'chart.yaxis.scale.units.post': '',
            'chart.yaxis.scale.units.pre':  '',
            'chart.yaxis.scale.zerostart':  true,
            'chart.yaxis.scale.decimals':   null,
            'chart.yaxis.scale.point':      '.',
            'chart.yaxis.scale.thousand':   ',',
            'chart.yaxis.scale.invert':           false,
            'chart.yaxis.tickmarks.last':   true,
            'chart.yaxis.labels':                true,
            'chart.yaxis.labels.count':          5,
            'chart.yaxis.labels.inside':         false,
            'chart.yaxis.labels.inside.border':  false,
            'chart.yaxis.labels.offsetx':        0,
            'chart.yaxis.labels.offsety':        0,
            'chart.yaxis.labels.bold':       null,
            'chart.yaxis.labels.size':       null,
            'chart.yaxis.labels.font':       null,
            'chart.yaxis.labels.color':      null,
            'chart.yaxis.labels.italic':     null,
            'chart.yaxis.title':            '',
            'chart.yaxis.title.pos':        null,
            'chart.yaxis.title.x':          null,
            'chart.yaxis.title.y':          null,
            'chart.yaxis.title.bold':       null,
            'chart.yaxis.title.size':       null,
            'chart.yaxis.title.font':       null,
            'chart.yaxis.title.color':      null,
            'chart.yaxis.title.italic':     null,
            'chart.yaxis.scale.min':        0,
            'chart.yaxis.scale.max':        null,
            
            'chart.labels.above':            false,
            'chart.labels.above.decimals':   null,
            'chart.labels.above.size':       null,
            'chart.labels.above.color':      null,
            'chart.labels.above.font':       null,
            'chart.labels.above.bold':       null,
            'chart.labels.above.italic':     null,
            'chart.labels.above.background': 'rgba(255,255,255,0.7)',
            'chart.labels.above.border':     false,
            'chart.labels.above.offsety':     5,
            'chart.labels.above.units.pre':  '',
            'chart.labels.above.units.post': '',
            'chart.labels.above.specific':   null,

            //'chart.xtickgap':               20,
            //'chart.smallxticks':            3,
            //'chart.largexticks':            5,
            //'chart.ytickgap':               20,
            //'chart.smallyticks':            3,
            //'chart.largeyticks':            5,

            'chart.linewidth':              2.001,

            'chart.colors':                 ['red', '#0f0', '#00f', '#f0f', '#ff0', '#0ff','green','pink','blue','black'],

            
            'chart.tickmarks.style':        'none',
            'chart.tickmarks.linewidth':    null,
            'chart.tickmarks.size':         3,
            'chart.tickmarks.style.dot.stroke':   'white',
            'chart.tickmarks.style.dot.fill':     null,
            'chart.tickmarks.style.dot.linewidth': 3,
            'chart.tickmarks.style.image':        null,
            'chart.tickmarks.style.image.halign': 'center',
            'chart.tickmarks.style.image.valign': 'center',
            'chart.tickmarks.style.image.offsetx':0,
            'chart.tickmarks.style.image.offsety':0,

            'chart.margin.left':            35,
            'chart.margin.right':           35,
            'chart.margin.top':             35,
            'chart.margin.bottom':          35,
            'chart.margin.inner':           0,
            
            'chart.filled.colors':          null,
            
            'chart.text.bold':              false,
            'chart.text.italic':            false,
            'chart.text.size':              12,
            'chart.text.color':             'black',
            'chart.text.font':              'Arial, Verdana, sans-serif',
            'chart.text.accessible':               true,
            'chart.text.accessible.overflow':      'visible',
            'chart.text.accessible.pointerevents': false,

            
            'chart.title':                  '',
            'chart.title.background':       null,
            'chart.title.hpos':             null,
            'chart.title.vpos':             null,
            'chart.title.font':             null,
            'chart.title.size':             null,
            'chart.title.color':            null,
            'chart.title.bold':             null,
            'chart.title.italic':           null,
            'chart.title.x':                null,
            'chart.title.y':                null,
            'chart.title.halign':           null,
            'chart.title.valign':           null,
            
            'chart.shadow':                 true,
            'chart.shadow.offsetx':         2,
            'chart.shadow.offsety':         2,
            'chart.shadow.blur':            3,
            'chart.shadow.color':           'rgba(128,128,128,0.5)',
            
            'chart.tooltips':               null,
            'chart.tooltips.hotspot.xonly': false,
            'chart.tooltips.hotspot.size':  5,
            'chart.tooltips.effect':        'fade',
            'chart.tooltips.css.class':     'RGraph_tooltip',
            'chart.tooltips.event':         'onmousemove',
            'chart.tooltips.highlight':     true,
            'chart.tooltips.coords.page':   false,
            
            'chart.highlight.style':        null,
            'chart.highlight.stroke':       'gray',
            'chart.highlight.fill':         'white',
            
            'chart.stepped':                false,
            
            'chart.key':                    null,
            'chart.key.background':         'white',
            'chart.key.position':           'graph',
            'chart.key.halign':             null,
            'chart.key.shadow':             false,
            'chart.key.shadow.color':       '#666',
            'chart.key.shadow.blur':        3,
            'chart.key.shadow.offsetx':     2,
            'chart.key.shadow.offsety':     2,
            'chart.key.position.margin.boxed': false,
            'chart.key.position.x':         null,
            'chart.key.position.y':         null,
            'chart.key.color.shape':        'square',
            'chart.key.rounded':            true,
            'chart.key.linewidth':          1,
            'chart.key.colors':             null,
            'chart.key.interactive':        false,
            'chart.key.interactive.highlight.chart.stroke': 'rgba(255,0,0,0.3)',
            'chart.key.interactive.highlight.label': 'rgba(255,0,0,0.2)',
            'chart.key.labels.font':         null,
            'chart.key.labels.size':         null,
            'chart.key.labels.color':         null,
            'chart.key.labels.bold':          null,
            'chart.key.labels.italic':        null,
            'chart.key.labels.offsetx':      0,
            'chart.key.labels.offsety':      0,

            'chart.contextmenu':            null,

            'chart.crosshairs':             false,
            'chart.crosshairs.color':       '#333',
            'chart.crosshairs.hline':       true,
            'chart.crosshairs.vline':       true,
            
            'chart.annotatable':            false,
            'chart.annotatable.color':         'black',
            'chart.annotatable.linewidth':     1,

            'chart.filled':                 false,
            'chart.filled.range':           false,
            'chart.filled.range.threshold': null,
            'chart.filled.range.threshold.colors': ['red', 'green'],
            'chart.filled.accumulative':    true,

            'chart.variant':                null,

            'chart.axes':                   true,
            'chart.axes.above':              false,
            'chart.axes.color':             'black',
            'chart.axes.linewidth':         1,

            'chart.backdrop':               false,
            'chart.backdrop.size':          30,
            'chart.backdrop.alpha':         0.2,

            'chart.resizable':              false,
            'chart.resizable.handle.adjust':   [0,0],
            'chart.resizable.handle.background': null,

            'chart.adjustable':             false,
            'chart.adjustable.only':        null,

            'chart.redraw':                 true,

            'chart.outofbounds':            false,
            'chart.outofbounds.clip':       false,

            'chart.animation.factor':       1,
            'chart.animation.unfold.x':     false,
            'chart.animation.unfold.y':     true,
            'chart.animation.unfold.initial': 2,
            'chart.animation.trace.clip':     1,
            'chart.animation.trace.center':   false,

            'chart.spline':                    false,

            'chart.line.visible':             [],

            'chart.events.click':             null,
            'chart.events.mousemove':         null,

            'chart.errorbars':              false,
            'chart.errorbars.color':        'black',
            'chart.errorbars.capped':        true,
            'chart.errorbars.capped.width':   12,
            'chart.errorbars.linewidth':     1,

            'chart.combined.effect':     null,
            'chart.combined.effect.options':  null,
            'chart.combined.effect.callback': null,

            'chart.clearto':   'rgba(0,0,0,0)',

            'chart.dotted':     false,
            'chart.dashed':     false
        }

        /**
        * Change null arguments to empty arrays
        */
        for (var i=1; i<arguments.length; ++i) {
            if (typeof(arguments[i]) == 'null' || !arguments[i]) {
                arguments[i] = [];
            }
        }


        /**
        * Store the original data. This also allows for giving arguments as one big array.
        */
        this.original_data = [];

        // This allows for the new object based configuration style
        if (typeof conf === 'object' && conf.data) {
            if (typeof conf.data[0] === 'number' || RGraph.isNull(conf.data[0])) {

                this.original_data[0] = RGraph.arrayClone(conf.data);

            //} else if (typeof conf.data[0] === 'object' && !RGraph.isNull(conf.data[0])) {
            } else {

                for (var i=0; i<conf.data.length; ++i) {
                    this.original_data[i] = RGraph.arrayClone(conf.data[i]);
                }
            }

        // Allow for the older configuration style
        } else {
            for (var i=1; i<arguments.length; ++i) {
                
                if (   arguments[1]
                    && typeof(arguments[1]) == 'object'
                    && arguments[1][0]
                    && typeof(arguments[1][0]) == 'object'
                    && arguments[1][0].length) {
    
                    var tmp = [];
    
                    for (var i=0; i<arguments[1].length; ++i) {
                        tmp[i] = RGraph.array_clone(arguments[1][i]);
                    }
    
                    for (var j=0; j<tmp.length; ++j) {
                        this.original_data[j] = RGraph.arrayClone(tmp[j]);
                    }
    
                } else {
                    this.original_data[i - 1] = RGraph.arrayClone(arguments[i]);
                }
            }
        }


        // Check for support
        if (!this.canvas) {
            alert('[LINE] Fatal error: no canvas support');
            return;
        }
        
        // Convert strings to numbers
        for (var i=0; i<this.original_data.length; ++i) {
            for (var j=0; j<this.original_data[i].length; ++j) {
                if (typeof this.original_data[i][j] === 'string') {
                    this.original_data[i][j] = parseFloat(this.original_data[i][j]);
                }
            }
        }

        
        /**
        * Store the data here as one big array
        */
        this.data_arr = RGraph.arrayLinearize(this.original_data);

        for (var i=0; i<this.data_arr.length; ++i) {
            this['$' + i] = {};
        }


        /**
        * Translate half a pixel for antialiasing purposes - but only if it hasn't beeen
        * done already
        */
        if (!this.canvas.__rgraph_aa_translated__) {
            this.context.translate(0.5,0.5);
            
            this.canvas.__rgraph_aa_translated__ = true;
        }




        // Short variable names
        var RG   = RGraph,
            ca   = this.canvas,
            co   = ca.getContext('2d'),
            prop = this.properties,
            pa2  = RG.path2,
            win  = window,
            doc  = document,
            ma   = Math
        
        
        
        /**
        * "Decorate" the object with the generic effects if the effects library has been included
        */
        if (RG.Effects && typeof RG.Effects.decorate === 'function') {
            RG.Effects.decorate(this);
        }
        



    
        /**
        * An all encompassing accessor
        * 
        * @param string name The name of the property
        * @param mixed value The value of the property
        */
        this.set =
        this.Set = function (name)
        {
            var value = typeof arguments[1] === 'undefined' ? null : arguments[1];

            /**
            * the number of arguments is only one and it's an
            * object - parse it for configuration data and return.
            */
            if (arguments.length === 1 && typeof name === 'object') {
                RG.parseObjectStyleConfig(this, name);
                return this;
            }







    
            /**
            * This should be done first - prepend the propertyy name with "chart." if necessary
            */
            if (name.substr(0,6) != 'chart.') {
                name = 'chart.' + name;
            }




            // Convert uppercase letters to dot+lower case letter
            while(name.match(/([A-Z])/)) {
                name = name.replace(/([A-Z])/, '.' + RegExp.$1.toLowerCase());
            }



            // Consolidate the tooltips
            if (name == 'chart.tooltips' && typeof value == 'object' && value) {
    
                var tooltips = [];
    
                for (var i=1; i<arguments.length; i++) {
                    if (typeof(arguments[i]) == 'object' && arguments[i][0]) {
                        for (var j=0; j<arguments[i].length; j++) {
                            tooltips.push(arguments[i][j]);
                        }
    
                    } else if (typeof(arguments[i]) == 'function') {
                        tooltips = arguments[i];
    
                    } else {
                        tooltips.push(arguments[i]);
                    }
                }
    
                // Because "value" is used further down at the end of this function, set it to the expanded array os tooltips
                value = tooltips;
            }
    
            
            /**
            * If (buggy) Chrome and the linewidth is 1, change it to 1.01
            */
            if (name == 'chart.linewidth' && navigator.userAgent.match(/Chrome/)) {
                if (value == 1) {
                    value = 1.01;
                
                } else if (RGraph.is_array(value)) {
                    for (var i=0; i<value.length; ++i) {
                        if (typeof(value[i]) == 'number' && value[i] == 1) {
                            value[i] = 1.01;
                        }
                    }
                }
            }
    
    
            /**
            * Check for xaxispos
            */
            if (name == 'chart.xaxis.position' ) {
                if (value != 'bottom' && value != 'center' && value != 'top') {
                    alert('[LINE] (' + this.id + ') The xaxisPosition configuration value should be top, center or bottom. Tried to set it to: ' + value + ' Changing it to center');
                    value = 'center';
                }
            }





    

            this.properties[name] = value;

            return this;
        };








        /**
        * An all encompassing accessor
        * 
        * @param string name The name of the property
        */
        this.get =
        this.Get = function (name)
        {
            /**
            * This should be done first - prepend the property name with "chart." if necessary
            */
            if (name.substr(0,6) != 'chart.') {
                name = 'chart.' + name;
            }

            // Convert uppercase letters to dot+lower case letter
            while(name.match(/([A-Z])/)) {
                name = name.replace(/([A-Z])/, '.' + RegExp.$1.toLowerCase());
            }

            
    
            return prop[name];
        };








        /**
        * The function you call to draw the line chart
        */
        this.draw =
        this.Draw = function ()
        {
            // MUST be the first thing done!
            if (typeof(prop['chart.background.image']) == 'string') {
                RG.DrawBackgroundImage(this);
            }
    
    
            /**
            * Fire the onbeforedraw event
            */
            RG.fireCustomEvent(this, 'onbeforedraw');






            /**
            * Parse the colors. This allows for simple gradient syntax
            */
            if (!this.colorsParsed) {
    
                this.parseColors();
    
                // Don't want to do this again
                this.colorsParsed = true;
            }



            /**
            * Make the margins easy to access
            */
            this.marginLeft   = prop['chart.margin.left'];
            this.marginRight  = prop['chart.margin.right'];
            this.marginTop    = prop['chart.margin.top'];
            this.marginBottom = prop['chart.margin.bottom'];

    
    
            // Reset the data back to that which was initially supplied
            this.data = RG.arrayClone(this.original_data);

    
            // Reset the max value
            this.max = 0;

            if (prop['chart.filled'] && !prop['chart.filled.range'] && this.data.length > 1 && prop['chart.filled.accumulative']) {
    
                var accumulation = [];

                for (var set=0; set<this.data.length; ++set) {
                    for (var point=0; point<this.data[set].length; ++point) {
                        this.data[set][point] = Number(accumulation[point] ? accumulation[point] : 0) + this.data[set][point];
                        accumulation[point] = this.data[set][point];
                    }
                }
            }

            /**
            * Get the maximum Y scale value
            */
            if (prop['chart.yaxis.scale.max']) {

                this.max = prop['chart.yaxis.scale.max'];
                this.min = prop['chart.yaxis.scale.min'] ? prop['chart.yaxis.scale.min'] : 0;
    
                this.scale2 = RG.getScale2(this, {
                    'scale.max':          this.max,
                    'scale.min':          prop['chart.yaxis.scale.min'],
                    'scale.strict':       true,
                    'scale.thousand':     prop['chart.yaxis.scale.thousand'],
                    'scale.point':        prop['chart.yaxis.scale.point'],
                    'scale.decimals':     prop['chart.yaxis.scale.decimals'],
                    'scale.labels.count': prop['chart.yaxis.labels.count'],
                    'scale.round':        prop['chart.yaxis.scale.round'],
                    'scale.units.pre':    prop['chart.yaxis.scale.units.pre'],
                    'scale.units.post':   prop['chart.yaxis.scale.units.post']
                });

                this.max   = this.scale2.max ? this.scale2.max : 0;
    
                // Check for negative values
                if (!prop['chart.outofbounds']) {
                    for (dataset=0; dataset<this.data.length; ++dataset) {
                        if (RGraph.isArray(this.data[dataset])) {
                            for (var datapoint=0; datapoint<this.data[dataset].length; datapoint++) {
                                // Check for negative values
                                this.hasnegativevalues = (this.data[dataset][datapoint] < 0) || this.hasnegativevalues;
                            }
                        }
                    }
                }
    
            } else {

                this.min = prop['chart.yaxis.scale.min'] ? prop['chart.yaxis.scale.min'] : 0;
    
                // Work out the max Y value
                for (dataset=0; dataset<this.data.length; ++dataset) {
                    for (var datapoint=0; datapoint<this.data[dataset].length; datapoint++) {
        
                        this.max = Math.max(this.max, this.data[dataset][datapoint] ? Math.abs(parseFloat(this.data[dataset][datapoint])) : 0);
        
                        // Check for negative values
                        if (!prop['chart.outofbounds']) {
                            this.hasnegativevalues = (this.data[dataset][datapoint] < 0) || this.hasnegativevalues;
                        }
                    }
                }

                this.scale2 = RG.getScale2(this, {
                    'scale.max':          this.max,
                    'scale.min':          prop['chart.yaxis.scale.min'],
                    'scale.thousand':     prop['chart.yaxis.scale.thousand'],
                    'scale.point':        prop['chart.yaxis.scale.point'],
                    'scale.decimals':     prop['chart.yaxis.scale.decimals'],
                    'scale.labels.count': prop['chart.yaxis.labels.count'],
                    'scale.round':        prop['chart.yaxis.scale.round'],
                    'scale.units.pre':    prop['chart.yaxis.scale.units.pre'],
                    'scale.units.post':   prop['chart.yaxis.scale.units.post']
                });
    
                this.max   = this.scale2.max ? this.scale2.max : 0;
            }
    
            /**
            * Setup the context menu if required
            */
            if (prop['chart.contextmenu']) {
                RG.showContext(this);
            }

            /**
            * Reset the coords arrays otherwise it will keep growing
            */
            this.coords     = [];
            this.coordsText = [];

            /**
            * Work out a few things. They need to be here because they depend on things you can change before you
            * call Draw() but after you instantiate the object
            */
            this.grapharea      = ca.height - this.marginTop - this.marginBottom;
            this.halfgrapharea  = this.grapharea / 2;
            this.halfTextHeight = prop['chart.text.size'] / 2;
    
   
    
            if (prop['chart.variant'] == '3d') {
                RG.draw3DAxes(this);
            }
            
            // Draw the background
            RG.background.draw(this);


            /**
            * Draw any horizontal bars that have been defined
            */
            if (prop['chart.background.hbars'] && prop['chart.background.hbars'].length > 0) {
                RG.drawBars(this);
            }

            if (!prop['chart.axes.above']) {
                this.drawAxes();
            }
    
            /**
            * This facilitates the new Trace2 effect
            */
    
            co.save()
            co.beginPath();

            // The clipping region is idfferent based on th animationTraceCenter option
            if (prop['chart.animation.trace.center']) {
                co.rect(
                    (ca.width / 2) * (1 - prop['chart.animation.trace.clip']),
                    0,
                    ca.width * prop['chart.animation.trace.clip'],
                    ca.height
                );
            } else {
                co.rect(0, 0, ca.width * prop['chart.animation.trace.clip'], ca.height);
            }

            co.clip();
    
                for (var i=0, j=0, len=this.data.length; i<len; i++, j++) {
        
                    co.beginPath();
        
                    /**
                    * Turn on the shadow if required
                    */
                    if (!prop['chart.filled']) {
                        this.setShadow(i);
                    }
        
                    /**
                    * Draw the line
                    */
        
                    if (prop['chart.filled.colors']) {
                        if (typeof(prop['chart.filled.colors']) == 'object' && prop['chart.filled.colors'][j]) {
                           var fill = prop['chart.filled.colors'][j];
                        
                        } else if (typeof(prop['chart.filled.colors']) == 'object' && prop['chart.filled.colors'].toString().indexOf('Gradient') > 0) {
                           var fill = prop['chart.filled.colors'];
                        
                        } else if (typeof(prop['chart.filled.colors']) == 'string') {
                            var fill = prop['chart.filled.colors'];
            
                        }
                    } else if (prop['chart.filled']) {
                        var fill = prop['chart.colors'][j];
        
                    } else {
                        var fill = null;
                    }

                    /**
                    * Figure out the tickmark to use
                    */
                    if (prop['chart.tickmarks.style'] && typeof(prop['chart.tickmarks.style']) == 'object') {
                        var tickmarks = prop['chart.tickmarks.style'][i];
                    } else if (prop['chart.tickmarks.style'] && typeof(prop['chart.tickmarks.style']) == 'string') {
                        var tickmarks = prop['chart.tickmarks.style'];
                    } else if (prop['chart.tickmarks.style'] && typeof(prop['chart.tickmarks.style']) == 'function') {
                        var tickmarks = prop['chart.tickmarks.style'];
                    } else {
                        var tickmarks = null;
                    }

                    //
                    // Draw the line, accounting for the outofboundsClip option
                    //
                    if (prop['chart.outofbounds.clip']) {
                        pa2(
                            co,
                            'sa b r % % % % cl b',
                            0,
                            this.marginTop,
                            ca.width,
                            ca.height - this.marginTop - this.marginBottom
                        );
                    }

                        this.drawLine(
                            this.data[i],
                            prop['chart.colors'][j],
                            fill,
                            this.getLineWidth(j),
                            tickmarks,
                            i
                        );
                    if (prop['chart.outofbounds.clip']) {
                        co.restore();
                    }
            
                    co.stroke();

                }
        
            /**
            * If the line is filled re-stroke the lines
            */
            if (prop['chart.outofbounds.clip']) {
                pa2(
                    co,
                    'sa b r % % % % cl b',
                    0,
                    this.marginTop,
                    ca.width,
                    ca.height - this.marginTop - this.marginBottom
                );
            }


            if (prop['chart.filled'] && prop['chart.filled.accumulative'] && !prop['chart.spline']) {
                

                for (var i=0; i<this.coords2.length; ++i) {
        
                    co.beginPath();
                    co.lineWidth = this.GetLineWidth(i);
                    co.strokeStyle = !this.hidden(i) ? prop['chart.colors'][i] : 'rgba(0,0,0,0)';
        
                    for (var j=0,len=this.coords2[i].length; j<len; ++j) {
        
                        if (j == 0 || this.coords2[i][j][1] == null || (this.coords2[i][j - 1] && this.coords2[i][j - 1][1] == null)) {
                            co.moveTo(this.coords2[i][j][0], this.coords2[i][j][1]);
                        } else {
                            if (prop['chart.stepped']) {
                                co.lineTo(this.coords2[i][j][0], this.coords2[i][j - 1][1]);
                            }
                            co.lineTo(this.coords2[i][j][0], this.coords2[i][j][1]);
                        }
                    }
                    
                    co.stroke();
                    // No fill!
                }

                // Redraw the tickmarks
                if (prop['chart.tickmarks.style']) {
        
                    co.beginPath();
        
                    co.fillStyle = 'white';
                    
                    for (var i=0,len=this.coords2.length; i<len; ++i) {
        
                        co.beginPath();
                        co.strokeStyle = prop['chart.colors'][i];
    
                        for (var j=0; j<this.coords2[i].length; ++j) {
                            if (typeof(this.coords2[i][j]) == 'object' && typeof(this.coords2[i][j][0]) == 'number' && typeof(this.coords2[i][j][1]) == 'number') {
                                
                                var tickmarks = typeof(prop['chart.tickmarks.style']) == 'object' ? prop['chart.tickmarks.style'][i] : prop['chart.tickmarks.style'];
        
                                this.DrawTick(
                                    this.coords2[i],
                                    this.coords2[i][j][0],
                                    this.coords2[i][j][1],
                                    co.strokeStyle,
                                    false,
                                    j == 0 ? 0 : this.coords2[i][j - 1][0],
                                    j == 0 ? 0 : this.coords2[i][j - 1][1],
                                    tickmarks,
                                    j,
                                    i
                                );
                            }
                        }
                    }
        
                    co.stroke();
                    co.fill();
                }

            } else if (prop['chart.filled'] && prop['chart.filled.accumulative'] && prop['chart.spline']) {

                // Restroke the curvy filled accumulative lines

                for (var i=0; i<this.coordsSpline.length; i+=1) {
                    co.beginPath();
                    co.strokeStyle = prop['chart.colors'][i];
                    co.lineWidth = this.GetLineWidth(i);

                    for (var j=0,len=this.coordsSpline[i].length; j<len; j+=1) {
                        
                        var point = this.coordsSpline[i][j];
                        
                        j == 0 ? co.moveTo(point[0], point[1]) : co.lineTo(point[0], point[1]);
                    }

                   co.stroke();
                }







                for (var i=0,len=this.coords2.length; i<len; i+=1) {
                    for (var j=0,len2=this.coords2[i].length; j<len2; ++j) {
                        if (typeof(this.coords2[i][j]) == 'object' && typeof(this.coords2[i][j][0]) == 'number' && typeof(this.coords2[i][j][1]) == 'number') {

                            var tickmarks = typeof prop['chart.tickmarks.style'] == 'object' && !RGraph.is_null(prop['chart.tickmarks.style']) ? prop['chart.tickmarks.style'][i] : prop['chart.tickmarks.style'];
                            co.strokeStyle = prop['chart.colors'][i];
                            this.DrawTick(
                                this.coords2[i],
                                this.coords2[i][j][0],
                                this.coords2[i][j][1],
                                prop['chart.colors'][i],
                                false,
                                j == 0 ? 0 : this.coords2[i][j - 1][0],
                                j == 0 ? 0 : this.coords2[i][j - 1][1],
                                tickmarks,
                                j,
                                i
                            );
                        }
                    }
                }



            }


        if (prop['chart.outofbounds.clip']) {
            co.restore();
        }
        co.restore();
    
        // ???
        co.beginPath();
    
    
    
    
            /**
            * If the axes have been requested to be on top, do that
            */
            if (prop['chart.axes,above']) {
                this.drawAxes();
            }

            /**
            * Draw the labels
            */
            this.drawLabels();
            
            /**
            * Draw the range if necessary
            */
            this.drawRange();

            // Draw a key if necessary
            if (prop['chart.key'] && prop['chart.key'].length && RG.DrawKey) {
                RG.drawKey(this, prop['chart.key'], prop['chart.colors']);
            }
    
            /**
            * Draw " above" labels if enabled
            */
            if (prop['chart.labels.above']) {
                this.drawAboveLabels();
            }
    
            /**
            * Draw the "in graph" labels
            */
            RG.drawInGraphLabels(this);

            /**
            * Redraw the lines if a filled range is on the cards
            */
            if (prop['chart.filled'] && prop['chart.filled.range'] && this.data.length == 2) {
    
                co.beginPath();
                var len        = this.coords.length / 2;
                co.lineWidth   = prop['chart.linewidth'];
                co.strokeStyle = this.hidden(0) ? 'rgba(0,0,0,0)' : prop['chart.colors'][0];
    
                for (var i=0; i<len; ++i) {
    
                    if (!RG.isNull(this.coords[i][1])) {
                        if (i == 0) {
                            co.moveTo(this.coords[i][0], this.coords[i][1]);
                        } else {
                            co.lineTo(this.coords[i][0], this.coords[i][1]);
                        }
                    }
                }
                
                co.stroke();
    
    
                co.beginPath();
                
                if (prop['chart.colors'][1]) {
                    co.strokeStyle = this.hidden(1) ? 'rgba(0,0,0,0)' : prop['chart.colors'][1];
                }
                
                for (var i=this.coords.length - 1; i>=len; --i) {
                    if (!RG.is_null(this.coords[i][1])) {
                        if (i == (this.coords.length - 1)) {
                            co.moveTo(this.coords[i][0], this.coords[i][1]);
                        } else {
                            co.lineTo(this.coords[i][0], this.coords[i][1]);
                        }
                    }
                }
    
                co.stroke();
    
    
            } else if (prop['chart.filled'] && prop['chart.filled.range']) {
                alert('[LINE] You must have only two sets of data for a filled range chart');
            }

            /**
            * This function enables resizing
            */
            if (prop['chart.resizable']) {
                RG.allowResizing(this);
            }
    
    
            /**
            * This installs the event listeners
            */
            RG.installEventListeners(this);
            
            

    
    

            /**
            * Fire the onfirstdraw event
            */
            if (this.firstDraw) {
                this.firstDraw = false;
                RG.fireCustomEvent(this, 'onfirstdraw');
                this.firstDrawFunc();
            }




            /**
            * Fire the RGraph ondraw event
            */
            RG.fireCustomEvent(this, 'ondraw');
            
            return this;
        };








        /**
        * Used in chaining. Runs a function there and then - not waiting for
        * the events to fire (eg the onbeforedraw event)
        * 
        * @param function func The function to execute
        */
        this.exec = function (func)
        {
            func(this);
            
            return this;
        };








        /**
        * Draws the axes
        */
        this.drawAxes =
        this.DrawAxes = function ()
        {
            // Don't draw the axes?
            if (!prop['chart.axes']) {
                return;
            }
            
            // Turn any shadow off
            RG.noShadow(this);
    
            co.lineWidth   = prop['chart.axes.linewidth'] + 0.001;
            co.lineCap     = 'square';
            co.lineJoin    = 'miter';
            co.strokeStyle = prop['chart.axes.color'];
            coords         = {
                xaxis: {},
                yaxis: {}
            };

            co.beginPath();

            // Draw the X axis
            if (prop['chart.xaxis']) {

                if (prop['chart.xaxis.position'] == 'center') {
                    coords.xaxis = [
                        this.marginLeft,
                        ma.round((this.grapharea / 2) + this.marginTop),
                        ca.width - this.marginRight,
                        ma.round((this.grapharea / 2) + this.marginTop)
                    ];
                } else if (prop['chart.xaxis.position'] === 'top') {
                    coords.xaxis = [
                        this.marginLeft,
                        this.marginTop,
                        ca.width - this.marginRight,
                        this.marginTop
                    ];
                } else {

                    var y = ma.round(this.getYCoord(prop['chart.yaxis.scale.min'] != 0 ? prop['chart.yaxis.scale.min'] : 0));

                    if (prop['chart.yaxis.scale.invert'] && prop['chart.yaxis.scale.min'] === 0) {
                        y = this.getYCoord(this.scale2.max);
                    } else if (prop['chart.yaxis.scale.invert'] && prop['chart.yaxis.scale.min'] >= 0) {
                        
                        // This puts the X axis at the bottom (not at the scale
                        // value 0 because the scale is inverted)
                        y = this.getYCoord(this.scale2.max);
                    
                    } else if (prop['chart.yaxis.scale.min'] < 0) {
                        y = this.getYCoord(0);
                    }

                    coords.xaxis = [
                        this.marginLeft,
                        y,
                        ca.width - this.marginRight,
                        y
                    ];
                }

                co.moveTo(coords.xaxis[0], coords.xaxis[1]);
                co.lineTo(coords.xaxis[2], coords.xaxis[3]);

                // Save the coords so that they can
                // be referenced at a later time
                this.coordsAxes = coords;
            }





            // Draw the Y axis
            if (prop['chart.yaxis']) {
                if (prop['chart.yaxis.position'] === 'left') {
                    co.moveTo(this.marginLeft, this.marginTop);
                    co.lineTo(this.marginLeft, ca.height - this.marginBottom);
                } else {
                    co.moveTo(ca.width - this.marginRight, this.marginTop);
                    co.lineTo(ca.width - this.marginRight, ca.height - this.marginBottom);
                }
            }








            /**
            * Draw the X tickmarks
            */
            if (prop['chart.xaxis'] && prop['chart.xaxis.tickmarks.count'] > 0) {

                var xTickInterval = (ca.width - this.marginLeft - this.marginRight) / prop['chart.xaxis.tickmarks.count'];


                if (!xTickInterval || xTickInterval <= 0) {
                    xTickInterval = (ca.width - this.marginLeft - this.marginRight) / (prop['chart.xaxis.labels'] && prop['chart.xaxis.labels'].length ? prop['chart.xaxis.labels'].length - 1 : 10);
                }

                for (x=this.marginLeft + (prop['chart.yaxis.position'] == 'left' ? xTickInterval : 0); x<=(ca.width - this.marginRight + 1 ); x+=xTickInterval) {

                    if (prop['chart.yaxis.position'] == 'right' && x >= (ca.width - this.marginRight - 1) ) {
                        break;
                    }

                    // If the last tick is not desired...
                    if (!prop['chart.xaxis.tickmarks.last']) {
                        if (prop['chart.yaxis.position'] == 'left' && x >= (ca.width - this.marginRight - 1)) {
                            break;
                        } else if (prop['chart.yaxis.position'] == 'right' && x == this.marginLeft) {
                            continue;
                        }
                    }

                    var yStart = prop['chart.xaxis.position'] === 'center' ? (this.marginTop + (this.grapharea / 2)) - 3 : ca.height - this.marginBottom;
                    var yEnd   = prop['chart.xaxis.position'] === 'center' ? yStart + 6 : ca.height - this.marginBottom + 3;


                    // Draw the tick
                    if (prop['chart.yaxis.scale.min'] >= 0 && prop['chart.xaxis.position'] === 'bottom') {
                        var yStart = this.getYCoord(prop['chart.yaxis.scale.min']) - (prop['chart.yaxis.scale.min'] >= 0 ? 0 : 3),
                            yEnd   = this.getYCoord(prop['chart.yaxis.scale.min']) + 3;

                        if (prop['chart.yaxis.scale.invert']) {
                            yStart = ca.height - prop['chart.margin.bottom'];
                            yEnd   = yStart + 3;
                        }

                    } else if (prop['chart.xaxis.position'] == 'center') {
                        var yStart = Math.round((this.marginTop + (this.grapharea / 2))) - 3,
                            yEnd = yStart + 6;
                    
                    } else if (prop['chart.xaxis.position'] === 'bottom') {

                        var yStart = this.getYCoord(0) - (prop['chart.yaxis.scale.min'] !== 0 ? 3 : 0),
                            yEnd   = this.getYCoord(0) + 3;
                        yEnd += 0;



                    
                    } else if (prop['chart.xaxis.position'] == 'top') {

                        yStart = this.marginTop - 3;
                        yEnd   = this.marginTop;
                    }

                    co.moveTo(ma.round(x), yStart);
                    co.lineTo(ma.round(x), yEnd);
                }
    
            // Draw an extra tickmark if there is no X axis, but there IS a Y axis
            // OR if there is an offset X axis
            } else if (prop['chart.yaxis'] && prop['chart.yaxis.tickmarks.count'] > 0) {

                if (prop['chart.yaxis.tickmarks.last']) {
                    if (prop['chart.yaxis.position'] === 'left') {
                        co.moveTo(this.marginLeft, Math.round(ca.height - this.marginBottom));
                        co.lineTo(this.marginLeft - 3, Math.round(ca.height - this.marginBottom));
                    } else {
                        co.moveTo(ca.width - this.marginRight, Math.round(ca.height - this.marginBottom));
                        co.lineTo(ca.width - this.marginRight + 3, Math.round(ca.height - this.marginBottom));
                    }
                }
            }








            /**
            * Draw the Y tickmarks
            */
            var numyticks = prop['chart.yaxis.tickmarks.count'];

            if (prop['chart.yaxis'] && numyticks > 0) {
                
                var counter    = 0,
                    adjustment = 0;
        
                if (prop['chart.yaxis.position'] === 'right') {
                    adjustment = (ca.width - this.marginLeft - this.marginRight);
                }
                
                // X axis at the center
                if (prop['chart.xaxis.position'] == 'center') {
                    var interval = (this.grapharea / numyticks);
                    var lineto = (prop['chart.yaxis.position'] == 'left' ? this.marginLeft : ca.width - this.marginRight + 3);
        
                    // Draw the upper halves Y tick marks
                    for (y=this.marginTop; y<(this.grapharea / 2) + this.marginTop; y+=interval) {
                        if (y < (this.grapharea / 2) + this.marginTop) {
                            co.moveTo((prop['chart.yaxis.position'] == 'left' ? this.marginLeft - 3 : ca.width - this.marginRight), Math.round(y));
                            co.lineTo(lineto, Math.round(y));
                        }
                    }
    
                    // Draw the lower halves Y tick marks
                    for (y=this.marginTop + (this.halfgrapharea) + interval; y <= this.grapharea + this.marginTop; y+=interval) {
                        co.moveTo((prop['chart.yaxis.position'] == 'left' ? this.marginLeft - 3 : ca.width - this.marginRight), Math.round(y));
                        co.lineTo(lineto, Math.round(y));
                    }
                
                // X axis at the top
                } else if (prop['chart.xaxis.position'] == 'top') {
                    var interval = (this.grapharea / numyticks);
                    var lineto = (prop['chart.yaxis.position'] == 'left' ? this.marginLeft : ca.width - this.marginRight + 3);
    
                    // Draw the Y tick marks
                    for (y=this.marginTop + interval; y <= this.grapharea + this.marginBottom; y+=interval) {
                        co.moveTo((prop['chart.yaxis.position'] == 'left' ? this.marginLeft - 3 : ca.width - this.marginRight), Math.round(y));
                        co.lineTo(lineto, Math.round(y));
                    }

                    
                    // If there's no X axis draw an extra tick
                    if (!prop['chart.xaxis'] && prop['chart.yaxis.tickmarks.last']) {
                        co.moveTo((prop['chart.yaxis.position'] == 'left' ? this.marginLeft - 3 : ca.width - this.marginRight), this.marginTop);
                        co.lineTo(lineto, this.marginTop);
                    }
                
                // X axis at the bottom
                } else {

                    var lineto = (prop['chart.yaxis.position'] == 'left' ? this.marginLeft - 3 : ca.width - this.marginRight + 3);

                    for (y=this.marginTop;
                         y<(ca.height - this.marginBottom) && counter < numyticks;
                         y+=( (ca.height - this.marginTop - this.marginBottom) / numyticks)
                        ) {

                        // This check is so that there's no tickmark at
                        // the same position as the X axis
                        if (ma.round(y) !== ma.round(this.coordsAxes.xaxis[1])) {
                            co.moveTo(this.marginLeft + adjustment, ma.round(y));
                            co.lineTo(lineto, ma.round(y));
                        }
                    
                        var counter = counter + 1;
                    }
                    
                    // Draw an extra Y tick if there's an offsetX axis
                    if (prop['chart.yaxis.scale.min'] < 0) {

                        co.moveTo(
                            (prop['chart.yaxis.position'] == 'left' ? this.marginLeft : ca.width - this.marginRight),
                            ma.round(y)
                        );

                        co.lineTo(
                            lineto,
                            ma.round(y)
                        );
                    }
                }
    
            // Draw an extra X tickmark
            } else if (prop['chart.xaxis'] && prop['chart.xaxis.tickmarks.count'] > 0) {
    
                if (prop['chart.yaxis.position'] == 'left') {
                    co.moveTo(this.marginLeft, prop['chart.xaxis.position'] == 'top' ? this.marginTop : ca.height - this.marginBottom);
                    co.lineTo(this.marginLeft, prop['chart.xaxis.position'] == 'top' ? this.marginTop - 3 : ca.height - this.marginBottom + 3);
               } else {
                    co.moveTo(ca.width - this.marginRight, ca.height - this.marginBottom);
                    co.lineTo(ca.width - this.marginRight, ca.height - this.marginBottom + 3);
                }
            }
    
            co.stroke();

            /**
            * This is here so that setting the color after this function doesn't
            * change the color of the axes
            */
            co.beginPath();
        };








        // Draw the text labels for the axes
        this.drawLabels =
        this.DrawLabels = function ()
        {
            co.strokeStyle = 'black';
            co.fillStyle   = prop['chart.text.color'];
            co.lineWidth   = 1;
            
            // Turn off any shadow
            RG.NoShadow(this);
    
            var decimals  = prop['chart.yaxis.scale.decimals'];
            var context   = co;
            var canvas    = ca;
            var ymin      = prop['chart.yaxis.scale.min'];

            var textConf = RG.getTextConf({
                object: this,
                prefix: 'chart.yaxis.labels'
            });

            // Draw the Y axis labels
            if (prop['chart.yaxis.labels'] && prop['chart.yaxis.labels.specific'] == null) {

                var units_pre  = prop['chart.yaxis.scale.units.pre'];
                var units_post = prop['chart.yaxis.scale.units.post'];
                var xpos       = prop['chart.yaxis.position'] == 'left' ? this.marginLeft - 5 : ca.width - this.marginRight + 5;
                var align      = prop['chart.yaxis.position'] == 'left' ? 'right' : 'left';
                var numYLabels = this.scale2.labels.length;
                var bounding   = false;
                var bgcolor    = prop['chart.yaxis.labels.inside'] ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0)';
                var offsetx    = prop['chart.yaxis.labels.offsetx'];
                var offsety    = prop['chart.yaxis.labels.offsety'];
    
                
                /**
                * If the Y labels are inside the Y axis, invert the alignment
                */
                if (prop['chart.yaxis.labels.inside'] === true && align == 'left') {
                    xpos -= 10;
                    align = 'right';
                    bounding = prop['chart.yaxis.labels.inside.border'];
                    
    
                } else if (prop['chart.yaxis.labels.inside'] === true && align == 'right') {
                    xpos += 10;
                    align = 'left';
                    bounding = prop['chart.yaxis.labels.inside.border'];
                }
    
    
    
                /**
                * X axis in the center
                */
                if (prop['chart.xaxis.position'] == 'center') {
                    
                    var half = this.grapharea / 2;
    
                    /**
                    * Draw the top half 
                    */
                    for (var i=0; i<this.scale2.labels.length; ++i) {
                        RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                            x:            xpos + offsetx,
                            y:            this.marginTop + half - (((i+1)/numYLabels) * half) + offsety,
                            valign:       'center',
                            halign:       align,
                            bounding:     true,
                            boundingFill: bgcolor,
                            boundingStroke: 'rgba(0,0,0,0)',
                            text:         this.scale2.labels[i],
                            tag:          'scale'
                        });
                    }
                    
                    /**
                    * Draw the bottom half
                    */
                    for (var i=0; i<this.scale2.labels.length; ++i) {
                        RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                            x:              xpos + offsetx,
                            y:              this.marginTop + half + (((i+1)/numYLabels) * half) + offsety,
                            valign:         'center',
                            halign:         align,
                            bounding:       true,
                            boundingFill:   bgcolor,
                            boundingStroke:   'rgba(0,0,0,0)',
                            text:           '-' + this.scale2.labels[i],
                            tag:            'scale'
                        });
                    }
    
                    // No X axis - so draw 0
                    if (!prop['chart.xaxis'] || ymin != 0 || prop['chart.yaxis.scale.zerostart']) {
                        RG.text2(this,{

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                            x:            xpos + offsetx,
                            y:            this.marginTop + half + offsety,
                            text:         prop['chart.yaxis.scale.units.pre'] + ymin.toFixed(ymin === 0 ? 0 : decimals) + prop['chart.yaxis.scale.units.post'],
                            bounding:       true,
                            boundingFill:   bgcolor,
                            boundingStroke:   'rgba(0,0,0,0)',
                            valign:       'center',
                            halign:       align,
                            tag:          'scale'
                        });
                    }
    
    
    
                /**
                * X axis at the top
                */
                } else if (prop['chart.xaxis.position'] == 'top') {
                
                    var half = this.grapharea / 2;
    
                    if (prop['chart.yaxis.scale.invert']) {
    
                        for (var i=0; i<this.scale2.labels.length; ++i) {
    
                            RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                                x:            xpos + offsetx,
                                y:            this.marginTop + ((i/this.scale2.labels.length) * this.grapharea) + offsety,
                                valign:       'center',
                                halign:       align,
                                bounding:       true,
                                boundingFill:   bgcolor,
                                boundingStroke:   'rgba(0,0,0,0)',
                                text:         '-' + this.scale2.labels[this.scale2.labels.length - (i+1)],
                                tag:          'scale'
                            });
                        }
                    } else {
                        for (var i=0; i<this.scale2.labels.length; ++i) {
                            RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                                x:            xpos + offsetx,
                                y:            this.marginTop + (((i+1)/numYLabels) * this.grapharea) + offsety,
                                valign:       'center',
                                halign:       align,
                                bounding:       true,
                                boundingFill:   bgcolor,
                                boundingStroke:   'rgba(0,0,0,0)',
                                text:         '-' + this.scale2.labels[i],
                                tag:          'scale'
                            });
                        }
                    }

                    // Draw the lower limit if chart.ymin is specified
                    if ((prop['chart.yaxis.scale.min'] != 0 || !prop['chart.xaxis']) || prop['chart.yaxis.scale.invert'] || prop['chart.yaxis.scale.zerostart']) {
                        RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                            x:            xpos + offsetx,
                            y:            prop['chart.yaxis.scale.invert'] ? ca.height - this.marginBottom + offsety : this.marginTop + offsety,
                            text:         (prop['chart.yaxis.scale.min'] != 0 ? '-' : '') + RG.numberFormat({object: this, number: prop['chart.yaxis.scale.min'].toFixed(ymin === 0 ? 0 : decimals), unitspre: units_pre, unitspost: units_post}),
                            valign:       'center',
                            halign:       align,
                            bounding:       true,
                            boundingFill:   bgcolor,
                            boundingStroke:   'rgba(0,0,0,0)',
                            tag:          'scale'
                        });
                    }
    
    
    
    
    
    
                /**
                * X axis labels at the bottom
                */
                } else {
    
                    if (prop['chart.yaxis.scale.invert']) {

                        // Draw the minimum value
                        RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                            x:            xpos + offsetx,
                            y:            this.marginTop + offsety,
                            valign:       'center',
                            halign:       align,
                            bounding:     bounding,
                            boundingFill: bgcolor,
                            text: RG.numberFormat({
                                object:    this,
                                number:    this.min.toFixed(prop['chart.yaxis.scale.min'] === 0 ? 0 : prop['chart.yaxis.scale.decimals']),
                                unitspre:  units_pre,
                                unitspost: units_post
                            }),
                            tag:          'scale'
                        });

                        for (var i=0,len=this.scale2.labels.length; i<len; ++i) {
                            RG.Text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                                x:              xpos + offsetx,
                                y:              this.marginTop + (((i+1)/this.scale2.labels.length) * this.grapharea) + offsety,
                                valign:         'center',
                                halign:         align,
                                bounding:       true,
                                boundingFill:   bgcolor,
                                boundingStroke:   'rgba(0,0,0,0)',
                                text:           this.scale2.labels[i],
                                tag:            'scale'
                            });
                        }

                    } else {
                        for (var i=0,len=this.scale2.labels.length; i<len; ++i) {
                            RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                                x:              xpos + offsetx,
                                y:              this.marginTop + ((i/this.scale2.labels.length) * this.grapharea) + offsety,
                                valign:         'center',
                                halign:         align,
                                bounding:       true,
                                boundingFill:   bgcolor,
                                boundingStroke:   'rgba(0,0,0,0)',
                                text:           this.scale2.labels[this.scale2.labels.length - (i + 1)],
                                tag:            'scale'
                            });
                        }
                    }

                    // Draw the lower limit if chart.ymin is specified
                    if ( (prop['chart.yaxis.scale.min'] != 0 && !prop['chart.yaxis.scale.invert'] || prop['chart.yaxis.scale.zerostart'])
                        || !prop['chart.xaxis']
                        ) {

                        RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                            x:              xpos + offsetx,
                            y:              prop['chart.yaxis.scale.invert'] ? this.marginTop + offsety : ca.height - this.marginBottom + offsety,
                            text: RG.numberFormat({
                                object:    this,
                                number:    prop['chart.yaxis.scale.min'].toFixed(prop['chart.yaxis.scale.min'] === 0 ? 0 : prop['chart.yaxis.scale.decimals']),
                                unitspre:  units_pre,
                                unitspost: units_post
                            }),
                            valign:         'center',
                            halign:         align,

                            bounding:       true,
                            boundingFill:   bgcolor,
                            boundingStroke:   'rgba(0,0,0,0)',

                            tag:            'scale'
                        });

                    }
                }

    
    
    
    

    
                // No X axis - so draw 0 - but not if the X axis is in the center
                if (   !prop['chart.xaxis']
                    && prop['chart.yaxis.scale.min'] == null
                    && prop['chart.xaxis.position'] != 'center'
                    && prop['chart.yaxis.tickmarks.last']
                   ) {

                    RG.text2(this, {


                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                        x:              xpos + offsetx,
                        y:              prop['chart.xaxis.position'] === 'top' ? this.marginTop + offsety : (ca.height - this.marginBottom),'text': prop['chart.yaxis.scale.units.pre'] + Number(0).toFixed(prop['chart.yaxis.scale.decimals']) + prop['chart.yaxis.scale.units.post'] + offsety,
                        valign:         'center',
                        halign:         align,
                        bounding:       true,
                        boundingFill:   bgcolor,
                        boundingStroke:   'rgba(0,0,0,0)',
                        tag:            'scale'
                    });
                }

            } else if (prop['chart.yaxis.labels'] && typeof prop['chart.yaxis.labels.specific'] === 'object') {
    
                // A few things
                var gap      = this.grapharea / prop['chart.yaxis.labels.specific'].length;
                var halign   = prop['chart.yaxis.position'] == 'left' ? 'right' : 'left';
                var bounding = false;
                var bgcolor  = null;
                var ymin     = prop['chart.yaxis.scale.min'] != null && prop['chart.yaxis.scale.min'];
    
                // Figure out the X coord based on the position of the axis
                if (prop['chart.yaxis.position'] == 'left') {
                    var x = this.marginLeft - 5;

                    if (prop['chart.yaxis.labels.inside']) {
                        x += 10;
                        halign   = 'left';
                        bounding = true;
                        bgcolor  = prop['chart.yaxis.labels.inside.color'];
                    }
    
                } else if (prop['chart.yaxis.position'] == 'right') {
                    var x = ca.width - this.marginRight + 5;
                    
                    if (prop['chart.yaxis.labels.inside']) {
                        x -= 10;
                        halign = 'right';
                        bounding = true;
                        bgcolor  = prop['chart.yaxis.labels.inside.color'];
                    }
                }
    
                var offsetx = prop['chart.yaxis.labels.offsetx'];
                var offsety = prop['chart.yaxis.labels.offsety'];
                
                // Draw the labels
                if (prop['chart.xaxis.position'] == 'center') {
                
                    // Draw the top halfs labels
                    for (var i=0; i<prop['chart.yaxis.labels.specific'].length; ++i) {
                        
                        var y = this.marginTop + (this.grapharea / (((prop['chart.yaxis.labels.specific'].length - 1)) * 2) * i);
                        
                        if (ymin && ymin > 0) {
                            var y  = ((this.grapharea / 2) / (prop['chart.yaxis.labels.specific'].length - (ymin ? 1 : 0)) ) * i;
                                y += this.marginTop;
                        }

                        RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                            x:              x + offsetx,
                            y:              y + offsety,
                            text:           String(prop['chart.yaxis.labels.specific'][i]),
                            valign:         'center',
                            halign:         halign,
                            bounding:       true,
                            boundingFill:   bgcolor,
                            boundingStroke:   'rgba(0,0,0,0)',
                            tag:            'ylabels.specific'
                        });
                    }
                    
                    // Now reverse the labels and draw the bottom half
                    var reversed_labels = RG.arrayReverse(prop['chart.yaxis.labels.specific']);
                
                    // Draw the bottom halfs labels
                    for (var i=0; i<reversed_labels.length; ++i) {
                        
                        var y = (this.grapharea / 2) + this.marginTop + ((this.grapharea / ((reversed_labels.length - 1) * 2) ) * i);
    
                        RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                            x:              x + offsetx,
                            y:              y + offsety,
                            text:           i == 0 ? '' : String(reversed_labels[i]),
                            valign:         'center',
                            halign:         halign,
                            bounding:       true,
                            boundingFill:   bgcolor,
                            boundingStroke:   'rgba(0,0,0,0)',
                            tag:            'ylabels.specific'
                        });
                    }
                
                } else if (prop['chart.xaxis.position'] == 'top') {
    
                    // Reverse the labels and draw
                    var reversed_labels = RG.array_reverse(prop['chart.yaxis.labels.specific']);
                
                    // Draw the bottom halfs labels
                    for (var i=0; i<reversed_labels.length; ++i) {
                        
                        var y = (this.grapharea / (reversed_labels.length - 1)) * i;
                            y = y + this.marginTop;
    
                        RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                            x:              x + offsetx,
                            y:              y + offsety,
                            text:           String(reversed_labels[i]),
                            valign:         'center',
                            halign:         halign,
                            bounding:       true,
                            boundingFill:   bgcolor,
                            boundingStroke:   'rgba(0,0,0,0)',
                            tag:            'ylabels.specific'
                        });
                    }
    
                } else {
                    for (var i=0; i<prop['chart.yaxis.labels.specific'].length; ++i) {
                        var y = this.marginTop + ((this.grapharea / (prop['chart.yaxis.labels.specific'].length - 1)) * i);
                        RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                            x:              x + offsetx,
                            y:              y + offsety,
                            text:           String(prop['chart.yaxis.labels.specific'][i]),
                            valign:         'center',
                            halign:         halign,
                            bounding:       true,
                            boundingFill:   bgcolor,
                            boundingStroke:   'rgba(0,0,0,0)',
                            tag:            'ylabels.specific'
                        });
                    }
                }
            }







            ////////////////////////////
            // Draw the X axis labels //
            ////////////////////////////









            if (prop['chart.xaxis.labels'] && prop['chart.xaxis.labels'].length > 0) {

                var yOffset  = 5,
                    bordered = false,
                    bgcolor  = null

                var textConf = RG.getTextConf({
                    object: this,
                    prefix: 'chart.xaxis.labels'
                });

                co.fillStyle = textConf.color;

                /**
                * Text angle
                */
                var angle  = 0,
                    valign = 'top',
                    halign = 'center'
    
                if (prop['chart.xaxis.labels.inside']) {
                    yOffset  = -5;
                    bordered = prop['chart.xaxis.labels.inside.border'];
                    bgcolor  = prop['chart.xaxis.labels.inside.color'];
                    valign   = 'bottom';
                }
                
                if (prop['chart.xaxis.position'] == 'top') {
                    valign = 'bottom';
                    yOffset += 2;
                }
    
                if (typeof(prop['chart.xaxis.labels.angle']) == 'number' && prop['chart.xaxis.labels.angle'] > 0) {
                    angle   = -1 * prop['chart.xaxis.labels.angle'];
                    valign  = 'center';
                    halign  = 'right';
                    yOffset = 10;
                    
                    if (prop['chart.xaxis.position'] == 'top') {
                        yOffset = 10;
                    }
                }
    
                var numLabels = prop['chart.xaxis.labels'].length,
                    offsetx   = prop['chart.xaxis.labels.offsetx'],
                    offsety   = prop['chart.xaxis.labels.offsety'];
    
                for (i=0; i<numLabels; ++i) {
    
                    // Changed 8th Nov 2010 to be not reliant on the coords
                    //if (this.properties['chart.xaxis.labels'][i] && this.coords && this.coords[i] && this.coords[i][0]) {
                    if (prop['chart.xaxis.labels'][i]) {
    
                        var labelX = ((ca.width - this.marginLeft - this.marginRight - (2 * prop['chart.margin.inner'])) / (numLabels - 1) ) * i;
                            labelX += this.marginLeft + prop['chart.margin.inner'];

                        /**
                        * Account for an unrelated number of labels
                        */

                        if (this.data.length === 0 || !this.data[0] || prop['chart.xaxis.labels'].length != this.data[0].length) {
                            labelX = this.marginLeft + prop['chart.margin.inner'] + ((ca.width - this.marginLeft - this.marginRight - (2 * prop['chart.margin.inner'])) * (i / (prop['chart.xaxis.labels'].length - 1)));
                        }
                        
                        // This accounts for there only being one point on the chart
                        if (!labelX) {
                            labelX = this.marginLeft + prop['chart.margin.inner'];
                        }
    
                        if (prop['chart.xaxis.position'] == 'top' && prop['chart.xaxis.labels.angle'] > 0) {
                            halign = 'left';
                        }
                        
                        if (prop['chart.xaxis.labels.angle'] != 0) {
                            halign = 'right';
                        }
    
                        RG.text2(this, {

                             font: textConf.font,
                             size: textConf.size,
                            color: textConf.color,
                             bold: textConf.bold,
                           italic: textConf.italic,

                            x:              labelX + offsetx,
                            y:              (prop['chart.xaxis.position'] == 'top') ? this.marginTop - yOffset - (prop['chart.xaxis.labels.inside'] ? -22 : 0) + offsety : (ca.height - this.marginBottom) + yOffset + offsety,
                            text:           String(prop['chart.xaxis.labels'][i]),
                            valign:         valign,
                            halign:         halign,
                            bounding:       bordered,
                            boundingFill:   bgcolor,
                            angle:          angle,
                            tag:            'labels'
                        });
                    }
                }
    
            }
    
            co.stroke();
            co.fill();
        };








        /**
        * Draws the line
        */
        this.drawLine =
        this.DrawLine = function (lineData, color, fill, linewidth, tickmarks, index)
        {
            // This facilitates the Rise animation (the Y value only)
            if (prop['chart.animation.unfold.y'] && prop['chart.animation.factor'] != 1) {
                for (var i=0; i<lineData.length; ++i) {
                    lineData[i] *= prop['chart.animation.factor'];
                }
            }

            var penUp = false;
            var yPos  = null;
            var xPos  = 0;
            co.lineWidth = 1;
            var lineCoords = [];
            
            /**
            * Get the previous line data
            */
            if (index > 0) {
                var prevLineCoords = this.coords2[index - 1];
            }


            // Work out the X interval
            var xInterval = (ca.width - (2 * prop['chart.margin.inner']) - this.marginLeft - this.marginRight) / (lineData.length - 1);
    
            // Loop thru each value given, plotting the line
            // (FORMERLY FIRST)
            for (i=0,len=lineData.length; i<len; i+=1) {

                var data_point = lineData[i];
    
                /**
                * Get the yPos for the given data point
                */
                var yPos = this.getYCoord(data_point);


                // Null data points, and a special case for this bug:http://dev.rgraph.net/tests/ymin.html
                if (   lineData[i] == null
                    || (prop['chart.xaxis.position'] == 'bottom' && lineData[i] < this.min && !prop['chart.outofbounds'])
                    ||  (prop['chart.xaxis.position'] == 'center' && lineData[i] < (-1 * this.max) && !prop['chart.outofbounds'])
                    || (((lineData[i] < this.min && prop['chart.xaxis.position'] !== 'center') || lineData[i] > this.max) && !prop['chart.outofbounds'])) {
    
                    yPos = null;
                }

                // Not always very noticeable, but it does have an effect
                // with thick lines
                co.lineCap  = 'round';
                co.lineJoin = 'round';
    
                // Plot the line if we're at least on the second iteration
                if (i > 0) {
                    xPos = xPos + xInterval;
                } else {
                    xPos = prop['chart.margin.inner'] + this.marginLeft;
                }
                
                if (prop['chart.animation.unfold.x']) {
                    xPos *= prop['chart.animation.factor'];
                    
                    if (xPos < prop['chart.margin.left']) {
                        xPos = prop['chart.margin.left'];
                    }
                }
    
                /**
                * Add the coords to an array
                */
                this.coords.push([xPos, yPos]);
                lineCoords.push([xPos, yPos]);
            }

            co.stroke();

            // Store the coords in another format, indexed by line number
            this.coords2[index] = lineCoords;



            /**
            * Now draw the actual line [FORMERLY SECOND]
            */
            co.beginPath();
            // Transparent now as of 11/19/2011
            co.strokeStyle = 'rgba(0,0,0,0)';
            //co.strokeStyle = fill;
            if (fill) {
                co.fillStyle   = fill;
            }

            var isStepped = prop['chart.stepped'];
            var isFilled  = prop['chart.filled'];
            
            if (prop['chart.xaxis.position'] == 'top') {
                var xAxisPos = this.marginTop;
            } else if (prop['chart.xaxis.position'] == 'center') {
                var xAxisPos = this.marginTop + (this.grapharea / 2);
            } else if (prop['chart.xaxis.position'] == 'bottom') {
                var xAxisPos = this.getYCoord(prop['chart.yaxis.scale.min'])

            }




            for (var i=0,len=lineCoords.length; i<len; i+=1) {
    
                xPos = lineCoords[i][0];
                yPos = lineCoords[i][1];
                var set = index;
    
                var prevY     = (lineCoords[i - 1] ? lineCoords[i - 1][1] : null);
                var isLast    = (i + 1) == lineCoords.length;
    
                /**
                * This nullifys values which are out-of-range
                */
                if (!prop['chart.outofbounds'] && (prevY < this.marginTop || prevY > (ca.height - this.marginBottom) ) ) {
                    penUp = true;
                }
    
                if (i == 0 || penUp || !yPos || !prevY || prevY < this.marginTop) {

                    if (prop['chart.filled'] && !prop['chart.filled.range']) {
    
                        if (!prop['chart.outofbounds'] || prevY === null || yPos === null) {
                            co.moveTo(xPos + 1, xAxisPos);
                        }

                        // This facilitates the X axis being at the top
                        // NOTE: Also done below
                        if (prop['chart.xaxis.position'] == 'top') {
                            co.moveTo(xPos + 1, xAxisPos);
                        }
                        
                        if (isStepped && i > 0) {
                            co.lineTo(xPos, lineCoords[i - 1][1]);
                        }
    
                        co.lineTo(xPos, yPos);
    
                    } else {
    
                        if (RG.ISOLD && yPos == null) {
                            // Nada
                        } else {
                            co.moveTo(xPos + 1, yPos);
                        }
                    }
    
                    if (yPos == null) {
                        penUp = true;
    
                    } else {
                        penUp = false;
                    }
    
                } else {
    
                    // Draw the stepped part of stepped lines
                    if (isStepped) {
                        co.lineTo(xPos, lineCoords[i - 1][1]);
                    }
    
                    if ((yPos >= this.marginTop && yPos <= (ca.height - this.marginBottom)) || prop['chart.outofbounds'] ) {
    
                        if (isLast && prop['chart.filled'] && !prop['chart.filled.range'] && prop['chart.yaxis.position'] == 'right') {
                            xPos -= 1;
                        }
    
    
                        // Added 8th September 2009
                        if (!isStepped || !isLast) {
                            co.lineTo(xPos, yPos);
                            
                            if (isFilled && lineCoords[i+1] && lineCoords[i+1][1] == null) {
                                co.lineTo(xPos, xAxisPos);
                            }
                        
                        // Added August 2010
                        } else if (isStepped && isLast) {
                            co.lineTo(xPos,yPos);
                        }
    
    
                        penUp = false;
                    } else {
                        penUp = true;
                    }
                }
            }

            /**
            * Draw a line to the X axis if the chart is filled
            */
            if (prop['chart.filled'] && !prop['chart.filled.range'] && !prop['chart.spline']) {

                // Is this needed ??
                var fillStyle = prop['chart.filled.colors'];

                /**
                * Draw the bottom edge of the filled bit using either the X axis or the prevlinedata,
                * depending on the index of the line. The first line uses the X axis, and subsequent
                * lines use the prevLineCoords array
                */
                if (index > 0 && prop['chart.filled.accumulative']) {
                    
                    co.lineTo(xPos, prevLineCoords ? prevLineCoords[i - 1][1] : (ca.height - this.marginBottom - 1 + (prop['chart.xaxis.position'] == 'center' ? (ca.height - this.marginTop - this.marginBottom) / 2 : 0)));

                    for (var k=(i - 1); k>=0; --k) {
                        co.lineTo(k == 0 ? prevLineCoords[k][0] + 1: prevLineCoords[k][0], prevLineCoords[k][1]);
                    }
                } else {

                    // Draw a line down to the X axis
                    if (prop['chart.xaxis.position'] == 'top') {
                        co.lineTo(xPos, prop['chart.margin.top'] +  1);
                        co.lineTo(lineCoords[0][0],prop['chart.margin.top'] + 1);
                    } else if (typeof(lineCoords[i - 1][1]) == 'number') {

                        var yPosition = this.getYCoord(0);

                        co.lineTo(xPos,yPosition);
                        co.lineTo(lineCoords[0][0],yPosition);
                    }
                }
    
                co.fillStyle = !this.hidden(index) ? fill : 'rgba(0,0,0,0)';

                co.fill();
                co.beginPath();

            }
    
            co.stroke();
    
    
            if (prop['chart.backdrop']) {
                this.DrawBackdrop(lineCoords, color);
            }
    
    
    
    
            /**
            * TODO CLIP TRACE
            * By using the clip() method the Trace animation can be updated.
            * NOTE: Needs to be done for the filled part as well
            * NOTE: This appears to have been done?
            */
            co.save();
                co.beginPath();
                
                // The clipping region is different based on th animationTraceCenter option
                if (prop['chart.animation.trace.center']) {
                    co.rect(
                        (ca.width / 2) * (1 - prop['chart.animation.trace.clip']),
                        0,
                        ca.width * prop['chart.animation.trace.clip'],
                        ca.height
                    );
                } else {
                    co.rect(0, 0, ca.width * prop['chart.animation.trace.clip'], ca.height);
                }
                co.clip();





                //
                // Draw errorbars
                //
                if (typeof prop['chart.errorbars'] !== 'null') {
                    this.drawErrorbars();
                }




                // Now redraw the lines with the correct line width
                this.setShadow(index);
                this.redrawLine(lineCoords, color, linewidth, index);
                co.stroke();
                RG.noShadow(this);






    
            // Draw the tickmarks
                for (var i=0; i<lineCoords.length; ++i) {
        
                    i = Number(i);
                    
                    /**
                    * Set the color
                    */
                    co.strokeStyle = color;
                    
        
                    if (isStepped && i == (lineCoords.length - 1)) {
                        co.beginPath();
                        //continue;
                    }
        
                    if (
                        (
                            tickmarks != 'endcircle'
                         && tickmarks != 'endsquare'
                         && tickmarks != 'filledendsquare'
                         && tickmarks != 'endtick'
                         && tickmarks != 'endtriangle'
                         && tickmarks != 'arrow'
                         && tickmarks != 'filledarrow'
                        )
                        || (i == 0 && tickmarks != 'arrow' && tickmarks != 'filledarrow')
                        || i == (lineCoords.length - 1)
                       ) {
        
                        var prevX = (i <= 0 ? null : lineCoords[i - 1][0]);
                        var prevY = (i <= 0 ? null : lineCoords[i - 1][1]);

                        this.DrawTick(
                            lineData,
                            lineCoords[i][0],
                            lineCoords[i][1],
                            color,
                            false,
                            prevX,
                            prevY,
                            tickmarks,
                            i,
                            index
                        );
                    }
                }
            
            co.restore();
    
            // Draw something off canvas to skirt an annoying bug
            co.beginPath();
            co.arc(ca.width + 50000, ca.height + 50000, 2, 0, 6.38, 1);
        };








        /**
        * This functions draws a tick mark on the line
        */
        this.drawTick =
        this.DrawTick = function (lineData, xPos, yPos, color, isShadow, prevX, prevY, tickmarks, index, dataset)
        {
            // Various conditions mean no tick
            if (this.hidden(dataset)) {
                return;
            } else if (RG.isNull(yPos)) {
                return false;
            } else if ((yPos > (ca.height - this.marginBottom)) && !prop['chart.outofbounds']) {
                return;
             } else if ((yPos < this.marginTop) && !prop['chart.outofbounds']) {
                return;
            }

            co.beginPath();
    
            var offset   = 0;
    
            // Reset the stroke and lineWidth back to the same as what they were when the line was drawm
            // UPDATE 28th July 2011 - the line width is now set to 1
            co.lineWidth   = prop['chart.tickmarks.linewidth'] ? prop['chart.tickmarks.linewidth'] : prop['chart.linewidth'];
            co.strokeStyle = isShadow ? prop['chart.shadow.color'] : co.strokeStyle;
            co.fillStyle   = isShadow ? prop['chart.shadow.color'] : co.strokeStyle;
    
            // Cicular tick marks
            if (   tickmarks == 'circle'
                || tickmarks == 'filledcircle'
                || tickmarks == 'endcircle'
                || tickmarks === 'filledendcircle') {
    
                if (tickmarks == 'circle'|| tickmarks == 'filledcircle' || ((tickmarks == 'endcircle' || tickmarks === 'filledendcircle') && (index == 0 || index == (lineData.length - 1)))) {
                    co.beginPath();
                    co.arc(xPos + offset, yPos + offset, prop['chart.tickmarks.size'], 0, 360 / (180 / RG.PI), false);

                    if (tickmarks.indexOf('filled') !== -1) {
                        co.fillStyle = isShadow ? prop['chart.shadow.color'] : co.strokeStyle;
                    } else {
                        co.fillStyle = isShadow ? prop['chart.shadow.color'] : 'white';
                    }
    
                    co.stroke();
                    co.fill();
                }
    
            // Halfheight "Line" style tick marks
            } else if (tickmarks == 'halftick') {
                co.beginPath();
                co.moveTo(Math.round(xPos), yPos);
                co.lineTo(Math.round(xPos), yPos + prop['chart.tickmarks.size']);
    
                co.stroke();
            
            // Tick style tickmarks
            } else if (tickmarks == 'tick') {
                co.beginPath();
                co.moveTo(Math.round(xPos), yPos -  prop['chart.tickmarks.size']);
                co.lineTo(Math.round(xPos), yPos + prop['chart.tickmarks.size']);
    
                co.stroke();
            
            // Endtick style tickmarks
            } else if (tickmarks == 'endtick' && (index == 0 || index == (lineData.length - 1))) {
                co.beginPath();
                co.moveTo(Math.round(xPos), yPos -  prop['chart.tickmarks.size']);
                co.lineTo(Math.round(xPos), yPos + prop['chart.tickmarks.size']);
    
                co.stroke();
            
            // "Cross" style tick marks
            } else if (tickmarks == 'cross') {
                co.beginPath();
                    
                    var ticksize = prop['chart.tickmarks.size'];
                    
                    co.moveTo(xPos - ticksize, yPos - ticksize);
                    co.lineTo(xPos + ticksize, yPos + ticksize);
                    co.moveTo(xPos + ticksize, yPos - ticksize);
                    co.lineTo(xPos - ticksize, yPos + ticksize);
                co.stroke();
    
    
            // Triangle style tick marks
            } else if (tickmarks == 'triangle' || tickmarks == 'filledtriangle' || (tickmarks == 'endtriangle' && (index == 0 || index == (lineData.length - 1)))) {
                co.beginPath();
                    
                    if (tickmarks == 'filledtriangle') {
                        co.fillStyle = isShadow ? prop['chart.shadow.color'] : co.strokeStyle;
                    } else {
                        co.fillStyle = 'white';
                    }
    
                    co.moveTo(ma.round(xPos - prop['chart.tickmarks.size']), yPos + prop['chart.tickmarks.size']);
                    co.lineTo(ma.round(xPos), yPos - prop['chart.tickmarks.size']);
                    co.lineTo(ma.round(xPos + prop['chart.tickmarks.size']), yPos + prop['chart.tickmarks.size']);
                co.closePath();
                
                co.stroke();
                co.fill();
    
    
            // 
            // A white bordered circle
            //
            } else if (tickmarks == 'borderedcircle' || tickmarks == 'dot') {
                    
                    co.lineWidth   = prop['chart.tickmarks.style.dot.linewidth'] || 0.00000001;

                    pa2(co, [
                        'b',
                        'a',xPos, yPos, prop['chart.tickmarks.size'], 0, 360 / (180 / RG.PI), false,
                        'c',
                        'f',prop['chart.tickmarks.style.dot.fill'] || color,
                        's',prop['chart.tickmarks.style.dot.stroke'] || color
                    ]);
            
            } else if (   tickmarks == 'square'
                       || tickmarks == 'filledsquare'
                       || (tickmarks == 'endsquare' && (index == 0 || index == (lineData.length - 1)))
                       || (tickmarks == 'filledendsquare' && (index == 0 || index == (lineData.length - 1))) ) {
    
                co.fillStyle   = 'white';
                co.strokeStyle = co.strokeStyle;
    
                co.beginPath();
                co.rect(Math.round(xPos - prop['chart.tickmarks.size']), Math.round(yPos - prop['chart.tickmarks.size']), prop['chart.tickmarks.size'] * 2, prop['chart.tickmarks.size'] * 2);
    
                // Fillrect
                if (tickmarks == 'filledsquare' || tickmarks == 'filledendsquare') {
                    co.fillStyle = isShadow ? prop['chart.shadow.color'] : co.strokeStyle;
                    co.rect(Math.round(xPos - prop['chart.tickmarks.size']), Math.round(yPos - prop['chart.tickmarks.size']), prop['chart.tickmarks.size'] * 2, prop['chart.tickmarks.size'] * 2);
    
                } else if (tickmarks == 'square' || tickmarks == 'endsquare') {
                    co.fillStyle = isShadow ? prop['chart.shadow.color'] : 'white';
                    co.rect(Math.round((xPos - prop['chart.tickmarks.size']) + 1), Math.round((yPos - prop['chart.tickmarks.size']) + 1), (prop['chart.tickmarks.size'] * 2) - 2, (prop['chart.tickmarks.size'] * 2) - 2);
                }
    
                co.stroke();
                co.fill();
    
            /**
            * FILLED arrowhead
            */
            } else if (tickmarks == 'filledarrow') {
            
                var x = Math.abs(xPos - prevX);
                var y = Math.abs(yPos - prevY);
    
                if (yPos < prevY) {
                    var a = Math.atan(x / y) + 1.57;
                } else {
                    var a = Math.atan(y / x) + 3.14;
                }
    
                co.beginPath();
                    co.moveTo(Math.round(xPos), Math.round(yPos));
                    co.arc(Math.round(xPos), Math.round(yPos), 7, a - 0.5, a + 0.5, false);
                co.closePath();
    
                co.stroke();
                co.fill();
    
            /**
            * Arrow head, NOT filled
            */
            } else if (tickmarks == 'arrow') {
            
                var orig_linewidth = co.lineWidth;
    
                var x = Math.abs(xPos - prevX);
                var y = Math.abs(yPos - prevY);
                
                co.lineWidth;
    
                if (yPos < prevY) {
                    var a = Math.atan(x / y) + 1.57;
                } else {
                    var a = Math.atan(y / x) + 3.14;
                }
    
                co.beginPath();
                    co.moveTo(Math.round(xPos), Math.round(yPos));
                    co.arc(Math.round(xPos), Math.round(yPos), 7, a - 0.5 - (doc.all ? 0.1 : 0.01), a - 0.4, false);
    
                    co.moveTo(Math.round(xPos), Math.round(yPos));
                    co.arc(Math.round(xPos), Math.round(yPos), 7, a + 0.5 + (doc.all ? 0.1 : 0.01), a + 0.5, true);
                co.stroke();
                co.fill();

                // Revert to original lineWidth
                co.lineWidth = orig_linewidth;



            /**
            * Image based tickmark
            */
            // lineData, xPos, yPos, color, isShadow, prevX, prevY, tickmarks, index
            } else if (
                       typeof tickmarks === 'string' &&
                           (
                            tickmarks.substr(0, 6) === 'image:'  ||
                            tickmarks.substr(0, 5) === 'data:'   ||
                            tickmarks.substr(0, 1) === '/'       ||
                            tickmarks.substr(0, 3) === '../'     ||
                            tickmarks.substr(0, 7) === 'images/' ||
                            tickmarks.substr(0, 4) === 'src:'
                           )
                      ) {

                var img = new Image();
                
                if (tickmarks.substr(0, 6) === 'image:') {
                    img.src = tickmarks.substr(6);
                } else if (tickmarks.substr(0, 4) === 'src:') {
                    img.src = tickmarks.substr(4);
                } else {
                    img.src = tickmarks;
                }


                img.onload = function ()
                {
                    if (prop['chart.tickmarks.style.image.halign'] === 'center') xPos -= (this.width / 2);
                    if (prop['chart.tickmarks.style.image.halign'] === 'right')  xPos -= this.width;
                    
                    if (prop['chart.tickmarks.style.image.valign'] === 'center') yPos -= (this.height / 2);
                    if (prop['chart.tickmarks.style.image.valign'] === 'bottom') yPos -= this.height;
                    
                    xPos += prop['chart.tickmarks.style.image.offsetx'];
                    yPos += prop['chart.tickmarks.style.image.offsety'];

                    co.drawImage(this, xPos, yPos);
                };


            /**
            * Custom tick drawing function
            */
            } else if (typeof(tickmarks) == 'function') {
                tickmarks(this, lineData, lineData[index], index, xPos, yPos, color, prevX, prevY);
            }
        };








        /**
        * Draws a filled range if necessary
        */
        this.drawRange =
        this.DrawRange = function ()
        {
            /**
            * Fill the range if necessary
            */
            if (prop['chart.filled.range'] && prop['chart.filled']) {
            
                if (RG.isNull(prop['chart.filled.range.threshold'])) {
                    prop['chart.filled.range.threshold']        = this.ymin
                    prop['chart.filled.range.threshold.colors'] = [prop['chart.filled.colors'], prop['chart.filled.colors']]
                }
    
                for (var idx=0; idx<2; ++idx) {
    
                    var threshold_colors = prop['chart.filled.range.threshold.colors'];
                    var y = this.getYCoord(prop['chart.filled.range.threshold'])
                    
                    co.save();
                        if (idx == 0) {
                            co.beginPath();
                            co.rect(0,0,ca.width,y);
                            co.clip();
                        
                        } else {
    
                            co.beginPath();
                            co.rect(0,y,ca.width, ca.height);
                            co.clip();
                        }
    
                        co.beginPath();
                            co.fillStyle = (idx == 1 ? prop['chart.filled.range.threshold.colors'][1] : prop['chart.filled.range.threshold.colors'][0]);

                            co.lineWidth = !this.hidden(idx) ? 1 : 0;
                            var len = (this.coords.length / 2);
                
                            
                            
                            for (var i=0; i<len; ++i) {
                                if (!RG.is_null(this.coords[i][1])) {
                                    if (i == 0) {
                                        co.moveTo(this.coords[i][0], this.coords[i][1])
                                    } else {
                                        co.lineTo(this.coords[i][0], this.coords[i][1])
                                    }
                                }
                            }
    
    
                            for (var i=this.coords.length - 1; i>=len; --i) {
                                if (RG.is_null(this.coords[i][1])) {
                                    co.moveTo(this.coords[i][0], this.coords[i][1])
                                } else {
                                    co.lineTo(this.coords[i][0], this.coords[i][1])
                                }
                                //co.lineTo(this.coords[i][0], this.coords[i][1])
                            }
    
    
    
                        // Taken out - 10th Oct 2012
                        //co.stroke();
            
                        co.fill();
                    co.restore();
                }
            }
        };








        /**
        * Redraws the line with the correct line width etc
        * 
        * @param array coords The coordinates of the line
        */
        this.redrawLine =
        this.RedrawLine = function (coords, color, linewidth, index)
        {
            if (!prop['chart.redraw'] || prop['chart.filled.range']) {
                return;
            }
    

            
            co.strokeStyle = (typeof(color) == 'object' && color && color.toString().indexOf('CanvasGradient') == -1 ? color[0] : color);
            co.lineWidth = linewidth;


            // Added this on 1/1/17 to facilitate dotted and dashed lines
            if (prop['chart.dotted'] || prop['chart.dashed'] ) {
                if (prop['chart.dashed']) {
                    co.setLineDash([2,6])
                } else if (prop['chart.dotted']) {
                    co.setLineDash([1,5])
                }
            }



            if (this.hidden(index)) {
                co.strokeStyle = 'rgba(0,0,0,0)';
            }








            if (prop['chart.spline']) {
                this.DrawCurvyLine(coords, this.hidden(index) ? 'rgba(0,0,0,0)' : color, linewidth, index);
                return;
            }


            co.beginPath();
    
            var len    = coords.length;
            var width  = ca.width
            var height = ca.height;
            var penUp  = false;
    
            for (var i=0; i<len; ++i) {
    
                var xPos   = coords[i][0];
                var yPos   = coords[i][1];
    
                if (i > 0) {
                    var prevX = coords[i - 1][0];
                    var prevY = coords[i - 1][1];
                }
    
    
                if ((
                       (i == 0 && coords[i])
                    || (yPos < this.marginTop)
                    || (prevY < this.marginTop)
                    || (yPos > (height - this.marginBottom))
                    || (i > 0 && prevX > (width - this.marginRight))
                    || (i > 0 && prevY > (height - this.marginBottom))
                    || prevY == null
                    || penUp == true
                   ) && (!prop['chart.outofbounds'] || yPos == null || prevY == null) ) {

                    if (RG.ISOLD && yPos == null) {
                        // ...?
                    } else {
                        co.moveTo(coords[i][0], coords[i][1]);
                    }
    
                    penUp = false;
    
                } else {
    
                    if (prop['chart.stepped'] && i > 0) {
                        co.lineTo(coords[i][0], coords[i - 1][1]);
                    }
                    
                    // Don't draw the last bit of a stepped chart. Now DO
                    //if (!this.properties['chart.stepped'] || i < (coords.length - 1)) {
                    co.lineTo(coords[i][0], coords[i][1]);
                    //}
                    penUp = false;
                }
            }

            /**
            * If two colors are specified instead of one, go over the up bits
            */
            if (prop['chart.colors.alternate'] && typeof(color) == 'object' && color[0] && color[1]) {
                for (var i=1; i<len; ++i) {
    
                    var prevX = coords[i - 1][0];
                    var prevY = coords[i - 1][1];
                    
                    if (prevY != null && coords[i][1] != null) {
                        co.beginPath();
                            co.strokeStyle = color[coords[i][1] < prevY ? 0 : 1];
                            co.lineWidth = prop['chart.linewidth'];
                            co.moveTo(prevX, prevY);
                            co.lineTo(coords[i][0], coords[i][1]);
                        co.stroke();
                    }
                }
            }
            


            // Added the stroke and beginPath in on 5/1/19 as dotted/dashed
            // wasn't working correctly.
            //
            co.stroke();
            co.beginPath();            
            if (prop['chart.dashed'] || prop['chart.dotted']) {
                co.setLineDash([1,0]);
            }
        };








        /**
        * Draw the backdrop
        */
        this.drawBackdrop =
        this.DrawBackdrop = function (coords, color)
        {
            //var ca   = this.canvas;
            //var co   = this.context;
            //var prop = this.properties;
    
            var size = prop['chart.backdrop.size'];
            co.lineWidth = size;
            co.globalAlpha = prop['chart.backdrop.alpha'];
            co.strokeStyle = color;
            var yCoords = [];
    
            co.beginPath();
                if (prop['chart.spline'] && !RG.ISOLD) {
                    
                    // The DrawSpline function only takes the Y coords so extract them from the coords that have
                    // (which are X/Y pairs)
                    for (var i=0; i<coords.length; ++i) {
                        yCoords.push(coords[i][1])
                    }

                    this.DrawSpline(co, yCoords, color, null);
    
                } else {
                    co.moveTo(coords[0][0], coords[0][1]);
                    for (var j=1; j<coords.length; ++j) {
                        co.lineTo(coords[j][0], coords[j][1]);
                    }
                }
            co.stroke();
        
            // Reset the alpha value
            co.globalAlpha = 1;
            RG.NoShadow(this);
        };








        /**
        * Returns the linewidth
        */
        this.getLineWidth =
        this.GetLineWidth = function (i)
        {
            var linewidth = prop['chart.linewidth'];

            if (typeof(linewidth) == 'number') {
                return linewidth;
            
            } else if (typeof(linewidth) === 'object') {
                if (linewidth[i]) {
                    return linewidth[i];
                } else {
                    return linewidth[0];
                }
    
                alert('[LINE] Error! chart.linewidth should be a single number or an array of one or more numbers');
            }
        };








        /**
        * The getPoint() method - used to get the point the mouse is currently over, if any
        * 
        * @param object e The event object
        * @param object   OPTIONAL You can pass in the bar object instead of the
        *                          function getting it from the canvas
        */
        this.getShape =
        this.getPoint = function (e)
        {
            var obj     = this,
                mouseXY = RG.getMouseXY(e),
                mouseX  = mouseXY[0],
                mouseY  = mouseXY[1];
            
            // This facilitates you being able to pass in the bar object as a parameter instead of
            // the function getting it from the object
            if (arguments[1]) {
                obj = arguments[1];
            }
    
            for (var i=0; i<obj.coords.length; ++i) {
            
                var x = obj.coords[i][0],
                    y = obj.coords[i][1];
    
                // Do this if the hotspot is triggered by the X coord AND the Y coord
                if (   mouseX <= (x + prop['chart.tooltips.hotspot.size'])
                    && mouseX >= (x - prop['chart.tooltips.hotspot.size'])
                    && mouseY <= (y + prop['chart.tooltips.hotspot.size'])
                    && mouseY >= (y - prop['chart.tooltips.hotspot.size'])
                   ) {
    
                        if (RG.parseTooltipText) {
                            var tooltip = RG.parseTooltipText(prop['chart.tooltips'], i);
                        }
    
                        // Work out the dataset
                        var dataset = 0,
                            idx     = i;

                        while ((idx + 1) > this.data[dataset].length) {
                            idx -= this.data[dataset].length;
                            dataset++;
                        }

                        // Don't return points for hidden datasets
                        // Added 10/08/17
                        // Fixed 22/09/17 Thanks to zsolt - this should be a continue
                        // not a return.
                        if (this.hidden(dataset)) {
                            continue;
                        }

                        return {
                            0: obj, object: obj,
                            1: x,   x: x,
                            2: y,   y: y,
                            3: i,   index: i,
                                    tooltip: tooltip,
                                    dataset: dataset,
                                    index_adjusted: idx
                        };
    
                } else if (    prop['chart.tooltips.hotspot.xonly'] == true
                            && mouseX <= (x + prop['chart.tooltips.hotspot.size'])
                            && mouseX >= (x - prop['chart.tooltips.hotspot.size'])) {
    
                            var tooltip = RG.parseTooltipText(prop['chart.tooltips'], i);
    
                            return {
                                0: obj, object: obj,
                                1: x,   x: x,
                                2: y,   y: y,
                                3: i,   index: i,
                                        tooltip: tooltip
                            };
                }
            }
        };








        /**
        * Draws the above line labels
        */
        this.drawAboveLabels =
        this.DrawAboveLabels = function ()
        {
            var units_pre  = prop['chart.labels.above.units.pre'],
                units_post = prop['chart.labels.above.units.post'],
                decimals   = prop['chart.labels.above.decimals'],
                point      = prop['chart.labels.above.point'],
                thousand   = prop['chart.labels.above.thousand'],
                bgcolor    = prop['chart.labels.above.background'] || 'white',
                border     = ((
                       typeof prop['chart.labels.above.border'] === 'boolean'
                    || typeof prop['chart.labels.above.border'] === 'number'
                ) ? prop['chart.labels.above.border'] : true),
                offsety = prop['chart.labels.above.offsety'],
                specific = prop['chart.labels.above.specific'];


                var textConf = RG.getTextConf({
                    object: this,
                    prefix: 'chart.labels.above'
                });
                
                offsety += textConf.size;



            // Use this to 'reset' the drawing state
            co.beginPath();
    
            // Don't need to check that chart.labels.above is enabled here, it's been done already
            for (var i=0, len=this.coords.length; i<len; i+=1) {

                var coords = this.coords[i];

                RG.text2(this, {
            
                 font: textConf.font,
                 size: textConf.size,
                color: textConf.color,
                 bold: textConf.bold,
               italic: textConf.italic,

                    x:              coords[0],
                    y:              coords[1] - offsety,
                    text:           (specific && specific[i]) ? specific[i] : (specific ? '' : RG.numberFormat({
                                        object:    this,
                                        number:    typeof decimals === 'number' ? this.data_arr[i].toFixed(decimals) : this.data_arr[i],
                                        unitspre:  units_pre,
                                        unitspost: units_post,
                                        point:     point,
                                        thousand:  thousand
                                    })),
                    valign:         'center',
                    halign:         'center',
                    bounding:       true,
                    boundingFill:   bgcolor,
                    boundingStroke: border ? 'black' : 'rgba(0,0,0,0)',
                    tag:            'labels.above'
                });
            }
        };








        /**
        * Draw a curvy line.
        */
        this.drawCurvyLine =
        this.DrawCurvyLine = function (coords, color, linewidth, index)
        {
            var yCoords = [];
    
            for (var i=0; i<coords.length; ++i) {
                yCoords.push(coords[i][1]);
            }
            
            if (prop['chart.filled']) {
                co.beginPath();
                    
                    var xaxisY = this.getYCoord(prop['chart.yaxis.scale.min']);



                    co.moveTo(coords[0][0],xaxisY);
                    this.drawSpline(co, yCoords, color, index);

                    if (prop['chart.filled.accumulative'] && index > 0) {
                        for (var i=(this.coordsSpline[index - 1].length - 1); i>=0; i-=1) {
                            co.lineTo(this.coordsSpline[index - 1][i][0], this.coordsSpline[index - 1][i][1]);
                        }
                    } else {
                        co.lineTo(coords[coords.length - 1][0],xaxisY);
                    }
                co.fill();
            }

            co.beginPath();    
            this.DrawSpline(co, yCoords, color, index);
            co.stroke();
        };








        /**
        * When you click on the chart, this method can return the Y value at that point. It works for any point on the
        * chart (that is inside the gutters) - not just points on the Line.
        * 
        * @param object e The event object
        */
        this.getValue = function (arg)
        {
            if (arg.length == 2) {
                var mouseX = arg[0];
                var mouseY = arg[1];
            } else {
                var mouseCoords = RG.getMouseXY(arg);
                var mouseX      = mouseCoords[0];
                var mouseY      = mouseCoords[1];
            }
    
            var obj = this;
            var xaxispos = prop['chart.xaxis.position'];
    
            if (mouseY < prop['chart.margin.top']) {
                return xaxispos == 'bottom' || xaxispos == 'center' ? this.max : this.min;
            } else if (mouseY > (ca.height - prop['chart.margin.bottom'])) {
                return xaxispos == 'bottom' ? this.min : this.max;
            }

            if (prop['chart.xaxis.position'] == 'center') {
                var value = (( (obj.grapharea / 2) - (mouseY - prop['chart.margin.top'])) / obj.grapharea) * (obj.max - obj.min);
                value *= 2;
                value > 0 ? value += this.min : value -= this.min;
                return value;
            } else if (prop['chart.xaxis.position'] == 'top') {
                var value = ((obj.grapharea - (mouseY - prop['chart.margin.top'])) / obj.grapharea) * (obj.max - obj.min);
                value = Math.abs(obj.max - value) * -1;
                return value;
            } else {
                var value = ((obj.grapharea - (mouseY - prop['chart.margin.top'])) / obj.grapharea) * (obj.max - obj.min)
                value += obj.min;
                return value;
            }
        };








        /**
        * Each object type has its own Highlight() function which highlights the appropriate shape
        * 
        * @param object shape The shape to highlight
        */
        this.highlight =
        this.Highlight = function (shape)
        {
            if (prop['chart.tooltips.highlight']) {
                
                if (typeof prop['chart.highlight.style'] === 'function') {
                    (prop['chart.highlight.style'])(shape);
                
                } else if (prop['chart.highlight.style'] === 'halo') {
                    
                    var obj   = shape.object,
                        color = prop['chart.colors'][shape.dataset];

                    // Clear a space in white first for the tickmark
                    RG.path2(obj.context,
                        'b a % % 13 0 6.2830 false f rgba(255,255,255,0.75)',
                        shape.x,
                        shape.y
                    );
                    
                    RG.path2(obj.context,
                        'ga 0.15 b a % % 13 0 6.2830 false f % ga 1',
                        shape.x,
                        shape.y,
                        color
                    );
            
                    RG.path2(obj.context,
                        'b a % % 7 0 6.2830 false f white',
                        shape.x,
                        shape.y
                    );
                    
                    RG.path2(obj.context,
                        'b a % % 5 0 6.2830 false f %',
                        shape.x,
                        shape.y,
                        color
                    );
                
                } else {
                    RG.Highlight.Point(this, shape);
                }
            }
        };








        /**
        * The getObjectByXY() worker method. Don't call this call:
        * 
        * RG.ObjectRegistry.getObjectByXY(e)
        * 
        * @param object e The event object
        */
        this.getObjectByXY = function (e)
        {
            //var ca      = this.canvas;
            //var prop    = this.properties;
            var mouseXY = RG.getMouseXY(e);
    
            // The 5 is so that the cursor doesn't have to be over the graphArea to trigger the hotspot
            if (
                   (mouseXY[0] > prop['chart.margin.left'] - 5)
                && mouseXY[0] < (ca.width - prop['chart.margin.right'] + 5)
                && mouseXY[1] > (prop['chart.margin.top'] - 5)
                && mouseXY[1] < (ca.height - prop['chart.margin.bottom'] + 5)
                ) {
    
                return this;
            }
        };








        /**
        * This method handles the adjusting calculation for when the mouse is moved
        * 
        * @param object e The event object
        */
        this.adjusting_mousemove =
        this.Adjusting_mousemove = function (e)
        {
            /**
            * Handle adjusting for the Bar
            */
            if (prop['chart.adjustable'] && RG.Registry.get('chart.adjusting') && RG.Registry.get('chart.adjusting').uid == this.uid) {
    
                // Rounding the value to the given number of decimals make the chart step
                var value   = Number(this.getValue(e));
                var shape   = RG.Registry.get('chart.adjusting.shape');
    
                if (shape) {
    
                    RG.Registry.set('chart.adjusting.shape', shape);
    
                    this.original_data[shape['dataset']][shape['index_adjusted']] = Number(value);
    
                    RG.redrawCanvas(e.target);
                    
                    RG.fireCustomEvent(this, 'onadjust');
                }
            }
        };








        /**
        * This function can be used when the canvas is clicked on (or similar - depending on the event)
        * to retrieve the relevant Y coordinate for a particular value.
        * 
        * @param int value The value to get the Y coordinate for
        */
        this.getYCoord = function (value)
        {
            if (typeof(value) != 'number') {
                return null;
            }
    
            var y;
            var xaxispos = prop['chart.xaxis.position'];
    
            if (xaxispos == 'top') {
            
                // Account for negative numbers
                //if (value < 0) {
                //    value = Math.abs(value);
                //}
    
                y = ((value - this.min) / (this.max - this.min)) * this.grapharea;
    
                // Inverted Y labels
                if (prop['chart.yaxis.scale.invert']) {
                    y = this.grapharea - y;
                }
    
                y = y + this.marginTop
    
            } else if (xaxispos == 'center') {
    
                y = ((value - this.min) / (this.max - this.min)) * (this.grapharea / 2);
                y = (this.grapharea / 2) - y;
                y += this.marginTop;
    
            } else {
    
                if ((value < this.min || value > this.max) && prop['chart.outofbounds'] == false) {
                    return null;
                }
    
                y = ((value - this.min) / (this.max - this.min)) * this.grapharea;
    
    
                
                // Inverted Y labels
                if (prop['chart.yaxis.scale.invert']) {
                    y = this.grapharea - y;
                }
                
                y = ca.height - this.marginBottom - y;
            }

            return y;
        };








        /**
        * This function draws a curvy line
        * 
        * @param object context The  2D context
        * @param array  coords  The coordinates
        */
        this.drawSpline =
        this.DrawSpline = function (context, coords, color, index)
        {
            this.coordsSpline[index] = [];
            var xCoords     = [];
            var marginLeft  = prop['chart.margin.left'];
            var marginRight = prop['chart.margin.right'];
            var hmargin     = prop['chart.margin.inner'];
            var interval    = (ca.width - (marginLeft + marginRight) - (2 * hmargin)) / (coords.length - 1);
    
            co.strokeStyle = color;

            /**
            * The drawSpline function takes an array of JUST Y coords - not X/Y coords. So the line coords need converting
            * if we've been given X/Y pairs
            */
            for (var i=0,len=coords.length; i<len;i+=1) {
                if (typeof coords[i] == 'object' && coords[i] && coords[i].length == 2) {
                    coords[i] = Number(coords[i][1]);
                }
            }




            /**
            * Get the Points array in the format we want - first value should be null along with the lst value
            */
            var P = [coords[0]];
            for (var i=0; i<coords.length; ++i) {
                P.push(coords[i]);
            }
            P.push(coords[coords.length - 1] + (coords[coords.length - 1] - coords[coords.length - 2]));
    
            for (var j=1; j<P.length-2; ++j) {
                for (var t=0; t<10; ++t) {
                    
                    var yCoord = Spline( t/10, P[j-1], P[j], P[j+1], P[j+2] );
    
                    xCoords.push(((j-1) * interval) + (t * (interval / 10)) + marginLeft + hmargin);

                    co.lineTo(xCoords[xCoords.length - 1], yCoord);

                    
                    if (typeof index == 'number') {
                        this.coordsSpline[index].push(
                            [xCoords[xCoords.length - 1],
                            yCoord]
                        );
                    }
                }
            }


            // Draw the last section
            co.lineTo(((j-1) * interval) + marginLeft + hmargin, P[j]);
            if (typeof index == 'number') {
                this.coordsSpline[index].push([((j-1) * interval) + marginLeft + hmargin, P[j]]);
            }


    
            function Spline (t, P0, P1, P2, P3)
            {
                return 0.5 * ((2 * P1) +
                             ((0-P0) + P2) * t +
                             ((2*P0 - (5*P1) + (4*P2) - P3) * (t*t) +
                             ((0-P0) + (3*P1)- (3*P2) + P3) * (t*t*t)));
            }
        };








        /**
        * This allows for easy specification of gradients
        */
        this.parseColors = function ()
        {
            // Save the original colors so that they can be restored when the canvas is reset
            if (this.original_colors.length === 0) {
                this.original_colors['chart.colors']                 = RG.arrayClone(prop['chart.colors']);
                this.original_colors['chart.fillled.colors']         = RG.arrayClone(prop['chart.filled.colors']);
                this.original_colors['chart.key.colors']             = RG.arrayClone(prop['chart.key.colors']);
                this.original_colors['chart.background.bars.color1'] = prop['chart.background.bars.color1'];
                this.original_colors['chart.background.bars.color2'] = prop['chart.background.bars.color2'];
                this.original_colors['chart.background.grid.color']  = prop['chart.background.grid.color'];
                this.original_colors['chart.background.color']       = prop['chart.background.color'];
                this.original_colors['chart.text.color']             = prop['chart.text.color'];
                this.original_colors['chart.crosshairs.color']       = prop['chart.crosshairs.color'];
                this.original_colors['chart.annotatable.color']      = prop['chart.annotatable.color'];
                this.original_colors['chart.title.color']            = prop['chart.title.color'];
                this.original_colors['chart.xaxis.title.color']      = prop['chart.xaxis.title.color'];
                this.original_colors['chart.yaxis.title.color']      = prop['chart.yaxis.title.color'];
                this.original_colors['chart.key.background']         = prop['chart.key.background'];
                this.original_colors['chart.axes.color']             = prop['chart.axes.color'];
                this.original_colors['chart.highlight.fill']         = prop['chart.highlight.fill'];
            }
            
            
            
            for (var i=0; i<prop['chart.colors'].length; ++i) {
                if (typeof(prop['chart.colors'][i]) == 'object' && prop['chart.colors'][i][0] && prop['chart.colors'][i][1]) {
                    prop['chart.colors'][i][0] = this.parseSingleColorForGradient(prop['chart.colors'][i][0]);
                    prop['chart.colors'][i][1] = this.parseSingleColorForGradient(prop['chart.colors'][i][1]);
                } else {
                    prop['chart.colors'][i] = this.parseSingleColorForGradient(prop['chart.colors'][i]);
                }
            }
            
            /**
            * Filled.colors
            */
            if (prop['chart.filled.colors']) {
                if (typeof(prop['chart.filled.colors']) == 'string') {
                    prop['chart.filled.colors'] = this.parseSingleColorForGradient(prop['chart.filled.colors'], 'vertical');
                } else {
                    for (var i=0; i<prop['chart.filled.colors'].length; ++i) {
                        prop['chart.filled.colors'][i] = this.parseSingleColorForGradient(prop['chart.filled.colors'][i], 'vertical');
                    }
                }
            }
            
            /**
            * Key colors
            */
            if (!RG.is_null(prop['chart.key.colors'])) {
                for (var i=0; i<prop['chart.key.colors'].length; ++i) {
                    prop['chart.key.colors'][i] = this.parseSingleColorForGradient(prop['chart.key.colors'][i]);
                }
            }
    
            /**
            * Parse various properties for colors
            */
            var properties = [
                'chart.background.bars.color1',
                'chart.background.bars.color2',
                'chart.background.grid.color',
                'chart.background.color',
                'chart.crosshairs.color',
                'chart.annotatable.color',
                'chart.text.color',
                'chart.title.color',
                'chart.xaxis.title.color',
                'chart.yaxis.title.color',
                'chart.key.background',
                'chart.axes.color',
                'chart.highlight.fill'
            ];
    
            for (var i=0; i<properties.length; ++i) {
                prop[properties[i]] = this.parseSingleColorForGradient(prop[properties[i]]);
            }
        };








        /**
        * Use this function to reset the object to the post-constructor state. Eg reset colors if
        * need be etc
        */
        this.reset = function ()
        {
        };








        /**
        * This parses a single color value
        */
        this.parseSingleColorForGradient = function (color)
        {
            if (!color || typeof(color) != 'string') {
                return color;
            }

            /**
            * Horizontal or vertical gradient
            */
            var dir = typeof(arguments[1]) == 'string' ? arguments[1] : 'vertical';
    
            if (typeof color === 'string' && color.match(/^gradient\((.*)\)$/i)) {

                // Allow for JSON gradients
                if (color.match(/^gradient\(({.*})\)$/i)) {
                    return RG.parseJSONGradient({object: this, def: RegExp.$1});
                }

                var parts = RegExp.$1.split(':');
    
                // Create the gradient
                if (dir == 'horizontal') {
                    var grad = co.createLinearGradient(0,0,ca.width,0);
                } else {
                    var grad = co.createLinearGradient(0,ca.height - prop['chart.margin.bottom'],0,prop['chart.margin.top']);
                }
    
                var diff = 1 / (parts.length - 1);
    
                grad.addColorStop(0, RG.trim(parts[0]));
    
                for (var j=1; j<parts.length; ++j) {
                    grad.addColorStop(
                        j * diff,
                        RG.trim(parts[j])
                    );
                }
            }
    
            return grad ? grad : color;
        };








        /**
        * Sets the appropriate shadow
        */
        this.setShadow =
        this.SetShadow = function (i)
        {    
            if (prop['chart.shadow']) {
                /**
                * Handle the appropriate shadow color. This now facilitates an array of differing
                * shadow colors
                */
                var shadowColor = prop['chart.shadow.color'];
        
                /**
                * Accommodate an array of shadow colors as well as a single string
                */
                if (typeof shadowColor == 'object' && shadowColor[i - 1]) {
                    co.shadowColor = shadowColor[i];
    
                } else if (typeof shadowColor == 'object') {
                    co.shadowColor = shadowColor[0];
    
                } else if (typeof shadowColor == 'string') {
                    co.shadowColor = shadowColor;
                }
        
                co.shadowBlur    = prop['chart.shadow.blur'];
                co.shadowOffsetX = prop['chart.shadow.offsetx'];
                co.shadowOffsetY = prop['chart.shadow.offsety'];
            }
        };








        /**
        * This function handles highlighting an entire data-series for the interactive
        * key
        * 
        * @param int index The index of the data series to be highlighted
        */
        this.interactiveKeyHighlight = function (index)
        {
            var coords = this.coords2[index];

            if (coords) {

                var pre_linewidth = co.lineWidth;
                var pre_linecap   = co.lineCap;
                
                co.lineWidth   = prop['chart.linewidth'] + 10;
                co.lineCap     = 'round';
                co.strokeStyle = prop['chart.key.interactive.highlight.chart.stroke'];

                
                co.beginPath();
                if (prop['chart.spline']) {
                    this.DrawSpline(co, coords, prop['chart.key.interactive.highlight.chart'], null);
                } else {
                    for (var i=0,len=coords.length; i<len; i+=1) {
                        if (   i == 0
                            || RG.is_null(coords[i][1])
                            || (typeof coords[i - 1][1] != undefined && RG.isNull(coords[i - 1][1]))) {
                            co.moveTo(coords[i][0], coords[i][1]);
                        } else {
                            co.lineTo(coords[i][0], coords[i][1]);
                        }
                    }
                }
                co.stroke();
                
                // Reset the lineCap and lineWidth
                co.lineWidth = pre_linewidth;
                co.lineCap = pre_linecap;
            }
        };








        /**
        * Using a function to add events makes it easier to facilitate method chaining
        * 
        * @param string   type The type of even to add
        * @param function func 
        */
        this.on = function (type, func)
        {
            if (type.substr(0,2) !== 'on') {
                type = 'on' + type;
            }


            if (typeof this[type] !== 'function') {
                this[type] = func;
            } else {
                RG.addCustomEventListener(this, type, func);
            }
    
            return this;
        };








        /**
        * This function runs once only
        * (put at the end of the file (before any effects))
        */
        this.firstDrawFunc = function ()
        {
        };








        //
        // Draws error-bars for the Bar and Line charts
        //
        this.drawErrorbars = function ()
        {
            // Save the state of the canvas so that it can be restored at the end
            co.save();

                RG.noShadow(this);

                var coords = this.coords,
                         x = 0,
                 errorbars = prop['chart.errorbars'],
                    length = 0;

                // If not capped set the width of the cap to zero
                if (!prop['chart.errorbars.capped']) {
                    prop['chart.errorbars.capped.width'] = 0.001;
                    halfwidth = 0.0005;
                }

                // Set the linewidth
                co.lineWidth = prop['chart.errorbars.linewidth'];
    
    
    
    
                for (var i=0; i<coords.length; ++i) {
                
                    var halfwidth = prop['chart.errorbars.capped.width'] / 2 || 5,
                            color = prop['chart.errorbars.color'] || 'black';

                    // Set the perbar linewidth if the fourth option in the array
                    // is specified
                    if (errorbars[i] && typeof errorbars[i][3] === 'number') {
                        co.lineWidth = errorbars[i][3];
                    } else if (typeof prop['chart.errorbars.linewidth'] === 'number') {
                        co.lineWidth = prop['chart.errorbars.linewidth'];
                    } else {
                        co.lineWidth = 1;
                    }

    
    
                    // Calulate the pixel size
                    if (typeof errorbars === 'number' || typeof errorbars[i] === 'number') {

                        if (typeof errorbars === 'number') {
                            var positiveLength = this.getYCoord(this.min) - this.getYCoord(this.min + errorbars),
                                negativeLength = positiveLength;
                        } else {
                            var positiveLength = this.getYCoord(this.min) - this.getYCoord(this.min + errorbars[i]),
                                negativeLength = positiveLength;
                        }

                        if (positiveLength || negativeLength) {

                            pa2(
                                co,
                                'lj miter lc square b m % % l % % m % % l % % l % % m % % l % % s %',
                                coords[i][0] - halfwidth,
                                coords[i][1] + negativeLength,
                                coords[i][0] + halfwidth,
                                coords[i][1] + negativeLength,
                                coords[i][0],
                                coords[i][1] + negativeLength,
                                coords[i][0],
                                coords[i][1] - positiveLength,
                                coords[i][0] - halfwidth,
                                coords[i][1] - positiveLength,
                                coords[i][0],
                                coords[i][1] - positiveLength,
                                coords[i][0] + halfwidth,
                                coords[i][1] - positiveLength,
                                color
                            );

                            pa2(
                                co,
                                'lj miter lc square b m % % l % % s %',
                                coords[i][0] - halfwidth,
                                coords[i][1] + negativeLength,
                                coords[i][0] + halfwidth,
                                coords[i][1] + negativeLength,
                                color
                            );
                        }



                    } else if (typeof errorbars[i] === 'object' && !RG.isNull(errorbars[i])) {

                        var positiveLength = this.getYCoord(this.min) - this.getYCoord(this.min + errorbars[i][0]),
                            negativeLength = this.getYCoord(this.min) - this.getYCoord(this.min + errorbars[i][1]);


                        // Color
                        if (typeof errorbars[i][2] === 'string') {
                            color = errorbars[i][2];
                        }

                        // Cap width
                        halfwidth = typeof errorbars[i][4] === 'number' ? errorbars[i][4] / 2 : halfwidth;
    
    
                        // Set the linewidth
                        if (typeof errorbars[i] === 'object' && typeof errorbars[i][3] === 'number') {
                            co.lineWidth = errorbars[i][3];
                        } else if (typeof prop['chart.errorbars.linewidth'] === 'number') {
                            co.lineWidth = prop['chart.errorbars.linewidth'];
                        } else {
                            co.lineWidth = 1;
                        }


                        if (!RG.isNull(errorbars[i][0])) {

                            pa2(
                                co,
                                'lc square b  m % % l % % l % % m % % l % % s %',
                                coords[i][0],
                                coords[i][1],
                                coords[i][0],
                                coords[i][1] - positiveLength,
                                coords[i][0] - halfwidth,
                                ma.round(coords[i][1] - positiveLength),
                                coords[i][0],
                                ma.round(coords[i][1] - positiveLength),
                                coords[i][0] + halfwidth,
                                ma.round(coords[i][1] - positiveLength),
                                color
                            );
                        }
    
                        if (typeof errorbars[i][1] === 'number') {

                            var negativeLength = ma.abs(this.getYCoord(errorbars[i][1]) - this.getYCoord(0));
    
                            pa2(
                                co,
                                'b m % % l % % l % % m % % l % % s %',
                                coords[i][0],
                                coords[i][1],
                                coords[i][0],
                                coords[i][1] + negativeLength,
                                coords[i][0] - halfwidth,
                                ma.round(coords[i][1] + negativeLength),
                                coords[i][0],
                                ma.round(coords[i][1] + negativeLength),
                                coords[i][0] + halfwidth,
                                ma.round(coords[i][1] + negativeLength),
                                color
                            );
                        }
                    }
                }

            co.restore();
        };








        /**
        * Hides a line by setting the appropriate flag so that the .visible(index)
        * function returns the relevant result.
        * 
        * @param int index The index of the line to hide
        */
        this.hide = function ()
        {
            // Hide a single line
            if (typeof arguments[0] === 'number') {
                prop['chart.line.visible'][arguments[0]] = false;
            
            // Hide multiple lines
            } else if (typeof arguments[0] === 'object') {
                for (var i=0; i<arguments[0].length; ++i) {
                    prop['chart.line.visible'][arguments[0][i]] = false;
                }
                
            // Hide all lines
            } else {
                for (var i=0; i<this.original_data.length; ++i) {
                    prop['chart.line.visible'][i] = false;
                }
            }
            
            RG.redraw();
            
            // Facilitate chaining
            return this;
        };








        /**
        * Shows a line by setting the appropriate flag so that the .visible(index)
        * function returns the relevant result.
        * 
        * @param int index The index of the line to show
        */
        this.show = function ()
        {
            // Show a single line
            if (typeof arguments[0] === 'number') {
                prop['chart.line.visible'][arguments[0]] = true;
            
            // Show multiple lines
            } else if (typeof arguments[0] === 'object') {
                for (var i=0; i<arguments[0].length; ++i) {
                    prop['chart.line.visible'][arguments[0][i]] = true;
                }

            // Show all lines
            } else {
                for (var i=0; i<this.original_data.length; ++i) {
                    prop['chart.line.visible'][i] = true;
                }
            }
            
            RG.redraw();            
            
            // Facilitate chaining
            return this;
        };








        /**
        * Returns true/false as to wether a line is hidden or not
        * 
        * @param int index The index of the line to hide
        */
        this.hidden = function (index)
        {
            return !prop['chart.line.visible'][index];
        };








        /**
        * Unfold
        * 
        * This effect gradually increases the X/Y coordinatesfrom 0
        * 
        * @param object obj The chart object
        */
        this.unfold = function ()
        {
            var obj      = this,
                opt      = arguments[0] ? arguments[0] : {},
                frames   = opt.frames ? opt.frames : 30,
                frame    = 0,
                callback = arguments[1] ? arguments[1] : function () {},
                initial  = prop['chart.animation.unfold.initial'];
            
            prop['chart.animation.factor'] = prop['chart.animation.unfold.initial'];

            function iterator ()
            {
                prop['chart.animation.factor'] = ((1 - initial) * (frame / frames)) + initial;
    
                RG.clear(obj.canvas);
                RG.redrawCanvas(obj.canvas);
    
                if (frame < frames) {
                    frame++;
                    RG.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }


            iterator();

            return this;
        };








        /**
        * Trace2
        * 
        * This is a new version of the Trace effect which no longer requires jQuery and is more compatible
        * with other effects (eg Expand). This new effect is considerably simpler and less code.
        * 
        * @param object     Options for the effect. Currently only "frames" is available.
        * @param int        A function that is called when the ffect is complete
        */
        this.trace  =
        this.trace2 = function ()
        {
            var obj       = this,
                callback  = arguments[2],
                opt       = arguments[0] || {},
                frames    = opt.frames || 30,
                frame     = 0,
                callback = arguments[1] || function () {};

            obj.set('animation.trace.clip', 0);
    
            function iterator ()
            {
                RG.clear(obj.canvas);

                RG.redrawCanvas(obj.canvas);

                if (frame++ < frames) {
                    obj.Set('animation.trace.clip', frame / frames);
                    RG.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }
            
            iterator();
            
            return this;
        };








        /**
        * FoldToCenter
        * 
        * Line chart  FoldTocenter
        * 
        * @param object   OPTIONAL An object map of options
        * @param function OPTIONAL A callback to run when the effect is complete
        */
        this.foldtocenter =
        this.foldToCenter = function ()
        {
            var obj      = this,
                opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                callback = arguments[1] || function () {},
                center_value = obj.scale2.max / 2;

            obj.set('chart.yaxis.scale.max', obj.scale2.max);
            
            var original_data = RG.arrayClone(obj.original_data);
            
            function iterator ()
            {
                for (var i=0,len=obj.data.length; i<len; ++i) {
                    if (obj.data[i].length) {
                        for (var j=0,len2=obj.data[i].length; j<len2; ++j) {
                            
                            var dataset = obj.original_data[i];

                            if (dataset[j] > center_value) {
                                dataset[j] = original_data[i][j] - ((original_data[i][j] - center_value) * (frame / frames));
                            } else {
                                dataset[j] = original_data[i][j] + (((center_value - original_data[i][j]) / frames) * frame);
                            }
                        }
                    }
                }
                
                RG.clear(obj.canvas);
                RG.redrawCanvas(obj.canvas)
    
                if (frame++ < frames) {
                    RG.Effects.updateCanvas(iterator);
                } else {
                    callback(obj);
                }
            }



            iterator();



            return this;
        };








        /**
        * UnfoldFromCenterTrace effect
        * 
        * @param object   An object containing options
        * @param function A callback function
        */
        this.unfoldFromCenterTrace =
        this.unfoldFromCenterTrace2 = function ()
        {
            var obj      = this,
                opt      = arguments[0] || {},
                frames   = opt.frames || 30,
                frame    = 0,
                data     = RG.arrayClone(obj.original_data),
                callback = arguments[1] || function () {};



            // Draw the chart once to get the scale values
            obj.canvas.style.visibility = 'hidden';
            obj.draw();

            var max = obj.scale2.max;

            RG.clear(obj.canvas);
            obj.canvas.style.visibility = 'visible';




            /**
            * When the Trace function finishes it calls this function
            */
            var unfoldCallback = function ()
            {
                obj.original_data = data;
                obj.unfoldFromCenter({frames: frames / 2}, callback);
            };



            /**
            * Determine the mid-point
            */
            var half = obj.Get('chart.xaxis.position') == 'center' ? obj.min : ((obj.max - obj.min) / 2) + obj.min;
            obj.Set('chart.yaxis.scale.max', obj.max);
    
            for (var i=0,len=obj.original_data.length; i<len; ++i) {
                for (var j=0; j<obj.original_data[i].length; ++j) {
                    obj.original_data[i][j] = (obj.get('chart.filled') && obj.get('chart.filled.accumulative') && i > 0) ? 0 : half;
                }
            }

            RG.clear(obj.canvas);
            obj.trace2({frames: frames / 2}, unfoldCallback);
            
            return obj;
        };








        /**
        * UnfoldFromCenter
        * 
        * Line chart  unfold from center
        * 
        * @param object An option map of properties. Only frames is supported: {frames: 30}
        * @param function An optional callback
        */
        this.unfoldFromCenter = function ()
        {
            var obj           = this,
                opt           = arguments[0] || {},
                frames        = opt.frames || 30,
                frame         = 0,
                callback      = arguments[1] || function () {};
            
            // Draw the chart once to get the scale values
            obj.canvas.style.visibility = 'hidden';
            obj.draw();

            var max = obj.scale2.max;

            RG.clear(obj.canvas);
            obj.canvas.style.visibility = 'visible';

            var center_value  = obj.Get('chart.xaxis.position') === 'center' ? prop['chart.yaxis.scale.min'] : ((obj.max - obj.min) / 2) + obj.min,
                original_data = RG.arrayClone(obj.original_data),
                steps         = null;
            
            obj.set('chart.yaxis.scale.max', max);

            if (!steps) {
            
                steps = [];
            
                for (var dataset=0,len=original_data.length; dataset<len; ++dataset) {
    
                    steps[dataset] = []
    
                    for (var i=0,len2=original_data[dataset].length; i<len2; ++i) {
                        if (prop['chart.filled'] && prop['chart.filled.accumulative'] && dataset > 0) {
                            steps[dataset][i] = original_data[dataset][i] / frames;
                            obj.original_data[dataset][i] = center_value;
                        } else {
                            steps[dataset][i] = (original_data[dataset][i] - center_value) / frames;
                            obj.original_data[dataset][i] = center_value;
                        }
                    }
                }
            }

            function unfoldFromCenter ()
            {
                for (var dataset=0; dataset<original_data.length; ++dataset) {
                    for (var i=0; i<original_data[dataset].length; ++i) {
                        obj.original_data[dataset][i] += steps[dataset][i];
                    }
                }

                RG.clear(obj.canvas);
                RG.redrawCanvas(obj.canvas);
    
                if (--frames > 0) {
                    RG.Effects.updateCanvas(unfoldFromCenter);
                } else {
                    obj.original_data = RG.arrayClone(original_data);
                    RG.clear(obj.canvas);
                    RG.redrawCanvas(obj.canvas);

                    callback(obj);
                }
            }
            
            unfoldFromCenter();
            
            return this;
        };








        //
        // Determines whether a point is adjustable or not.
        //
        // @param object A shape object
        //
        this.isAdjustable = function (shape)
        {
            if (RG.isNull(prop['chart.adjustable.only'])) {
                return true;
            }

            if (RG.isArray(prop['chart.adjustable.only']) && prop['chart.adjustable.only'][shape.index]) {
                return true;
            }

            return false;
        };








        /**
        * Register the object so it is redrawn when necessary
        */
        RG.register(this);








        /**
        * This is the 'end' of the constructor so if the first argument
        * contains configuration data - handle that.
        */
        if (parseConfObjectForOptions) {
            RG.parseObjectStyleConfig(this, conf.options);
        }

        /**
        * Allow all lines to start off as visible
        */
        for (var i=0; i<this.original_data.length; ++i) {
            prop['chart.line.visible'][i] = true;
        }
    };