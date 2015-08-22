//
// Author: Fiore Basile <fiore.basile@gmail.com> - Fab Lab Toscana
//
// Based on Fabmodules:
//
// Neil Gershenfeld 
// (c) Massachusetts Institute of Technology 2014
// 
// This work may be reproduced, modified, distributed, performed, and 
// displayed for any purpose, but must acknowledge the fab modules 
// project. Copyright is retained and must be preserved. The work is 
// provided as is; no warranty is provided, and users accept all 
// liability.
//



/*
	Fab Modules main.js
	This module loads and configures require.js, the inits the library



*/
// require.config({

//    baseUrl: 'assets/js/core/',
//    paths: {
//       'text': 'text',
//       'handlebars' : 'bower_components/handlebars/handlebars'
//    }

// });

/*

*/

define(['util/config'], function(mod_config) {

    var modules = [];
    var client = null; // this holds the client reference for emitting callbacks

    var get_json = function(url, resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    };

    var init = function(config_path, cli) {
        if (typeof(cli) != undefined) {
            client = cli;
        }

        get_json(config_path, function(data) {
            console.log("Loading config " + config_path);
            // console.log("Returning:\n" + JSON.stringify(data));
            mod_config.init(JSON.stringify(data));

        }, function(err) {
            alert('failed to load default config');
            if (client && typeof(client.error) != undefined) {
                client.error("config", "failed to load default config")
            }

        });
        // load default plugins

        // read from settings the plugins to be loaded

    };


    var list_apps = function() {
        var config = mod_config.read();
        console.log(config);
        if (config != null && config.apps != null) return config.apps;
        return [];
    };

    var list_modules = function() {
        var config = mod_config.read();
        console.log(config);
        if (config != null && config.modules != null) return config.modules;
        return [];
    };


    var list_machines = function() {
        var config = mod_config.read();
        console.log(config);
        if (config != null && config.machines != null) return config.machines;
        return [];
    }

    var list_inputs = function() {
        var config = mod_config.read();
        console.log(config);
        if (config != null && config.inputs != null) return config.inputs;
        return [];
    };

    var list_outputs = function() {
        var config = mod_config.read();
        console.log(config);
        if (config != null && config.outputs != null) return config.outputs;
        return [];
    };

    var list_actions = function() {
        var config = mod_config.read();
        console.log(config);
        if (config != null && config.actions != null) return config.actions;
        return [];
    };


    var load_module = function(mod, cb) {
        require([mod], function(amod) {
            modules[mod] = amod;
            cb(modules);
        });
    };


    var unload_module = function(mod) {
        if (typeof(modules.mod) != undefined)[
            // ?            delete modules[mod];
        ]
    };


    return {
        init: init,
        apps: list_apps,
        inputs: list_inputs,
        outputs: list_outputs,
        actions: list_actions,
        machines: list_machines,
        load_module: load_module,
        unload_module: unload_module,
        version: '2.0.0',
        modules: modules
    };

});
