import GoHomeBtn from "../GoHomeBtn/GoHomeBtn";

export default function NotFound ({title, btn}) {

    return(
        <>
            <div className='not-found-main-container'>
                <div className='not-found-container'>
                    <h2>{title}</h2>
                    <GoHomeBtn title={btn}/>
                </div>
            </div>
        </>
    )
}