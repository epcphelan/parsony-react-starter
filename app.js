const configs = require('./config.json');
const {join} = require('path');
configs.static_files = join(__dirname,configs.static_files);

const ParsonyWebServer = require('/Users/ericphelan/Desktop/ParsonyFramework/parsony-web');
const parsony = new ParsonyWebServer(configs);
parsony.start();