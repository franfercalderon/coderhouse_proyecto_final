import Nav from '../../components/Nav/Nav'
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer'
import Footer from '../../components/Footer/Footer'
import { useParams } from "react-router-dom";


export default function Category () {

    const { categoryId } = useParams()

    return(
        <>
            <Nav/>
            <ItemListContainer categoryId={categoryId} />
            <Footer/>
        </>
    )
}