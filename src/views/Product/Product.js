import Nav from '../../components/Nav/Nav'
import ItemDetailContainer from '../../components/ItemDetailContainer/ItemDetailContainer'
import Footer from '../../components/Footer/Footer'
import { useParams } from 'react-router-dom'

export default function Product () {

    const {productId} = useParams()

    return(
        <>
            <Nav/>
            <ItemDetailContainer productId={productId}/>
            <Footer/>
        </>
    )
}