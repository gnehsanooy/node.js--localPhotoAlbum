/**
 * Created by freefree on 2017/2/16.
 */
var fs=require("fs");
exports.getAllAlbum=function(callback){
    fs.readdir("./uploads",function(err,files){
        if(err){
            callback(err,null);
            return;
        }
        var allAlbums=[];
        (function iterator(i){
            if(i==files.length){
                callback(null,allAlbums);
                return;
            }
            fs.stat("./uploads/"+files[i],function(err,stats){
                if(err){
                    callback(err,null);
                    return;
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);

    });
}
exports.getAllimagesByalbumName=function(albumName,callback){
    fs.readdir("./uploads/"+albumName,function(err,files){
        if(err){
            callback(err,null);
            return;
        }
        var allImages=[];
        (function iterator(i){
            if(i==files.length){
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/"+albumName+"/"+files[i],function(err,stats){
                if(err){
                    callback(err,null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
}
