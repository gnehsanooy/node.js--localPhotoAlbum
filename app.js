
var express=require("express");
var app=express();
var router=require("./controller");

app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(express.static("./uploads"));
//显示首页
app.get("/",router.showIndex);
//显示每个相册
app.get("/:albumName",router.showAlbum);

app.get("/up",router.showUp);
app.post("/up",router.dopost);
//404
app.use(function(req,res){
    res.render("err");
});
app.listen(3000);