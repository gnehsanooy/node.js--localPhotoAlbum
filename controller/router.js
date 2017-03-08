/**
 * Created by freefree on 2017/2/15.
 */
var file=require("../models/file.js");
var formidable=require("formidable");
var path=require("path");
var fs=require("fs");
var sd=require("silly-datetime");

exports.showIndex=function(req,res,next){
    file.getAllAlbum(function(err,allAlbums){
        if(err){
            next();
            return;
        }
        res.render("index",{
            "albums":allAlbums
        });
    });
}
exports.showAlbum=function(req,res,next){
    var albumName=req.params.albumName;
    file.getAllimagesByalbumName(albumName,function(err,imagesArray){
        if(err){
            next();
            return;
        }
        res.render("album",{
            "albumname":albumName,
            "images": imagesArray
        });
    });

}

exports.showUp=function(req,res){
    file.getAllAlbum(function(err,albums){

        res.render("up",{
            "albums":albums
        });
    });

}
exports.dopost=function(req,res){
    var form =new formidable.IncomingForm();
    form.uploadDir=path.normalize(__dirname+"/../tempup/");
    form.parse(req,function(err,fields,files,next){
        if(err){
            next();
            return;
        }
        var time=sd.format(new Date(),"YYYYMMDDHHmmss");
        var ran=parseInt(Math.random()*89999+10000);
        var extname=path.extname(files.tp.name);
        var wjj=fields.wjj;
        var oldpath=files.tp.path;
        var newpath=path.normalize(__dirname+"/../uploads/"+wjj+"/"+time+ran+extname);
        fs.rename(oldpath,newpath,function(err){
           if(err){
              res.send("上传失败");
               return;
           }
            res.render("success");
        });
    });
}