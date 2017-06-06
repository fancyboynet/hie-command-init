'use strict'
const ghdownload = require('github-download')
const colors = require('colors')
const log = {
    error(msg){
        console.log(colors.red(msg));
    },
    success(msg){
        console.log(colors.green(msg));
    }
}
exports.name = 'init [options]';
exports.desc = '初始化脚手架命令';
exports.options = {
    '-h, --help': '帮助信息',
    '-d'   : '初始化的目录',
    '--type'   : '脚手架类型 framework|app'
};

exports.run = function(argv, cli) {
    // 如果输入为 fis3 foo -h
    // 或者 fis3 foo --help
    // 则输出帮助信息。
    let dirName = 'hie'
    let gitRep = 'git@github.com:fancyboynet/hie-framework-scaffold.git'
    let gitAppRep = 'git@github.com:fancyboynet/hie-app-scaffold.git'
    if (argv.h || argv.help) {
        return cli.help(exports.name, exports.options);
    }
    if(argv.d){
        dirName = argv.d
    }
    if(argv.type){
        if(argv.type !== 'app'){
            log.error('参数不对');
            cli.help(exports.name, exports.options);
            return
        }
        gitRep = gitAppRep
    }
    ghdownload(gitRep, dirName)
        .on('error', function(err) {
            log.error(err)
        })
        .on('end', function() {
            log.success('初始化完毕')
        })
};