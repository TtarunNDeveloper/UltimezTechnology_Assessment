const express = require('express');
const app = express();
app.use(express.json());

let books =[
    {
        id: 1,
        title: "The Lion King",
        author: "Disney",
    }
];
app.get("/books", (req,res) => {
    res.status(200).json(books);
});

app.get("/books/:id", (req,res) => {
    const id = Number(req.params.id);
    //const id = Number(req.query.id);

    const book = books.find((book) => 
    book.id === id);
    
    if(!book){
        return res.status(400).json({
            message: "Book not found"
        });
    res.status(200).json(book);
    };
})

app.post("/books", (req,res) => {
    const {title, author}=req.body;
    if(!title || !author){
        return res.status(400).json({
            message:"Title and Author is required"
        });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(200).json({
        message:"New Book is Created",
        book: newBook
    });
})

app.put("/books/:id", (req,res) => {
    const id = Number(req.params.id);
    //const id = Number(req.query.id);
    const book = books.find((book) => 
    book.id === id);
     if(!book){
        return res.status(400).json({
            message: "Book not found"
        });
     }
     const {title, author}= req.body;
     if(!title || !author){
        return res.status(400).json({
            message:"Title and Author is required",
        });
     }
     book.title=title;
     book.author=author;
     
     res.status(200).json({
        message: "Book Updated Successfully",
        book
     });
})

app.delete("/books/:id", (req,res)=>{
    const id = Number(req.params.id);
    //const id = Number(req.query.id);

    const bookIndex = books.findIndex(
        (book) => book.id === id
    );

    if(bookIndex === -1){
        return res.status(404).json({
            message: "No books found"
        })
    }
    books.splice(bookIndex, 1);
    res.status(200).json({
        message: "Book deleted",
    })
})
app.listen(3000, () =>{

    console.log(`Server running on port 3000`);
});