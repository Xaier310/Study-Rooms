import React,{useEffect, useState} from "react";
import "./css/Home.css";
import firstImg from "./images/1.jpg"
import secondImg from "./images/1.jpg"
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () =>{
const [isCreateRoom, setIsCreateRoom] = useState(false);
const [isEnterInRoom, setIsEnterInRoom] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isWD, setIsWD] = useState(false);
const [isAD, setIsAD] = useState(false);
const [isML, setIsML] = useState(false);



useEffect(() => {
    AOS.init({duration : 1300});
    AOS.refresh();
    }, []);

const popupItems = [];
    for(let i = 0;i<5;i++){
        popupItems.push(<span className="no-of-rooms-row-room-cc">{i+1}</span>);
        }


return(<>
<div className="Home">
<header className="header">
<div className="navbar">
    <div className="navbar-child-1">
        <div className="navbar-logo">
        <span className="navbar-logo-dot"></span>
        <h4 className="navbar-logo-text" data-aos="fade-zoom-in">StudyRooms</h4>
        </div>
        <ul className="navbar-items">
           <li className="navbar-item-1 navbar-item-cc"><a href="#">Home</a></li> 
           <li className="navbar-item-2 navbar-item-cc"><a href="#">Rooms</a></li> 
           <li className="navbar-item-3 navbar-item-cc"><a href="#">About Us</a></li>    
           <li className="navbar-item-4 navbar-item-cc"><a href="#">Contact us</a></li> 
        </ul>   
    </div>
    <div className="navbar-child-2">
    <button className="navbar-button" onClick={()=>{
        setIsLoggedIn(!isLoggedIn);
    }}>{!isLoggedIn?"Create Account": "Log Out"}</button>
    </div>
</div>
</header>
<main className="main">
<section className="main-part-1">
<div className="main-part-1-left">
    <h1 className="main-part-1-left-heading">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, tenetur.
    </h1>
    <p className="main-part-1-left-para">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id fuga sunt expedita officia doloribus ut repudiandae corporis porro, tempora optio maiores sint sequi ducimus nam molestiae eveniet ullam modi reiciendis tempore labore exercitationem itaque repellat necessitatibus asperiores?
    </p>
    <div className="main-part-1-left-buttons">
        <button className="main-part-1-left-buttons-button-1 main-part-1-left-buttons-button-cc">
            Create Room 
        </button>
        <button className="main-part-1-left-buttons-button-2 main-part-1-left-buttons-button-cc"><i class="fas fa-home"></i>Enter in a Room</button>
    </div>
</div>
<div className="main-part-1-right">
{/* <img className="main-part-1-right-image" src={firstImg} alt="" /> */}
</div>
</section>
<section className="main-part-2">
    <div className="main-part-2-left">
        <img className="main-part-2-left-img" src={secondImg} alt="" />
    </div>
    <div className="main-part-2-right">
    {(isML || isWD || isAD)&&
             <div className="no-of-rooms">
                <div className="no-of-rooms-row">
                    {popupItems}
                    <span className="no-of-rooms-row-room-cc"><i class="fa fa-plus" aria-hidden="true"></i></span>
                    <div className="no-of-rooms-row-closeButton"><i class="fas fa-times" onClick={()=>{
                        setIsML(false);
                        setIsWD(false);
                        setIsAD(false);
                    }}></i></div>                
                </div>
            </div>}
    <h1 className="main-part-2-right-heading">Lorem ipsum dolor sit amet.</h1>
    <p className="main-part-2-right-para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id fuga sunt expedita officia doloribus ut repudiandae corporis porro, tempora optio maiores sint sequi ducimus nam molestiae eveniet ullam modi reiciendis tempore labore exercitationem itaque repellat necessitatibus asperiores?</p>
    <div className="main-part-2-right-cards">
        <div className="main-part-2-right-cards-card-1 main-part-2-right-cards-card-cc">
            <h1 className="main-part-2-right-cards-card-cc-heading-cc"><i class="fab fa-js-square"></i><span>Web Development</span></h1>
            <button className="main-part-2-right-cards-card-cc-button-cc" onClick={()=>setIsWD(true)}>Join Room</button>
            </div>
        <div className="main-part-2-right-cards-card-2 main-part-2-right-cards-card-cc">
        <h1 className="main-part-2-right-cards-card-cc-heading-cc"><i class="fab fa-apple"></i><span>App Development</span></h1>
        <button className="main-part-2-right-cards-card-cc-button-cc" onClick={()=>setIsAD(true)}>Join Room</button>
        </div>
        <div className="main-part-2-right-cards-card-3 main-part-2-right-cards-card-cc">
        <h1 className="main-part-2-right-cards-card-cc-heading-cc"><i class="fab fa-python"></i><span>Machine Learning</span></h1>
        <button className="main-part-2-right-cards-card-cc-button-cc" onClick={()=>setIsML(true)}>Join Room</button>
        </div> 
        {/* <div className="main-part-2-right-cards-card-4 main-part-2-right-cards-card-cc">
        <h1 className="main-part-2-right-cards-card-cc-heading-cc">Random</h1>
        <button className="main-part-2-right-cards-card-cc-button-cc">Join Room</button>
        </div>     */}
    </div>
    </div>
</section>

</main>
<footer className="footer"></footer>
<script>
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css" />
</script>
</div>

</>
);
}

export default Home;