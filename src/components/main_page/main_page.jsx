import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Header } from "../header/header"
import { Loginadmin } from "../login_admin/login_admin"
import { useCookies } from "react-cookie"
export function Mainpage() {
    const[cookie,setcookie,removecookie]=useCookies()
    const [videos, setvideos] = useState([])
    const [userlogo, setuserlogo] = useState("../images/banner.png")
    const[secstyle,setsecstyle]=useState()
    useEffect(() => {
        axios.get("http://127.0.0.1:1947/get-videos")
            .then(response => setvideos(response.data))
    }, [])

    // function adminclick(){
    //     setmodaladminstate(true);
    // }
    return (
        <div>
            <Header></Header>
            <section className={`row ${secstyle}`}>
                <div className="col-1 ">
                    <button className="bi bi-house-fill btn btn-light py-2"><div>Home</div></button>
                    <button className="bi bi-speedometer btn btn-light py-2"><div>Latest</div></button>
                    <button className="bi bi-save btn btn-light py-2"><div>Saved</div></button>
                    <button className="bi bi-bookmark-heart btn btn-light py-2"><div>Liked</div></button>
                    <button onClick={()=>removecookie("userID")} className="bi bi-door-open-fill btn btn-light py-2"><div>Logoff</div></button>
                </div>

                <div className="col-11 ">
                    <div >
                        <button className="btn btn-primary me-2">All</button>
                        <button className="btn btn-light me-2">New</button>
                        <button className="btn btn-light me-2">Trending</button>
                        <button className="btn btn-light me-2">Live</button>
                        <button className="btn btn-light me-2">Music</button>
                        <button className="btn btn-light me-2">Podcast</button>
                        <button className="btn btn-light me-2">Wildlife</button>
                        <Link to='/login_admin'><button  className="btn btn-light me-2">Admin</button></Link>
                    </div>
                    
                    <section className="main my-1 d-flex flex-wrap justify-content-start " style={{height:"700px"}}>
                        {videos.map((video) => (
                            <span
                                key={video.title}
                                className="my-4 me-4"
                                style={{
                                    width: "30%",
                                    minWidth: "250px", // Ensure a minimum width for wrapping
                                }}
                            >
                                <iframe
                                    className="border-1 rounded"
                                    src={video.videoSrc}
                                    title={video.title}
                                    style={{
                                        width: "100%",
                                        height: "200px", // Set a specific height for the iframe
                                    }}
                                ></iframe>
                                <div className="d-flex mt-2">
                                    <img
                                        className="rounded-circle me-3"
                                        src={userlogo}
                                        width={30}
                                        height={30}
                                    ></img>
                                    <span>
                                        <div className="fw-bold">{video.title}</div>
                                        <div>{video.discription}</div>
                                    </span>
                                    
                                </div>
                            </span>
                        ))}
                    </section>
                </div>
            </section>
            
        </div>
    )
}
