import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { useOrdersStore } from '../state/ordersStore';
import { OrderStatus, type Order } from '../types/order.types';
import OrderTimeline from '../components/OrderTimeline';
import { formatDateAndTime } from '../../../helpers/datetime';

function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  // Check that order id url param is valid
  if (id?.slice(0, 4) !== "OID-") return <p className="text-sm text-red-500">Invalid Order ID</p>;

  const order = useOrdersStore(state => id ? state.getOrderByID(id) : undefined);
  // const byID      = useOrdersStore(s => s.byID);
  const isLoading = useOrdersStore(s => s.isLoading);
  const error     = useOrdersStore(s => s.error);

  if (isLoading) return <p className="text-sm text-gray-400">Loading...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!order) return <p className="text-sm text-red-500">Couldn't find order matching {id}.</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between">
        {/* <div className="flex flex-col text-left">
          <p>{order.fromAddress} </p>
          <p>{order.toAddress}</p>
        </div> */}
        {/* <h1>{order.status}</h1> */}
        <OrderTimeline history={order.statusHistory} fromAddress={order.fromAddress} toAddress={order.toAddress} />

        <hr className="m-8" />

        <div className="flex flex-row text-right justify-between">
          <p>{order.username}</p>
          {/* <p className="text-xs text-gray-500">{order.userID} </p> */}
          <p>{formatDateAndTime(order.createdAt)}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailPage;