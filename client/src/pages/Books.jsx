import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(()=>{
        const fetachAllBooks = async()=>{
            try{
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fetachAllBooks()
    },[])
        
const handleDelete = async (id)=>{
    try{
        await axios.delete("http://localhost:8800/delete/"+id);
        window.location.reload();
    }catch(err){
        console.log(err);
    }
}
  return (
    <div> 
        <h1>BooK Shop</h1>
        <div className='books'>
            {books.map(book=>(
                <div className="book" key={book.id}>
                    {book.pic &&  <img src={book.pic} alt=""/>}
                    <h2>{book.title}</h2>
                    <p>{book.dec}</p>
                    <button className='delete' onClick={()=>handleDelete(book.id)}>DELETE</button>
                    <button className='update'><Link to= {'/update/'+book.id}>UPDATE</Link></button>
                </div>
            ))}
        </div> 
        <button>
        
            <Link to="/add">ADD new Book</Link>
        </button>   
    </div>
  );
}

export default Books