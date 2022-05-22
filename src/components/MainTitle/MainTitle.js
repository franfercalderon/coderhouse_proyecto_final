export default function MainTitle () {
    return(
        <div className="main-title-container">
            <div className= "background-main-image-container">
                <img src='images/background.jpeg'className="background-main-image" alt="background"/>
            </div>
            <div className= "main-title-image-container">
                <img src='/images/logo.png'className="main-title-logo" alt="Herschel Logo"/>
            </div>
            {/* <h1 className="main-title">Herschel</h1> */}
        </div>
    )
}
