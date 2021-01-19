import express from "express";
import Blog from "../models/blogs.model.js";
import Fuse from "fuse.js";

let router = express.Router();

router.get("/", (req, res) => {
    Blog.find()
    .then(blogs => {
        res.render("home", { blogs });
    })
    .catch(err => console.log(err));
});

router.get("/blog/:blogID", (req, res) => {
    Blog.findById(req.params.blogID)
    .then(blog => {
        res.render("blogView", { blog });
    })
    .catch(err => console.log(err));
});

router.get("/edit/:blogID", (req, res) => {
    Blog.findById(req.params.blogID)
    .then(blog => {
        res.render("editBlog", { blog });
    })
    .catch(err => console.log(err));
});

router.post("/edit/:blogID", (req, res) => {
    Blog.findById(req.params.blogID)
    .then(blog => {
        blog.title = req.body["title-input"];
        blog.content = req.body["content-input"];
        blog.save()
        .then(() => {
            console.log("Success edit");
            res.redirect(`/blog/${req.params.blogID}`)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
});


router.delete("/blog/:blogID", (req, res) => {
    Blog.findOneAndDelete(req.params.blogID)
    .then(blog => {
        console.log("Success deleted");
        res.redirect("/")
    })
    .catch(err => console.log(err));
});

router.get("/create-blog", (req, res) => {
    res.render("createBlog", {});
});

router.post("/create-blog", (req, res) => {
    const blogPost = new Blog({
        title: req.body["title-input"],
        content: req.body["content-input"]
    });
    blogPost.save()
    .then(() => {
        console.log("Success create blog");
        res.redirect("/");
    })
    .catch(err => console.log(err))
});

////////////////////////////////////////// SEARCH FUNCTION /////////////////////////////////////////////////



router.post("/search", (req, res) => {
    Blog.find()
    .then(blogs => {
        const fuse = new Fuse(blogs, {
            keys: [
                "title",
                "content"
            ]
        });
        const results = fuse.search(req.body["search-query"]);
        console.log(results);
        res.render("search", { results, query: req.body["search-query"] });
    })
    .catch(err => console.log(err));
});
    // Blog.find({ 
    //     title: {
    //         $regex: new RegExp(req.body["search-query"])
    //     },
    //     content: {
    //         $regex: new RegExp(req.body["search-query"])
    //     }
    // }, {
    //     _id: 0,
    //     __v: 0
    // }, function (err, blogs) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(blogs);
    //         res.render("search", { blogs, query: req.body["search-query"] });
    //     }
    // }).limit(10);

        
    // .then(blogs => {
    //     console.log(blogs);
    //     res.render("search", { blogs, query: req.body["search-query"] })
    // })
    // .catch(err => console.log(err));

    // Blog.find({ $text: { $search: req.body["search-query"] }})
    // .skip(20)
    // .limit(10)
    // .exec((err, blogs) => {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log(blogs);
        //     res.render("search", { blogs, query: req.body["search-query"] })
        // }
    // })
    // .then(blog => {
    //     res.render("editBlog", { blog });
    // })
    // .catch(err => console.log(err));


export default router;