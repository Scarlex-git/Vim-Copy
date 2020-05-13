var fn_addin=function(i,t,e){var a=a||{};a.styles=a.styles||{},a.commands=a.commands||{},a.dependencies=e||a.dependencies||{},a.styles.style=function(){},a.views=a.views||{},a.collect=a.collect||{},a.models=a.models||{},a.templates=a.templates||{},a.info={widget:!0,placeholderType:"metric",id:"metrics",class:"app-container base-metric metric metrics",region:"top-right",order:"append",addin:"2314da1c-0579-4b4b-8dd6-5f89f27e806a",requiredFeature:"plus",visibleSetting:"metricVisible",dependencies:["base_metric","settings"]},i.console.log(i.elapsed()+": "+a.info.id+" started"),a.templates=a.templates||{},a.templates.metricInstance=Handlebars.template({1:function(t,e,n,i){var a,s,l=e.helperMissing;return"\t\t\t\t"+(null!=(a=(e.ifnoteq||t&&t.ifnoteq||l).call(t,null!=t?t.value:t,"Loading…",{name:"ifnoteq",hash:{},fn:this.program(2,i,0),inverse:this.noop,data:i}))?a:"")+'<span class="metric-stat-number">'+this.escapeExpression("function"==typeof(s=null!=(s=e.value||(null!=t?t.value:t))?s:l)?s.call(t,{name:"value",hash:{},data:i}):s)+"</span>\n"},2:function(t,e,n,i){var a;return'<span class="metric-stat-unit before">'+this.escapeExpression("function"==typeof(a=null!=(a=e.unit||(null!=t?t.unit:t))?a:e.helperMissing)?a.call(t,{name:"unit",hash:{},data:i}):a)+"</span>"},4:function(t,e,n,i){var a,s,l=e.helperMissing;return'\t\t\t\t<span class="metric-stat-number">'+this.escapeExpression("function"==typeof(s=null!=(s=e.value||(null!=t?t.value:t))?s:l)?s.call(t,{name:"value",hash:{},data:i}):s)+"</span>"+(null!=(a=(e.ifnoteq||t&&t.ifnoteq||l).call(t,null!=t?t.value:t,"Loading…",{name:"ifnoteq",hash:{},fn:this.program(5,i,0),inverse:this.noop,data:i}))?a:"")+"\n"},5:function(t,e,n,i){var a;return null!=(a=e.if.call(t,null!=t?t.unit:t,{name:"if",hash:{},fn:this.program(6,i,0),inverse:this.noop,data:i}))?a:""},6:function(t,e,n,i){var a;return'<span class="metric-stat-unit">'+this.escapeExpression("function"==typeof(a=null!=(a=e.unit||(null!=t?t.unit:t))?a:e.helperMissing)?a.call(t,{name:"unit",hash:{},data:i}):a)+"</span>"},8:function(t,e,n,i){var a;return'\t\t\t\t<span class="list-control read-only" title="Admin Locked">\n\t\t\t\t\t<svg class="icon icon-lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 328.9 402"><path d="M357.45,190.72a26.43,26.43,0,0,0-19.42-8H328.9V127.91q0-52.54-37.68-90.22T201,0q-52.55,0-90.22,37.69T73.09,127.91v54.82H64a27.28,27.28,0,0,0-27.41,27.41V374.59A27.28,27.28,0,0,0,64,402H338a27.28,27.28,0,0,0,27.41-27.41V210.13A26.43,26.43,0,0,0,357.45,190.72Zm-83.36-8H127.91V127.91q0-30.27,21.41-51.68T201,54.82q30.27,0,51.68,21.41t21.41,51.68Z" transform="translate(-36.55)"/></svg>\n\t\t\t\t</span>\n\t\t\t\t'+(null!=(a=e.if.call(t,null!=t?t.allowPin:t,{name:"if",hash:{},fn:this.program(9,i,0),inverse:this.noop,data:i}))?a:"")+"\n"},9:function(t,e,n,i){var a;return null!=(a=e.if.call(t,null!=t?t.pinned:t,{name:"if",hash:{},fn:this.program(10,i,0),inverse:this.noop,data:i}))?a:""},10:function(t,e,n,i){return'\n\t\t\t\t\t<span class="list-control list-pin active" title="Pinned">\n\t\t\t\t\t\t<svg class="icon icon-pin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 481.71 481.72"><path d="M106.12,10.76,10.77,106.13a36.72,36.72,0,0,0,45.92,56.8l109.6,127.41a100.11,100.11,0,0,0,20,113.32,35.27,35.27,0,0,0,49.86,0l57.33-57.31L481.71,481.72,346.35,293.52l57.31-57.31a35.3,35.3,0,0,0,0-49.88,100.16,100.16,0,0,0-113.29-20L162.93,56.67a36.72,36.72,0,0,0-56.81-45.91Z" transform="translate(0 0)"/></svg>\n\t\t\t\t\t</span>\n\t\t\t\t'},12:function(t,e,n,i){var a;return(null!=(a=e.if.call(t,null!=t?t.numeric:t,{name:"if",hash:{},fn:this.program(13,i,0),inverse:this.noop,data:i}))?a:"")+(null!=(a=e.if.call(t,null!=t?t.allowEdit:t,{name:"if",hash:{},fn:this.program(15,i,0),inverse:this.noop,data:i}))?a:"")+(null!=(a=e.if.call(t,null!=t?t.allowPin:t,{name:"if",hash:{},fn:this.program(17,i,0),inverse:this.noop,data:i}))?a:"")+(null!=(a=e.if.call(t,null!=t?t.archived:t,{name:"if",hash:{},fn:this.program(24,i,0),inverse:this.noop,data:i}))?a:"")+"\n"},13:function(t,e,n,i){return'\t\t\t\t\t<span class="list-control metric-crement metric-increment" title="Increase by 1">\n\t\t\t\t\t\t<svg class="icon icon-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"/></svg>\n\t\t\t\t\t</span>\n'},15:function(t,e,n,i){return'\t\t\t\t\t<span class="list-control list-edit" data-test="metric-edit" title="Edit">\n\t\t\t\t\t\t<svg class="icon icon-gear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340.274 340.274"><path d="M293.629 127.806l-5.795-13.739c19.846-44.856 18.53-46.189 14.676-50.08l-25.353-24.77-2.516-2.12h-2.937c-1.549 0-6.173 0-44.712 17.48l-14.184-5.719c-18.332-45.444-20.212-45.444-25.58-45.444h-35.765c-5.362 0-7.446-.006-24.448 45.606l-14.123 5.734C86.848 43.757 71.574 38.19 67.452 38.19l-3.381.105-27.27 26.737c-4.138 3.891-5.582 5.263 15.402 49.425l-5.774 13.691C0 146.097 0 147.838 0 153.33v35.068c0 5.501 0 7.44 46.585 24.127l5.773 13.667c-19.843 44.832-18.51 46.178-14.655 50.032l25.353 24.8 2.522 2.168h2.951c1.525 0 6.092 0 44.685-17.516l14.159 5.758c18.335 45.438 20.218 45.427 25.598 45.427h35.771c5.47 0 7.41 0 24.463-45.589l14.195-5.74c26.014 11 41.253 16.585 45.349 16.585l3.404-.096 27.479-26.901c3.909-3.945 5.278-5.309-15.589-49.288l5.734-13.702c46.496-17.967 46.496-19.853 46.496-25.221V151.88c-.005-5.519-.005-7.446-46.644-24.074zM170.128 228.474c-32.798 0-59.504-26.187-59.504-58.364 0-32.153 26.707-58.315 59.504-58.315 32.78 0 59.43 26.168 59.43 58.315-.006 32.177-26.656 58.364-59.43 58.364z"></path></svg>\n\t\t\t\t\t</span>\n'},17:function(t,e,n,i){var a;return'\t\t\t\t\t<span class="list-control list-pin'+(null!=(a=e.if.call(t,null!=t?t.pinned:t,{name:"if",hash:{},fn:this.program(18,i,0),inverse:this.noop,data:i}))?a:"")+'" title="'+(null!=(a=e.if.call(t,null!=t?t.pinned:t,{name:"if",hash:{},fn:this.program(20,i,0),inverse:this.program(22,i,0),data:i}))?a:"")+'">\n\t\t\t\t\t\t<svg class="icon icon-pin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 481.71 481.72"><path d="M106.12,10.76,10.77,106.13a36.72,36.72,0,0,0,45.92,56.8l109.6,127.41a100.11,100.11,0,0,0,20,113.32,35.27,35.27,0,0,0,49.86,0l57.33-57.31L481.71,481.72,346.35,293.52l57.31-57.31a35.3,35.3,0,0,0,0-49.88,100.16,100.16,0,0,0-113.29-20L162.93,56.67a36.72,36.72,0,0,0-56.81-45.91Z" transform="translate(0 0)"/></svg>\n\t\t\t\t\t</span>\n'},18:function(t,e,n,i){return" active "},20:function(t,e,n,i){return" Unpin "},22:function(t,e,n,i){return"Pin"},24:function(t,e,n,i){return'\t\t\t\t\t<span class="list-control list-unarchive">\n\t\t\t\t\t\t<svg class="icon icon-unarchive"  data-test="metric-unarchive" title="Unarchive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.53 438.53"><path d="M421.12,134.19q-17.4-40.54-46.81-69.95t-70-46.82a216.26,216.26,0,0,0-166.3-1.57A221.7,221.7,0,0,0,68.24,60.53L31.12,23.7q-8.57-8.86-19.7-4Q0,24.56,0,36.55v127.9A17.56,17.56,0,0,0,5.43,177.3a17.56,17.56,0,0,0,12.85,5.43h127.9q12,0,16.85-11.42,4.84-11.15-4-19.71l-39.12-39.39a141.7,141.7,0,0,1,45.69-29,144.9,144.9,0,0,1,53.67-10.14A142.56,142.56,0,0,1,276,84.65a144.79,144.79,0,0,1,77.94,77.95,144.69,144.69,0,0,1,0,113.34A144.79,144.79,0,0,1,276,353.89a145,145,0,0,1-172-45.26q-2-2.85-6.57-3.43a10.28,10.28,0,0,0-7.14,2.57l-39.11,39.4A8.49,8.49,0,0,0,48.68,353a10.24,10.24,0,0,0,1.86,6.43,214.2,214.2,0,0,0,75.37,58.38,217.74,217.74,0,0,0,93.36,20.7,213.31,213.31,0,0,0,85.08-17.41q40.54-17.42,69.95-46.82t46.82-69.95a216.59,216.59,0,0,0,0-170.16Z" transform="translate(0 0)"/></svg>\n\t\t\t\t\t</span>\n'},26:function(t,e,n,i){var a,s;return'\t<div class="metric-label" data-test="metric-label">\n\t\t<svg class="icon icon-alert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" title="Reconnect needed"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.66c-.938 0-1.58-.723-1.58-1.66 0-.964.669-1.66 1.58-1.66.963 0 1.58.696 1.58 1.66 0 .938-.617 1.66-1.58 1.66zm.622-6.339c-.239.815-.992.829-1.243 0-.289-.956-1.316-4.585-1.316-6.942 0-3.11 3.891-3.125 3.891 0-.001 2.371-1.083 6.094-1.332 6.942z"/></svg>\n\t\t<span class="metric-label-name">'+(null!=(a="function"==typeof(s=null!=(s=e.nameOrPlaceholder||(null!=t?t.nameOrPlaceholder:t))?s:e.helperMissing)?s.call(t,{name:"nameOrPlaceholder",hash:{},data:i}):s)?a:"")+"</span>\n\t</div>\n"},28:function(t,e,n,i){var a,s,l=e.helperMissing,r="function";return'\t<div class="metric-label-with-sub" data-test="metric-label">\n\t\t<svg class="icon icon-alert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" title="Reconnect needed"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.66c-.938 0-1.58-.723-1.58-1.66 0-.964.669-1.66 1.58-1.66.963 0 1.58.696 1.58 1.66 0 .938-.617 1.66-1.58 1.66zm.622-6.339c-.239.815-.992.829-1.243 0-.289-.956-1.316-4.585-1.316-6.942 0-3.11 3.891-3.125 3.891 0-.001 2.371-1.083 6.094-1.332 6.942z"/></svg>\n\t\t<span class="label">'+(null!=(a=typeof(s=null!=(s=e.nameOrPlaceholder||(null!=t?t.nameOrPlaceholder:t))?s:l)==r?s.call(t,{name:"nameOrPlaceholder",hash:{},data:i}):s)?a:"")+'</span>\n\t\t<span class="sublabel">'+(null!=(a=typeof(s=null!=(s=e.subLabel||(null!=t?t.subLabel:t))?s:l)==r?s.call(t,{name:"subLabel",hash:{},data:i}):s)?a:"")+"</span>\n\t</div>\n"},30:function(t,e,n,i){var a;return null!=(a=e.unless.call(t,null!=t?t.readOnly:t,{name:"unless",hash:{},fn:this.program(31,i,0),inverse:this.noop,data:i}))?a:""},31:function(t,e,n,i){return'\n\t<div class="dash-controls has-dash-icon">\n\t\t<span class="icon-wrapper dash-icon-wrapper icon-wrapper-up metric-increment">\n\t\t\t<svg class="icon dash-icon icon-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"/></svg>\n\t\t</span>\n\t</div>\n\t'},compiler:[6,">= 2.0.0-beta.1"],main:function(t,e,n,i){var a,s;return'<div class="metric-data" title="'+this.escapeExpression("function"==typeof(s=null!=(s=e.externalUrl||(null!=t?t.externalUrl:t))?s:e.helperMissing)?s.call(t,{name:"externalUrl",hash:{},data:i}):s)+'" data-test="metric-instance">\n\t<div class="metric-stat-row">\n\t\t<div class="metric-stat">\n'+(null!=(a=e.if.call(t,null!=t?t.prependUnit:t,{name:"if",hash:{},fn:this.program(1,i,0),inverse:this.program(4,i,0),data:i}))?a:"")+'\t\t</div>\n\n\t\t<div class="list-controls">\n'+(null!=(a=e.if.call(t,null!=t?t.readOnly:t,{name:"if",hash:{},fn:this.program(8,i,0),inverse:this.program(12,i,0),data:i}))?a:"")+"\t\t</div>\n\t</div>\n\n"+(null!=(a=e.unless.call(t,null!=t?t.subLabel:t,{name:"unless",hash:{},fn:this.program(26,i,0),inverse:this.noop,data:i}))?a:"")+(null!=(a=e.if.call(t,null!=t?t.subLabel:t,{name:"if",hash:{},fn:this.program(28,i,0),inverse:this.noop,data:i}))?a:"")+(null!=(a=e.if.call(t,null!=t?t.numeric:t,{name:"if",hash:{},fn:this.program(30,i,0),inverse:this.noop,data:i}))?a:"")+"\n</div>\n"},useData:!0}),a.styles=a.styles||{},a.styles.style=function(){var t=document.createElement("style");t.type="text/css",t.innerHTML=".metric .dash-icon,.metric-crement .icon{height:11px}.metric-crement{padding:0 3px}.metric .dash-controls{margin-top:-1px;margin-right:-7px;opacity:0;transition:opacity .1s ease}.metric .metric-item:hover .dash-controls{opacity:1}.metric .dash-controls .icon-wrapper:after{--icon-wrapper-size:23px}.metric .icon-wrapper-up{margin-right:2px}.metric .metric-item:hover .dash-icon{opacity:.8}.metric .list-view .dash-controls{display:none}",document.getElementsByTagName("head")[0].appendChild(t)},a.collect.Metrics=i.collect.SyncedCollection.extend({initialize:function(t,e){this.Cycles={NONE:"none",DAILY:"daily",WEEKLY:"weekly",MONTHLY:"monthly",YEARLY:"yearly"},(e=e||{}).name="metrics",this.accountSitePath="metrics",e.model=a.models.Metric,e.transientProps=["random","selected"],e.localProps=["lastValue"],i.collect.SyncedCollection.prototype.initialize.call(this,t,e)},findPinned:function(){return this.filter(function(t){return!t.get("deleted")&&!t.get("archived")&&t.get("pinned")})}});var n=a.dependencies.base_metric;a.models.Metric=n.models.BaseMetricModel.extend({defaults:{id:null,label:"",value:"",path:null,cycle:null,url:null,active:!1,date:i.date().getTime(),deleted:!1,archived:!1,serverSetId:!1},initialize:function(t){n.models.BaseMetricModel.prototype.initialize.call(this,t)},onChange:function(){var t=this.previous("value");if(this.isAuthNeeded()&&t!==this.get("value")){var n=this;t.startsWith("Loading")||this.save({lastValue:t},{silent:!0}),a.models.metricManager.loadMetricProvidersIfNeeded(function(){var t={cta_text:"Connect",cta_cmd:"metric.connect",cta_options:{modelId:n.get("id")},title:"Reconnect Metric"},e=a.models.metricManager.metricProviders.findWhere({id:n.get("providerId")});t.message="Please reconnect to "+e.get("provider_title")+" to see up-to-date metric data in Momentum.",i.commandManager.execute("notification.show.enhanced",t)})}},add:function(t){this.save({value:Number((Number(this.getValue())+t).toPrecision(12)),modified:i.now()})},togglePinned:function(){this.save("pinned",!this.get("pinned"))},getDetailViewVariables:function(){return this.getViewData()},getValue:function(){return this.get("cycle")&&this.get("cycle")!==this.collection.Cycles.NONE&&this.getStartOfCycle()>this.getModifiedDate()?0:this.get("value")},getStartOfCycle:function(){return this[this.get("cycle")+"Start"]()},dailyStart:function(){var t=i.utils.getActiveDateString().split(/\D/),e=new Date(t[0],t[1]-1,t[2]);return e.setHours(mConst("dateRolloverHour")),e.getTime()},weeklyStart:function(){var t=new Date(this.dailyStart());return t.setDate(t.getDate()-(t.getDay()+6)%7),this.getMomoDate(t)},monthlyStart:function(){var t=new Date(this.dailyStart());return t.setDate(1),this.getMomoDate(t)},yearlyStart:function(){var t=new Date(this.dailyStart());return t.setDate(1),t.setMonth(0),this.getMomoDate(t)},getMomoDate:function(t){var e=new Date(t.getFullYear(),t.getMonth(),t.getDate());return e.setHours(mConst("dateRolloverHour")),e.getTime()},getModifiedDate:function(){var t=this.get("modified");if(t)return t;var e=this.get("modifiedServer");return e?Date.parse(e):void 0},getViewData:function(){var t=this.getValue(),e=!isNaN(t),n=!this.get("url")||0===this.get("url").length,i=!this.get("providerId");return{id:this.get("id"),value:this.isAuthNeeded()?this.get("lastValue"):t,numeric:e&&n&&i&&!this.get("isTeam"),nameOrPlaceholder:this.get("label"),pinned:this.get("pinned"),placeholder:"Label",metricType:"Metric",archived:this.get("archived"),selected:!1,random:!1,unit:this.get("unit"),prependUnit:this.get("prependUnit"),externalUrl:this.get("externalUrl"),subLabel:this.get("subLabel"),authNeeded:this.isAuthNeeded()}},isAuthNeeded:function(){return"Authorization needed."===this.getValue()},toggleArchive:function(){Backbone.Model.prototype.save.apply(this,[{archived:!this.get("archived")}])},delete:function(){this.save("deleted",!0)},hasUrl:function(){var t=this.get("url");return t&&0<t.length}}),a.models.MetricManager=Backbone.Model.extend({initialize:function(){this.collection=a.collect.metrics=new a.collect.Metrics,a.collect.metrics.fetch({reset:!0}),this.metricProviders=new i.collect.Settings,this.metricProviders.url=i.globals.urlRoot+"settings/metrics";this.metricProviders.parse=function(t){return t.connected_providers.concat(t.available_providers)}},loadMetricProviders:function(t){this.metricProviders.fetch({success:t})},loadMetricProvidersIfNeeded:function(t){this.metricProviders.models.length?t():this.loadMetricProviders(t)}});n=a.dependencies.base_metric;return a.views.MetricInstance=n.views.MetricInstance.extend({tagName:function(){return"listItem"===this.options.type?"li":"div"},events:{click:"selectMetric","webkitAnimationEnd .metric-instance":"onAnimationEnd","click .list-edit":"editDetail","click .list-pin":"pinMetric","click .list-unarchive":"unarchive","click .metric-increment":"increment"},initialize:function(t){n.views.MetricInstance.prototype.initialize.call(this,t),this.template=a.templates.metricInstance},onChange:function(){if(this.model.get("deleted"))this.destroy();else{var t=this.model.changed;if(t&&(t.value||0===t.value)&&1===Object.keys(t).length)return void this.$el.find(".metric-stat-number").text(t.value);this.render()}},destroy:function(){this.$el.remove(),this.remove()},render:function(){var t=this.model.getViewData();return this.numeric=t.numeric,(t.pinned||this.model.get("selected")||this.model.get("random"))&&(t.active=!0),this.model.get("random")&&(t.random=!0),this.model.get("readOnly")&&(t.readOnly=!0),t.allowEdit=!this.model.allowEdit||this.model.allowEdit(),t.allowPin=!this.model.allowPin||this.model.allowPin(),this.model.get("archived")&&(t.allowPin=!1),t.allowEdit||t.allowPin||(t.readOnly=!0),"dash"===this.type&&t.active&&(t.nameOrPlaceholder=lineBreakString(t.nameOrPlaceholder,this.maxCharPerLine)),(t.value||0===t.value)&&0!==(t.value+"").trim().length||(t.value="-"),this.$el.html(this.template(t)),this.$el.addClass(this.class),this.$el.toggleClass("auth-needed",t.authNeeded),this.$(".metric-data").attr("title",t.authNeeded&&"dash"!==this.type?"Authorization needed. Click to reconnect.":null),this.$el.toggleClass("pinned-metric",this.model.get("pinned")),this.$el.toggleClass("read-only",this.model.get("readOnly")),this.$el.toggleClass("ignore-click",!this.model.get("externalUrl")&&"dash"!==this.type),this.$el.toggleClass("random random-metric",this.model.get("random")),this.$el.find(".list-random").toggleClass("active",this.model.get("random")),this.$el.toggleClass("numeric",t.numeric),this},selectMetric:function(t){"dash"===this.type?this.parent.togglePopup(this):(t.stopPropagation(),this.model.isAuthNeeded()?this.parent.editDetail(this.model,{connect:!0,stayOnListView:!0}):this.openExternalUrlIfPresent())},increment:function(t){if(this.numeric){t.preventDefault(),t.stopPropagation();var e=1;t&&t.shiftKey?e=10:t&&t.metaKey&&(e=100),this.model.add(e)}},openExternalUrlIfPresent:function(){this.model.get("externalUrl")&&window.open(this.model.get("externalUrl"))}}),i.commandManager&&(i.commandManager.registerCommand("team.metric.add",function(t){i.commandManager.execute("window.account.open","/team/metrics?add")}),i.commandManager.registerCommand("metric.connect",function(t,e){a.views.metrics.editDetailById(e.modelId,{connect:!0,stayOnListView:!0})})),(n=a.dependencies.base_metric).info=a.info,a.models.metricManager=new a.models.MetricManager,a.styles.style(),a.views.metrics=i.widgetManager.handover("metrics",n.views.BaseMetric,{model:a.models.metric,region:"top-right",order:"append",metricType:"Metric",metricTitle:"Metrics",metricIcon:"icon-metric.svg",visibleSetting:"metricVisible",defaultShowRandomState:!0,metricDescription:"Metrics to meter things.",manager:a.models.metricManager,detailViewAddin:"metric_new_detail",instanceView:a.views.MetricInstance,instanceTemplate:a.templates.metricInstance,updateInterval:3e5,rateLimitOnUpdateInterval:1e4,fetchBeforeUpdate:!0,loadOnListView:function(){a.models.metricManager.loadMetricProviders(function(){for(var t in a.views.metrics.listViews)if(a.views.metrics.listViews.hasOwnProperty(t)){var e=a.views.metrics.listViews[t];if(e.model.get("providerId")){var n=a.models.metricManager.metricProviders.findWhere({id:e.model.get("providerId")});e.$el.attr("title","Open in "+n.get("provider_title"))}}})}}),i.widgets.push(a.views.metric),a};m.addinManager&&m.addinManager.registerAddinFn("2314da1c-0579-4b4b-8dd6-5f89f27e806a",fn_addin);