import PleaseSignin from "../components/PleaseSignin";
import OrderList from "../components/OrderList";

const OrdersPage = props => {
    return ( 
        <div>
            <PleaseSignin>
                <OrderList id={props.query.id}/>
            </PleaseSignin>
        </div>
    );
}

export default OrdersPage;