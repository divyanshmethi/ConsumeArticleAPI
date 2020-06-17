const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view-engine','ejs');
app.use(express.static('public'));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser: true,useUnifiedTopology: true});

const articleSchema = {
  title:String,
  content:String
};

const Article = mongoose.model("article",articleSchema);

//Request targeting all articles

app.route("/articles")
.get(function(req,res){
  Article.find({},function(err,result){
	console.log("Someone is trying to access");
    if(err)
    {
      res.send(err);
    }
    else {
      res.send(result);
    }
  });
})
.post(function(req,res){
  let recievedTitle = req.body.title;
  let recievedContent = req.body.content;
  const newArticle = new Article({
    title:recievedTitle,
    content:recievedContent
  });
  newArticle.save(function(err){
    if(err){
      res.send(err);
    }else {
      res.send("Successfully added a new Article");
    }
  });
})
.delete(function(req,res){
  //We specify how we are going to delete all the articles inside the collection using mongoose
  Article.deleteMany({},function(err){
    if(err){
      res.send(err);
    }else {
      res.send("Successfully Deleted all Articles");
    }
  });
});

//Request targeting specific article

app.route("/articles/:title")
  .get(function(req,res){
    Article.findOne({title:req.params.title},function(err,article){
      if(err){
        res.send("No Article matching that title was found");
      }else {
        res.send(article);
      }
    });
  })
  .put(function(req,res){
    //Here, we will replace a particular document's data to be replaced by what is sent by the client
    Article.updateOne(
      {
        title:req.params.title
      },
      {
        title:req.body.title,
        content:req.body.content
      },
        function(err){
          if(err){
            res.send(err);
          }else {
            res.send("Successfully Updated the document");
          }
        }
    )
  })
  .patch(function(req,res){
    Article.updateOne(
      {
        title: req.params.title
      },
      {
        $set: req.body
      },
      function(err){
        if(err){
          res.send(err);
        }else {
          res.send("Successfully Updated the document");
        }
      }
  )
})
  .delete(function(req,res){
    Article.deleteOne(
      {title:req.params.title},
      function(err){
        if(err)
        {
          res.send(err);
        }
        else {
          res.send("Successfully Deleted the document");
        }
      }
    )
  });

// app.delete("/articles/:title",function(req,res){
//   let requestedTitle = req.params.title;
//   Article.delete({title:requestedTitle},function(err){
//     if(err)
//     {
//       res.send(err);
//     }
//     else {
//
//     }
//   });
// });

app.listen(3000,function(){
  console.log("Server Started at port 3000");
});
