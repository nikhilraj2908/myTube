var cors=require("cors")
var express=require("express")
const { MongoClient, ObjectId } = require("mongodb");
var mongoClient=require("mongodb").MongoClient;
var constring="mongodb://127.0.0.1:27017";
var app=express();
app.use(cors()); 
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoClient.connect(constring).then(clientobj=>{
    var details={
        adminName:"Nikhil",
        adminPass:"Nikhil@123",
        mailId:"nikhilraj2908@gmail.com"
    }
    var database=clientobj.db("MyTube");
    database.collection("admin").findOne({adminName:"Nikhil"})
    .then(admin=>{
        if(!admin){
            database.collection("admin").insertOne(details).then(()=>{
                console.log("admin added defaultly");
            })
        }else{
            console.log("already exists")
        }
    })
})

app.get("/admin/:mailID",(req,res)=>{
    mongoClient.connect(constring).then(clientobj=>{
        var database=clientobj.db("MyTube");
        database.collection("admin").find({}).toArray()
        .then(admins=>{
            console.log("all admin details")
            res.send(admins);
        })
    })
})

app.get("/admin/login",(req,res)=>{
    mongoClient.connect(constring).then(clientobj=>{
        var database=clientobj.db("MyTube");
        database.collection("videos").find({}).toArray()
        .then(videos=>{
            console.log("all videos shown after admin login")
            res.send(videos);
        })
    })
})

app.get("/users",(req,res)=>{
    mongoClient.connect(constring).then(clientobj=>{
        var database=clientobj.db("MyTube");
        database.collection("users").findOne({}).toArray().then(users=>{
            console.log("all users shown after login admin")
            res.send(users)
        })
    })
})
app.get("/users/:userID",(req,res)=>{
    mongoClient.connect(constring).then(clientobj=>{
        var database=clientobj.db("MyTube");
        database.collection("users").find({userID:req.params.userID}).toArray().then(users=>{
            console.log("specific user is shown")
            res.send(users)
        })
    })
})

app.delete("/video-delete/:id",(req,res)=>{
    MongoClient.connect(constring).then(clientobj=>{
        var database=clientobj.db("MyTube");
        database.collection("videos").deleteOne({_id:ObjectId(req.params.id)})
        .then(()=>{
            console.log("video deleted deleted succefully");
            res.end();
        })
    })
})

app.delete("/user-delete/:userId",(req,res)=>{
    mongoClient.connect(constring).then(clientobj=>{
        var database=clientobj.db("MyTube");
        database.collection("users").deleteOne({userId:req.params.userId})
        .then(()=>{
            console.log("user deleted succefully")
            res.end();
        })
    })
})

app.post("/add-video",(req,res)=>{
    var video={
        title:req.body.title,
        discription:req.body.discription,
        videoSrc:req.body.videoSrc
    }
    mongoClient.connect(constring).then(clientobj=>{
        var database=clientobj.db("MyTube");
        database.collection("videos").insertOne(video)
        .then(()=>{
            console.log("video added succefully")
            res.end();
        })
    })
})

//register user
app.post("/register",(req,res)=>{
    var user={
        userID:req.body.userID, 
        userName:req.body.userName,
        password:req.body.password,
        emailID:req.body.emailID,
    }
    mongoClient.connect(constring).then(clientobj=>{
        var database=clientobj.db("MyTube");
        database.collection("users").insertOne(user).then(()=>{
            console.log('user added');
            res.end();
        })
    })
})
app.get("/get-videos",(req,res)=>{
    mongoClient.connect(constring).then(clientobj=>{
        var database=clientobj.db("MyTube");
        database.collection("videos").find({}).toArray().then((admin)=>{
            console.log("userlogin succefully")
            res.send(admin);
        })
    })
})
// Add comment
app.post("/add-comment", (req, res) => {
    const { videoId, userId, comment } = req.body; // Ensure you pass userId and comment

    mongoClient.connect(constring).then(clientobj => {
        var database = clientobj.db("MyTube");
        var commentDetails = {
            videoId: ObjectId(videoId),
            userId: userId,
            comment: comment,
            timestamp: new Date() // Optional: Add timestamp
        };

        database.collection("comments").insertOne(commentDetails).then(() => {
            console.log("Comment added successfully");
            res.end();
        });
    });
});


// Like video
app.post("/like-video", (req, res) => {
    const { videoId, userId } = req.body; // Ensure you pass videoId and userId

    mongoClient.connect(constring).then(clientobj => {
        var database = clientobj.db("MyTube");

        // Check if the user has already liked the video
        database.collection("likes").findOne({ videoId: ObjectId(videoId), userId: userId }).then(existingLike => {
            if (existingLike) {
                // User has already liked the video
                return res.status(400).send("User has already liked this video");
            }

            // Add new like
            var likeDetails = {
                videoId: ObjectId(videoId),
                userId: userId,
                timestamp: new Date() // Optional: Add timestamp
            };

            database.collection("likes").insertOne(likeDetails).then(() => {
                console.log("Video liked successfully");
                res.end();
            });
        });
    });
});

app.listen(1947);